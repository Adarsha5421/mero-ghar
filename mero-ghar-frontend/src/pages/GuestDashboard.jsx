// // import { useEffect, useState } from 'react';
// // import { useNavigate } from 'react-router-dom';

// // export default function GuestDashboard() {
// //     const user = JSON.parse(localStorage.getItem('user'));
// //     const token = localStorage.getItem('token');
// //     const [bookings, setBookings] = useState([]);
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         const fetchBookings = async () => {
// //             try {
// //                 const res = await fetch('http://localhost:5001/api/orders/my-bookings', {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                     },
// //                 });
// //                 const data = await res.json();
// //                 setBookings(data.orders || []);
// //             } catch (err) {
// //                 console.error('Failed to fetch bookings', err);
// //             }
// //         };

// //         fetchBookings();
// //     }, []);

// //     return (
// //         <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
// //             <h1 className="text-2xl font-bold mb-4">
// //                 Welcome, {user?.name} (Guest) 👋
// //             </h1>

// //             <div className="mb-6">
// //                 <button
// //                     onClick={() => navigate('/browse')}
// //                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
// //                 >
// //                     Browse Listings
// //                 </button>
// //             </div>

// //             <h2 className="text-lg font-semibold mb-2">Your Bookings</h2>
// //             {bookings.length === 0 ? (
// //                 <p>No bookings found.</p>
// //             ) : (
// //                 <ul className="space-y-2">
// //                     {bookings.map((order) => (
// //                         <li key={order._id} className="bg-gray-100 shadow p-4 rounded">
// //                             <p><strong>Listing ID:</strong> {order.listingId}</p>
// //                             <p><strong>Amount:</strong> Rs. {order.amount}</p>
// //                             <p><strong>Status:</strong> {order.status}</p>
// //                         </li>
// //                     ))}
// //                 </ul>
// //             )}
// //         </div>
// //     );
// // }


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function GuestDashboard() {
//     const user = JSON.parse(localStorage.getItem('user'));
//     const token = localStorage.getItem('token');
//     const [bookings, setBookings] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const res = await fetch('http://localhost:5001/api/orders/my-bookings', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const data = await res.json();
//                 setBookings(data.orders || []);
//             } catch (err) {
//                 console.error('Failed to fetch bookings', err);
//             }
//         };

//         fetchBookings();
//     }, []);

//     return (
//         <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
//             <h1 className="text-2xl font-bold mb-4">
//                 Welcome, {user?.name || 'Guest'} 👋
//             </h1>

//             <div className="mb-6">
//                 <button
//                     onClick={() => navigate('/browse')}
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
//                 >
//                     Browse Listings
//                 </button>
//             </div>

//             <h2 className="text-lg font-semibold mb-3">Your Bookings</h2>

//             {bookings.length === 0 ? (
//                 <p className="text-gray-600">No bookings found.</p>
//             ) : (
//                 <ul className="space-y-4">
//                     {bookings.map((order) => {
//                         const listing = order.listingId; // Populated with .populate()
//                         const image = listing?.images?.[0] || 'https://via.placeholder.com/400x250';
//                         const title = listing?.title || `Listing ID: ${listing?._id || order.listingId}`;
//                         const location = listing?.location || 'Unknown location';

//                         return (
//                             <li key={order._id} className="bg-gray-100 rounded shadow-md p-4 flex gap-4">
//                                 <img
//                                     src={image}
//                                     alt={title}
//                                     className="w-32 h-24 object-cover rounded"
//                                 />
//                                 <div>
//                                     <h3 className="text-lg font-semibold">{title}</h3>
//                                     <p className="text-sm text-gray-600">{location}</p>
//                                     <p className="mt-1">
//                                         <strong>Amount:</strong> Rs. {order.amount}
//                                     </p>
//                                     {order.startDate && order.endDate && (
//                                         <p className="text-sm text-gray-500">
//                                             {new Date(order.startDate).toLocaleDateString()} -{' '}
//                                             {new Date(order.endDate).toLocaleDateString()}
//                                         </p>
//                                     )}
//                                     <p className="text-sm mt-1">
//                                         <strong>Status:</strong>{' '}
//                                         <span className="text-green-700 font-medium">{order.status}</span>
//                                     </p>
//                                 </div>
//                             </li>
//                         );
//                     })}
//                 </ul>
//             )}
//         </div>
//     );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GuestDashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/orders/my-bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setBookings(data.orders || []);
            } catch (err) {
                console.error('Failed to fetch bookings', err);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Guest'}</h1>
                    <p className="text-gray-500 mt-1">Here are your upcoming trips</p>
                </div>
                <button
                    onClick={() => navigate('/browse')}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                    Find your next stay
                </button>
            </div>

            {/* Bookings Section */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your trips</h2>

                {bookings.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No trips booked...yet!</h3>
                        <p className="text-gray-500 mb-6">Time to dust off your bags and start planning your next adventure</p>
                        <button
                            onClick={() => navigate('/browse')}
                            className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
                        >
                            Start searching
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {bookings.map((order) => {
                            const listing = order.listingId;
                            const image = listing?.images?.[0] || 'https://via.placeholder.com/400x250';
                            const title = listing?.title || `Listing ID: ${listing?._id || order.listingId}`;
                            const location = listing?.location || 'Unknown location';

                            return (
                                <div key={order._id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                    <div className="flex flex-col sm:flex-row">
                                        <img
                                            src={image}
                                            alt={title}
                                            className="w-full sm:w-64 h-48 sm:h-auto object-cover"
                                        />
                                        <div className="p-6 flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
                                                    <p className="text-gray-600 mb-2">{location}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                        order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-500">Dates</p>
                                                    <p className="font-medium">
                                                        {order.startDate && order.endDate ? (
                                                            `${new Date(order.startDate).toLocaleDateString()} - ${new Date(order.endDate).toLocaleDateString()}`
                                                        ) : 'Not specified'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">Total</p>
                                                    <p className="font-medium">Rs. {order.amount}</p>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex gap-3">
                                                <button
                                                    onClick={() => navigate(`/listings/${listing._id}`)}
                                                    className="text-rose-600 hover:text-rose-800 font-medium underline"
                                                >
                                                    View listing
                                                </button>
                                                <button className="text-gray-600 hover:text-gray-800 font-medium underline">
                                                    Get directions
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Recently Viewed Section (Placeholder) */}
            <div className="mb-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recently viewed</h2>
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                    <p className="text-gray-500">Your recently viewed listings will appear here</p>
                </div>
            </div>
        </div>
    );
}