import { useEffect, useState } from 'react';

export default function BrowseListings() {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/listings');
                const data = await res.json();
                console.log('Fetched listings:', data);
                setListings(data.listings); // ✅ Use the array inside `data`
            } catch (err) {
                console.error('Failed to load listings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);



    if (loading) return <p className="text-center mt-8">Loading listings...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Browse Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listings.map((listing) => (
                    <div key={listing._id} className="border rounded p-4 shadow hover:shadow-lg transition">
                        <h3 className="font-bold text-lg">{listing.title}</h3>
                        <p><strong>Location:</strong> {listing.location}</p>
                        <p><strong>Price/Night:</strong> Rs. {listing.pricePerNight}</p>
                        {/* Optional: Add image preview if listing.images[0] */}
                    </div>
                ))}
            </div>
        </div>
    );
}
