

import { ChevronLeft, ChevronRight, Heart, MapPin, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    const [currentHeroImage, setCurrentHeroImage] = useState(0);
    const [currentFeatured, setCurrentFeatured] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Hero carousel images
    const heroImages = [
        'https://picsum.photos/1920/800?random=hero1',
        'https://picsum.photos/1920/800?random=hero2',
        'https://picsum.photos/1920/800?random=hero3',
    ];

    // Categories data with icons and enhanced styling
    const categories = [
        { id: 1, name: 'Beachfront', image: 'https://picsum.photos/400/300?random=1', icon: '🏖️' },
        { id: 2, name: 'Mountain views', image: 'https://picsum.photos/400/300?random=2', icon: '🏔️' },
        { id: 3, name: 'Tiny homes', image: 'https://picsum.photos/400/300?random=3', icon: '🏠' },
        { id: 4, name: 'Luxury', image: 'https://picsum.photos/400/300?random=4', icon: '✨' },
        { id: 5, name: 'Countryside', image: 'https://picsum.photos/400/300?random=5', icon: '🌾' },
        { id: 6, name: 'City Center', image: 'https://picsum.photos/400/300?random=6', icon: '🏙️' },
    ];

    // Enhanced listings with more details
    const listings = [
        {
            id: 1,
            title: 'Modern apartment in city center',
            location: 'Kathmandu',
            price: 45,
            rating: 4.92,
            reviews: 128,
            image: 'https://picsum.photos/600/400?random=6',
            host: 'Ramesh',
            features: ['WiFi', 'Kitchen', 'AC']
        },
        {
            id: 2,
            title: 'Cozy cottage with mountain view',
            location: 'Pokhara',
            price: 65,
            rating: 4.85,
            reviews: 94,
            image: 'https://picsum.photos/600/400?random=7',
            host: 'Sita',
            features: ['Mountain View', 'Garden', 'Fireplace']
        },
        {
            id: 3,
            title: 'Luxury villa with private pool',
            location: 'Chitwan',
            price: 120,
            rating: 4.98,
            reviews: 67,
            image: 'https://picsum.photos/600/400?random=8',
            host: 'Arjun',
            features: ['Pool', 'Spa', 'Chef']
        },
        {
            id: 4,
            title: 'Traditional Newari house',
            location: 'Bhaktapur',
            price: 55,
            rating: 4.79,
            reviews: 156,
            image: 'https://picsum.photos/600/400?random=9',
            host: 'Maya',
            features: ['Heritage', 'Courtyard', 'Cultural']
        },
        {
            id: 5,
            title: 'Riverside retreat with garden',
            location: 'Bandipur',
            price: 75,
            rating: 4.91,
            reviews: 89,
            image: 'https://picsum.photos/600/400?random=10',
            host: 'Krishna',
            features: ['River View', 'Garden', 'Peaceful']
        },
        {
            id: 6,
            title: 'Himalayan lodge with panoramic views',
            location: 'Nagarkot',
            price: 95,
            rating: 4.87,
            reviews: 112,
            image: 'https://picsum.photos/600/400?random=11',
            host: 'Devi',
            features: ['Himalayan View', 'Sunrise', 'Trekking']
        }
    ];

    // Auto-rotate hero images
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Trigger animations on mount
    useEffect(() => {
        setIsVisible(true);
    }, []);

    // Featured listings carousel navigation
    const nextFeatured = () => {
        setCurrentFeatured((prev) => (prev + 1) % Math.ceil(listings.length / 3));
    };

    const prevFeatured = () => {
        setCurrentFeatured((prev) => (prev - 1 + Math.ceil(listings.length / 3)) % Math.ceil(listings.length / 3));
    };

    return (
        <div className="pb-16 overflow-x-hidden">
            {/* Enhanced Hero Section with Carousel */}
            <div className="relative h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 overflow-hidden">
                {/* Background Image Carousel */}
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentHeroImage ? 'opacity-40' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Hero ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Animated overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

                {/* Floating elements animation */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="animate-bounce absolute top-20 left-10 text-white/20 text-6xl">🏠</div>
                    <div className="animate-pulse absolute top-40 right-20 text-white/20 text-4xl">✨</div>
                    <div className="animate-bounce absolute bottom-40 left-20 text-white/20 text-5xl delay-1000">🌟</div>
                </div>

                {/* Hero content */}
                <div className="relative z-10 flex items-center justify-center h-full">
                    <div className={`text-center text-white px-4 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                        }`}>
                        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-pink-100 bg-clip-text text-transparent animate-pulse">
                            Mero-Ghar
                        </h1>
                        <div className="text-2xl md:text-4xl font-light mb-8 animate-fade-in-up">
                            <span className="inline-block animate-bounce delay-100">🏡</span>
                            <span className="ml-4">Your perfect stay awaits</span>
                        </div>
                        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
                            Discover extraordinary places to stay across the beautiful landscapes of Nepal
                        </p>
                        <div className="space-x-4">
                            <Link
                                to="/login"
                                className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl animate-pulse"
                            >
                                Start Exploring
                            </Link>
                            <Link
                                to="/create-listing"
                                className="inline-block bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 border border-white/30"
                            >
                                Become a Host
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Hero carousel indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentHeroImage(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentHeroImage ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Enhanced Categories Section with Horizontal Scroll */}
            <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
                            Browse by Category
                        </h2>
                        <p className="text-xl text-gray-600">Find your perfect type of stay</p>
                    </div>

                    <div className="overflow-x-auto scrollbar-hide pb-6">
                        <div className="flex space-x-6 w-max">
                            {categories.map((category, index) => (
                                <div
                                    key={category.id}
                                    className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="relative overflow-hidden rounded-2xl w-72 h-48 mb-4 shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-3xl mb-1">{category.icon}</div>
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg text-gray-900 text-center group-hover:text-pink-600 transition-colors duration-300">
                                        {category.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Featured Listings Carousel */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Stays</h2>
                            <p className="text-xl text-gray-600">Handpicked by our team</p>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={prevFeatured}
                                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                            >
                                <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                            </button>
                            <button
                                onClick={nextFeatured}
                                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200 group"
                            >
                                <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-gray-900" />
                            </button>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${currentFeatured * 100}%)` }}
                        >
                            {Array.from({ length: Math.ceil(listings.length / 3) }, (_, slideIndex) => (
                                <div key={slideIndex} className="w-full flex-shrink-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {listings.slice(slideIndex * 3, slideIndex * 3 + 3).map((listing) => (
                                            <Link
                                                to={`/listings/${listing.id}`}
                                                key={listing.id}
                                                className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                                            >
                                                <div className="bg-white rounded-2xl shadow-lg overflow-hidden group-hover:shadow-2xl transition-shadow duration-300">
                                                    <div className="relative overflow-hidden aspect-[4/3]">
                                                        <img
                                                            src={listing.image}
                                                            alt={listing.title}
                                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                        <div className="absolute top-4 right-4">
                                                            <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200 group">
                                                                <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
                                                            </button>
                                                        </div>
                                                        <div className="absolute bottom-4 left-4">
                                                            <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                                <span className="text-sm font-semibold">{listing.rating}</span>
                                                                <span className="text-sm text-gray-600">({listing.reviews})</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="p-6">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-pink-600 transition-colors duration-200 line-clamp-2">
                                                                {listing.title}
                                                            </h3>
                                                        </div>

                                                        <div className="flex items-center text-gray-600 mb-3">
                                                            <MapPin className="w-4 h-4 mr-1" />
                                                            <span className="text-sm">{listing.location}</span>
                                                        </div>

                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {listing.features.slice(0, 2).map((feature, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                                                >
                                                                    {feature}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div className="text-sm text-gray-500">
                                                                Hosted by {listing.host}
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="font-bold text-xl text-gray-900">
                                                                    ${listing.price}
                                                                    <span className="text-sm font-normal text-gray-500">/night</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Carousel indicators */}
                    <div className="flex justify-center mt-8 space-x-2">
                        {Array.from({ length: Math.ceil(listings.length / 3) }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentFeatured(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentFeatured ? 'bg-pink-500 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Enhanced Call to Action */}
            <div className="relative py-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full animate-bounce delay-1000"></div>
                    <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full animate-ping delay-2000"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-5xl font-bold mb-6 animate-fade-in-up">
                        Start Your Journey Today
                    </h2>
                    <p className="text-2xl mb-12 text-white/90 leading-relaxed animate-fade-in-up delay-200">
                        Whether you're looking for a place to stay or want to share your space,
                        we've got you covered.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-400">
                        <Link
                            to="/listings"
                            className="inline-block bg-white text-purple-600 font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                        >
                            Find Your Stay
                        </Link>
                        <Link
                            to="/help"
                            className="inline-block bg-transparent border-2 border-white text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-purple-600"
                        >
                           Need Help?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}