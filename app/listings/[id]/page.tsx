"use client"
import React, { useEffect, useState } from 'react';
import {
    MapPin,
    BedDouble,
    Bath,
    SquareIcon,
    Heart,
    ChevronLeft,
    Share2,
    Check,
    Phone,
    Mail,
    Calendar,
    Home,
    Clock,
    User
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import api from '@/config/apiClient';

const PropertyDetailsPage = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState<any>(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        const getListing = async () => {
            setLoading(true);
            try {
                const response = await api.get(`/market/properties/${id}`);
                setListing(response.data);
            } catch (error) {
                console.error("Error fetching property:", error);
            } finally {
                setLoading(false);
            }
        };
        getListing();
    }, [id]);

    // Format price with commas
    const formatPrice = (price: any) => {
        return parseFloat(price).toLocaleString();
    };

    // Format date to readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-teal-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-700">Loading property details...</p>
                </div>
            </div>
        );
    }

    if (!listing) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-teal-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h2>
                    <p className="text-gray-600 mb-6">The property you&apos;re looking for doesn&apos;t exist or has been removed.</p>
                    <Link href="/listings" className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors">
                        Browse Listings
                    </Link>
                </div>
            </div>
        );
    }

    const propertyImages = listing.image_files.map((img: any) => img.file);
    const features = listing.features[0];

    return (
        <div className="bg-teal-50 min-h-screen">
            {/* Top Banner Section */}
            <div className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/listings" className="text-gray-700 cursor-pointer flex items-center hover:text-teal-600">
                        <ChevronLeft className="mr-2" /> Back to Listings
                    </Link>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="text-gray-700 hover:text-teal-600"
                        >
                            <Heart
                                className={`w-6 h-6 ${isFavorite ? 'text-teal-500 fill-teal-500' : 'text-gray-700'}`}
                            />
                        </button>
                        <button className="text-gray-700 hover:text-teal-600">
                            <Share2 className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Property Title and Location */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{listing.title}</h1>
                    <div className="flex items-center text-gray-600">
                        <MapPin className="mr-2 text-teal-500 w-5 h-5" />
                        <span className="text-lg">{listing.address}, {listing.city}, {listing.state}</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Image Gallery Section */}
                    <div className="md:col-span-2">
                        <div className="relative mb-4 rounded-2xl overflow-hidden shadow-lg">
                            {propertyImages.length > 0 ? (
                                <img
                                    src={propertyImages[activeImageIndex]}
                                    alt={listing.title}
                                    className="w-full h-96 object-cover"
                                />
                            ) : (
                                <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                                    <Home className="w-16 h-16 text-gray-400" />
                                </div>
                            )}

                            <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full flex items-center">
                                {listing.listing_purpose === 'sale' ? 'For Sale' : 'For Rent'}
                            </div>
                        </div>

                        {propertyImages.length > 0 && (
                            <div className="grid grid-cols-4 gap-4">
                                {propertyImages.map((img: any, index: number) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImageIndex(index)}
                                        className={`
                                            overflow-hidden rounded-lg 
                                            ${activeImageIndex === index
                                                ? 'border-2 border-teal-500'
                                                : 'border border-gray-200 opacity-70 hover:opacity-100'}
                                        `}
                                    >
                                        <img
                                            src={img}
                                            alt={`Property view ${index + 1}`}
                                            className="w-full h-24 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Property Description Section */}
                        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Property Details</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                {listing.description || "This beautiful property is located in a prime area offering comfort and convenience. Perfect for families looking for their dream home."}
                            </p>

                            <div className="grid md:grid-cols-4 grid-cols-2 gap-6 mb-6">
                                <div className="flex flex-col items-center">
                                    <BedDouble className="text-teal-500 mb-2 w-8 h-8" />
                                    <span className="font-semibold">{listing.bedrooms}</span>
                                    <span className="text-sm text-gray-500">Bedrooms</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Bath className="text-teal-500 mb-2 w-8 h-8" />
                                    <span className="font-semibold">{listing.bathrooms}</span>
                                    <span className="text-sm text-gray-500">Bathrooms</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <SquareIcon className="text-teal-500 mb-2 w-8 h-8" />
                                    <span className="font-semibold">{listing.square_feet}</span>
                                    <span className="text-sm text-gray-500">Sq Ft</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Calendar className="text-teal-500 mb-2 w-8 h-8" />
                                    <span className="font-semibold">{listing.year_built}</span>
                                    <span className="text-sm text-gray-500">Year Built</span>
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Features & Amenities</h3>
                            <div className="grid md:grid-cols-3 grid-cols-2 gap-3 mb-4">
                                {features.parking_available && (
                                    <div className="flex items-center">
                                        <Check className="text-teal-500 mr-2 w-5 h-5" />
                                        <span>Parking Available</span>
                                    </div>
                                )}
                                {features.furnished && (
                                    <div className="flex items-center">
                                        <Check className="text-teal-500 mr-2 w-5 h-5" />
                                        <span>Furnished</span>
                                    </div>
                                )}
                                {features.pet_friendly && (
                                    <div className="flex items-center">
                                        <Check className="text-teal-500 mr-2 w-5 h-5" />
                                        <span>Pet Friendly</span>
                                    </div>
                                )}
                                {features.swimming_pool && (
                                    <div className="flex items-center">
                                        <Check className="text-teal-500 mr-2 w-5 h-5" />
                                        <span>Swimming Pool</span>
                                    </div>
                                )}
                                {features.garden && (
                                    <div className="flex items-center">
                                        <Check className="text-teal-500 mr-2 w-5 h-5" />
                                        <span>Garden</span>
                                    </div>
                                )}
                                {features.security && (
                                    <div className="flex items-center">
                                        <Check className="text-teal-500 mr-2 w-5 h-5" />
                                        <span>Security</span>
                                    </div>
                                )}
                                {features.water_supply && (
                                    <div className="flex items-center">
                                        <Check className="text-teal-500 mr-2 w-5 h-5" />
                                        <span>Water Supply</span>
                                    </div>
                                )}
                                <div className="flex items-center">
                                    <Check className="text-teal-500 mr-2 w-5 h-5" />
                                    <span>Road Network: {features.road_network}</span>
                                </div>
                                <div className="flex items-center">
                                    <Check className="text-teal-500 mr-2 w-5 h-5" />
                                    <span>Development: {features.development_level}</span>
                                </div>
                            </div>

                            <div className="flex items-center text-gray-600 mt-6">
                                <Clock className="mr-2 text-teal-500 w-5 h-5" />
                                <span>Available: {listing.availability === 'now' ? 'Immediately' : formatDate(listing.availability_date)}</span>
                            </div>

                            <div className="flex items-center text-gray-600 mt-2">
                                <Calendar className="mr-2 text-teal-500 w-5 h-5" />
                                <span>Listed on: {formatDate(listing.listed_date)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="md:col-span-1">
                        {/* Price Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Price</h2>
                            <div className="text-3xl font-bold text-teal-600 mb-2">
                                {listing.currency} {formatPrice(listing.price)}
                            </div>
                            {features.negotiable === 'yes' && (
                                <span className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full">Negotiable</span>
                            )}
                        </div>

                        {/* Agent/Owner Info Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Owner</h2>
                            <div className="flex items-center mb-4">
                                {listing.owner.owner_photo ? (
                                    <img
                                        src={listing.owner.owner_photo}
                                        alt={listing.owner.owner_name}
                                        className="w-16 h-16 rounded-full object-cover mr-4"
                                    />
                                ) : (
                                    <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                        <User className="w-8 h-8 text-teal-500" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-semibold text-gray-800">{listing.owner.owner_name}</h3>
                                    <p className="text-sm text-gray-600">
                                        {listing.owner.base_city}, {listing.owner.base_state}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Active since {new Date(listing.owner.active_since).getFullYear()}
                                    </p>
                                </div>
                            </div>

                            {/* Contact Buttons */}
                            <div className="space-y-3">
                                <a
                                    href={`tel:${listing.owner.phone_number}`}
                                    className="flex items-center justify-center w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors"
                                >
                                    <Phone className="mr-2 w-5 h-5" /> Call
                                </a>
                                <a
                                    href={`https://wa.me/${listing.owner.phone_number.replace(/\+/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.03 19.18c-1.731 0-3.434-.446-4.936-1.285l-5.091 1.33 1.36-4.967C2.496 12.662 2 10.84 2 8.923 2 4.005 6.505 0 12.03 0c2.683 0 5.207 1.045 7.102 2.942C21.025 4.835 22 7.399 22 10.177c0 5.518-4.505 9.003-9.97 9.003z" fill="currentColor" />
                                    </svg>
                                    WhatsApp
                                </a>
                                <a
                                    href={`mailto:${listing.owner.email}`}
                                    className="flex items-center justify-center w-full bg-white border-2 border-teal-500 text-teal-600 py-3 px-4 rounded-lg hover:bg-teal-50 transition-colors"
                                >
                                    <Mail className="mr-2 w-5 h-5" /> Email
                                </a>
                            </div>
                        </div>

                        {/* Property Stats Card */}
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Stats</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Views</span>
                                    <span className="font-semibold">{listing.views}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Inquiries</span>
                                    <span className="font-semibold">{listing.inquiries}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Saved by</span>
                                    <span className="font-semibold">{listing.bookmarked} people</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Property Type</span>
                                    <span className="font-semibold capitalize">{listing.property_type}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;