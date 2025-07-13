

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateListingPage() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        pricePerNight: '',
        images: '', // comma-separated image URLs
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Convert image string to array
        const payload = {
            ...formData,
            pricePerNight: parseFloat(formData.pricePerNight),
            images: formData.images
                ? formData.images.split(',').map((img) => img.trim())
                : [],
        };

        try {
            const res = await fetch('http://localhost:5001/api/listings/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to create listing');
            setSuccess('Listing created successfully!');
            navigate('/host-dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Create your listing</h2>
                        <div className="w-10 h-10 rounded-full bg-airbnb-pink flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {['title', 'description', 'location', 'pricePerNight'].map((field) => (
                            <div key={field} className="space-y-1">
                                <label className="block text-sm font-medium text-gray-700 capitalize">
                                    {field.replace(/([A-Z])/g, ' $1')}
                                </label>
                                {field === 'description' ? (
                                    <textarea
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-pink focus:border-transparent"
                                    />
                                ) : (
                                    <input
                                        type={field === 'pricePerNight' ? 'number' : 'text'}
                                        name={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-pink focus:border-transparent"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Image URLs</label>
                            <p className="text-xs text-gray-500 mb-1">Add comma-separated URLs of your property images</p>
                            <input
                                type="text"
                                name="images"
                                value={formData.images}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-airbnb-pink focus:border-transparent"
                                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-airbnb-pink hover:bg-airbnb-pink-dark text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
                            >
                                Create listing
                            </button>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm">
                                {success}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
