


// const User = require('../models/User');
// const Listing = require('../models/Listing');
// const Order = require('../models/Order');

// // Get all users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.json({ users });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch users' });
//     }
// };

// // Get all listings
// exports.getAllListings = async (req, res) => {
//     try {
//         const listings = await Listing.find().populate('host', 'name email');
//         res.json({ listings });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch listings' });
//     }
// };

// // Get all bookings
// exports.getAllBookings = async (req, res) => {
//     try {
//         const orders = await Order.find()
//             .populate('user', 'name email')
//             .populate('listingId', 'title');
//         res.json({ orders });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch bookings' });
//     }
// };

// // Basic analytics
// exports.getAnalytics = async (req, res) => {
//     try {
//         const userCount = await User.countDocuments();
//         const hostCount = await User.countDocuments({ role: 'host' });
//         const guestCount = await User.countDocuments({ role: 'guest' });
//         const listingCount = await Listing.countDocuments();
//         const bookingCount = await Order.countDocuments();

//         res.json({
//             users: userCount,
//             hosts: hostCount,
//             guests: guestCount,
//             listings: listingCount,
//             bookings: bookingCount,
//         });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch analytics' });
//     }
// };

// // Delete user
// exports.deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ message: 'User deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to delete user' });
//     }
// };

// // Delete listing
// exports.deleteListing = async (req, res) => {
//     try {
//         await Listing.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Listing deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to delete listing' });
//     }
// };

// exports.getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find()
//             .populate('user', 'name email')
//             .populate('listingId', 'title');
//         res.json({ orders });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// };


// // Delete booking
// exports.deleteBooking = async (req, res) => {
//     try {
//         await Order.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Booking deleted successfully' });
//     } catch (err) {
//         res.status(500).json({ error: 'Failed to delete booking' });
//     }
// };


// // const express = require('express');
// // const router = express.Router();
// // const { getAllUsers, getAllListings, getAllOrders } = require('../controllers/adminController');
// // const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// // router.get('/users', verifyToken, checkRole('admin'), getAllUsers);
// // router.get('/listings', verifyToken, checkRole('admin'), getAllListings);
// // router.get('/orders', verifyToken, checkRole('admin'), getAllOrders);

// // module.exports = router;

// const express = require('express');
// const router = express.Router();
// const { verifyToken, checkRole } = require('../middleware/authMiddleware');
// const adminController = require('../controllers/adminController');

// router.get('/users', verifyToken, checkRole('admin'), adminController.getAllUsers);
// router.get('/listings', verifyToken, checkRole('admin'), adminController.getAllListings);
// router.get('/bookings', verifyToken, checkRole('admin'), adminController.getAllBookings);
// router.get('/analytics', verifyToken, checkRole('admin'), adminController.getAnalytics);

// router.delete('/users/:id', verifyToken, checkRole('admin'), adminController.deleteUser);
// router.delete('/listings/:id', verifyToken, checkRole('admin'), adminController.deleteListing);
// router.delete('/bookings/:id', verifyToken, checkRole('admin'), adminController.deleteBooking);


// module.exports = router;

const User = require('../models/User');
const Listing = require('../models/Listing');
const Order = require('../models/Order');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json({ users });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// Get all listings
exports.getAllListings = async (req, res) => {
    try {
        const listings = await Listing.find().populate('host', 'name email');
        res.json({ listings });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
};

// ✅ Renamed to getAllOrders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('listingId', 'title');
        res.json({ orders });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

// Basic analytics
exports.getAnalytics = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const hostCount = await User.countDocuments({ role: 'host' });
        const guestCount = await User.countDocuments({ role: 'guest' });
        const listingCount = await Listing.countDocuments();
        const bookingCount = await Order.countDocuments();

        res.json({
            users: userCount,
            hosts: hostCount,
            guests: guestCount,
            listings: listingCount,
            bookings: bookingCount,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

// Delete listing
exports.deleteListing = async (req, res) => {
    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.json({ message: 'Listing deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete listing' });
    }
};

// Delete order (was previously called booking)
exports.deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
};

