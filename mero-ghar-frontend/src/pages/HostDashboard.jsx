


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export default function HostDashboard() {
//     const [listings, setListings] = useState([]);
//     const [bookings, setBookings] = useState([]);
//     const [error, setError] = useState(null);
//     const [activeTab, setActiveTab] = useState('listings');

//     const user = JSON.parse(localStorage.getItem('user'));
//     const token = localStorage.getItem('token');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchListings = async () => {
//             try {
//                 const res = await fetch('http://localhost:5001/api/listings/me', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const data = await res.json();
//                 setListings(data.listings || []);
//             } catch (err) {
//                 setError('Failed to fetch listings.');
//                 console.error(err);
//             }
//         };

//         const fetchBookings = async () => {
//             try {
//                 const res = await fetch('http://localhost:5001/api/orders/host-bookings', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 const data = await res.json();
//                 setBookings(data.orders || []);
//             } catch (err) {
//                 console.error('Failed to fetch bookings for host', err);
//             }
//         };

//         fetchListings();
//         fetchBookings();
//     }, [token]);

//     const handleDelete = async (listingId) => {
//         if (!window.confirm("Are you sure you want to delete this listing?")) return;

//         try {
//             const res = await fetch(`http://localhost:5001/api/listings/${listingId}`, {
//                 method: 'DELETE',
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.error || 'Delete failed');

//             setListings(prev => prev.filter(l => l._id !== listingId));
//             toast.success('Listing deleted successfully');
//         } catch (err) {
//             console.error(err);
//             toast.error('Failed to delete listing');
//         }
//     };

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Header */}
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
//                 <div>
//                     <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
//                     <p className="text-gray-500 mt-1">Manage your listings and bookings</p>
//                 </div>
//                 <button
//                     onClick={() => navigate('/create-listing')}
//                     className="mt-4 md:mt-0 bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
//                 >
//                     Create new listing
//                 </button>
//             </div>

//             {/* Tabs */}
//             <div className="border-b border-gray-200 mb-8">
//                 <nav className="-mb-px flex space-x-8">
//                     <button
//                         onClick={() => setActiveTab('listings')}
//                         className={`${activeTab === 'listings' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
//                     >
//                         Your Listings
//                     </button>
//                     <button
//                         onClick={() => setActiveTab('bookings')}
//                         className={`${activeTab === 'bookings' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
//                     >
//                         Guest Bookings
//                     </button>
//                 </nav>
//             </div>

//             {/* Listings Section */}
//             {activeTab === 'listings' && (
//                 <section className="mb-12">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-xl font-semibold text-gray-900">Your listings ({listings.length})</h2>
//                     </div>

