import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import HostDashboard from './pages/HostDashboard';
import GuestDashboard from './pages/GuestDashboard';
import CreateListingPage from './pages/CreateListingPage';
import PrivateRoute from './components/PrivateRoute';
import BrowseListingsPage from './pages/BrowseListingsPage';
import BrowseListings from './pages/guest-dashboard/BrowseListings';
import ListingDetailPage from './pages/ListingDetailPage';
import { Toaster } from 'react-hot-toast';
import ListingDetail from './pages/ListingDetail';
import EditListing from './pages/EditListing';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import HelpPage from './pages/HelpPage';






export default function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Navbar />
        <Routes>


          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />


          <Route path="/browse" element={<BrowseListingsPage />} />
          <Route path="/help" element={<HelpPage />} />


          <Route path="/guest-dashboard/browse" element={<BrowseListings />} />


          <Route path="/listings/:id" element={<ListingDetailPage />} />

          <Route path="/listings/:id" element={<ListingDetail />} />
          <Route path="/listings/:id/edit" element={<EditListing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />






          <Route path="/guest-dashboard" element={<ProtectedRoute><GuestDashboard /></ProtectedRoute>} />
          <Route path="/host-dashboard" element={<ProtectedRoute><HostDashboard /></ProtectedRoute>} />
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />


          <Route
            path="/create-listing"
            element={
              <PrivateRoute allowedRoles={['host']}>
                <CreateListingPage />
              </PrivateRoute>
            }
          />


        </Routes>
      </Router>
    </>
  );
}
