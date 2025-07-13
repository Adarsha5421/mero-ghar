


// //deepseek design amazint
// import { useEffect, useState } from 'react';
// import toast from 'react-hot-toast';
// import { FiSearch, FiHeart, FiMapPin, FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// export default function BrowseListings() {
//     const [listings, setListings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [bookedListingIds, setBookedListingIds] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedListing, setSelectedListing] = useState(null);
//     const [locationFilter, setLocationFilter] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [favorites, setFavorites] = useState([]);

//     const fetchListings = async (pageNum = 1) => {
//         setLoading(true);
//         try {
//             const res = await fetch(`http://localhost:5001/api/listings?page=${pageNum}&limit=12`);
//             const data = await res.json();
//             setListings(data.listings || []);
//             setPage(data.page);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             toast.error('Failed to load listings.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchListings(page);
//     }, []);

//     useEffect(() => {
//         fetchListings(1);
//     }, [locationFilter, minPrice, maxPrice]);

//     const handleBooking = async (listing) => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             toast.error('You must be logged in to book');
//             return;
//         }

//         try {
//             const res = await fetch('http://localhost:5001/api/orders/checkout', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     listingId: listing._id,
//                     amount: listing.pricePerNight,
//                 }),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 toast.error(data.message || data.error || 'Booking failed.');
//                 return;
//             }

//             setBookedListingIds((prev) => [...prev, listing._id]);
//             toast.success(`Booking confirmed for "${listing.title}"`);
//         } catch (err) {
//             console.error('Booking error:', err);
//             toast.error('An error occurred while booking.');
//         }
//     };

//     const handleNext = () => {
//         if (page < totalPages) fetchListings(page + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) fetchListings(page - 1);
//     };

//     const toggleFavorite = (listingId) => {
//         if (favorites.includes(listingId)) {
//             setFavorites(favorites.filter(id => id !== listingId));
//         } else {
//             setFavorites([...favorites, listingId]);
//         }
//     };

//     const filteredListings = listings.filter((listing) => {
//         const matchesLocation = locationFilter
//             ? listing.location.toLowerCase().includes(locationFilter.toLowerCase())
//             : true;
//         const matchesMinPrice = minPrice ? listing.pricePerNight >= parseFloat(minPrice) : true;
//         const matchesMaxPrice = maxPrice ? listing.pricePerNight <= parseFloat(maxPrice) : true;
//         const matchesSearch = searchQuery
//             ? listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             listing.description?.toLowerCase().includes(searchQuery.toLowerCase())
//             : true;

//         return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesSearch;
//     });

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             {/* Search Bar */}
//             <div className="mb-8">
//                 <div className="relative max-w-md mx-auto">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FiSearch className="text-gray-400" />
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Search by title or description..."
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                 </div>
//             </div>

//             {/* Filters */}
//             <div className="mb-8 flex flex-wrap gap-4 justify-center">
//                 <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <FiMapPin className="text-gray-400" />
//                     </div>
//                     <input
//                         type="text"
//                         placeholder="Location"
//                         value={locationFilter}
//                         onChange={(e) => setLocationFilter(e.target.value)}
//                         className="pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     />
//                 </div>

//                 <select
//                     className="border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={minPrice}
//                     onChange={(e) => setMinPrice(e.target.value)}
//                 >
//                     <option value="">Min Price</option>
//                     <option value="500">Rs. 500</option>
//                     <option value="1000">Rs. 1,000</option>
//                     <option value="2000">Rs. 2,000</option>
//                     <option value="5000">Rs. 5,000</option>
//                 </select>

//                 <select
//                     className="border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(e.target.value)}
//                 >
//                     <option value="">Max Price</option>
//                     <option value="2000">Rs. 2,000</option>
//                     <option value="5000">Rs. 5,000</option>
//                     <option value="10000">Rs. 10,000</option>
//                     <option value="20000">Rs. 20,000</option>
//                 </select>
//             </div>

