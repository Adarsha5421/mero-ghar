import { useState } from 'react';
import { Link } from 'react-router-dom';

// You can fetch this data from a CMS or API, but we'll define it here for simplicity.
const faqData = [
    {
        category: 'Getting Started',
        questions: [
            { q: 'How do I create an account?', a: 'You can create an account by clicking the "Sign Up" button in the navigation bar and filling out the registration form with your name, email, and a secure password.' },
            { q: 'How do I complete my profile?', a: 'After logging in, go to your Dashboard. You will see a profile section where you can add more details about yourself, including a profile picture.' },
            { q: 'Is MeroGhar free to use?', a: 'Yes, creating an account, Browse listings, and managing your profile is completely free for guests. Hosts are subject to a small service fee upon a successful booking.' }
        ]
    },
    {
        category: 'For Guests',
        questions: [
            { q: 'How do I book a stay?', a: 'Simply browse our listings, select your desired dates on a property page, and click the "Book Now" button. You will be guided through the payment process to confirm your reservation.' },
            { q: 'What is the cancellation policy?', a: 'The cancellation policy varies by host and is displayed on each listing page. Please review it carefully before booking. Most offer a full refund if canceled within 48 hours of booking.' },
            { q: 'How can I contact the host?', a: 'Once your booking is confirmed, you will receive the host\'s contact information. You can also message them directly through our secure messaging platform via your "My Trips" page.' }
        ]
    },
    {
        category: 'For Hosts',
        questions: [
            { q: 'How do I list my property?', a: 'To become a host, navigate to the "Become a Host" link in the navbar. From there, you can create a new listing by providing details about your property, uploading photos, and setting your price.' },
            { q: 'How do I get paid?', a: 'Payments are processed securely through our platform. Payouts are sent to your linked bank account 24 hours after a guest successfully checks in.' },
            { q: 'What are the fees for hosting?', a: 'We charge a competitive 3% service fee from the host on each booking to cover processing and support costs. There are no fees for listing your property.' }
        ]
    }
];

// Reusable Accordion Item Component
const AccordionItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4 px-1"
            >
                <span className="text-md font-semibold text-gray-800">{item.q}</span>
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
            >
                <p className="pb-4 px-1 text-gray-600">
                    {item.a}
                </p>
            </div>
        </div>
    );
};


// Main Help & Documentation Page Component
export default function HelpPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [openAccordion, setOpenAccordion] = useState(null);

    const handleAccordionClick = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const filteredFaqs = faqData.map(category => ({
        ...category,
        questions: category.questions.filter(item =>
            item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.a.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);


    return (
        <div className="bg-gray-50 min-h-screen">
            {/* --- Header & Search Section --- */}
            <div className="bg-white pt-16 pb-12 text-center shadow-sm">
                <div className="max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-900">Help & Support Center</h1>
                    <p className="mt-2 text-lg text-gray-600">How can we help you today?</p>
                    <div className="mt-6 relative">
                        <input
                            type="text"
                            placeholder="Search for questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full max-w-lg mx-auto py-3 px-4 pl-12 text-md border border-gray-300 rounded-full focus:ring-2 focus:ring-rose-500 focus:border-transparent transition"
                        />
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none mx-auto max-w-lg w-full justify-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FAQ Content Section --- */}
            <div className="max-w-3xl mx-auto py-12 px-4">
                {filteredFaqs.length > 0 ? (
                    filteredFaqs.map((categoryData, categoryIndex) => (
                        <div key={categoryIndex} className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">{categoryData.category}</h2>
                            <div className="bg-white rounded-lg shadow-sm">
                                {categoryData.questions.map((item, itemIndex) => (
                                    <AccordionItem
                                        key={itemIndex}
                                        item={item}
                                        isOpen={openAccordion === `${categoryIndex}-${itemIndex}`}
                                        onClick={() => handleAccordionClick(`${categoryIndex}-${itemIndex}`)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <h3 className="text-xl font-semibold text-gray-700">No results found</h3>
                        <p className="text-gray-500 mt-2">Try searching with different keywords or check out our popular topics.</p>
                    </div>
                )}
            </div>

            {/* --- Contact Us Section --- */}
            <div className="max-w-3xl mx-auto pb-16 px-4">
                <div className="bg-white p-8 rounded-lg shadow-md text-center">
                    <h3 className="text-2xl font-bold text-gray-800">Can't find an answer?</h3>
                    <p className="text-gray-600 mt-2 mb-6">Our support team is always here to help. Get in touch with us for any questions.</p>
                    <Link
                        to="/contact"
                        className="inline-block bg-rose-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-rose-600 transform hover:scale-105 transition-transform duration-300"
                    >
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
}