const rateLimit = require('express-rate-limit');

// Limit: 5 requests per 15 minutes for login
exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5,
    message: {
        message: 'Too many login attempts. Try again in 15 minutes.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Limit: 10 requests per hour for registration
exports.registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: {
        message: 'Too many registration attempts. Try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
