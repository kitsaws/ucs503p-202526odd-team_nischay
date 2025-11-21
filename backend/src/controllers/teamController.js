const Team = require('../models/Team');
const Event = require('../models/Event');
const User = require('../models/User');

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    // Fetch all teams, populate referenced fields
    const teams = await Team.find()
      .populate('leaderId', 'name email')          // only get selected fields from User
      .populate('members', 'name email profilePic')           // populate members
      .populate('eventId', 'title date category'); // optional: populate event info if needed

    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all teams for an event
exports.getTeamsByEvent = async (req, res) => {
  try {
    const teams = await Team.find({ event_id: req.params.eventId }).populate('members leaderId');
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new team
exports.createTeam = async (req, res) => {
  try {
    const userId = req.params.id;
    const { teamName, teamSize, description, event, roles } = req.body;

    // Ensure the logged-in user is creating the team
    if (!req.user || req.user._id.toString() !== userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Validate required fields
    if (!teamName || !event || !roles || roles.length === 0) {
      return res.status(400).json({ message: "Team name, event, and roles are required" });
    }
    if (teamSize === 0) {
      return res.status(400).json({ message: "Team Size cannot be 0" });
    }

    // Optional: check if event exists
    const eventExists = await Event.findById(event);
    if (!eventExists) return res.status(404).json({ message: "Event not found" });

    // Create new team
    const newTeam = new Team({
      teamName,
      teamSize,
      description,
      eventId: event,
      leaderId: userId,
      rolesNeeded: roles,
      members: [userId], // leader is automatically a member
    });

    const savedTeam = await newTeam.save();

    await Event.findByIdAndUpdate(event, { $addToSet: { teams: savedTeam._id } });

    // ✅ Link this team to the creator (and any other initial members)
    await User.updateMany(
      { _id: { $in: savedTeam.members } },
      { $addToSet: { teams: savedTeam._id } } // addToSet avoids duplicates
    );

    res.status(201).json(savedTeam);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Apply to join a team
exports.requestToJoinTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    // Check if already requested
    console.log(req.user);

    const existingRequest = team.requests.find(r => r.userId.toString() === req.user.id);
    if (existingRequest) return res.status(400).json({ message: 'Already requested' });

    team.requests.push({ userId: req.user._id });
    await team.save();
    res.json({ message: 'Request sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept join request
exports.acceptRequest = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    const requestIndex = team.requests.findIndex(r => r.userId.toString() === req.params.memberId.toString());

    if (requestIndex === -1) return res.status(404).json({ message: 'Request not found' });

    const userId = team.requests[requestIndex].userId;
    team.members.push(userId);
    team.requests.splice(requestIndex, 1);

    const member = await User.findById(req.params.memberId);
    member.teams.push(req.params.id);

    await team.save();
    await member.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Reject join request
exports.rejectRequest = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    team.requests = team.requests.filter(r => r.userId.toString() !== req.params.memberId.toString());
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single team
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('members eventId leaderId requests.userId');
    if (!team) return res.status(404).json({ message: 'Team not found' });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};