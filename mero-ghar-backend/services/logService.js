const Log = require('../models/Log');

exports.logActivity = async ({ req, user, action, statusCode }) => {
    try {
        await Log.create({
            user: user?._id,
            action,
            method: req.method,
            route: req.originalUrl,
            statusCode,
            ip: req.ip,
            userAgent: req.get('User-Agent'),
        });
    } catch (err) {
        console.error('Logging failed:', err.message);
    }
};
