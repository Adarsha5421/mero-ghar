

// Deepseek amazing design
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiStar, FiMapPin, FiCalendar, FiUser, FiCreditCard } from 'react-icons/fi';
import { FaAirbnb } from 'react-icons/fa';

export default function ListingDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [alreadyBooked, setAlreadyBooked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dates, setDates] = useState({
        startDate: '',
        endDate: ''
    });
    const [guests, setGuests] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5001/api/listings/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Listing not found');
                setListing(data.listing);
            } catch (err) {
                toast.error(err.message || 'Failed to load listing');
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
        if (!dates.startDate || !dates.endDate) {
            toast.error('Please select dates');
            return;
        }

        setShowPaymentModal(true);
    };

    const confirmPayment = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to book');
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
                    amount: listing.pricePerNight * calculateNights(),
                    startDate: dates.startDate,
                    endDate: dates.endDate,
                    guests
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || data.error || 'Booking failed');
                return;
            }

            setAlreadyBooked(true);
            setShowPaymentModal(false);
            toast.success('Booking successful!');
        } catch (err) {
            console.error('Booking error:', err);
            toast.error('An error occurred while booking.');
        }
    };

    const calculateNights = () => {
        if (!dates.startDate || !dates.endDate) return 0;
        const start = new Date(dates.startDate);
        const end = new Date(dates.endDate);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    };

    const calculateTotal = () => {
        const nights = calculateNights();
        return nights * listing.pricePerNight;
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
        </div>
    );

    if (!listing) return (
        <div className="max-w-4xl mx-auto p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800">Listing not available</h2>
            <button
                onClick={() => navigate('/browse')}
                className="mt-4 px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
            >
                Browse other listings
            </button>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto pb-24">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white border-b p-4">
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-gray-100"
                    >
                        <FiArrowLeft className="text-gray-800" size={20} />
                    </button>
                    <div className="flex items-center space-x-4">
                        {/* <button className="p-2 rounded-full hover:bg-gray-100">
                            <FaAirbnb className="text-rose-500" size={24} />
                        </button> */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="px-4">
                {/* Image Gallery */}
                <div className="relative mb-6">
                    <div className="grid grid-cols-4 gap-2 h-[500px] rounded-xl overflow-hidden">
                        <div className="col-span-3">
                            <img
                                src={listing.images?.[activeImage] || 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
                                alt={listing.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="grid grid-rows-2 gap-2">
                            {listing.images?.slice(0, 2).map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveImage(index + 1)}
                                    className="h-full w-full"
                                >
                                    <img
                                        src={img}
                                        alt={`${listing.title} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Listing Info */}
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{listing.title}</h1>
                            <div className="flex items-center mt-2 space-x-4">
                                <div className="flex items-center">
                                    <FiStar className="text-rose-500 fill-rose-500" />
                                    <span className="ml-1 text-gray-900">4.92</span>
                                    <span className="mx-1">·</span>
                                    <a href="#reviews" className="underline text-gray-900">128 reviews</a>
                                </div>
                                <div className="flex items-center">
                                    <FiMapPin className="text-gray-600" size={14} />
                                    <span className="ml-1 text-gray-600">{listing.location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-b py-8 my-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Entire home</h3>
                                    <p className="text-gray-600">You'll have the place to yourself</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Enhanced clean</h3>
                                    <p className="text-gray-600">This host committed to our cleaning protocol</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">About this place</h2>
                            <p className="text-gray-700 leading-relaxed">{listing.description || 'No description provided.'}</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {['Wifi', 'Kitchen', 'Washer', 'Free parking', 'Air conditioning', 'TV'].map(amenity => (
                                    <div key={amenity} className="flex items-center">
                                        <div className="w-6 h-6 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                                            <span className="text-xs">✓</span>
                                        </div>
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 border rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-xl font-semibold">Rs. {listing.pricePerNight} <span className="font-normal text-gray-600">night</span></p>
                                    <div className="flex items-center text-gray-600">
                                        <FiStar className="text-rose-500 fill-rose-500 mr-1" />
                                        <span>4.92 · 128 reviews</span>
                                    </div>
                                </div>
                            </div>

                            {alreadyBooked ? (
                                <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">
                                    You have already booked this listing
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-6">
                                        <div className="grid grid-cols-2 gap-2 border rounded-lg overflow-hidden">
                                            <div className="border-r p-3">
                                                <label className="text-xs font-semibold text-gray-500">CHECK-IN</label>
                                                <div className="flex items-center">
                                                    <FiCalendar className="text-gray-500 mr-2" />
                                                    <input
                                                        type="date"
                                                        value={dates.startDate}
                                                        onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                                                        className="w-full focus:outline-none"
                                                        min={new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <label className="text-xs font-semibold text-gray-500">CHECKOUT</label>
                                                <div className="flex items-center">
                                                    <FiCalendar className="text-gray-500 mr-2" />
                                                    <input
                                                        type="date"
                                                        value={dates.endDate}
                                                        onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                                                        className="w-full focus:outline-none"
                                                        min={dates.startDate || new Date().toISOString().split('T')[0]}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border rounded-lg p-3">
                                            <label className="text-xs font-semibold text-gray-500">GUESTS</label>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <FiUser className="text-gray-500 mr-2" />
                                                    <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => setGuests(Math.max(1, guests - 1))}
                                                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                                                    >
                                                        -
                                                    </button>
                                                    <button
                                                        onClick={() => setGuests(guests + 1)}
                                                        className="w-8 h-8 rounded-full border flex items-center justify-center"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleBooking}
                                        className="w-full bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 rounded-lg hover:from-rose-600 hover:to-rose-700 transition"
                                    >
                                        Reserve
                                    </button>

                                    <div className="mt-4 text-center text-sm text-gray-500">
                                        You won't be charged yet
                                    </div>

                                    {dates.startDate && dates.endDate && (
                                        <div className="mt-6 space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 underline">Rs. {listing.pricePerNight} × {calculateNights()} nights</span>
                                                <span>Rs. {listing.pricePerNight * calculateNights()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 underline">Cleaning fee</span>
                                                <span>Rs. 500</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600 underline">Service fee</span>
                                                <span>Rs. 300</span>
                                            </div>
                                            <div className="border-t pt-3 mt-3 flex justify-between font-semibold">
                                                <span>Total</span>
                                                <span>Rs. {calculateTotal() + 800}</span>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">Complete your booking</h2>

                            <div className="mb-6 space-y-2">
                                <p className="font-medium">{listing.title}</p>
                                <p className="text-gray-600 text-sm">{listing.location}</p>
                                <p className="text-gray-600 text-sm">
                                    {new Date(dates.startDate).toLocaleDateString()} - {new Date(dates.endDate).toLocaleDateString()} · {calculateNights()} nights
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                                <div className="border rounded-lg p-3 flex items-center">
                                    <FiCreditCard className="text-gray-500 mr-3" size={20} />
                                    <span>Credit or Debit Card</span>
                                </div>
                            </div>

                            <div className="border-t pt-4 mb-6">
                                <div className="flex justify-between mb-2">
                                    <span className="text-gray-600">Total</span>
                                    <span className="font-semibold">Rs. {calculateTotal() + 800}</span>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowPaymentModal(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmPayment}
                                    className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700"
                                >
                                    Confirm Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



// //chatgpt
// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export default function ListingDetail() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [listing, setListing] = useState(null);
//     const [alreadyBooked, setAlreadyBooked] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');

//     useEffect(() => {
//         const fetchListing = async () => {
//             try {
//                 const res = await fetch(`http://localhost:5001/api/listings/${id}`);
//                 const data = await res.json();
//                 if (!res.ok) throw new Error(data.error || 'Listing not found');
//                 setListing(data.listing);
//             } catch {
//                 toast.error('Failed to load listing');
//                 navigate('/browse');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const checkBooking = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) return;
//             try {
//                 const res = await fetch(`http://localhost:5001/api/orders/my-bookings`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 const data = await res.json();
//                 const isBooked = data.orders.some(order => order.listingId === id || order.listingId?._id === id);
//                 setAlreadyBooked(isBooked);
//             } catch (err) {
//                 console.error('Booking check failed:', err);
//             }
//         };

//         fetchListing();
//         checkBooking();
//     }, [id, navigate]);

//     const handleBooking = async () => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             toast.error('You must be logged in to book');
//             return;
//         }

//         if (!startDate || !endDate) {
//             toast.error('Please select start and end dates.');
//             return;
//         }

//         try {
//             const res = await fetch(`http://localhost:5001/api/orders/checkout`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     listingId: id,
//                     amount: listing.pricePerNight,
//                     startDate,
//                     endDate,
//                 }),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 toast.error(data.message || data.error || 'Booking failed');
//                 return;
//             }

//             setAlreadyBooked(true);
//             toast.success('Booking successful!');
//         } catch (err) {
//             console.error('Booking error:', err);
//             toast.error('An error occurred while booking.');
//         }
//     };

//     if (loading || !listing) return <p className="p-6">Loading...</p>;

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 underline">← Back</button>

//             {alreadyBooked && (
//                 <p className="text-red-600 mb-4 font-medium">You have already booked this listing.</p>
//             )}

//             <img
//                 src={listing.images?.[0] || 'https://via.placeholder.com/600x400'}
//                 alt={listing.title}
//                 className="w-full h-64 object-cover rounded mb-4"
//             />
//             <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
//             <p className="text-gray-600 mb-1"><strong>Location:</strong> {listing.location}</p>
//             <p className="text-gray-600 mb-1"><strong>Price:</strong> Rs. {listing.pricePerNight} / night</p>
//             <p className="text-gray-700 mb-3"><strong>Description:</strong> {listing.description}</p>
//             <p className="text-sm text-gray-500 mb-6">Hosted by: {listing.host?.name || 'Unknown'}</p>

//             {!alreadyBooked && (
//                 <div className="space-y-4">
//                     <div className="flex gap-4">
//                         <input
//                             type="date"
//                             value={startDate}
//                             onChange={(e) => setStartDate(e.target.value)}
//                             className="border p-2 rounded"
//                         />
//                         <input
//                             type="date"
//                             value={endDate}
//                             onChange={(e) => setEndDate(e.target.value)}
//                             className="border p-2 rounded"
//                         />
//                     </div>

//                     <button
//                         onClick={handleBooking}
//                         className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
//                     >
//                         Book Now
//                     </button>
//                 </div>
//             )}
//         </div>
//     );
// }