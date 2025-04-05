"use client"
import { useState } from 'react';
import { Search, MapPin, Bed, DollarSign, Filter } from 'lucide-react';

export default function MainHero() {
    // Search form state
    const [propertyStatus, setPropertyStatus] = useState('all');
    const [searchParams, setSearchParams] = useState({
        propertyType: '',
        location: '',
        bedrooms: '',
        maxPrice: ''
    });

    // Handle input changes
    const handleInputChange = (field: any, value: any) => {
        setSearchParams(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Handle search submission
    const handleSearch = (e: any) => {
        e.preventDefault();
        console.log('Search params:', { propertyStatus, ...searchParams });
        // Implement actual search logic here
    };

    return (
        <div className="relative w-full h-screen min-h-[600px] max-h-[800px]">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-[#348b8b]/80 to-blue-800/50 z-10" />
                <img
                    src="/property.jpg"
                    alt="Luxury Real Estate"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Hero Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center px-4 md:px-8">
                <div className="max-w-5xl mx-auto text-center space-y-6 mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in">
                        Make smarter decisions
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto animate-fade-in-delay">
                        From buying and selling to real-time profit tracking, Realvista is your one-stop real estate solution.

                    </p>
                </div>

                {/* Search Container */}
                <div className="w-full max-w-6xl mx-auto animate-rise-up">
                    {/* Property Status Tabs */}
                    <div className="flex justify-center mb-2">
                        <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-t-lg overflow-hidden">
                            {[
                                { value: 'all', label: 'All Properties' },
                                { value: 'rent', label: 'For Rent' },
                                { value: 'sale', label: 'For Sale' },
                                { value: 'new', label: 'New Listings' }
                            ].map((status) => (
                                <button
                                    key={status.value}
                                    onClick={() => setPropertyStatus(status.value)}
                                    className={`px-6 py-3 text-sm md:text-base font-medium transition-all duration-200 ${propertyStatus === status.value
                                        ? 'bg-white text-[#348b8b]'
                                        : 'bg-white/20 text-white hover:bg-white/30'
                                        }`}
                                >
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Form */}
                    <div className="bg-white rounded-lg shadow-2xl px-4 flex justify-center items-center overflow-hidden">
                        <form onSubmit={handleSearch} className="p-1">
                            <div className="grid grid-cols-3 md:grid-cols-3 items-center lg:grid-cols-5 gap-1">
                                {/* Property Type */}
                                <div className="lg:col-span-1 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">PROPERTY TYPE</label>
                                    <div className="relative">
                                        <select
                                            value={searchParams.propertyType}
                                            onChange={(e) => handleInputChange('propertyType', e.target.value)}
                                            className="w-full pl-10 pr-3 py-2 appearance-none bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-700"
                                        >
                                            <option value="">Any Type</option>
                                            <option value="house">House</option>
                                            <option value="apartment">Apartment</option>
                                            <option value="condo">Condo</option>
                                            <option value="villa">Villa</option>
                                            <option value="land">Land</option>
                                            <option value="commercial">Commercial</option>
                                        </select>
                                        <Filter className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#348b8b]" />
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="lg:col-span-1 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">LOCATION</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Enter location"
                                            value={searchParams.location}
                                            onChange={(e) => handleInputChange('location', e.target.value)}
                                            className="w-full pl-10 pr-3 py-3 bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-700"
                                        />
                                        <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#348b8b]" />
                                    </div>
                                </div>

                                {/* Bedrooms */}
                                <div className="lg:col-span-1 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">BEDROOMS</label>
                                    <div className="relative">
                                        <select
                                            value={searchParams.bedrooms}
                                            onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                                            className="w-full pl-10 pr-3 py-3 appearance-none bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-700"
                                        >
                                            <option value="">Any</option>
                                            <option value="1">1+</option>
                                            <option value="2">2+</option>
                                            <option value="3">3+</option>
                                            <option value="4">4+</option>
                                            <option value="5">5+</option>
                                        </select>
                                        <Bed className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#348b8b]" />
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="lg:col-span-1 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">MAX PRICE</label>
                                    <div className="relative">
                                        <select
                                            value={searchParams.maxPrice}
                                            onChange={(e) => handleInputChange('maxPrice', e.target.value)}
                                            className="w-full pl-10 pr-3 py-3 appearance-none bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-700"
                                        >
                                            <option value="">No Max</option>
                                            <option value="100000">$100,000</option>
                                            <option value="250000">$250,000</option>
                                            <option value="500000">$500,000</option>
                                            <option value="750000">$750,000</option>
                                            <option value="1000000">$1,000,000</option>
                                            <option value="2000000">$2,000,000+</option>
                                        </select>
                                        <DollarSign className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#348b8b]" />
                                    </div>
                                </div>

                                {/* Search Button */}
                                <div className="lg:col-span-1 p-1">
                                    <button
                                        type="submit"
                                        className="w-full h-max bg-[#348b8b] text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                                    >
                                        <Search className="w-5 h-5" />
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Optional: Advanced Filters Trigger */}
                    <div className="flex justify-center mt-4">
                        <button className="text-white text-sm flex items-center space-x-1 opacity-80 hover:opacity-100 transition-opacity">
                            <Filter className="w-4 h-4" />
                            <span>Advanced Filters</span>
                        </button>
                    </div>
                </div>

                {/* Optional: Property Stats */}
                <div className="flex justify-center mt-12 animate-fade-in-delay">
                    <div className="grid grid-cols-4 gap-6 md:gap-12">
                        {[
                            { label: "Properties", value: "13,500+" },
                            { label: "Cities", value: "120+" },
                            { label: "Happy Clients", value: "8,200+" },
                            { label: "Agents", value: "350+" }
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                                <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Optional: Floating Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-3 bg-white rounded-full animate-scroll" />
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInDelay {
          0% { opacity: 0; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes riseUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          30% { opacity: 1; }
          60% { opacity: 0; }
          100% { transform: translateY(6px); opacity: 0; }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fadeInDelay 2s ease-out forwards;
        }
        
        .animate-rise-up {
          animation: riseUp 1s ease-out forwards;
        }
        
        .animate-scroll {
          animation: scroll 2s infinite;
        }
      `}</style>
        </div>
    );
}