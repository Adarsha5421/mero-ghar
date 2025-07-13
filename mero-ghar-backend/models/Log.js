const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false, // anonymous access also logged
    },
    action: {
        type: String,
        required: true,
    },
    method: String,
    route: String,
    statusCode: Number,
    ip: String,
    userAgent: String,
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Log', logSchema);
