

// // import { useEffect, useState } from 'react';
// // import toast from 'react-hot-toast';

// // export default function AdminDashboard() {
// //     const token = localStorage.getItem('token');
// //     const [users, setUsers] = useState([]);
// //     const [listings, setListings] = useState([]);
// //     const [bookings, setBookings] = useState([]);
// //     const [analytics, setAnalytics] = useState({});
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         const fetchAdminData = async () => {
// //             try {
// //                 const [usersRes, listingsRes, bookingsRes, analyticsRes] = await Promise.all([
// //                     fetch('http://localhost:5001/api/admin/users', { headers: { Authorization: `Bearer ${token}` } }),
// //                     fetch('http://localhost:5001/api/admin/listings', { headers: { Authorization: `Bearer ${token}` } }),
// //                     fetch('http://localhost:5001/api/admin/bookings', { headers: { Authorization: `Bearer ${token}` } }),
// //                     fetch('http://localhost:5001/api/admin/analytics', { headers: { Authorization: `Bearer ${token}` } }),
// //                 ]);

// //                 const [usersData, listingsData, bookingsData, analyticsData] = await Promise.all([
// //                     usersRes.json(), listingsRes.json(), bookingsRes.json(), analyticsRes.json()
// //                 ]);

// //                 setUsers(usersData.users);
// //                 setListings(listingsData.listings);
// //                 setBookings(bookingsData.orders);
// //                 setAnalytics(analyticsData);
// //             } catch (err) {
// //                 toast.error('Failed to load admin data');
// //                 console.error(err);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchAdminData();
// //     }, []);

// //     const handleDeleteUser = async (userId) => {
// //         const confirm = window.confirm('Are you sure you want to delete this user?');
// //         if (!confirm) return;

// //         try {
// //             const res = await fetch(`http://localhost:5001/api/admin/users/${userId}`, {
// //                 method: 'DELETE',
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });

// //             const data = await res.json();
// //             if (!res.ok) throw new Error(data.error || 'Delete failed');

// //             toast.success('User deleted');
// //             setUsers(users.filter(user => user._id !== userId));
// //         } catch (err) {
// //             console.error(err);
// //             toast.error('Failed to delete user');
// //         }
// //     };
// //     const handleDeleteBooking = async (bookingId) => {
// //         const confirm = window.confirm('Are you sure you want to delete this booking?');
// //         if (!confirm) return;

// //         try {
// //             const res = await fetch(`http://localhost:5001/api/admin/bookings/${bookingId}`, {
// //                 method: 'DELETE',
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });

// //             const data = await res.json();
// //             if (!res.ok) throw new Error(data.error || 'Delete failed');

// //             toast.success('Booking deleted');
// //             setBookings(bookings.filter(booking => booking._id !== bookingId));
// //         } catch (err) {
// //             console.error(err);
// //             toast.error('Failed to delete booking');
// //         }
// //     };

// //     const fetchAnalytics = async () => {
// //         try {
// //             const res = await fetch('http://localhost:5001/api/admin/analytics', {
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });
// //             const data = await res.json();
// //             setAnalytics(data);
// //         } catch (err) {
// //             console.error('Failed to fetch analytics', err);
// //         }
// //     };

// //     fetchAnalytics();



// //     const handleDeleteListing = async (listingId) => {
// //         const confirm = window.confirm('Are you sure you want to delete this listing?');
// //         if (!confirm) return;

// //         try {
// //             const res = await fetch(`http://localhost:5001/api/admin/listings/${listingId}`, {
// //                 method: 'DELETE',
// //                 headers: { Authorization: `Bearer ${token}` },
// //             });

// //             const data = await res.json();
// //             if (!res.ok) throw new Error(data.error || 'Delete failed');

// //             toast.success('Listing deleted');
// //             setListings(listings.filter(listing => listing._id !== listingId));
// //         } catch (err) {
// //             console.error(err);
// //             toast.error('Failed to delete listing');
// //         }
// //     };



// //     if (loading) return <p className="p-6">Loading admin dashboard...</p>;

// //     return (
// //         <div className="max-w-6xl mx-auto p-6 space-y-8">
// //             <h1 className="text-3xl font-bold mb-6">Admin Dashboard 🛠️</h1>

