const express = require('express');
const router = express.Router();
const { checkout, getMyBookings, getHostBookings } = require('../controllers/orderController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

router.post('/checkout', verifyToken, checkRole('guest'), checkout);
router.get('/my-bookings', verifyToken, checkRole('guest'), getMyBookings);
router.get('/host-bookings', verifyToken, checkRole('host'), getHostBookings);
module.exports = router;
