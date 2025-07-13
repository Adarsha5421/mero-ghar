import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ListingDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/listings/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Listing not found');
                setListing(data.listing);
            } catch {
                toast.error('Failed to load listing');
                navigate('/browse');
            } finally {
                setLoading(false);
            }
        };

        const checkBooking = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const res = await fetch(`http://localhost:5001/api/orders/my-bookings`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                const isBooked = data.orders.some(order => order.listingId === id || order.listingId?._id === id);
                setAlreadyBooked(isBooked);
            } catch (err) {
                console.error('Booking check failed:', err);
            }
        };

        fetchListing();
        checkBooking();
    }, [id, navigate]);

    const handleBooking = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to book');
            return;
        }

        if (!startDate || !endDate) {
            toast.error('Please select start and end dates.');
            return;
        }

        try {
            const res = await fetch(`http://localhost:5001/api/orders/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    listingId: id,
                    amount: listing.pricePerNight,
                    startDate,
                    endDate,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || data.error || 'Booking failed');
                return;
            }

            setAlreadyBooked(true);
            toast.success('Booking successful!');
        } catch (err) {
            console.error('Booking error:', err);
            toast.error('An error occurred while booking.');
        }
    };

    if (loading || !listing) return <p className="p-6">Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 underline">← Back</button>

            {alreadyBooked && (
                <p className="text-red-600 mb-4 font-medium">You have already booked this listing.</p>
            )}

            <img
                src={listing.images?.[0] || 'https://via.placeholder.com/600x400'}
                alt={listing.title}
                className="w-full h-64 object-cover rounded mb-4"
            />
            <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
            <p className="text-gray-600 mb-1"><strong>Location:</strong> {listing.location}</p>
            <p className="text-gray-600 mb-1"><strong>Price:</strong> Rs. {listing.pricePerNight} / night</p>
            <p className="text-gray-700 mb-3"><strong>Description:</strong> {listing.description}</p>
            <p className="text-sm text-gray-500 mb-6">Hosted by: {listing.host?.name || 'Unknown'}</p>

            {!alreadyBooked && (
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border p-2 rounded"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>

                    <button
                        onClick={handleBooking}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                    >
                        Book Now
                    </button>
                </div>
            )}
        </div>
    );
}
