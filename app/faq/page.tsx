"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Home, Mail, Phone, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// TypeScript interface for FAQ item
interface FAQItem {
    question: string;
    answer: string;
    category: string;
}

const FAQPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [openItems, setOpenItems] = useState<number[]>([]);

    // FAQ categories
    const categories = ['General', 'Properties', 'Buying', 'Selling', 'Financing'];

    // FAQ data
    const faqItems: FAQItem[] = [
        {
            question: "How do I start searching for properties?",
            answer: "You can begin your property search by using our search bar at the top of the homepage. Filter by location, price range, property type, number of bedrooms, and more to find listings that match your criteria. You can also create an account to save your favorite properties and receive alerts for new listings that match your preferences.",
            category: "General"
        },
        {
            question: "What documents do I need when applying for a mortgage?",
            answer: "When applying for a mortgage, you typically need to provide proof of income (pay stubs, W-2s, tax returns), proof of assets (bank statements, investment accounts), identification (driver's license, Social Security number), employment verification, and credit history. Additional documents may be required depending on your specific situation and the lender's requirements.",
            category: "Financing"
        },
        {
            question: "How long does the home buying process usually take?",
            answer: "The home buying process typically takes 30-60 days from offer acceptance to closing, but this can vary based on various factors. This includes the time needed for mortgage approval, home inspection, appraisal, and addressing any issues that arise during these steps. Cash purchases can often close more quickly, while complicated financing or property issues might extend the timeline.",
            category: "Buying"
        },
        {
            question: "What's the difference between a fixed-rate and adjustable-rate mortgage?",
            answer: "A fixed-rate mortgage maintains the same interest rate throughout the entire loan term, providing predictable monthly payments. An adjustable-rate mortgage (ARM) typically starts with a lower interest rate for an initial period (e.g., 5, 7, or 10 years), after which the rate adjusts periodically based on market indices. ARMs may offer lower initial payments but come with the risk of higher payments later if interest rates rise.",
            category: "Financing"
        },
        {
            question: "How do I determine the right listing price for my home?",
            answer: "Determining the right listing price involves analyzing comparable properties that have recently sold in your area, considering the current market conditions, and evaluating your home's unique features and condition. Our professional agents can provide a comprehensive market analysis to help you set a competitive price that attracts buyers while maximizing your return.",
            category: "Selling"
        },
        {
            question: "What are closing costs and who pays them?",
            answer: "Closing costs are fees associated with finalizing a real estate transaction, typically ranging from 2-5% of the loan amount. These may include lender fees, appraisal fees, title insurance, attorney fees, recording fees, and prepaid items like property taxes and homeowners insurance. The payment of closing costs is negotiable between buyers and sellers, though buyers typically pay most closing costs. However, sellers often cover real estate commission fees.",
            category: "Buying"
        },
        {
            question: "How can I improve my chances of getting my offer accepted?",
            answer: "To improve your chances of getting an offer accepted, consider getting pre-approved for financing, making a competitive offer based on comparable sales, limiting contingencies when possible, being flexible with closing dates, writing a personal letter to the seller, and working with an experienced real estate agent who understands the local market dynamics.",
            category: "Buying"
        },
        {
            question: "What's the difference between a condo and a townhouse?",
            answer: "Condos and townhouses differ primarily in structure and ownership. Condos are typically units within a larger building or complex where owners own their interior space but share ownership of exterior areas and amenities. Townhouses are multi-floor homes that share walls with adjacent properties but include ownership of the land beneath the unit and often the exterior structure. Townhouses generally offer more privacy and space, while condos often provide more amenities and lower maintenance responsibilities.",
            category: "Properties"
        },
        {
            question: "Do I need a real estate agent to buy or sell a home?",
            answer: "While it's not legally required to use a real estate agent, professional representation offers significant advantages. Agents provide market expertise, negotiation skills, access to more listings, guidance through complex paperwork, and help navigating potential pitfalls in the transaction process. Experienced agents often help clients save money and avoid costly mistakes while making the process much smoother and less stressful.",
            category: "General"
        },
        {
            question: "What is a home inspection and why is it important?",
            answer: "A home inspection is a thorough evaluation of a property's condition conducted by a professional inspector. It typically examines the structure, systems (electrical, plumbing, HVAC), and major components of the home. Inspections are important because they identify existing or potential problems that may not be visible during casual viewing, helping buyers make informed decisions, negotiate repairs or price adjustments, and avoid unexpected costs after purchase.",
            category: "Buying"
        },
        {
            question: "How do property taxes work and how are they calculated?",
            answer: "Property taxes are assessed by local governments to fund public services like schools, infrastructure, and emergency services. They're calculated by multiplying your property's assessed value by the local tax rate (mill rate). Assessment methods vary by location, with some areas reassessing annually and others doing so less frequently. Many regions offer exemptions or reductions for primary residences, seniors, veterans, or other qualifying circumstances.",
            category: "General"
        },
        {
            question: "What should I do to prepare my home for selling?",
            answer: "To prepare your home for selling, focus on enhancing curb appeal, decluttering and depersonalizing interiors, making minor repairs, deep cleaning, and potentially staging to showcase the home's potential. Consider a pre-listing inspection to identify and address issues before buyers discover them. Professional photography and virtual tours can also significantly improve your listing's appeal in online searches.",
            category: "Selling"
        },
        {
            question: "How do I qualify for a mortgage?",
            answer: "Mortgage qualification depends on factors including credit score (typically 620+ for conventional loans), debt-to-income ratio (ideally below 43%), stable employment history, sufficient income to cover payments, and adequate down payment (typically 3-20% depending on loan type). Lenders will also consider your assets, liabilities, and the property's value. Government-backed loans like FHA, VA, or USDA loans may have different qualification requirements and can be more accessible for some buyers.",
            category: "Financing"
        },
        {
            question: "What's the difference between pre-qualification and pre-approval?",
            answer: "Pre-qualification is an informal estimate of how much you might be able to borrow based on information you provide about your finances. Pre-approval is a more formal process where a lender verifies your financial information, checks your credit, and commits to lending a specific amount subject to certain conditions. Pre-approval carries more weight with sellers since it demonstrates you're serious and financially capable of completing the purchase.",
            category: "Financing"
        },
        {
            question: "How do homeowners association (HOA) fees work?",
            answer: "HOA fees are regular payments made by property owners within a community governed by a homeowners association. These fees fund maintenance of common areas, amenities, and services. They may also cover utilities like water or garbage collection, insurance for shared structures, and reserves for future repairs. Fees vary widely based on property type, location, amenities offered, and management efficiency. Before purchasing in an HOA community, review their financial statements, rules, and fee history.",
            category: "Properties"
        }
    ];

    // Toggle FAQ item accordion
    const toggleItem = (index: number) => {
        if (openItems.includes(index)) {
            setOpenItems(openItems.filter(item => item !== index));
        } else {
            setOpenItems([...openItems, index]);
        }
    };

    // Filter FAQs based on search query and selected category
    const filterFAQs = (items: FAQItem[], category: string, query: string) => {
        return items.filter(item => {
            const matchesCategory = category === 'All' || item.category === category;
            const matchesQuery =
                item.question.toLowerCase().includes(query.toLowerCase()) ||
                item.answer.toLowerCase().includes(query.toLowerCase());
            return matchesCategory && matchesQuery;
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Banner */}
            <div className="bg-[#348b8b] text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#348b8b] to-[#205b5b] opacity-90"></div>
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: "url('/api/placeholder/1200/800')",
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                ></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Frequently Asked Questions</h1>
                        <p className="text-xl md:text-2xl opacity-90">
                            Find answers to common questions about our real estate services and processes.
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-white py-6 shadow-md">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto relative">
                        <Input
                            type="text"
                            placeholder="Search for answers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 py-6 text-lg rounded-lg border-gray-300 focus:border-[#348b8b] focus:ring-[#348b8b]"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="container mx-auto px-4 py-12">
                <Tabs defaultValue="All" className="max-w-4xl mx-auto">
                    <div className="mb-8 w-full overflow-x-auto">
                        <div className="flex justify-center min-w-max">
                            <TabsList className="bg-gray-100 p-1 rounded-full flex-wrap sm:flex-nowrap gap-1">
                                <TabsTrigger
                                    value="All"
                                    className="rounded-full data-[state=active]:bg-[#348b8b] data-[state=active]:text-white px-6 py-2"
                                >
                                    All
                                </TabsTrigger>
                                {categories.map((category) => (
                                    <TabsTrigger
                                        key={category}
                                        value={category}
                                        className="rounded-full data-[state=active]:bg-[#348b8b] data-[state=active]:text-white px-6 py-2"
                                    >
                                        {category}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent value="All" className="mt-6">
                        {filterFAQs(faqItems, 'All', searchQuery).length > 0 ? (
                            <div className="space-y-4">
                                {filterFAQs(faqItems, 'All', searchQuery).map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                                    >
                                        <button
                                            onClick={() => toggleItem(index)}
                                            className="flex justify-between items-center w-full p-6 text-left font-medium text-gray-900 hover:bg-gray-50"
                                        >
                                            <span className="pr-4">{item.question}</span>
                                            {openItems.includes(index) ? (
                                                <ChevronUp className="flex-shrink-0 w-5 h-5 text-[#348b8b]" />
                                            ) : (
                                                <ChevronDown className="flex-shrink-0 w-5 h-5 text-gray-400" />
                                            )}
                                        </button>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.includes(index) ? 'max-h-96' : 'max-h-0'
                                                }`}
                                        >
                                            <div className="p-6 pt-0 border-t border-gray-100">
                                                <p className="text-gray-700">{item.answer}</p>
                                                <div className="mt-4 flex items-center">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#348b8b]/10 text-[#348b8b]">
                                                        {item.category}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                                <p className="text-gray-500">
                                    Try adjusting your search or filter to find what you&apos;re looking for.
                                </p>
                            </div>
                        )}
                    </TabsContent>

                    {categories.map((category) => (
                        <TabsContent key={category} value={category} className="mt-6">
                            {filterFAQs(faqItems, category, searchQuery).length > 0 ? (
                                <div className="space-y-4">
                                    {filterFAQs(faqItems, category, searchQuery).map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
                                        >
                                            <button
                                                onClick={() => toggleItem(index)}
                                                className="flex justify-between items-center w-full p-6 text-left font-medium text-gray-900 hover:bg-gray-50"
                                            >
                                                <span className="pr-4">{item.question}</span>
                                                {openItems.includes(index) ? (
                                                    <ChevronUp className="flex-shrink-0 w-5 h-5 text-[#348b8b]" />
                                                ) : (
                                                    <ChevronDown className="flex-shrink-0 w-5 h-5 text-gray-400" />
                                                )}
                                            </button>
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openItems.includes(index) ? 'max-h-96' : 'max-h-0'
                                                    }`}
                                            >
                                                <div className="p-6 pt-0 border-t border-gray-100">
                                                    <p className="text-gray-700">{item.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Search className="w-8 h-8 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                                    <p className="text-gray-500">
                                        Try adjusting your search or filter to find what you&apos;re looking for.
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    ))}
                </Tabs>

                {/* Still Have Questions Section */}
                <div className="max-w-4xl mx-auto mt-16 bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2 bg-[#348b8b] p-8 text-white">
                            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
                            <p className="mb-6 opacity-90">
                                Our team is here to help you with any questions about real estate that weren&apos;t answered above.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Phone className="w-5 h-5 mr-3" />
                                    <span>(555) 123-4567</span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-5 h-5 mr-3" />
                                    <span>support@realestate.com</span>
                                </div>
                                <div className="flex items-center">
                                    <Home className="w-5 h-5 mr-3" />
                                    <span>123 Main Street, Anytown, USA</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 p-8">
                            <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="First Name" className="border-gray-300" />
                                    <Input placeholder="Last Name" className="border-gray-300" />
                                </div>
                                <Input placeholder="Email Address" className="border-gray-300" />
                                <Input placeholder="Phone Number" className="border-gray-300" />
                                <div className="relative">
                                    <textarea
                                        placeholder="Your Question"
                                        className="w-full min-h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#348b8b] focus:border-transparent"
                                    ></textarea>
                                </div>
                                <Button className="w-full bg-[#348b8b] hover:bg-[#297979]">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Submit Question
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FAQPage;