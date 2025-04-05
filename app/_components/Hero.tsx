import React from 'react';
import { Download, ArrowRight, Star, Award, Building, Users } from 'lucide-react';

const RealvistaHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-teal-50 to-[#dbe8e8] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-teal-300 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-teal-200 rounded-full opacity-10 blur-2xl"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 pt-28 pb-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 max-w-xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-teal-100 shadow-sm">
              <span className="text-xs font-medium text-teal-800 mr-2">🏆</span>
              <span className="text-xs font-medium text-teal-800">#1 Most Popular Real Estate Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Make <span className="text-orange-500">smarter</span> real estate decisions
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              From buying and selling to real-time profit tracking, Realvista empowers you with the tools to succeed in today&apos;s property market.
            </p>
            
            <div className="flex flex-wrap gap-4 items-center">
              <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 font-medium">
                <Download size={20} />
                Download App
              </button>
              
              <button className="flex items-center gap-2 bg-white text-gray-800 border border-gray-200 px-6 py-3 rounded-xl hover:bg-gray-50 transition-all shadow-md">
                <ArrowRight size={20} className="text-orange-500" />
                <span>Learn More</span>
              </button>
            </div>
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200/50">
              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <Building size={20} className="text-teal-600 mx-auto md:mx-0" />
                  <p className="text-2xl font-bold text-gray-900">10K+</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Properties Listed</p>
              </div>
              
              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <Users size={20} className="text-teal-600 mx-auto md:mx-0" />
                  <p className="text-2xl font-bold text-gray-900">35K+</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">Active Users</p>
              </div>
              
              <div className="text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                  <Star size={20} className="text-orange-500 mx-auto md:mx-0" />
                  <p className="text-2xl font-bold text-gray-900">4.9</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">App Rating</p>
              </div>
            </div>
          </div>

          {/* Right Column - Image & Decorative Elements */}
          <div className="relative flex justify-center items-center h-full">
            {/* Decorative circles */}
            <div className="absolute w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-dashed border-teal-100 opacity-70 animate-spin-slow"></div>
            
            {/* Featured Image */}
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform md:rotate-2 transition-all duration-500 hover:rotate-0">
                <img
                  src="/hero-image.webp"
                  alt="Realvista App Interface"
                  className="w-full h-auto object-cover"
                />
                
                {/* Floating badge */}
                <div className="absolute -bottom-3 -right-3 transform rotate-12 bg-white p-3 rounded-xl shadow-lg">
                  <img
                    src="/ribbon.webp"
                    alt="Award"
                    className="w-20 h-auto"
                  />
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -left-8 bottom-1/4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-xl transform -rotate-6 z-20 border border-gray-100 hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <Award size={16} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">Top Rated</p>
                    <p className="text-xs text-gray-500">2024 Award</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-6 -top-10 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-xl transform rotate-3 z-20 border border-gray-100 hidden md:block">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center">
                    <Star size={12} className="text-teal-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-800">Free App</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trusted By Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur-sm py-4 border-t border-white/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm font-medium text-gray-600 mb-4 md:mb-0">Trusted by leading real estate agencies</p>
            <div className="flex items-center space-x-8 opacity-60">
              {/* Replace with actual partner logos */}
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
              <div className="h-6 w-20 bg-gray-400 rounded"></div>
              <div className="h-6 w-24 bg-gray-400 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealvistaHero;