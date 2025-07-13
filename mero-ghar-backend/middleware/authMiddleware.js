const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify JWT
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Token missing' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add user info to req
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// Middleware for RBAC
exports.checkRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied: Insufficient role' });
        }
        next();
    };
};