// //             {/* Analytics Summary */}
// //             <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //                 {Object.entries(analytics).map(([key, value]) => (
// //                     <div key={key} className="bg-gray-100 p-4 rounded shadow text-center">
// //                         <p className="text-xl font-semibold">{value}</p>
// //                         <p className="text-gray-600 capitalize">{key}</p>
// //                     </div>
// //                 ))}
// //             </section>'
// //             {/* Users Section */}
// //             <section>
// //                 <h2 className="text-xl font-semibold mb-3">All Users</h2>
// //                 {users.length === 0 ? (
// //                     <p>No users found.</p>
// //                 ) : (
// //                     <ul className="space-y-3">
// //                         {users.map((user) => (
// //                             <li key={user._id} className="bg-white border rounded p-4 shadow-sm flex items-center justify-between">
// //                                 <div>
// //                                     <p className="font-medium">{user.name} ({user.email})</p>
// //                                     <p className="text-sm text-gray-600">Role: {user.role}</p>
// //                                 </div>
// //                                 <button
// //                                     onClick={() => handleDeleteUser(user._id)}
// //                                     className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 )}
// //             </section>
// //             {/* Listings Section */}
// //             <section className="mt-10">
// //                 <h2 className="text-xl font-semibold mb-3">All Listings</h2>
// //                 {listings.length === 0 ? (
// //                     <p>No listings found.</p>
// //                 ) : (
// //                     <ul className="space-y-3">
// //                         {listings.map((listing) => (
// //                             <li key={listing._id} className="bg-gray-50 p-4 rounded border flex items-center justify-between">
// //                                 <div>
// //                                     <p className="font-medium text-lg">{listing.title}</p>
// //                                     <p className="text-sm text-gray-600">{listing.location}</p>
// //                                     <p className="text-sm text-gray-500">Host: {listing.host?.name} ({listing.host?.email})</p>
// //                                 </div>
// //                                 <button
// //                                     onClick={() => handleDeleteListing(listing._id)}
// //                                     className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 )}
// //             </section>



// //             {/* Bookings Section */}
// //             <section className="mt-10">
// //                 <h2 className="text-xl font-semibold mb-3">All Bookings</h2>
// //                 {bookings.length === 0 ? (
// //                     <p>No bookings found.</p>
// //                 ) : (
// //                     <ul className="space-y-3">
// //                         {bookings.map((order) => (
// //                             <li key={order._id} className="bg-white p-4 rounded border shadow-sm flex justify-between items-center">
// //                                 <div>
// //                                     <p className="font-medium">Listing: {order.listingId?.title || 'Deleted Listing'}</p>
// //                                     <p className="text-sm text-gray-600">Guest: {order.user?.name} ({order.user?.email})</p>
// //                                     <p className="text-sm text-gray-700">Amount: Rs. {order.amount}</p>
// //                                     <p className="text-sm text-gray-500">Status: {order.status}</p>
// //                                 </div>
// //                                 <button
// //                                     onClick={() => handleDeleteBooking(order._id)}
// //                                     className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
// //                                 >
// //                                     Delete
// //                                 </button>
// //                             </li>
// //                         ))}
// //                     </ul>
// //                 )}
// //             </section>

// //             {/* Analytics Section */}
// //             <section className="mb-10">
// //                 <h2 className="text-xl font-semibold mb-3">📊 Site Analytics</h2>
// //                 {analytics ? (
// //                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
// //                         <div className="bg-blue-100 p-4 rounded">
// //                             <p className="text-sm text-gray-600">Total Users</p>
// //                             <p className="text-2xl font-bold">{analytics.users}</p>
// //                         </div>
// //                         <div className="bg-green-100 p-4 rounded">
// //                             <p className="text-sm text-gray-600">Hosts</p>
// //                             <p className="text-2xl font-bold">{analytics.hosts}</p>
// //                         </div>
// //                         <div className="bg-yellow-100 p-4 rounded">
// //                             <p className="text-sm text-gray-600">Guests</p>
// //                             <p className="text-2xl font-bold">{analytics.guests}</p>
// //                         </div>
// //                         <div className="bg-purple-100 p-4 rounded">
// //                             <p className="text-sm text-gray-600">Listings</p>
// //                             <p className="text-2xl font-bold">{analytics.listings}</p>
// //                         </div>
// //                         <div className="bg-red-100 p-4 rounded">
// //                             <p className="text-sm text-gray-600">Bookings</p>
// //                             <p className="text-2xl font-bold">{analytics.bookings}</p>
// //                         </div>
// //                     </div>
// //                 ) : (
// //                     <p>Loading analytics...</p>
// //                 )}
// //             </section>




