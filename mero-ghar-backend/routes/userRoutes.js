const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Protected route
router.get('/me', verifyToken, (req, res) => {
    res.json({
        message: 'You are authenticated!',
        user: req.user,
    });
});

// Example: Only "host" or "admin" can access
router.get('/host-dashboard', verifyToken, checkRole('host', 'admin'), (req, res) => {
    res.json({ message: 'Welcome to the Host Dashboard 👑' });
});

router.post('/logout', (req, res) => {
    // Just a dummy route for frontend to call
    res.json({ message: 'Logged out (token should be removed on client)' });
});


module.exports = router;