//             {loading ? (
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//             ) : filteredListings.length === 0 ? (
//                 <div className="text-center py-12">
//                     <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
//                     <p className="mt-2 text-gray-600">Try adjusting your search or filters</p>
//                 </div>
//             ) : (
//                 <>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                         {filteredListings.map((listing) => (
//                             <div key={listing._id} className="group">
//                                 <div className="relative">
//                                     <img
//                                         // src={listing.images?.[0] || 'https://via.placeholder.com/400x250'}
//                                         src={"https://media.istockphoto.com/id/1938106570/photo/digitally-generated-domestic-bedroom-interior.jpg?s=612x612&w=0&k=20&c=bC_YWy11iWh0ZtHJIT5ia4v9QELdl94SVqDge9XNZcc="}

//                                         alt={listing.title}
//                                         className="w-full h-64 object-cover rounded-xl group-hover:opacity-90 transition duration-150"
//                                     />
//                                     <button
//                                         onClick={() => toggleFavorite(listing._id)}
//                                         className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition"
//                                     >
//                                         <FiHeart
//                                             className={`h-5 w-5 ${favorites.includes(listing._id) ? 'text-red-500 fill-red-500' : 'text-gray-700'}`}
//                                         />
//                                     </button>
//                                 </div>
//                                 <div className="mt-3">
//                                     <div className="flex justify-between items-start">
//                                         <h3 className="text-lg font-medium text-gray-900 truncate">{listing.title}</h3>
//                                         <div className="flex items-center">
//                                             <FiStar className="text-yellow-400 fill-yellow-400" />
//                                             <span className="ml-1 text-gray-700">5.0</span>
//                                         </div>
//                                     </div>
//                                     <p className="text-gray-500 mt-1 flex items-center">
//                                         <FiMapPin className="mr-1" size={14} />
//                                         <span className="truncate">{listing.location}</span>
//                                     </p>
//                                     <p className="text-gray-700 mt-1">
//                                         <span className="font-semibold">Rs. {listing.pricePerNight}</span> night
//                                     </p>
//                                     <button
//                                         onClick={() => {
//                                             setSelectedListing(listing);
//                                             setShowModal(true);
//                                         }}
//                                         disabled={bookedListingIds.includes(listing._id)}
//                                         className={`mt-3 w-full px-4 py-2 rounded-lg text-white transition ${bookedListingIds.includes(listing._id)
//                                             ? 'bg-gray-400 cursor-not-allowed'
//                                             : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600'
//                                             }`}
//                                     >
//                                         {bookedListingIds.includes(listing._id) ? 'Booked' : 'Book Now'}
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Modal */}
//                     {showModal && selectedListing && (
//                         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                             <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
//                                 <img
//                                     // src={selectedListing.images?.[0] || 'https://via.placeholder.com/400x250'}
//                                     src={"https://media.istockphoto.com/id/1938106570/photo/digitally-generated-domestic-bedroom-interior.jpg?s=612x612&w=0&k=20&c=bC_YWy11iWh0ZtHJIT5ia4v9QELdl94SVqDge9XNZcc="}
//                                     alt={selectedListing.title}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-6">
//                                     <h2 className="text-xl font-bold mb-2">{selectedListing.title}</h2>
//                                     <div className="flex items-center text-gray-600 mb-4">
//                                         <FiMapPin className="mr-1" size={14} />
//                                         <span>{selectedListing.location}</span>
//                                     </div>
//                                     <div className="mb-4">
//                                         <p className="text-lg font-semibold text-rose-500">
//                                             Rs. {selectedListing.pricePerNight} <span className="text-gray-500 text-sm font-normal">night</span>
//                                         </p>
//                                     </div>
//                                     <div className="flex justify-end space-x-3">
//                                         <button
//                                             onClick={() => setShowModal(false)}
//                                             className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//                                         >
//                                             Cancel
//                                         </button>
//                                         <button
//                                             onClick={() => {
//                                                 setShowModal(false);
//                                                 handleBooking(selectedListing);
//                                             }}
//                                             className="px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition"
//                                         >
//                                             Confirm Booking
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                         <div className="flex items-center justify-center mt-10">
//                             <button
//                                 onClick={handlePrev}
//                                 disabled={page === 1}
//                                 className={`p-2 rounded-full ${page === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
//                             >
//                                 <FiChevronLeft size={20} />
//                             </button>
//                             <div className="mx-4 flex items-center space-x-2">
//                                 {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                                     let pageNum;
//                                     if (totalPages <= 5) {
//                                         pageNum = i + 1;
//                                     } else if (page <= 3) {
//                                         pageNum = i + 1;
//                                     } else if (page >= totalPages - 2) {
//                                         pageNum = totalPages - 4 + i;
//                                     } else {
//                                         pageNum = page - 2 + i;
//                                     }

