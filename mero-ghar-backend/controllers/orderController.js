const Order = require('../models/Order');
const { logActivity } = require('../services/logService');
const Listing = require('../models/Listing');

// --- Guest: Checkout / Create Booking ---
// exports.checkout = async (req, res) => {
//     const { listingId, amount } = req.body;

//     try {
//         // Prevent duplicate booking by same user for same listing
//         const existingOrder = await Order.findOne({
//             user: req.user.id,
//             listingId,
//             status: { $ne: 'cancelled' }, // ignore cancelled ones
//         });

//         if (existingOrder) {
//             return res.status(400).json({
//                 message: 'You have already booked this listing.',
//             });
//         }

//         // Create new order
//         const newOrder = new Order({
//             user: req.user.id,
//             listingId,
//             amount,
//             paymentInfo: {
//                 id: 'mock-payment-id',
//                 status: 'completed',
//             },
//             status: 'completed',
//         });

//         await newOrder.save();

//         // Log activity
//         await logActivity({
//             req,
//             user: req.user,
//             action: 'Completed booking checkout',
//             statusCode: 201,
//         });

//         res.status(201).json({
//             message: 'Booking confirmed!',
//             order: newOrder,
//         });
//     } catch (err) {
//         res.status(500).json({
//             error: 'Booking failed',
//             details: err.message,
//         });
//     }
// };

exports.checkout = async (req, res) => {
    const { listingId, amount, startDate, endDate } = req.body;

    if (!listingId || !amount || !startDate || !endDate) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newOrder = new Order({
            user: req.user.id,
            listingId,
            amount,
            startDate,
            endDate,
            paymentInfo: {
                id: 'mock-payment-id',
                status: 'completed',
            },
            status: 'completed',
        });

        await newOrder.save();

        await logActivity({
            req,
            user: req.user,
            action: 'Completed booking checkout',
            statusCode: 201,
        });

        res.status(201).json({
            message: 'Booking confirmed!',
            order: newOrder,
        });
    } catch (err) {
        console.error('Checkout Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// // --- Guest: View My Bookings ---
// exports.getMyBookings = async (req, res) => {
//     try {
//         const orders = await Order.find({ user: req.user.id })
//             .populate('user', 'name email')
//             .sort({ createdAt: -1 });

//         res.json({ orders });
//     } catch (err) {
//         res.status(500).json({
//             error: 'Failed to fetch bookings',
//             details: err.message,
//         });
//     }
// };

exports.getMyBookings = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('listingId');
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch your bookings' });
    }
};


// // --- Host: View Bookings for Their Listings ---
// exports.getHostBookings = async (req, res) => {
//     try {
//         // Step 1: Get host's listings
//         const hostListings = await Listing.find({ host: req.user.id });
//         const listingIds = hostListings.map((listing) => listing._id.toString());

//         // Step 2: Get orders where listingId matches any of host's listings
//         const orders = await Order.find({ listingId: { $in: listingIds } })
//             .populate('user', 'name email')
//             .sort({ createdAt: -1 });

//         res.json({ orders });
//     } catch (err) {
//         res.status(500).json({
//             error: 'Failed to fetch host bookings',
//             details: err.message,
//         });
//     }
// };
// GET /api/orders/host-bookings
exports.getHostBookings = async (req, res) => {
    try {
        const listings = await Listing.find({ host: req.user.id });
        const listingIds = listings.map((l) => l._id);

        const orders = await Order.find({ listingId: { $in: listingIds } })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch host bookings' });
    }
};

