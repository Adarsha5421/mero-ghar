const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    location: String,
    pricePerNight: {
        type: Number,
        required: true,
    },
    images: [String], // optional: later add Cloudinary support
}, { timestamps: true });

module.exports = mongoose.model('Listing', listingSchema);