//                                     return (
//                                         <button
//                                             key={pageNum}
//                                             onClick={() => fetchListings(pageNum)}
//                                             className={`w-10 h-10 rounded-full ${page === pageNum ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
//                                         >
//                                             {pageNum}
//                                         </button>
//                                     );
//                                 })}
//                                 {totalPages > 5 && page < totalPages - 2 && (
//                                     <span className="px-2">...</span>
//                                 )}
//                                 {totalPages > 5 && page < totalPages - 2 && (
//                                     <button
//                                         onClick={() => fetchListings(totalPages)}
//                                         className={`w-10 h-10 rounded-full ${page === totalPages ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
//                                     >
//                                         {totalPages}
//                                     </button>
//                                 )}
//                             </div>
//                             <button
//                                 onClick={handleNext}
//                                 disabled={page === totalPages}
//                                 className={`p-2 rounded-full ${page === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
//                             >
//                                 <FiChevronRight size={20} />
//                             </button>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';

// export default function BrowseListings() {
//     const navigate = useNavigate();
//     const [listings, setListings] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [bookedListingIds, setBookedListingIds] = useState([]);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedListing, setSelectedListing] = useState(null);
//     const [locationFilter, setLocationFilter] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');

//     const [maxPrice, setMaxPrice] = useState('');

//     const fetchListings = async (pageNum = 1) => {
//         setLoading(true);
//         try {
//             const res = await fetch(`http://localhost:5001/api/listings?page=${pageNum}&limit=6`);
//             const data = await res.json();
//             setListings(data.listings || []);
//             setPage(data.page);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             toast.error('Failed to load listings.');
//             console.error(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchListings(page);
//     }, []);

//     useEffect(() => {
//         fetchListings(1);
//     }, [locationFilter, minPrice, maxPrice]);

//     const handleBooking = async (listing) => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             toast.error('You must be logged in to book');
//             return;
//         }

//         try {
//             const res = await fetch('http://localhost:5001/api/orders/checkout', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     listingId: listing._id,
//                     amount: listing.pricePerNight,
//                 }),
//             });

//             const data = await res.json();

//             if (!res.ok) {
//                 toast.error(data.message || data.error || 'Booking failed.');
//                 return;
//             }

//             setBookedListingIds((prev) => [...prev, listing._id]);
//             toast.success(`Booking confirmed for "${listing.title}"`);
//         } catch (err) {
//             console.error('Booking error:', err);
//             toast.error('An error occurred while booking.');
//         }
//     };

//     const handleNext = () => {
//         if (page < totalPages) fetchListings(page + 1);
//     };

//     const handlePrev = () => {
//         if (page > 1) fetchListings(page - 1);
//     };

//     const filteredListings = listings.filter((listing) => {
//         const matchesLocation = locationFilter
//             ? listing.location.toLowerCase().includes(locationFilter.toLowerCase())
//             : true;
//         const matchesMinPrice = minPrice ? listing.pricePerNight >= parseFloat(minPrice) : true;
//         const matchesMaxPrice = maxPrice ? listing.pricePerNight <= parseFloat(maxPrice) : true;
//         const matchesSearch = searchQuery
//             ? listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             listing.description?.toLowerCase().includes(searchQuery.toLowerCase())
//             : true;

//         return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesSearch;
//     });


//     return (
//         <div className="max-w-6xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Browse Listings</h1>

//             <input
//                 type="text"
//                 placeholder="Search by title or description..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="mb-4 w-full border p-2 rounded"
//             />