//                     {listings.length === 0 ? (
//                         <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
//                             <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
//                             <p className="text-gray-500 mb-4">Create your first listing to start hosting guests</p>
//                             <button
//                                 onClick={() => navigate('/create-listing')}
//                                 className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
//                             >
//                                 Create listing
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                             {listings.map((listing) => (
//                                 <div key={listing._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
//                                     <img
//                                         src={listing.images?.[0] || 'https://via.placeholder.com/400x250'}
//                                         alt={listing.title}
//                                         className="w-full h-48 object-cover"
//                                     />
//                                     <div className="p-4">
//                                         <div className="flex justify-between items-start">
//                                             <div>
//                                                 <h3 className="font-semibold text-lg text-gray-900">{listing.title}</h3>
//                                                 <p className="text-gray-600 text-sm">{listing.location}</p>
//                                             </div>
//                                             <span className="text-lg font-semibold">Rs. {listing.pricePerNight}</span>

//                                         </div>
//                                         <div className="mt-4 flex space-x-2">
//                                             <button
//                                                 onClick={() => navigate(`/listings/${listing._id}/edit`)} className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
//                                             >
//                                                 Edit
//                                             </button>
//                                             <button
//                                                 onClick={() => handleDelete(listing._id)}
//                                                 className="flex-1 bg-white border border-gray-300 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
//                                             >
//                                                 Delete
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </section>
//             )}

//             {/* Bookings Section */}
//             {activeTab === 'bookings' && (
//                 <section className="mb-12">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-xl font-semibold text-gray-900">Guest bookings ({bookings.length})</h2>
//                     </div>

//                     {bookings.length === 0 ? (
//                         <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
//                             <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
//                             <p className="text-gray-500">When guests book your listings, they'll appear here</p>
//                         </div>
//                     ) : (
//                         // <div className="bg-white shadow-sm rounded-lg overflow-hidden">
//                         //     <ul className="divide-y divide-gray-200">
//                         //         {bookings.map((order) => (
//                         //             <li key={order._id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
//                         //                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
//                         //                     <div className="mb-2 sm:mb-0">
//                         //                         <h3 className="font-medium text-gray-900">
//                         //                             Booking for {order.listingId?.title || `Listing ${order.listingId}`}
//                         //                         </h3>
//                         //                         <p className="text-sm text-gray-500">
//                         //                             Guest: {order.user?.name} • {order.user?.email}
//                         //                         </p>
//                         //                         <p><strong>Dates:</strong> {new Date(order.startDate).toLocaleDateString()} - {new Date(order.endDate).toLocaleDateString()}</p>

//                         //                     </div>
//                         //                     <div className="flex flex-col sm:items-end">
//                         //                         <span className="text-lg font-semibold text-gray-900">Rs. {order.amount}</span>
//                         //                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
//                         //                             order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                         //                                 'bg-gray-100 text-gray-800'
//                         //                             }`}>
//                         //                             {order.status}
//                         //                         </span>
//                         //                     </div>
//                         //                 </div>
//                         //             </li>
//                         //         ))}
//                         //     </ul>
//                         // </div>
//                         <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
//                             <ul className="divide-y divide-gray-100">
//                                 {bookings.map((order) => (
//                                     <li
//                                         key={order._id}
//                                         className="p-5 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
//                                         onClick={() => navigate(`/bookings/${order._id}`)} // Add click handler if needed
//                                     >
//                                         <div className="flex flex-col md:flex-row gap-4">
//                                             {/* Listing Image */}
//                                             <div className="w-full md:w-32 h-24 flex-shrink-0">
//                                                 <img
//                                                     src={order.listingId?.images?.[0] || 'https://via.placeholder.com/300'}
//                                                     alt={order.listingId?.title}
//                                                     className="w-full h-full object-cover rounded-lg"
//                                                 />
//                                             </div>

//                                             {/* Booking Details */}
//                                             <div className="flex-1">
//                                                 <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
//                                                     <div>
//                                                         <h3 className="text-lg font-semibold text-gray-900 mb-1">
//                                                             {order.listingId?.title || `Listing ${order.listingId}`}
//                                                         </h3>
//                                                         <div className="flex items-center text-sm text-gray-500 mb-2">
//                                                             <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                                                             </svg>
//                                                             <span>{order.user?.name} • {order.user?.email}</span>
//                                                         </div>

//                                                         <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
//                                                             <div className="flex items-center text-gray-700">
//                                                                 <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                                                 </svg>
//                                                                 {new Date(order.startDate).toLocaleDateString()} → {new Date(order.endDate).toLocaleDateString()}
//                                                             </div>

//                                                             <div className="flex items-center text-gray-700">
//                                                                 <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                                                 </svg>
//                                                                 {Math.ceil((new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24))} nights
//                                                             </div>
//                                                         </div>
//                                                     </div>

//                                                     {/* Price and Status */}
//                                                     <div className="flex flex-col items-end">
//                                                         <div className="text-xl font-semibold text-gray-900 mb-2">
//                                                             Rs. {order.amount.toLocaleString()}
//                                                         </div>
//                                                         <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
//                                                             order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
//                                                                 order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
//                                                                     'bg-gray-100 text-gray-800'
//                                                             }`}>
//                                                             {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Action Buttons */}
//                                                 <div className="mt-4 flex flex-wrap gap-2">
//                                                     <button
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             // Handle message action
//                                                         }}
//                                                         className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
//                                                     >
//                                                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
//                                                         </svg>
//                                                         Message Guest
//                                                     </button>

//                                                     <button
//                                                         onClick={(e) => {
//                                                             e.stopPropagation();
//                                                             // Handle view details action
//                                                         }}
//                                                         className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
//                                                     >
//                                                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                                                         </svg>
//                                                         View Details
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </section>
//             )}

//             {error && (
//                 <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//                     <div className="flex">
//                         <div className="flex-shrink-0">
//                             <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                             </svg>
//                         </div>
//                         <div className="ml-3">
//                             <p className="text-sm text-red-700">{error}</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function HostDashboard() {
    const [listings, setListings] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('listings');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [listingToDelete, setListingToDelete] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/listings/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setListings(data.listings || []);
            } catch (err) {
                setError('Failed to fetch listings.');
                console.error(err);
            }
        };

        const fetchBookings = async () => {
            try {
                const res = await fetch('http://localhost:5001/api/orders/host-bookings', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();
                setBookings(data.orders || []);
            } catch (err) {
                console.error('Failed to fetch bookings for host', err);
            }
        };

        fetchListings();
        fetchBookings();
    }, [token]);

    const openDeleteModal = (listingId) => {
        setListingToDelete(listingId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setListingToDelete(null);
    };

    const handleDelete = async () => {
        if (!listingToDelete) return;

        try {
            const res = await fetch(`http://localhost:5001/api/listings/${listingToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Delete failed');

            setListings(prev => prev.filter(l => l._id !== listingToDelete));
            toast.success('Listing deleted successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete listing');
        } finally {
            closeDeleteModal();
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Delete Listing</h3>
                        <p className="text-gray-600 mb-6">Are you sure you want to delete this listing? This action cannot be undone.</p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={closeDeleteModal}
                                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}</h1>
                    <p className="text-gray-500 mt-1">Manage your listings and bookings</p>
                </div>
                <button
                    onClick={() => navigate('/create-listing')}
                    className="mt-4 md:mt-0 bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                >
                    Create new listing
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab('listings')}
                        className={`${activeTab === 'listings' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Your Listings
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`${activeTab === 'bookings' ? 'border-rose-500 text-rose-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                        Guest Bookings
                    </button>
                </nav>
            </div>

            {/* Listings Section */}
            {activeTab === 'listings' && (
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Your listings ({listings.length})</h2>
                    </div>

                    {listings.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                            <p className="text-gray-500 mb-4">Create your first listing to start hosting guests</p>
                            <button
                                onClick={() => navigate('/create-listing')}
                                className="bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
                            >
                                Create listing
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.map((listing) => (
                                <div key={listing._id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                    <img
                                        src={listing.images?.[0] || 'https://via.placeholder.com/400x250'}
                                        alt={listing.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-900">{listing.title}</h3>
                                                <p className="text-gray-600 text-sm">{listing.location}</p>
                                            </div>
                                            <span className="text-lg font-semibold">Rs. {listing.pricePerNight}</span>
                                        </div>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                onClick={() => navigate(`/listings/${listing._id}/edit`)}
                                                className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(listing._id)}
                                                className="flex-1 bg-white border border-gray-300 text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}

            {/* Bookings Section */}
            {activeTab === 'bookings' && (
                <section className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">Guest bookings ({bookings.length})</h2>
                    </div>

                    {bookings.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                            <p className="text-gray-500">When guests book your listings, they'll appear here</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                            <ul className="divide-y divide-gray-100">
                                {bookings.map((order) => (
                                    <li
                                        key={order._id}
                                        className="p-5 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                        onClick={() => navigate(`/bookings/${order._id}`)}
                                    >
                                        <div className="flex flex-col md:flex-row gap-4">
                                            {/* Listing Image */}
                                            <div className="w-full md:w-32 h-24 flex-shrink-0">
                                                <img
                                                    src={order.listingId?.images?.[0] || 'https://via.placeholder.com/300'}
                                                    alt={order.listingId?.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>

                                            {/* Booking Details */}
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                                            {order.listingId?.title || `Listing ${order.listingId}`}
                                                        </h3>
                                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                            <span>{order.user?.name} • {order.user?.email}</span>
                                                        </div>

                                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                                                            <div className="flex items-center text-gray-700">
                                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                </svg>
                                                                {new Date(order.startDate).toLocaleDateString()} → {new Date(order.endDate).toLocaleDateString()}
                                                            </div>

                                                            <div className="flex items-center text-gray-700">
                                                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                </svg>
                                                                {Math.ceil((new Date(order.endDate) - new Date(order.startDate)) / (1000 * 60 * 60 * 24))} nights
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Price and Status */}
                                                    <div className="flex flex-col items-end">
                                                        <div className="text-xl font-semibold text-gray-900 mb-2">
                                                            Rs. {order.amount.toLocaleString()}
                                                        </div>
                                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-gray-100 text-gray-800'
                                                            }`}>
                                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // Handle message action
                                                        }}
                                                        className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                        </svg>
                                                        Message Guest
                                                    </button>

                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigate(`/bookings/${order._id}`);
                                                        }}
                                                        className="flex items-center px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </section>
            )}

            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}