

// const express = require('express');
// const router = express.Router();
// const { verifyToken, checkRole } = require('../middleware/authMiddleware');
// const adminController = require('../controllers/adminController');

// router.get('/orders', verifyToken, checkRole('admin'), adminController.getAllOrders);

// router.get('/users', verifyToken, checkRole('admin'), adminController.getAllUsers);
// router.get('/listings', verifyToken, checkRole('admin'), adminController.getAllListings);
// router.get('/bookings', verifyToken, checkRole('admin'), adminController.getAllBookings);
// router.get('/analytics', verifyToken, checkRole('admin'), adminController.getAnalytics);

// router.delete('/users/:id', verifyToken, checkRole('admin'), adminController.deleteUser);
// router.delete('/listings/:id', verifyToken, checkRole('admin'), adminController.deleteListing);
// router.delete('/bookings/:id', verifyToken, checkRole('admin'), adminController.deleteBooking);


// module.exports = router;


const express = require('express');
const router = express.Router();
const { verifyToken, checkRole } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

// ✅ Fixed routes using consistent naming
router.get('/users', verifyToken, checkRole('admin'), adminController.getAllUsers);
router.get('/listings', verifyToken, checkRole('admin'), adminController.getAllListings);
router.get('/orders', verifyToken, checkRole('admin'), adminController.getAllOrders); // ✅
router.get('/analytics', verifyToken, checkRole('admin'), adminController.getAnalytics);

// DELETE routes
router.delete('/users/:id', verifyToken, checkRole('admin'), adminController.deleteUser);
router.delete('/listings/:id', verifyToken, checkRole('admin'), adminController.deleteListing);
router.delete('/orders/:id', verifyToken, checkRole('admin'), adminController.deleteOrder); // ✅

module.exports = router;
