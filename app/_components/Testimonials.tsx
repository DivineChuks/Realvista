"use client"
import React from 'react';

const TestimonialSection = () => {
    const testimonials = [
        {
            id: 1,
            quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Roy Bennett",
            position: "Manager, Company Inc.",
            avatar: "/roy.jpg"
        },
        {
            id: 2,
            quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Kenya Soval",
            position: "Realtor, Company Inc.",
            avatar: "/ken.jpg"
        },
        {
            id: 3,
            quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            name: "Kathleen Peterson",
            position: "Manager, Company Inc.",
            avatar: "/kath.jpg"
        }
    ];

    return (
        <div className="w-full py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-medium mb-2">Testimonials</h2>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-blue-50 p-6 rounded-lg">
                            <div className="text-5xl font-medium mb-4">&quot;</div>
                            <p className="mb-6">{testimonial.quote}</p>
                            <div className="flex items-center">
                                <img
                                    src={testimonial.avatar}
                                    alt={`${testimonial.name}'s avatar`}
                                    className="w-12 h-12 rounded-full mr-4 object-cover"
                                />
                                <div>
                                    <h4 className="font-medium">{testimonial.name}</h4>
                                    <p className="text-gray-600 text-sm">{testimonial.position}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll to top button */}
            <div className="fixed bottom-6 right-6">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TestimonialSection;