// //             {/* Sections will be inserted below step-by-step */}
// //         </div>
// //     );
// // }



// import { useEffect, useState } from 'react';
// import {
//     Users,
//     Home,
//     Calendar,
//     TrendingUp,
//     Shield,
//     Trash2,
//     Search,
//     Filter,
//     Eye,
//     AlertTriangle,
//     Download,
//     RefreshCw,
//     ChevronDown,
//     UserCheck,
//     UserX,
//     MapPin,
//     DollarSign,
//     Clock,
//     Star,
//     BarChart3,
//     Activity
// } from 'lucide-react';

// // Mock toast function since localStorage isn't available
// const toast = {
//     success: (message) => {
//         console.log('✅ Success:', message);
//         // You could replace this with a proper toast notification
//         alert('Success: ' + message);
//     },
//     error: (message) => {
//         console.log('❌ Error:', message);
//         alert('Error: ' + message);
//     }
// };

// export default function AdminDashboard() {
//     // Use in-memory token storage for demo (replace with your auth system)
//     const token = localStorage.getItem('token');
//     const [users, setUsers] = useState([]);
//     const [listings, setListings] = useState([]);
//     const [bookings, setBookings] = useState([]);
//     const [analytics, setAnalytics] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [activeTab, setActiveTab] = useState('overview');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterRole, setFilterRole] = useState('all');
//     const [isRefreshing, setIsRefreshing] = useState(false);

//     useEffect(() => {
//         const fetchAdminData = async () => {
//             try {
//                 setLoading(true);
//                 const [usersRes, listingsRes, bookingsRes, analyticsRes] = await Promise.all([
//                     fetch('http://localhost:5001/api/admin/users', {
//                         headers: { Authorization: `Bearer ${token}` }
//                     }),
//                     fetch('http://localhost:5001/api/admin/listings', {
//                         headers: { Authorization: `Bearer ${token}` }
//                     }),
//                     fetch('http://localhost:5001/api/admin/bookings', {
//                         headers: { Authorization: `Bearer ${token}` }
//                     }),
//                     fetch('http://localhost:5001/api/admin/analytics', {
//                         headers: { Authorization: `Bearer ${token}` }
//                     }),
//                 ]);

//                 const [usersData, listingsData, bookingsData, analyticsData] = await Promise.all([
//                     usersRes.json(), listingsRes.json(), bookingsRes.json(), analyticsRes.json()
//                 ]);

//                 setUsers(usersData.users || []);
//                 setListings(listingsData.listings || []);
//                 setBookings(bookingsData.orders || []);
//                 setAnalytics(analyticsData || {});
//             } catch (err) {
//                 toast.error('Failed to load admin data');
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchAdminData();
//     }, [token]);

//     const handleRefresh = async () => {
//         setIsRefreshing(true);
//         try {
//             const analyticsRes = await fetch('http://localhost:5001/api/admin/analytics', {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             const data = await analyticsRes.json();
//             setAnalytics(data);
//             toast.success('Data refreshed successfully');
//         } catch (err) {
//             console.error('Failed to fetch analytics', err);
//             toast.error('Failed to refresh data');
//         } finally {
//             setIsRefreshing(false);
//         }
//     };

//     const handleDeleteUser = async (userId) => {
//         const confirm = window.confirm('Are you sure you want to delete this user? This action cannot be undone.');
//         if (!confirm) return;

//         try {
//             const res = await fetch(`http://localhost:5001/api/admin/users/${userId}`, {
//                 method: 'DELETE',
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.error || 'Delete failed');

//             toast.success('User deleted successfully');
//             setUsers(users.filter(user => user._id !== userId));
//         } catch (err) {
//             console.error(err);
//             toast.error('Failed to delete user');
//         }
//     };

//     const handleDeleteListing = async (listingId) => {
//         const confirm = window.confirm('Are you sure you want to delete this listing? This action cannot be undone.');
//         if (!confirm) return;

