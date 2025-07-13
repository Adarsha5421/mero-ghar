const express = require('express');
const router = express.Router();
const {
    createListing,
    getAllListings,
    getMyListings,
    getListingById,
    updateListing,
    deleteListing,
} = require('../controllers/listingController');

const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Public: all listings
router.get('/', getAllListings);

// Host-only: create + get own listings
router.post('/create', verifyToken, checkRole('host'), createListing);
router.get('/me', verifyToken, checkRole('host'), getMyListings);
router.get('/:id', getListingById);
router.patch('/:id', verifyToken, checkRole('host'), updateListing);
router.delete('/:id', verifyToken, checkRole('host'), deleteListing);





module.exports = router;
