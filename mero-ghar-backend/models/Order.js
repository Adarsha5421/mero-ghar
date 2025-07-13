// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//         required: true,
//     },
//     listingId: {
//         type: String, // later we can link this to a Listing model
//         required: true,
//     },
//     amount: {
//         type: Number,
//         required: true,
//     },
//     paymentInfo: {
//         id: String, // Stripe payment ID
//         status: String,
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'completed', 'cancelled'],
//         default: 'pending',
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);


const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    paymentInfo: {
        id: String,
        status: String,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'completed',
    },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
