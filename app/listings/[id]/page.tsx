"use client"
import React, { useState } from 'react';
import {
    MapPin,
    BedDouble,
    Bath,
    SquareIcon,
    Heart,
    ChevronLeft,
    Share2,
    Check,
    X
} from 'lucide-react';
import Link from 'next/link';

const PropertyDetailsPage = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const property = {
        id: 1,
        title: "Luxurious Beachfront Villa",
        price: 2500000,
        bedrooms: 4,
        bathrooms: 3,
        area: 3200,
        location: "Malibu, CA",
        image: "/housefour.webp",
        featured: true
    }

    // Simulated additional images (you can replace with actual property images)
    const propertyImages = [
        property.image,
        "/houseone.webp",
        "/housetwo.webp",
        "/housefive.webp"
    ];

    const amenities = [
        "Swimming Pool",
        "Gym",
        "Parking",
        "Security",
        "Garden",
        "Balcony"
    ];

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

            <div className="container mx-auto px-4 py-14">
                <div className="grid md:grid-cols-2 gap-12">
                    {/* Image Gallery Section */}
                    <div>
                        <div className="relative mb-4">
                            <img
                                src={propertyImages[activeImageIndex]}
                                alt={property.title}
                                className="w-full h-96 object-cover rounded-2xl shadow-lg"
                            />
                            {property.featured && (
                                <div className="absolute top-4 left-4 bg-teal-500 text-white px-3 py-1 rounded-full flex items-center">
                                    Featured Property
                                </div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {propertyImages.map((img, index) => (
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
                    </div>

                    {/* Property Details Section */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.title}</h1>

                        <div className="flex items-center mb-4">
                            <MapPin className="mr-2 text-teal-500 w-5 h-5" />
                            <span className="text-gray-600 text-lg">{property.location}</span>
                        </div>

                        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="flex flex-col items-center">
                                    <BedDouble className="text-teal-500 mb-2 w-8 h-8" />
                                    <span className="font-semibold">{property.bedrooms}</span>
                                    <span className="text-sm text-gray-500">Bedrooms</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Bath className="text-teal-500 mb-2 w-8 h-8" />
                                    <span className="font-semibold">{property.bathrooms}</span>
                                    <span className="text-sm text-gray-500">Bathrooms</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <SquareIcon className="text-teal-500 mb-2 w-8 h-8" />
                                    <span className="font-semibold">{property.area}</span>
                                    <span className="text-sm text-gray-500">Sq Ft</span>
                                </div>
                            </div>
                        </div>
                        {/* Property Description Section */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                This stunning property offers a perfect blend of luxury, comfort, and modern design.
                                Nestled in a prime location, this {property.bedrooms}-bedroom home provides spacious living
                                with high-end finishes and breathtaking views. The open-concept layout maximizes natural
                                light and creates an inviting atmosphere perfect for both entertaining and relaxing.
                                Meticulously designed, this property represents the pinnacle of contemporary urban living.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Price</h2>
                            <div className="text-3xl font-bold text-teal-600">
                                ${property.price.toLocaleString()}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 gap-3">
                                {amenities.map((amenity, index) => (
                                    <div key={index} className="flex items-center">
                                        <Check className="text-teal-500 mr-2 w-5 h-5" />
                                        <span>{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <button className="flex-grow bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition-colors">
                                Request Viewing
                            </button>
                            <button className="flex-grow bg-white border-2 border-teal-500 text-teal-600 py-3 rounded-lg hover:bg-teal-50 transition-colors">
                                Contact Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailsPage;