"use client"
import React, { useState, useEffect } from 'react';
import {
  Filter,
  MapPin,
  Home,
  BedDouble,
  Bath,
  SquareIcon,
  Star,
  ChevronDown,
  ChevronUp,
  Search,
  Heart,
  Building2,
  SlidersHorizontal,
  Calendar,
  DollarSign,
  X,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/config/apiClient';

// Simulated property data
const propertyData = [
  {
    id: 1,
    title: "Luxurious Beachfront Villa",
    price: 2500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    location: "Malibu, CA",
    image: "/houseone.webp",
    featured: true,
    type: "house",
    yearBuilt: 2018
  },
  {
    id: 2,
    title: "Modern Downtown Loft",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    location: "San Francisco, CA",
    image: "/housetwo.webp",
    featured: false,
    type: "apartment",
    yearBuilt: 2020
  },
  {
    id: 3,
    title: "Suburban Family Home",
    price: 650000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    location: "Seattle, WA",
    image: "/housethree.webp",
    featured: false,
    type: "house",
    yearBuilt: 2015
  },
  {
    id: 4,
    title: "Urban Penthouse",
    price: 1200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2600,
    location: "New York, NY",
    image: "/housefour.webp",
    featured: true,
    type: "condo",
    yearBuilt: 2019
  },
  {
    id: 5,
    title: "Luxury Ocean View Condo",
    price: 2500000,
    bedrooms: 4,
    bathrooms: 3,
    area: 3200,
    location: "Miami, FL",
    image: "/housefive.webp",
    featured: true,
    type: "condo",
    yearBuilt: 2021
  },
  {
    id: 6,
    title: "Downtown Artist Loft",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1800,
    location: "Austin, TX",
    image: "/housetwo.webp",
    featured: false,
    type: "apartment",
    yearBuilt: 2017
  },
  {
    id: 7,
    title: "Mountain Retreat",
    price: 880000,
    bedrooms: 3,
    bathrooms: 2,
    area: 2400,
    location: "Denver, CO",
    image: "/houseone.webp",
    featured: false,
    type: "house",
    yearBuilt: 2016
  },
  {
    id: 8,
    title: "Historic Brownstone",
    price: 1200000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2600,
    location: "Boston, MA",
    image: "/housefour.webp",
    featured: true,
    type: "house",
    yearBuilt: 1920
  }
];

// Property Card Component
const PropertyCard = ({ property }: any) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/listings/${property.id}`} className="block">
        <div className="relative">
          <div className="relative overflow-hidden" style={{ height: "240px" }}>
            <img
              src={property.image}
              alt={property.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="text-white text-2xl font-bold drop-shadow-lg">
              ${property.price.toLocaleString()}
            </div>
            {property.featured && (
              <div className="bg-[#348b8b] text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Star className="mr-1 w-4 h-4 fill-white" /> Featured
              </div>
            )}
          </div>

          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsFavorite(!isFavorite);
              }}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? 'text-[#348b8b] fill-[#348b8b]' : 'text-gray-700'}`}
              />
            </button>
            <button
              onClick={(e) => e.preventDefault()}
              className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/listings/${property.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{property.title}</h3>
        </Link>
        <div className="flex items-center mb-3">
          <MapPin className="mr-2 text-[#348b8b] w-4 h-4" />
          <span className="text-gray-600 text-sm">{property.location}</span>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">{property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center">
            <Calendar className="w-3 h-3 mr-1" /> {property.yearBuilt}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center border-t pt-4 mt-4">
          <div className="flex flex-col items-center">
            <BedDouble className="text-[#348b8b] mb-1 w-5 h-5" />
            <span className="text-xs font-medium">{property.bedrooms} BD</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="text-[#348b8b] mb-1 w-5 h-5" />
            <span className="text-xs font-medium">{property.bathrooms} BA</span>
          </div>
          <div className="flex flex-col items-center">
            <SquareIcon className="text-[#348b8b] mb-1 w-5 h-5" />
            <span className="text-xs font-medium">{property.area.toLocaleString()} SQ FT</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Filter Badge Component
const FilterBadge = ({ label, value, onRemove }: any) => (
  <div className="flex items-center bg-white rounded-full px-3 py-1 text-sm border border-gray-200 mr-2 mb-2">
    <span className="font-medium text-gray-700 mr-1">{label}:</span>
    <span className="text-[#348b8b]">{value}</span>
    <button onClick={onRemove} className="ml-1 text-gray-400 hover:text-gray-700">
      <X className="w-4 h-4" />
    </button>
  </div>
);

// Main Listings Page Component
const ListingsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    yearBuilt: ''
  });
  const [activeFilters, setActiveFilters] = useState<any>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false)
  const [listing, setListing] = useState(null)
  const [properties, setProperties] = useState(propertyData);


  useEffect(() => {
    const getListings = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/market/fetch-listed-properties/`, {
        });
        setListing(response.data)
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, []);


  useEffect(() => {
    // Apply filters when they change
    const filterProperties = () => {
      setLoading(true);
      setTimeout(() => {
        // In a real app, this would be an API call with the filters
        setLoading(false);
      }, 500);

      // Build the active filters display
      const newActiveFilters = [];
      if (filters.minPrice) newActiveFilters.push({ key: 'minPrice', label: 'Min Price', value: `$${parseInt(filters.minPrice).toLocaleString()}` });
      if (filters.maxPrice) newActiveFilters.push({ key: 'maxPrice', label: 'Max Price', value: `$${parseInt(filters.maxPrice).toLocaleString()}` });
      if (filters.bedrooms) newActiveFilters.push({ key: 'bedrooms', label: 'Bedrooms', value: `${filters.bedrooms}+` });
      if (filters.bathrooms) newActiveFilters.push({ key: 'bathrooms', label: 'Bathrooms', value: `${filters.bathrooms}+` });
      if (filters.propertyType) newActiveFilters.push({ key: 'propertyType', label: 'Type', value: filters.propertyType.charAt(0).toUpperCase() + filters.propertyType.slice(1) });
      if (filters.yearBuilt) newActiveFilters.push({ key: 'yearBuilt', label: 'Year', value: `Since ${filters.yearBuilt}` });

      setActiveFilters(newActiveFilters);
    };

    filterProperties();
  }, [filters]);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveFilter = (filterKey: any) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: ''
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      yearBuilt: ''
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#348b8b] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-xl opacity-90 mb-8">Discover the perfect property that matches your lifestyle and preferences.</p>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-10">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path d="M30,60 L50,30 L70,60 L50,90 Z" fill="#ffffff" />
            <path d="M80,40 L100,10 L120,40 L100,70 Z" fill="#ffffff" />
            <path d="M130,60 L150,30 L170,60 L150,90 Z" fill="#ffffff" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search by location, neighborhood, or property"
                className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:border-[#348b8b] focus:ring-1 focus:ring-[#348b8b] focus:outline-none transition-colors shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-[#348b8b] text-white p-4 rounded-lg hover:bg-[#2d7a7a] transition-colors flex items-center justify-center shadow-sm"
            >
              <SlidersHorizontal className="mr-2" />
              <span>Filters</span>
              {activeFilters.length > 0 && (
                <span className="ml-2 bg-white text-[#348b8b] rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap items-center">
                {activeFilters.map((filter: any) => (
                  <FilterBadge
                    key={filter.key}
                    label={filter.label}
                    value={filter.value}
                    onRemove={() => handleRemoveFilter(filter.key)}
                  />
                ))}
                <button
                  onClick={handleClearAllFilters}
                  className="text-sm text-[#348b8b] hover:text-[#2d7a7a] font-medium ml-2"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Expandable Filter Section */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Min Price</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="number"
                          name="minPrice"
                          value={filters.minPrice}
                          onChange={handleFilterChange}
                          placeholder="Min"
                          className="w-full p-2 pl-10 border rounded-lg focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b] outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Max Price</label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                          type="number"
                          name="maxPrice"
                          value={filters.maxPrice}
                          onChange={handleFilterChange}
                          placeholder="Max"
                          className="w-full p-2 pl-10 border rounded-lg focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b] outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Bedrooms</label>
                      <select
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-lg appearance-none bg-select-arrow bg-no-repeat bg-[right_0.75rem_center] pr-8 focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b] outline-none transition-colors"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Bathrooms</label>
                      <select
                        name="bathrooms"
                        value={filters.bathrooms}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-lg appearance-none bg-select-arrow bg-no-repeat bg-[right_0.75rem_center] pr-8 focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b] outline-none transition-colors"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Property Type</label>
                      <select
                        name="propertyType"
                        value={filters.propertyType}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-lg appearance-none bg-select-arrow bg-no-repeat bg-[right_0.75rem_center] pr-8 focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b] outline-none transition-colors"
                      >
                        <option value="">All Types</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="townhouse">Townhouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">Year Built</label>
                      <select
                        name="yearBuilt"
                        value={filters.yearBuilt}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-lg appearance-none bg-select-arrow bg-no-repeat bg-[right_0.75rem_center] pr-8 focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b] outline-none transition-colors"
                      >
                        <option value="">Any Year</option>
                        <option value="2020">2020 or newer</option>
                        <option value="2015">2015 or newer</option>
                        <option value="2010">2010 or newer</option>
                        <option value="2000">2000 or newer</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleClearAllFilters}
                      className="text-gray-600 hover:text-gray-800 mr-4"
                    >
                      Clear Filters
                    </button>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="bg-[#348b8b] text-white px-6 py-2 rounded-lg hover:bg-[#2d7a7a] transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Results summary and sort controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-gray-800">
              {loading ? 'Finding properties...' : `${properties.length} Properties Available`}
            </h2>
            <p className="text-gray-600 text-sm">Showing all available properties</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-[#348b8b] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-[#348b8b] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b]"
              >
                <option value="newest">Newest</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="beds">Most Bedrooms</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#348b8b]"></div>
          </div>
        ) : (
          <>
            {/* Listings Grid */}
            <div className={`${viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
              }`}>
              {propertyData.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-16">
              <button className="bg-[#348b8b] text-white px-8 py-3 rounded-lg hover:bg-[#2d7a7a] transition-colors shadow-sm flex items-center">
                Load More Properties
                <ChevronDown className="ml-2" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;