//         try {
//             const res = await fetch(`http://localhost:5001/api/admin/listings/${listingId}`, {
//                 method: 'DELETE',
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.error || 'Delete failed');

//             toast.success('Listing deleted successfully');
//             setListings(listings.filter(listing => listing._id !== listingId));
//         } catch (err) {
//             console.error(err);
//             toast.error('Failed to delete listing');
//         }
//     };

//     const handleDeleteBooking = async (bookingId) => {
//         const confirm = window.confirm('Are you sure you want to delete this booking? This action cannot be undone.');
//         if (!confirm) return;

//         try {
//             const res = await fetch(`http://localhost:5001/api/admin/bookings/${bookingId}`, {
//                 method: 'DELETE',
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.error || 'Delete failed');

//             toast.success('Booking deleted successfully');
//             setBookings(bookings.filter(booking => booking._id !== bookingId));
//         } catch (err) {
//             console.error(err);
//             toast.error('Failed to delete booking');
//         }
//     };

//     // Filter functions
//     const filteredUsers = users.filter(user => {
//         const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             user.email?.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesRole = filterRole === 'all' || user.role === filterRole;
//         return matchesSearch && matchesRole;
//     });

//     const getStatusColor = (status) => {
//         switch (status?.toLowerCase()) {
//             case 'confirmed': case 'active': return 'bg-green-100 text-green-800';
//             case 'pending': return 'bg-yellow-100 text-yellow-800';
//             case 'cancelled': case 'inactive': return 'bg-red-100 text-red-800';
//             default: return 'bg-gray-100 text-gray-800';
//         }
//     };

//     const getRoleIcon = (role) => {
//         switch (role) {
//             case 'host': return <Home className="w-4 h-4" />;
//             case 'admin': return <Shield className="w-4 h-4" />;
//             default: return <Users className="w-4 h-4" />;
//         }
//     };

//     const StatCard = ({ title, value, icon: color, subtitle, trend }) => (
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
//             <div className="flex items-center justify-between">
//                 <div>
//                     <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
//                     <p className="text-3xl font-bold text-gray-900">{value || 0}</p>
//                     {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
//                 </div>
//                 <div className={`p-3 rounded-lg ${color}`}>
//                     <Icon className="w-6 h-6 text-white" />
//                 </div>
//             </div>
//             {trend && (
//                 <div className="mt-4 flex items-center">
//                     <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
//                     <span className="text-sm text-green-600 font-medium">{trend}</span>
//                 </div>
//             )}
//         </div>
//     );

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//                 <div className="text-center">
//                     <RefreshCw className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
//                     <p className="text-lg font-medium text-gray-900">Loading Admin Dashboard...</p>
//                     <p className="text-gray-600">Please wait while we fetch your data</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Header */}
//             <div className="bg-white border-b border-gray-200">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <div className="flex justify-between items-center py-6">
//                         <div className="flex items-center space-x-4">
//                             <Shield className="w-8 h-8 text-indigo-600" />
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//                                 <p className="text-gray-600">Manage your platform with ease</p>
//                             </div>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                             <button
//                                 onClick={handleRefresh}
//                                 disabled={isRefreshing}
//                                 className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200"
//                             >
//                                 <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
//                                 <span>Refresh</span>
//                             </button>
//                             <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
//                                 <Download className="w-4 h-4" />
//                                 <span>Export</span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//                 {/* Navigation Tabs */}
//                 <div className="mb-8">
//                     <div className="border-b border-gray-200">
//                         <nav className="-mb-px flex space-x-8">
//                             {[
//                                 { id: 'overview', label: 'Overview', icon: BarChart3 },
//                                 { id: 'users', label: 'Users', icon: Users },
//                                 { id: 'listings', label: 'Listings', icon: Home },
//                                 { id: 'bookings', label: 'Bookings', icon: Calendar }
//                             ].map(tab => (
//                                 <button
//                                     key={tab.id}
//                                     onClick={() => setActiveTab(tab.id)}
//                                     className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === tab.id
//                                         ? 'border-indigo-500 text-indigo-600'
//                                         : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                                         }`}
//                                 >
//                                     <tab.icon className="w-5 h-5" />
//                                     <span>{tab.label}</span>
//                                 </button>
//                             ))}
//                         </nav>
//                     </div>
//                 </div>

