const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    registrationLink: { type: String },
    category: {
      type: String,
      enum: ["Hackathon", "Workshop", "Competition", "Other"],
      default: "Other",
    },
    teams: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Team" }
    ],
    organizer: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