//             {/* Filters */}
//             <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <input
//                     type="text"
//                     placeholder="Filter by location"
//                     value={locationFilter}
//                     onChange={(e) => setLocationFilter(e.target.value)}
//                     className="border p-2 rounded w-full"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Min Price"
//                     value={minPrice}
//                     onChange={(e) => setMinPrice(e.target.value)}
//                     className="border p-2 rounded w-full"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Max Price"
//                     value={maxPrice}
//                     onChange={(e) => setMaxPrice(e.target.value)}
//                     className="border p-2 rounded w-full"
//                 />
//             </div>

//             {loading ? (
//                 <p>Loading...</p>
//             ) : filteredListings.length === 0 ? (
//                 <p>No listings match your filters.</p>
//             ) : (
//                 <>
//                     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {filteredListings.map((listing) => (
//                             <div
//                                 key={listing._id}
//                                 className="bg-white rounded shadow hover:shadow-md transition duration-200 overflow-hidden"
//                             >
//                                 <img
//                                     src={listing.images?.[0] || 'https://via.placeholder.com/400x250'}
//                                     alt={listing.title}
//                                     className="w-full h-48 object-cover"
//                                 />
//                                 <div className="p-4">
//                                     <h2 className="text-lg font-semibold">{listing.title}</h2>
//                                     <p className="text-gray-600">{listing.location}</p>
//                                     <p className="text-blue-600 font-bold">Rs. {listing.pricePerNight} / night</p>
//                                     <button
//                                         onClick={() => {
//                                             setSelectedListing(listing);
//                                             setShowModal(true);
//                                         }}
//                                         disabled={bookedListingIds.includes(listing._id)}
//                                         className={`mt-3 px-4 py-2 rounded text-white w-full ${bookedListingIds.includes(listing._id)
//                                             ? 'bg-gray-400 cursor-not-allowed'
//                                             : 'bg-blue-500 hover:bg-blue-600'
//                                             }`}
//                                     >
//                                         {bookedListingIds.includes(listing._id) ? 'Booked' : 'Book Now'}
//                                     </button>
//                                     <button
//                                         onClick={() => navigate(`/listings/${listing._id}`)}
//                                         className="mt-2 text-blue-500 underline hover:text-blue-700"
//                                     >
//                                         View Details
//                                     </button>

//                                 </div>

//                                 {showModal && selectedListing?._id === listing._id && (
//                                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                                         <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
//                                             <h2 className="text-xl font-semibold mb-4">Confirm Booking</h2>
//                                             <p className="mb-2">You're about to book:</p>
//                                             <p className="font-bold">{selectedListing.title}</p>
//                                             <p className="text-gray-600">{selectedListing.location}</p>
//                                             <p className="mt-2 text-blue-600 font-bold">
//                                                 Rs. {selectedListing.pricePerNight} / night
//                                             </p>
//                                             <div className="mt-6 flex justify-end space-x-3">
//                                                 <button
//                                                     onClick={() => setShowModal(false)}
//                                                     className="px-4 py-2 border rounded hover:bg-gray-100"
//                                                 >
//                                                     Cancel
//                                                 </button>
//                                                 <button
//                                                     onClick={() => {
//                                                         setShowModal(false);
//                                                         handleBooking(selectedListing);
//                                                     }}
//                                                     className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                                                 >
//                                                     Confirm
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                     {/* Pagination */}
//                     <div className="flex items-center justify-center gap-4 mt-8">
//                         <button
//                             onClick={handlePrev}
//                             disabled={page === 1}
//                             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                         >
//                             Previous
//                         </button>
//                         <span className="text-gray-700">Page {page} of {totalPages}</span>
//                         <button
//                             onClick={handleNext}
//                             disabled={page === totalPages}
//                             className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiSearch, FiHeart, FiMapPin, FiStar, FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';

