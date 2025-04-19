"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { HelpCircle, MessageCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface FaqProps {
    question: string,
    answer: string
}

const FAQItem = ({ question, answer }: FaqProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50/50 focus:outline-none"
            >
                <span className="text-lg font-medium text-gray-800">{question}</span>
                <div className={`p-2 rounded-full bg-orange-50 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-orange-100' : ''}`}>
                    <ChevronDown className="text-[#FB902D]" size={18} />
                </div>
            </button>

            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="px-6 pb-6 text-gray-600">
                    {answer}
                </div>
            </motion.div>
        </div>
    );
};

export default function FAQSection() {
    const [searchTerm, setSearchTerm] = useState("");

    const faqs = [
        {
            question: 'What is Realvista?',
            answer: 'Realvista is a comprehensive real estate management app designed to help investors, property managers, and homeowners track, manage, and optimize their real estate portfolios.'
        },
        {
            question: 'Is Realvista suitable for beginners in real estate?',
            answer: 'Absolutely! Realvista offers an intuitive interface and guided features that make it easy for beginners to understand and manage their real estate investments.'
        },
        {
            question: 'Is my data secure?',
            answer: 'We use bank-level encryption and follow strict data protection protocols to ensure your information remains completely confidential and secure.'
        },
        {
            question: 'Can I customize my dashboard?',
            answer: 'Yes, Realvista offers extensive customization options. You can personalize widgets, set custom goals, and create a dashboard that reflects your unique real estate strategy.'
        },
        // {
        //     question: 'How do I contact support?',
        //     answer: "Our support team is available 24/7 through in-app chat, email, and phone. We're committed to providing prompt and helpful assistance."
        // }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="faq" className="relative py-20 lg:py-28 bg-gradient-to-br from-white to-blue-50/70">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-16 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute bottom-1/4 -right-16 w-64 h-64 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute top-3/4 left-1/3 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-10"></div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block p-3 bg-orange-100/50 rounded-2xl mb-4">
                        <HelpCircle className="text-[#FB902D]" size={32} />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Have questions? We&apos;ve got answers! Discover how Realvista can help you achieve your real estate goals.
                    </p>

                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 order-2 lg:order-1"
                    >
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <div className="p-3 bg-blue-50 rounded-full w-max mb-6">
                                <MessageCircle className="text-blue-500" size={24} />
                            </div>
                            <h3 className="font-bold text-2xl mb-3">Still have questions?</h3>
                            <p className="text-gray-600 mb-6">
                                Can&apos;t find the answer you&apos;re looking for? Our friendly team is here to help you.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-[#FB902D] text-white px-8 rounded-full py-3.5 w-full font-medium shadow-md flex items-center justify-center space-x-2 transition-all hover:shadow-lg"
                            >
                                <Link href="/contact">Contact Support</Link>
                            </motion.button>

                            {/* Decorative Pattern */}
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gray-50 rounded-tl-full -mb-8 -mr-8 z-0 opacity-75"></div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-4 lg:col-span-3 order-1 lg:order-2"
                    >
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className=''
                                >
                                    <FAQItem
                                        question={faq.question}
                                        answer={faq.answer}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl">
                                <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
                                    <HelpCircle className="text-gray-400" size={28} />
                                </div>
                                <p className="text-gray-600">No results found for &apos;{searchTerm}&apos;</p>
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mt-4 text-[#FB902D] hover:underline"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                        <div className='mt-10 flex justify-end'>
                            <Link className='bg-[#348b8b] text-white rounded-md py-3 px-6' href="/faq">Learn More</Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}