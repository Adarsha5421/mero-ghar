import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            navigate('/login');
        } else {
            setUser(JSON.parse(userData));
        }
    }, []);

    if (!user) return null;

    return (
        <>
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome, {user.name}!
                </h1>

                <div className="bg-white rounded p-4 shadow">
                    <p className="mb-2">
                        <strong>Role:</strong> {user.role}
                    </p>

                    {user.role === 'guest' && (
                        <p>You can browse and book homestays.</p>
                    )}

                    {user.role === 'host' && (
                        <p>You can manage your listings and view bookings.</p>
                    )}

                    {user.role === 'admin' && (
                        <p>You can view all users, listings, and orders.</p>
                    )}
                </div>


            </div>
            <div className='flex items-center justify-center'>
                <Link
                    to="/browse"
                    className="inline-flex items-center bg-rose-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-rose-600 hover:-translate-y-0.5 transform transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Browse Stays
                </Link>
            </div>
        </>

    );

}
