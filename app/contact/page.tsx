"use client"

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Check, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle');

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulated form submission
    try {
      // Typically, you'd have an actual API call here
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus('success');
      
      // Reset form after success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error: any) {
      setFormStatus(error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Accent Background */}
      <div className="bg-[#348b8b] text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Let&apos;s Connect
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Have questions about your real estate journey? We&apos;re here to provide expert guidance every step of the way.
            </p>
            <div className="inline-flex items-center bg-white text-[#348b8b] rounded-full px-6 py-3 shadow-lg font-medium">
              <Phone className="mr-2 w-5 h-5" />
              <span>(555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 max-w-6xl -mt-12">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-10 mb-16">
          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact Info Column */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="block w-8 h-1 bg-[#348b8b] mr-3"></span>
                  Contact Details
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-[#348b8b]/10 p-3 rounded-lg mr-4">
                      <MapPin className="w-5 h-5 text-[#348b8b]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Our Office</p>
                      <p className="text-gray-600">123 Real Estate Avenue, City, State 12345</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#348b8b]/10 p-3 rounded-lg mr-4">
                      <Mail className="w-5 h-5 text-[#348b8b]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Email</p>
                      <p className="text-[#348b8b] hover:underline cursor-pointer">contact@realestate.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#348b8b]/10 p-3 rounded-lg mr-4">
                      <Clock className="w-5 h-5 text-[#348b8b]" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Business Hours</p>
                      <p className="text-gray-600">Mon-Fri: 9am - 6pm</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="rounded-xl overflow-hidden h-48 md:h-64 bg-gray-200 relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-[#348b8b]" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-[#348b8b] text-white p-3 text-center font-medium">
                  Our Location
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="block w-8 h-1 bg-[#348b8b] mr-3"></span>
                Send Your Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-gray-700 font-medium">
                      Full Name <span className="text-[#348b8b]">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#348b8b] transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
                      Email <span className="text-[#348b8b]">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#348b8b] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block mb-2 text-gray-700 font-medium">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#348b8b] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-gray-700 font-medium">
                    Your Message <span className="text-[#348b8b]">*</span>
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="How can we help you today?"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#348b8b] transition-all"
                  />
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={formStatus === 'sending'}
                    className={`
                      py-3 px-6 rounded-lg text-white font-medium 
                      transition-all bg-[#348b8b] 
                      hover:bg-[#2a7070] hover:shadow-lg
                      flex items-center justify-center space-x-2
                    `}
                  >
                    {formStatus === 'idle' && (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                    {formStatus === 'sending' && (
                      <>
                        <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                        <span>Sending...</span>
                      </>
                    )}
                    {formStatus === 'success' && (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        <span>Message Sent!</span>
                      </>
                    )}
                    {formStatus === 'error' && (
                      <>
                        <span>Error Sending</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;