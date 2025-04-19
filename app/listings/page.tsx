/* eslint-disable */
"use client"
import React, { useState, useEffect } from 'react';
import {
  MapPin,
  BedDouble,
  Bath,
  SquareIcon,
  Star,
  ChevronDown,
  Search,
  Heart,
  SlidersHorizontal,
  Calendar,
  DollarSign,
  X,
  Share2
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/config/apiClient';

// Import shadcn components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define TypeScript interfaces
interface PropertyImage {
  file: string;
  id: number;
}

interface Property {
  id: number;
  title: string;
  description?: string;
  price: string;
  currency: string;
  bedrooms: number | null;
  bathrooms: number | null;
  square_feet: number | null;
  lot_size: number | null;
  year_built: number | null;
  address: string;
  city: string;
  state: string;
  zip_code?: string;
  country?: string;
  listing_purpose: string;
  property_type: string;
  listed_date: string;
  image_files: PropertyImage[];
  views: number;
}

interface FilterBadgeProps {
  label: string;
  value: string;
  onRemove: () => void;
}

interface PropertyCardProps {
  property: Property;
}

interface FilterState {
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  purpose: string;
  propertyType: string;
  yearBuilt: string;
  searchQuery: string;
}

interface ActiveFilter {
  key: keyof FilterState;
  label: string;
  value: string;
}

// Property Card Component
const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Format property price
  const formatPrice = (price: string) => {
    return parseFloat(price).toLocaleString();
  };

  // Get the first image from property image files or use a default
  const getPropertyImage = () => {
    if (property.image_files && property.image_files.length > 0) {
      return property.image_files[0].file;
    }
    return "/default-property.jpg"; // Default image if none available
  };

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    setIsLoading(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        await api.delete(`/market/remove-bookmark/${property.id}/`);
      } else {
        // Add to favorites
        await api.post(`/market/bookmark-property/${property.id}/`);
      }
      // Toggle the favorite status
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
      // Optionally show error message to user
    } finally {
      setIsLoading(false);
    }
  };

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
              src={getPropertyImage()}
              alt={property.title}
              className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="text-white text-2xl font-bold drop-shadow-lg">
              {property.currency} {formatPrice(property.price)}
            </div>
            {property.views > 100 && (
              <div className="bg-[#348b8b] text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Star className="mr-1 w-4 h-4 fill-white" /> Popular
              </div>
            )}
          </div>

          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={toggleFavorite}
              disabled={isLoading}
              className={`bg-white/90 p-2 rounded-full hover:bg-white transition-colors ${isLoading ? 'opacity-70' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-[#348b8b] rounded-full animate-spin"></div>
              ) : (
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'text-[#348b8b] fill-[#348b8b]' : 'text-gray-700'}`}
                />
              )}
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
          <span className="text-gray-600 text-sm">{property.address}, {property.city}, {property.state}</span>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-2">
            {property.property_type.charAt(0).toUpperCase() + property.property_type.slice(1)}
          </span>
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex items-center">
            <Calendar className="w-3 h-3 mr-1" /> {property.year_built || 'N/A'}
          </span>
        </div>

        <div className="grid grid-cols-4 text-center border-t pt-4 mt-4">
          {property.bedrooms !== null && (
            <div className="flex flex-col items-center">
              <BedDouble className="text-[#348b8b] mb-1 w-5 h-5" />
              <span className="text-xs font-medium">{property.bedrooms} BD</span>
            </div>
          )}
          {property.bathrooms !== null && (
            <div className="flex flex-col items-center">
              <Bath className="text-[#348b8b] mb-1 w-5 h-5" />
              <span className="text-xs font-medium">{property.bathrooms} BA</span>
            </div>
          )}
          {property.square_feet !== null && (
            <div className="flex flex-col items-center">
              <SquareIcon className="text-[#348b8b] mb-1 w-5 h-5" />
              <span className="text-xs font-medium">{property.square_feet} SQ FT</span>
            </div>
          )}
          {property.lot_size !== null && (
            <div className="flex flex-col items-center">
              <SquareIcon className="text-[#348b8b] mb-1 w-5 h-5" />
              <span className="text-xs font-medium">{property.lot_size} LOT</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Filter Badge Component
const FilterBadge: React.FC<FilterBadgeProps> = ({ label, value, onRemove }) => (
  <div className="flex items-center bg-white rounded-full px-3 py-1 text-sm border border-gray-200 mr-2 mb-2">
    <span className="font-medium text-gray-700 mr-1">{label}:</span>
    <span className="text-[#348b8b]">{value}</span>
    <button onClick={onRemove} className="ml-1 text-gray-400 hover:text-gray-700">
      <X className="w-4 h-4" />
    </button>
  </div>
);

// Main Listings Page Component
const ListingsPage: React.FC = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    purpose: '',
    propertyType: '',
    yearBuilt: '',
    searchQuery: ''
  });
  const [activeFilters, setActiveFilters] = useState<ActiveFilter[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState<{ results: Property[] } | null>(null);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;
  const [paginatedProperties, setPaginatedProperties] = useState<Property[]>([]);

  useEffect(() => {
    const getListings = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/market/fetch-listed-properties/`);
        setListings(response.data);
        setFilteredProperties(response.data.results || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    getListings();
  }, []);

  // Apply filters, sorting, and search functionality
  useEffect(() => {
    if (!listings?.results) return;

    setLoading(true);

    setTimeout(() => {
      // Apply filters
      let result = [...listings.results];

      // Apply search query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        result = result.filter(property =>
          property.title.toLowerCase().includes(query) ||
          property.address.toLowerCase().includes(query) ||
          property.city.toLowerCase().includes(query) ||
          property.state.toLowerCase().includes(query) ||
          property.property_type.toLowerCase().includes(query)
        );
      }

      if (filters.minPrice) {
        result = result.filter(
          property => parseFloat(property.price) >= parseFloat(filters.minPrice)
        );
      }

      if (filters.maxPrice) {
        result = result.filter(
          property => parseFloat(property.price) <= parseFloat(filters.maxPrice)
        );
      }

      if (filters.bedrooms) {
        result = result.filter(
          property => property.bedrooms !== null && property.bedrooms >= parseInt(filters.bedrooms)
        );
      }

      if (filters.purpose) {
        result = result.filter(
          property => property.listing_purpose === filters.purpose
        );
      }

      if (filters.propertyType) {
        result = result.filter(
          property => property.property_type === filters.propertyType
        );
      }

      if (filters.yearBuilt) {
        result = result.filter(
          property => property.year_built !== null && property.year_built >= parseInt(filters.yearBuilt)
        );
      }

      // Apply sorting
      if (sortBy === 'newest') {
        result.sort((a, b) => new Date(b.listed_date).getTime() - new Date(a.listed_date).getTime());
      } else if (sortBy === 'price_low') {
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (sortBy === 'price_high') {
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      } else if (sortBy === 'beds') {
        result.sort((a, b) => ((b.bedrooms || 0) - (a.bedrooms || 0)));
      }

      setFilteredProperties(result);

      // Calculate total pages for pagination
      const total = Math.ceil(result.length / itemsPerPage);
      setTotalPages(total > 0 ? total : 1);

      // Reset to first page when filters change
      setCurrentPage(1);

      setLoading(false);
    }, 500);

    // Build the active filters display
    const newActiveFilters: ActiveFilter[] = [];
    if (filters.searchQuery) newActiveFilters.push({ key: 'searchQuery', label: 'Search', value: filters.searchQuery });
    if (filters.minPrice) newActiveFilters.push({ key: 'minPrice', label: 'Min Price', value: `${filters.minPrice}` });
    if (filters.maxPrice) newActiveFilters.push({ key: 'maxPrice', label: 'Max Price', value: `${filters.maxPrice}` });
    if (filters.bedrooms) newActiveFilters.push({ key: 'bedrooms', label: 'Bedrooms', value: `${filters.bedrooms}+` });
    if (filters.purpose) newActiveFilters.push({ key: 'purpose', label: 'Purpose', value: filters.purpose });
    if (filters.propertyType) newActiveFilters.push({
      key: 'propertyType',
      label: 'Type',
      value: filters.propertyType.charAt(0).toUpperCase() + filters.propertyType.slice(1)
    });
    if (filters.yearBuilt) newActiveFilters.push({ key: 'yearBuilt', label: 'Year', value: `Since ${filters.yearBuilt}` });

    setActiveFilters(newActiveFilters);
  }, [filters, sortBy, listings]);

  // Handle pagination
  useEffect(() => {
    // Get current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setPaginatedProperties(filteredProperties.slice(indexOfFirstItem, indexOfLastItem));
  }, [currentPage, filteredProperties, itemsPerPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRemoveFilter = (filterKey: keyof FilterState) => {
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
      purpose: '',
      propertyType: '',
      yearBuilt: '',
      searchQuery: ''
    });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Search is already applied via the useEffect that watches filters
  };

  // Change page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate pagination links
  const renderPaginationItems = () => {
    const items = [];

    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => handlePageChange(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Show ellipsis if needed
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Show current page and adjacent pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= 1 || i >= totalPages) continue;
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Show ellipsis if needed
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
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
            <form onSubmit={handleSearch} className="relative flex-grow">
              <input
                type="text"
                name="searchQuery"
                value={filters.searchQuery}
                onChange={handleFilterChange}
                placeholder="Search by location, neighborhood, or property"
                className="w-full p-4 pl-12 pr-4 rounded-lg border border-gray-300 focus:border-[#348b8b] focus:ring-1 focus:ring-[#348b8b] focus:outline-none transition-colors shadow-sm"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#348b8b] text-white p-2 rounded-lg hover:bg-[#2d7a7a] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
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
                {activeFilters.map((filter) => (
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
                        {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> */}
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
                        {/* <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" /> */}
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
                      <label className="block mb-2 text-sm font-medium text-gray-700">Purpose</label>
                      <select
                        name="purpose"
                        value={filters.purpose}
                        onChange={handleFilterChange}
                        className="w-full p-2 border rounded-lg appearance-none bg-select-arrow bg-no-repeat bg-[right_0.75rem_center] pr-8 focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b] outline-none transition-colors"
                      >
                        <option value="">Any</option>
                        <option value="rent">Rent</option>
                        <option value="lease">Lease</option>
                        <option value="sale">Sale</option>
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
                        <option value="land">Land</option>
                        <option value="commercial">Commercial</option>
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
              {loading ? 'Finding properties...' : `${filteredProperties.length} Properties Available`}
            </h2>
            <p className="text-gray-600 text-sm">
              {!loading && totalPages > 0 ? `Showing ${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredProperties.length)} of ${filteredProperties.length}` : 'Showing all available properties'}
            </p>
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
                  <line x1="3" y1="6" x2="3" y2="6"></line>
                  <line x1="3" y1="12" x2="3" y2="12"></line>
                  <line x1="3" y1="18" x2="3" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-[#348b8b] focus:border-[#348b8b] text-gray-700 bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="price_low">Price (Low to High)</option>
                <option value="price_high">Price (High to Low)</option>
                <option value="beds">Most Bedrooms</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Property Listings */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#348b8b]"></div>
          </div>
        ) : paginatedProperties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No properties found</h3>
            <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter criteria to find properties.</p>
            <button
              onClick={handleClearAllFilters}
              className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#348b8b] hover:bg-[#2d7a7a]"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col space-y-6'}>
              {paginatedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>

                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-[#348b8b] py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Looking to sell or rent out your property?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Connect with thousands of potential buyers and tenants by listing your property on our platform.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#348b8b] bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PropertyConnect</h3>
              <p className="text-gray-400 mb-4">
                Find your dream home or the perfect investment property with our comprehensive real estate platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Buy Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Rent Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">List Property</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Popular Locations</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New York</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Los Angeles</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Miami</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Chicago</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">San Francisco</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest property updates.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-l-md flex-grow focus:outline-none text-gray-900"
                />
                <button
                  type="submit"
                  className="bg-[#348b8b] px-4 py-2 rounded-r-md text-white hover:bg-[#2d7a7a] transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PropertyConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ListingsPage;