//                 {/* Overview Tab */}
//                 {activeTab === 'overview' && (
//                     <div className="space-y-8">
//                         {/* Analytics Cards */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                             <StatCard
//                                 title="Total Users"
//                                 value={analytics.users}
//                                 icon={Users}
//                                 color="bg-blue-500"
//                                 subtitle="Registered members"
//                                 trend="+12% from last month"
//                             />
//                             <StatCard
//                                 title="Active Listings"
//                                 value={analytics.listings}
//                                 icon={Home}
//                                 color="bg-green-500"
//                                 subtitle="Available properties"
//                                 trend="+8% from last month"
//                             />
//                             <StatCard
//                                 title="Total Bookings"
//                                 value={analytics.bookings}
//                                 icon={Calendar}
//                                 color="bg-purple-500"
//                                 subtitle="All time bookings"
//                                 trend="+15% from last month"
//                             />
//                             <StatCard
//                                 title="Revenue"
//                                 value={`Rs. ${analytics.revenue || 5000000}`}
//                                 icon={DollarSign}
//                                 color="bg-orange-500"
//                                 subtitle="Total earnings"
//                                 trend="+23% from last month"
//                             />
//                         </div>

//                         {/* Additional Stats */}
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <StatCard
//                                 title="Hosts"
//                                 value={analytics.hosts}
//                                 icon={UserCheck}
//                                 color="bg-indigo-500"
//                                 subtitle="Property owners"
//                             />
//                             <StatCard
//                                 title="Guests"
//                                 value={analytics.guests}
//                                 icon={UserX}
//                                 color="bg-pink-500"
//                                 subtitle="Travelers"
//                             />
//                             <StatCard
//                                 title="Pending Approvals"
//                                 value={analytics.pendingBookings || 0}
//                                 icon={Clock}
//                                 color="bg-yellow-500"
//                                 subtitle="Awaiting review"
//                             />
//                         </div>
//                     </div>
//                 )}

