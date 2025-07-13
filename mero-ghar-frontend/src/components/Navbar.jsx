

import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialize user state
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        setUser(userData);
        setIsAuthenticated(!!token);
    }, []);

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        navigate('/login');
        setShowUserMenu(false);
    };

    return (
        <nav className={`sticky top-0 z-50 bg-white ${isScrolled ? 'shadow-sm' : ''} transition-shadow duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center flex-shrink-0"
                        onClick={() => {
                            setShowMobileMenu(false);
                            setShowUserMenu(false);
                        }}
                    >
                        <span className="text-rose-500 text-2xl font-bold">MeroGhar</span>
                        <span className="ml-1 text-2xl">🏡</span>
                    </Link>

                    {/* Desktop Search Bar - Only shown on larger screens */}
                    <div className="hidden md:flex flex-1 max-w-md mx-4">
                        <div className="relative w-full">
                            <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                                <button className="font-medium px-3 text-sm whitespace-nowrap">Anywhere</button>
                                <span className="h-5 border-l border-gray-300"></span>
                                <button className="font-medium px-3 text-sm whitespace-nowrap">Any week</button>
                                <span className="h-5 border-l border-gray-300"></span>
                                <button className="text-gray-500 px-3 text-sm whitespace-nowrap">Add guests</button>
                                <div className="bg-rose-500 p-2 rounded-full text-white ml-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm"
                                >
                                    Log in
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm"
                                >
                                    Sign up
                                </Link>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/register"
                                    className="hidden lg:block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-full font-medium transition-colors duration-200 text-sm"
                                >
                                    Become a Host
                                </Link>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:shadow-md cursor-pointer transition-all duration-200"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center text-white font-medium">
                                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50">
                                            <Link
                                                to="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <Link
                                                to="/trips"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                My Trips
                                            </Link>
                                            <Link
                                                to="/wishlists"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Wishlists
                                            </Link>
                                            <div className="border-t border-gray-200 my-1"></div>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none transition duration-150 ease-in-out"
                        >
                            <svg
                                className={`${showMobileMenu ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${showMobileMenu ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden ${showMobileMenu ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    {!isAuthenticated ? (
                        <>
                            <Link
                                to="/login"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Log in
                            </Link>
                            <Link
                                to="/register"
                                className="block px-3 py-2 rounded-md text-base font-medium text-rose-600 hover:text-rose-800 hover:bg-rose-50"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/dashboard"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Dashboard
                            </Link>
                            <Link
                                to="/trips"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                My Trips
                            </Link>
                            <Link
                                to="/wishlists"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                                onClick={() => setShowMobileMenu(false)}
                            >
                                Wishlists
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                            >
                                Log out
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}