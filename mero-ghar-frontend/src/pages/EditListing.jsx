import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function EditListing() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        pricePerNight: '',
        images: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`http://localhost:5001/api/listings/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);

                setFormData({
                    title: data.listing.title || '',
                    description: data.listing.description || '',
                    location: data.listing.location || '',
                    pricePerNight: data.listing.pricePerNight || '',
                    images: data.listing.images || [],
                });
            } catch {
                toast.error('Failed to load listings');
                navigate('/host-dashboard');
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5001/api/listings/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Failed to update listing');

            toast.success('Listing updated!');
            navigate('/host-dashboard');
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    rows={4}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="pricePerNight"
                    placeholder="Price per night"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />
                {/* Optional: edit images as comma-separated URLs */}
                <input
                    type="text"
                    name="images"
                    placeholder="Image URLs (comma separated)"
                    value={formData.images.join(',')}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            images: e.target.value.split(',').map((url) => url.trim()),
                        }))
                    }
                    className="w-full border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
