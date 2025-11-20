const router = require('express').Router();
const passport = require('passport');

router.get("/login/failure", (req, res) => {
    res.status(401).json({
        error: true,
        message: 'Login failure',
    });
});

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: 'Successfully logged in',
            user: req.user,
        });
    }
});

router.get('/me', (req, res) => {
    if (req.isAuthenticated() && req.user) {
        res.json({
            success: true,
            user: req.user,
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Not authencitcated'
        });
    }
});

router.get('/google', passport.authenticate("google", ["profile", "email"]));
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Logout failed', error: err });
        }

        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Session destruction failed', error: err });
            }

            res.clearCookie('connect.sid'); // optional: clear session cookie
            // send success response instead of redirect
            return res.status(200).json({ message: 'Logged out successfully', redirect: process.env.CLIENT_URL });
        });
    });
});


router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login/failed" }),
    (req, res) => {
        const userId = req.user._id; // passport puts user on req
        res.redirect(`${process.env.CLIENT_URL}/profile/${userId}/edit-profile`);
    }
);

router.get(
    "/github/callback",
    passport.authenticate('github', { failureRedirect: "/login/failed" }),
    (req, res) => {
        const userId = req.user._id; // passport puts user on req
        res.redirect(`${process.env.CLIENT_URL}/profile/${userId}/edit-profile`);
    }
)



module.exports = router