//                 {/* Users Tab */}
//                 {activeTab === 'users' && (
//                     <div className="space-y-6">
//                         {/* Search and Filter */}
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//                             <div className="flex flex-col sm:flex-row gap-4">
//                                 <div className="flex-1 relative">
//                                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                     <input
//                                         type="text"
//                                         placeholder="Search users by name or email..."
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                         className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                     />
//                                 </div>
//                                 <div className="relative">
//                                     <select
//                                         value={filterRole}
//                                         onChange={(e) => setFilterRole(e.target.value)}
//                                         className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                                     >
//                                         <option value="all">All Roles</option>
//                                         <option value="host">Hosts</option>
//                                         <option value="guest">Guests</option>
//                                         <option value="admin">Admins</option>
//                                     </select>
//                                     <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Users List */}
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                             <div className="px-6 py-4 border-b border-gray-200">
//                                 <h3 className="text-lg font-semibold text-gray-900">
//                                     All Users ({filteredUsers.length})
//                                 </h3>
//                             </div>
//                             {filteredUsers.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                     <p className="text-gray-500">No users found matching your criteria</p>
//                                 </div>
//                             ) : (
//                                 <div className="divide-y divide-gray-200">
//                                     {filteredUsers.map((user) => (
//                                         <div key={user._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center space-x-4">
//                                                     <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
//                                                         {getRoleIcon(user.role)}
//                                                     </div>
//                                                     <div>
//                                                         <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
//                                                         <p className="text-gray-600">{user.email}</p>
//                                                         <div className="flex items-center space-x-3 mt-1">
//                                                             <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(user.role)}`}>
//                                                                 {user.role}
//                                                             </span>
//                                                             {user.createdAt && (
//                                                                 <span className="text-sm text-gray-500">
//                                                                     Joined: {new Date(user.createdAt).toLocaleDateString()}
//                                                                 </span>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200">
//                                                         <Eye className="w-5 h-5" />
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleDeleteUser(user._id)}
//                                                         className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
//                                                     >
//                                                         <Trash2 className="w-5 h-5" />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Listings Tab */}
//                 {activeTab === 'listings' && (
//                     <div className="space-y-6">
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                             <div className="px-6 py-4 border-b border-gray-200">
//                                 <h3 className="text-lg font-semibold text-gray-900">
//                                     All Listings ({listings.length})
//                                 </h3>
//                             </div>
//                             {listings.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                     <p className="text-gray-500">No listings found</p>
//                                 </div>
//                             ) : (
//                                 <div className="divide-y divide-gray-200">
//                                     {listings.map((listing) => (
//                                         <div key={listing._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex-1">
//                                                     <h4 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h4>
//                                                     <div className="flex items-center space-x-4 text-sm text-gray-600">
//                                                         <div className="flex items-center">
//                                                             <MapPin className="w-4 h-4 mr-1" />
//                                                             {listing.location}
//                                                         </div>
//                                                         <div className="flex items-center">
//                                                             <DollarSign className="w-4 h-4 mr-1" />
//                                                             ${listing.price}/night
//                                                         </div>
//                                                         {listing.host && (
//                                                             <div>
//                                                                 Host: {listing.host.name} ({listing.host.email})
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <div className="mt-2">
//                                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
//                                                             {listing.status || 'active'}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200">
//                                                         <Eye className="w-5 h-5" />
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleDeleteListing(listing._id)}
//                                                         className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
//                                                     >
//                                                         <Trash2 className="w-5 h-5" />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Bookings Tab */}
//                 {activeTab === 'bookings' && (
//                     <div className="space-y-6">
//                         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                             <div className="px-6 py-4 border-b border-gray-200">
//                                 <h3 className="text-lg font-semibold text-gray-900">
//                                     All Bookings ({bookings.length})
//                                 </h3>
//                             </div>
//                             {bookings.length === 0 ? (
//                                 <div className="text-center py-12">
//                                     <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                                     <p className="text-gray-500">No bookings found</p>
//                                 </div>
//                             ) : (
//                                 <div className="divide-y divide-gray-200">
//                                     {bookings.map((order) => (
//                                         <div key={order._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex-1">
//                                                     <h4 className="text-lg font-semibold text-gray-900 mb-2">
//                                                         {order.listingId?.title || 'Deleted Listing'}
//                                                     </h4>
//                                                     <div className="space-y-1 text-sm text-gray-600">
//                                                         <div className="flex items-center">
//                                                             <Users className="w-4 h-4 mr-2" />
//                                                             Guest: {order.user?.name} ({order.user?.email})
//                                                         </div>
//                                                         <div className="flex items-center">
//                                                             <DollarSign className="w-4 h-4 mr-2" />
//                                                             Amount: Rs. {order.amount}
//                                                         </div>
//                                                         {order.createdAt && (
//                                                             <div className="flex items-center">
//                                                                 <Clock className="w-4 h-4 mr-2" />
//                                                                 Booked: {new Date(order.createdAt).toLocaleDateString()}
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                     <div className="mt-2">
//                                                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                                                             {order.status}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex items-center space-x-2">
//                                                     <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200">
//                                                         <Eye className="w-5 h-5" />
//                                                     </button>
//                                                     <button
//                                                         onClick={() => handleDeleteBooking(order._id)}
//                                                         className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
//                                                     >
//                                                         <Trash2 className="w-5 h-5" />
//                                                     </button>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Home,
    Calendar,
    TrendingUp,
    Shield,
    Trash2,
    Search,
    Eye,
    AlertTriangle,
    Download,
    RefreshCw,
    ChevronDown,
    UserCheck,
    UserX,
    MapPin,
    DollarSign,
    Clock,
    Icon,
    BarChart3,
    Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    entityType
}) => {
    if (!isOpen) return null;

    const getEntityName = () => {
        switch (entityType) {
            case 'user': return 'user';
            case 'listing': return 'listing';
            case 'booking': return 'booking';
            default: return 'item';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                <div className="flex items-center mb-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">Confirm Deletion</h3>
                </div>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this {getEntityName()}? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

// StatCard Component
const StatCard = ({
    title,
    value,
    color,
    subtitle,
    trend
}) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value || 0}</p>
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
        </div>
        {trend && (
            <div className="mt-4 flex items-center">
                <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600 font-medium">{trend}</span>
            </div>
        )}
    </div>
);

export default function AdminDashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [users, setUsers] = useState([]);
    const [listings, setListings] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [entityToDelete, setEntityToDelete] = useState({
        type: null,
        id: null
    });

    // Fetch all admin data
    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                setLoading(true);
                const [usersRes, listingsRes, bookingsRes, analyticsRes] = await Promise.all([
                    fetch('http://localhost:5001/api/admin/users', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('http://localhost:5001/api/admin/listings', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('http://localhost:5001/api/admin/bookings', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    fetch('http://localhost:5001/api/admin/analytics', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                ]);

                // Check for errors in responses
                if (!usersRes.ok || !listingsRes.ok || !bookingsRes.ok || !analyticsRes.ok) {
                    throw new Error('Failed to fetch admin data');
                }

                const [usersData, listingsData, bookingsData, analyticsData] = await Promise.all([
                    usersRes.json(),
                    listingsRes.json(),
                    bookingsRes.json(),
                    analyticsRes.json()
                ]);

                setUsers(usersData.users || []);
                setListings(listingsData.listings || []);
                setBookings(bookingsData.orders || []);
                setAnalytics(analyticsData || {});
            } catch (err) {
                console.error('Admin data fetch error:', err);
                toast.error('Failed to load admin data');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [token]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch('http://localhost:5001/api/admin/analytics', {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error('Failed to refresh analytics');

            const data = await res.json();
            setAnalytics(data);
            toast.success('Data refreshed successfully');
        } catch (err) {
            console.error('Refresh error:', err);
            toast.error('Failed to refresh data');
        } finally {
            setIsRefreshing(false);
        }
    };

    // Open delete confirmation modal
    const openDeleteModal = (type, id) => {
        setEntityToDelete({ type, id });
    };

    // Close delete confirmation modal
    const closeDeleteModal = () => {
        setEntityToDelete({ type: null, id: null });
    };

    // Confirm and execute deletion
    const confirmDelete = async () => {
        if (!entityToDelete.id || !entityToDelete.type) return;

        try {
            let endpoint = '';
            switch (entityToDelete.type) {
                case 'user': endpoint = `users/${entityToDelete.id}`; break;
                case 'listing': endpoint = `listings/${entityToDelete.id}`; break;
                case 'booking': endpoint = `bookings/${entityToDelete.id}`; break;
                default: return;
            }

            const res = await fetch(`http://localhost:5001/api/admin/${endpoint}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Delete failed');
            }

            // Update state based on what was deleted
            switch (entityToDelete.type) {
                case 'user':
                    setUsers(users.filter(u => u._id !== entityToDelete.id));
                    break;
                case 'listing':
                    setListings(listings.filter(l => l._id !== entityToDelete.id));
                    break;
                case 'booking':
                    setBookings(bookings.filter(b => b._id !== entityToDelete.id));
                    break;
            }

            toast.success(`${entityToDelete.type.charAt(0).toUpperCase() + entityToDelete.type.slice(1)} deleted successfully`);
        } catch (err) {
            console.error('Delete error:', err);
            toast.error(`Failed to delete ${entityToDelete.type}`);
        } finally {
            closeDeleteModal();
        }
    };

    // Filter users based on search and role
    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    // Helper function to get status color
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed': case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': case 'inactive': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Helper function to get role icon
    const getRoleIcon = (role) => {
        switch (role) {
            case 'host': return <Home className="w-4 h-4" />;
            case 'admin': return <Shield className="w-4 h-4" />;
            default: return <Users className="w-4 h-4" />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900">Loading Admin Dashboard...</p>
                    <p className="text-gray-600">Please wait while we fetch your data</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={entityToDelete.type !== null}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                entityType={entityToDelete.type || ''}
            />

            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center space-x-4">
                            <Shield className="w-8 h-8 text-indigo-600" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                                <p className="text-gray-600">Manage your platform with ease</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleRefresh}
                                disabled={isRefreshing}
                                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors duration-200"
                            >
                                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                                <span>Refresh</span>
                            </button>
                            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                <Download className="w-4 h-4" />
                                <span>Export</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Navigation Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {[
                                { id: 'overview', label: 'Overview', icon: BarChart3 },
                                { id: 'users', label: 'Users', icon: Users },
                                { id: 'listings', label: 'Listings', icon: Home },
                                { id: 'bookings', label: 'Bookings', icon: Calendar }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === tab.id
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-8">
                        {/* Analytics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Total Users"
                                value={analytics.users || 0}
                                icon={Users}
                                color="bg-blue-500"
                                subtitle="Registered members"
                                trend="+12% from last month"
                            />
                            <StatCard
                                title="Active Listings"
                                value={analytics.listings || 0}
                                icon={Home}
                                color="bg-green-500"
                                subtitle="Available properties"
                                trend="+8% from last month"
                            />
                            <StatCard
                                title="Total Bookings"
                                value={analytics.bookings || 0}
                                icon={Calendar}
                                color="bg-purple-500"
                                subtitle="All time bookings"
                                trend="+15% from last month"
                            />
                            <StatCard
                                title="Revenue"
                                value={`Rs. ${analytics.revenue?.toLocaleString() || '0'}`}
                                icon={DollarSign}
                                color="bg-orange-500"
                                subtitle="Total earnings"
                                trend="+23% from last month"
                            />
                        </div>

                        {/* Additional Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <StatCard
                                title="Hosts"
                                value={analytics.hosts || 0}
                                icon={UserCheck}
                                color="bg-indigo-500"
                                subtitle="Property owners"
                            />
                            <StatCard
                                title="Guests"
                                value={analytics.guests || 0}
                                icon={UserX}
                                color="bg-pink-500"
                                subtitle="Travelers"
                            />
                            <StatCard
                                title="Pending Approvals"
                                value={analytics.pendingBookings || 0}
                                icon={Clock}
                                color="bg-yellow-500"
                                subtitle="Awaiting review"
                            />
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="space-y-6">
                        {/* Search and Filter */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search users by name or email..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        value={filterRole}
                                        onChange={(e) => setFilterRole(e.target.value)}
                                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="all">All Roles</option>
                                        <option value="host">Hosts</option>
                                        <option value="guest">Guests</option>
                                        <option value="admin">Admins</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Users List */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Users ({filteredUsers.length})
                                </h3>
                            </div>
                            {filteredUsers.length === 0 ? (
                                <div className="text-center py-12">
                                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No users found matching your criteria</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {filteredUsers.map((user) => (
                                        <div key={user._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                                        {getRoleIcon(user.role)}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
                                                        <p className="text-gray-600">{user.email}</p>
                                                        <div className="flex items-center space-x-3 mt-1">
                                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(user.role)}`}>
                                                                {user.role}
                                                            </span>
                                                            {user.createdAt && (
                                                                <span className="text-sm text-gray-500">
                                                                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/admin/users/${user._id}`)}
                                                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal('user', user._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Listings Tab */}
                {activeTab === 'listings' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Listings ({listings.length})
                                </h3>
                            </div>
                            {listings.length === 0 ? (
                                <div className="text-center py-12">
                                    <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No listings found</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {listings.map((listing) => (
                                        <div key={listing._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{listing.title}</h4>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <MapPin className="w-4 h-4 mr-1" />
                                                            {listing.location}
                                                        </div>
                                                        <div className="flex items-center">
                                                            <DollarSign className="w-4 h-4 mr-1" />
                                                            Rs. {listing.price}/night
                                                        </div>
                                                        {listing.host && (
                                                            <div>
                                                                Host: {listing.host.name} ({listing.host.email})
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                                                            {listing.status || 'active'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/listings/${listing._id}`)}
                                                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal('listing', listing._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    All Bookings ({bookings.length})
                                </h3>
                            </div>
                            {bookings.length === 0 ? (
                                <div className="text-center py-12">
                                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-500">No bookings found</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-200">
                                    {bookings.map((booking) => (
                                        <div key={booking._id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                                        {booking.listingId?.title || 'Deleted Listing'}
                                                    </h4>
                                                    <div className="space-y-1 text-sm text-gray-600">
                                                        <div className="flex items-center">
                                                            <Users className="w-4 h-4 mr-2" />
                                                            Guest: {booking.user?.name} ({booking.user?.email})
                                                        </div>
                                                        <div className="flex items-center">
                                                            <DollarSign className="w-4 h-4 mr-2" />
                                                            Amount: Rs. {booking.amount}
                                                        </div>
                                                        {booking.createdAt && (
                                                            <div className="flex items-center">
                                                                <Clock className="w-4 h-4 mr-2" />
                                                                Booked: {new Date(booking.createdAt).toLocaleDateString()}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mt-2">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                                                        className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal('booking', booking._id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}