export default function BrowseListings() {
    const navigate = useNavigate();
    const [listings, setListings] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedListing, setSelectedListing] = useState(null);
    const [locationFilter, setLocationFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [dates, setDates] = useState({
        startDate: '',
        endDate: ''
    });

    const fetchListings = async (pageNum = 1) => {
        setLoading(true);
        try {
            let url = `http://localhost:5001/api/listings?page=${pageNum}&limit=12`;
            if (dates.startDate) url += `&startDate=${dates.startDate}`;
            if (dates.endDate) url += `&endDate=${dates.endDate}`;

            const res = await fetch(url);
            const data = await res.json();
            setListings(data.listings || []);
            setPage(data.page);
            setTotalPages(data.totalPages);
        } catch (err) {
            toast.error('Failed to load listings.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings(page);
    }, [page, dates]);

    const handleBooking = async (listing) => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('You must be logged in to book');
            return;
        }

        try {
            const res = await fetch('http://localhost:5001/api/orders/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    listingId: listing._id,
                    amount: calculateTotal(listing.pricePerNight),
                    startDate: dates.startDate,
                    endDate: dates.endDate
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.message || data.error || 'Booking failed.');
                return;
            }

            toast.success(`Booking confirmed for "${listing.title}"`);
            fetchListings(page); // Refresh listings
        } catch (err) {
            console.error('Booking error:', err);
            toast.error('An error occurred while booking.');
        }
    };

    const calculateTotal = (pricePerNight) => {
        if (!dates.startDate || !dates.endDate) return pricePerNight;
        const start = new Date(dates.startDate);
        const end = new Date(dates.endDate);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        return pricePerNight * nights;
    };

    const toggleFavorite = (listingId) => {
        if (favorites.includes(listingId)) {
            setFavorites(favorites.filter(id => id !== listingId));
        } else {
            setFavorites([...favorites, listingId]);
        }
    };

    const filteredListings = listings.filter((listing) => {
        const matchesLocation = locationFilter
            ? listing.location.toLowerCase().includes(locationFilter.toLowerCase())
            : true;
        const matchesMinPrice = minPrice ? listing.pricePerNight >= parseFloat(minPrice) : true;
        const matchesMaxPrice = maxPrice ? listing.pricePerNight <= parseFloat(maxPrice) : true;
        const matchesSearch = searchQuery
            ? listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            listing.description?.toLowerCase().includes(searchQuery.toLowerCase())
            : true;

        return matchesLocation && matchesMinPrice && matchesMaxPrice && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Search Bar */}
            <div className="mb-8">
                <div className="relative max-w-md mx-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by title or description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-wrap gap-4 justify-center">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMapPin className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Location"
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    />
                </div>

                <select
                    className="border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                >
                    <option value="">Min Price</option>
                    <option value="500">Rs. 500</option>
                    <option value="1000">Rs. 1,000</option>
                    <option value="2000">Rs. 2,000</option>
                    <option value="5000">Rs. 5,000</option>
                </select>

                <select
                    className="border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                >
                    <option value="">Max Price</option>
                    <option value="2000">Rs. 2,000</option>
                    <option value="5000">Rs. 5,000</option>
                    <option value="10000">Rs. 10,000</option>
                    <option value="20000">Rs. 20,000</option>
                </select>

                <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm">
                    <FiCalendar className="text-gray-400 mr-2" />
                    <input
                        type="date"
                        placeholder="Check in"
                        value={dates.startDate}
                        onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                        className="focus:outline-none"
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <span className="mx-2">-</span>
                    <input
                        type="date"
                        placeholder="Check out"
                        value={dates.endDate}
                        onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                        className="focus:outline-none"
                        min={dates.startDate || new Date().toISOString().split('T')[0]}
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rose-500"></div>
                </div>
            ) : filteredListings.length === 0 ? (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No listings found</h3>
                    <p className="mt-2 text-gray-600">Try adjusting your search or filters</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredListings.map((listing) => (
                            <div key={listing._id} className="group">
                                <div className="relative">
                                    <img
                                        src={listing.images?.[0] || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'}
                                        alt={listing.title}
                                        className="w-full h-64 object-cover rounded-xl group-hover:opacity-90 transition duration-150"
                                        onClick={() => navigate(`/listings/${listing._id}`)}
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(listing._id);
                                        }}
                                        className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition"
                                    >
                                        <FiHeart
                                            className={`h-5 w-5 ${favorites.includes(listing._id) ? 'text-rose-500 fill-rose-500' : 'text-gray-700'}`}
                                        />
                                    </button>
                                </div>
                                <div className="mt-3">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-medium text-gray-900 truncate">{listing.title}</h3>
                                        <div className="flex items-center">
                                            <FiStar className="text-yellow-400 fill-yellow-400" />
                                            <span className="ml-1 text-gray-700">5.0</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 mt-1 flex items-center">
                                        <FiMapPin className="mr-1" size={14} />
                                        <span className="truncate">{listing.location}</span>
                                    </p>
                                    <p className="text-gray-700 mt-1">
                                        <span className="font-semibold">Rs. {listing.pricePerNight}</span> night
                                    </p>
                                    {dates.startDate && dates.endDate && (
                                        <p className="text-sm text-gray-500 mt-1">
                                            Rs. {calculateTotal(listing.pricePerNight)} total
                                        </p>
                                    )}
                                    <button
                                        onClick={() => {
                                            setSelectedListing(listing);
                                            setShowModal(true);
                                        }}
                                        className="mt-3 w-full px-4 py-2 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 transition"
                                    >
                                        Book Now
                                    </button>
                                    <button
                                        onClick={() => navigate(`/listings/${listing._id}`)}
                                        className="mt-2 px-4 py-2 bg-rose-500 text-white font-medium rounded-lg hover:bg-rose-600 transition-colors duration-200"
                                    >
                                        View details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Booking Modal */}
                    {showModal && selectedListing && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
                                <div className="p-6">
                                    <h2 className="text-xl font-bold mb-4">Confirm Your Booking</h2>

                                    <div className="mb-4">
                                        <h3 className="font-semibold">{selectedListing.title}</h3>
                                        <p className="text-gray-600">{selectedListing.location}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                                            <div className="flex items-center border rounded-lg p-2">
                                                <FiCalendar className="text-gray-500 mr-2" />
                                                <span>{new Date(dates.startDate).toLocaleDateString() || 'Not selected'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                                            <div className="flex items-center border rounded-lg p-2">
                                                <FiCalendar className="text-gray-500 mr-2" />
                                                <span>{new Date(dates.endDate).toLocaleDateString() || 'Not selected'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4 mb-6">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">Rs. {selectedListing.pricePerNight} × {calculateTotal(selectedListing.pricePerNight) / selectedListing.pricePerNight} nights</span>
                                            <span>Rs. {calculateTotal(selectedListing.pricePerNight)}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold">
                                            <span>Total</span>
                                            <span>Rs. {calculateTotal(selectedListing.pricePerNight)}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={() => setShowModal(false)}
                                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowModal(false);
                                                handleBooking(selectedListing);
                                            }}
                                            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700"
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center mt-10">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`p-2 rounded-full ${page === 1 ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                <FiChevronLeft size={20} />
                            </button>
                            <div className="mx-4 flex items-center space-x-2">
                                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                    let pageNum;
                                    if (totalPages <= 5) {
                                        pageNum = i + 1;
                                    } else if (page <= 3) {
                                        pageNum = i + 1;
                                    } else if (page >= totalPages - 2) {
                                        pageNum = totalPages - 4 + i;
                                    } else {
                                        pageNum = page - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setPage(pageNum)}
                                            className={`w-10 h-10 rounded-full ${page === pageNum ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}
                                {totalPages > 5 && page < totalPages - 2 && (
                                    <span className="px-2">...</span>
                                )}
                                {totalPages > 5 && page < totalPages - 2 && (
                                    <button
                                        onClick={() => setPage(totalPages)}
                                        className={`w-10 h-10 rounded-full ${page === totalPages ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                    >
                                        {totalPages}
                                    </button>
                                )}
                            </div>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={`p-2 rounded-full ${page === totalPages ? 'text-gray-400' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                <FiChevronRight size={20} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}