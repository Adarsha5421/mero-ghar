const Listing = require('../models/Listing');
const { logActivity } = require('../services/logService');

// Host creates a listing
exports.createListing = async (req, res) => {
    const { title, description, location, pricePerNight, images } = req.body;

    try {
        const newListing = await Listing.create({
            host: req.user.id,
            title,
            description,
            location,
            pricePerNight,
            images,
        });

        await logActivity({
            req,
            user: req.user,
            action: 'Created new listing',
            statusCode: 201,
        });

        res.status(201).json({ message: 'Listing created successfully', listing: newListing });
    } catch (err) {
        res.status(500).json({ error: 'Listing creation failed', details: err.message });
    }
};

// View all listings (public) with pagination support
exports.getAllListings = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    try {
        const total = await Listing.countDocuments();
        const listings = await Listing.find()
            .populate('host', 'name email')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(total / limit);

        res.json({
            listings,
            page,
            totalPages,
            total,
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
};


// Host views their own listings
exports.getMyListings = async (req, res) => {
    try {
        const listings = await Listing.find({ host: req.user.id });
        res.json({ listings });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch your listings' });
    }
};

// Get listing by ID (public)
// GET /api/listings/:id
exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('host', 'name email');
        if (!listing) return res.status(404).json({ error: 'Listing not found' });
        res.json({ listing });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listing', details: err.message });
    }
};

// PATCH /api/listings/:id
exports.updateListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        if (listing.host.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to update this listing' });
        }

        const fieldsToUpdate = ['title', 'description', 'location', 'pricePerNight', 'images'];

        fieldsToUpdate.forEach((field) => {
            if (req.body[field] !== undefined) {
                listing[field] = req.body[field];
            }
        });

        await listing.save();

        await logActivity({
            req,
            user: req.user,
            action: `Updated listing ${listing._id}`,
            statusCode: 200,
        });

        res.status(200).json({ message: 'Listing updated successfully', listing });
    } catch (err) {
        console.error('Update error:', err);
        res.status(500).json({ error: 'Failed to update listing', details: err.message });
    }
};


// Host deletes their own listing
// DELETE /api/listings/:id
exports.deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' });
        }

        // Optional: Ensure only the owner can delete it
        if (listing.host.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized to delete this listing' });
        }

        await listing.deleteOne();

        await logActivity({
            req,
            user: req.user,
            action: `Deleted listing ${listing._id}`,
            statusCode: 200,
        });

        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (err) {
        console.error('Delete error:', err);
        res.status(500).json({ error: 'Failed to delete listing', details: err.message });
    }
};




