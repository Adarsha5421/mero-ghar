// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function RegisterPage() {
//     const navigate = useNavigate();
//     const [form, setForm] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: 'guest',
//     });
//     const [error, setError] = useState('');

//     const handleChange = (e) =>
//         setForm({ ...form, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         try {
//             const res = await fetch('http://localhost:5001/api/auth/register', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(form),
//             });

//             const data = await res.json();
//             if (!res.ok) return setError(data.message || 'Registration failed');

//             localStorage.setItem('token', data.token);
//             localStorage.setItem('user', JSON.stringify(data.user));
//             navigate('/login');
//         } catch {
//             setError('Something went wrong');
//         }
//     };

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-100">
//             <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//                 <h2 className="text-xl font-semibold mb-4">Register on Mero-Ghar</h2>
//                 {error && <p className="text-red-600 mb-3">{error}</p>}
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Full Name"
//                         className="w-full p-2 mb-3 border rounded"
//                         onChange={handleChange}
//                         required
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         className="w-full p-2 mb-3 border rounded"
//                         onChange={handleChange}
//                         required
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         className="w-full p-2 mb-3 border rounded"
//                         onChange={handleChange}
//                         required
//                     />
//                     <select
//                         name="role"
//                         className="w-full p-2 mb-4 border rounded"
//                         onChange={handleChange}
//                     >
//                         <option value="guest">Guest</option>
//                         <option value="host">Host</option>
//                     </select>
//                     <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
//                         Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: 'guest',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError(''); // Clear error when user types
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('http://localhost:5001/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) {
                setIsLoading(false);
                return setError(data.message || 'Registration failed');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/login');
        } catch {
            setIsLoading(false);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b border-gray-200 py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div
                        className="flex items-center cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Join MeroGhar to book unique stays or list your property
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">Full Name</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                    placeholder="Full name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                    placeholder="Email address"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                    placeholder="Password (min 6 characters)"
                                    value={form.password}
                                    onChange={handleChange}
                                    minLength="6"
                                />
                            </div>
                            <div>
                                <label htmlFor="role" className="sr-only">Account Type</label>
                                <select
                                    id="role"
                                    name="role"
                                    className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-3 text-gray-900 focus:z-10 focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="guest">I want to book stays</option>
                                    <option value="host">I want to host my property</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                                required
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                I agree to the <Link to="/terms" className="text-rose-600 hover:text-rose-500">Terms</Link> and <Link to="/privacy" className="text-rose-600 hover:text-rose-500">Privacy Policy</Link>
                            </label>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`group relative flex w-full justify-center rounded-lg bg-rose-600 py-3 px-4 text-sm font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : 'Continue'}
                            </button>
                        </div>
                    </form>

                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="group relative flex w-full justify-center rounded-lg border border-gray-300 py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
