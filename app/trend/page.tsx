"use client"
import React, { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Home, 
  DollarSign, 
  ChevronDown, 
  BarChart2, 
  Globe 
} from 'lucide-react';

// Simulated Trend Data
const marketTrends = [
  {
    id: 1,
    title: "Urban Migration Shift",
    description: "Increasing interest in suburban and rural properties post-pandemic, with remote work driving location flexibility.",
    icon: <Globe className="w-8 h-8 text-teal-500" />,
    category: "Location"
  },
  {
    id: 2,
    title: "Smart Home Integration",
    description: "Rising demand for properties with advanced technology, energy efficiency, and home automation systems.",
    icon: <Home className="w-8 h-8 text-teal-500" />,
    category: "Technology"
  },
  {
    id: 3,
    title: "Investment Hotspots",
    description: "Emerging neighborhoods with high potential for appreciation and rental income.",
    icon: <DollarSign className="w-8 h-8 text-teal-500" />,
    category: "Investment"
  }
];

const marketData = [
  { name: '2022', Median: 350000, Average: 385000 },
  { name: '2023', Median: 375000, Average: 412000 },
  { name: '2024', Median: 402000, Average: 445000 }
];

const TrendsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All', 
    ...new Set(marketTrends.map(trend => trend.category))
  ];

  const filteredTrends = selectedCategory === 'All' 
    ? marketTrends 
    : marketTrends.filter(trend => trend.category === selectedCategory);

  return (
    <div className="bg-teal-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-2 mb-8 shadow-md">
            <TrendingUp className="mr-2 text-[#348b8b]" />
            <span className="text-gray-700">Real Estate Market Insights</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Market Trends & Insights
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest real estate market trends, investment opportunities, 
            and emerging patterns shaping the property landscape.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full shadow-md inline-flex">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-2 rounded-full transition-colors
                  ${selectedCategory === category 
                    ? 'bg-[#348b8b] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Trends Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {filteredTrends.map(trend => (
            <div 
              key={trend.id} 
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center mb-4">
                {trend.icon}
                <h3 className="text-xl font-bold ml-4 text-gray-800">{trend.title}</h3>
              </div>
              <p className="text-gray-600">{trend.description}</p>
            </div>
          ))}
        </div>

        {/* Market Overview */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <BarChart2 className="w-8 h-8 mr-4 text-[#348b8b]" />
            <h2 className="text-3xl font-bold text-gray-800">Market Performance</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Property Value Trends
              </h3>
              <div className="space-y-4">
                {marketData.map(data => (
                  <div key={data.name} className="bg-teal-50 rounded-lg p-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">{data.name}</span>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-[#348b8b]" />
                          <span>Median: ${data.Median.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1 text-[#348b8b]" />
                          <span>Average: ${data.Average.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Key Market Insights
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start bg-teal-50 p-4 rounded-lg">
                  <MapPin className="w-6 h-6 mr-4 text-[#348b8b] flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Growing Markets</p>
                    <p className="text-gray-600 text-sm">
                      Suburban areas showing 15% price appreciation
                    </p>
                  </div>
                </li>
                <li className="flex items-start bg-teal-50 p-4 rounded-lg">
                  <Home className="w-6 h-6 mr-4 text-[#348b8b] flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Inventory Trends</p>
                    <p className="text-gray-600 text-sm">
                      Low inventory driving competitive market conditions
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendsPage;