"use client"
import React, { useState } from 'react';
import { 
  Star, 
  Phone, 
  Mail, 
  BadgeCheck,
  X
} from 'lucide-react';

// Simulated Agents Data (same as previous version)
const agentsData = [
  {
    id: 1,
    name: "Emily Rodriguez",
    title: "Senior Real Estate Broker",
    avatar: "/api/placeholder/400/400",
    bio: "12 years of experience in luxury real estate, specializing in high-end properties and personalized client experiences.",
    verified: true,
    rating: 4.8,
    totalReviews: 124,
    phone: "(555) 123-4567",
    email: "emily.rodriz@realestate.com",
    services: [
      "Residential Sales",
      "Luxury Properties",
      "Investment Properties"
    ]
  },
  {
    id: 2,
    name: "David Chen",
    title: "Real Estate Agent",
    avatar: "/api/placeholder/400/400",
    bio: "Focused on first-time homebuyers and investment properties with deep local market expertise.",
    verified: false,
    rating: 4.5,
    totalReviews: 87,
    phone: "(555) 987-6543",
    email: "david.chen@realestate.com",
    services: [
      "First-Time Buyers",
      "Investment Properties",
      "Market Analysis"
    ]
  }
];

const AgentCard = ({ agent, onDetailsClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img 
          src={agent.avatar} 
          alt={agent.name} 
          className="w-full h-64 object-cover"
        />
        {agent.verified && (
          <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full flex items-center">
            <BadgeCheck className="mr-2 w-4 h-4" /> Verified
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{agent.name}</h3>
            <p className="text-gray-600">{agent.title}</p>
          </div>
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-1" />
            <span className="font-semibold">{agent.rating}</span>
            <span className="text-gray-500 ml-1">({agent.totalReviews})</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 h-16">{agent.bio}</p>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
          <div className="flex flex-wrap gap-2">
            {agent.services.map((service, index) => (
              <span 
                key={index} 
                className="bg-teal-50 text-teal-600 text-sm px-3 py-1 rounded-full"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center mb-1">
              <Phone className="w-4 h-4 mr-2 text-teal-500" />
              <span>{agent.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-teal-500" />
              <span className="text-sm">{agent.email}</span>
            </div>
          </div>
          <button 
            onClick={() => onDetailsClick(agent)}
            className="bg-teal-500 text-white cursor-pointer text-nowrap px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const AgentsPage = () => {
  const [filterVerified, setFilterVerified] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const filteredAgents = filterVerified 
    ? agentsData.filter(agent => agent.verified)
    : agentsData;

  const handleAgentDetailsClick = (agent) => {
    setSelectedAgent(agent);
  };

  const handleCloseModal = () => {
    setSelectedAgent(null);
  };

  return (
    <div className="bg-teal-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Our Real Estate Experts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of dedicated professionals is committed to helping you find your perfect property. 
            With extensive market knowledge and personalized service, we turn your real estate dreams into reality.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-md inline-flex">
            <button 
              onClick={() => setFilterVerified(false)}
              className={`
                px-6 py-2 rounded-full transition-colors
                ${!filterVerified 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'}
              `}
            >
              All Agents
            </button>
            <button 
              onClick={() => setFilterVerified(true)}
              className={`
                px-6 py-2 rounded-full transition-colors
                ${filterVerified 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'}
              `}
            >
              Verified Agents
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.map(agent => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              onDetailsClick={handleAgentDetailsClick}
            />
          ))}
        </div>

        {/* Modal for Full Agent Details */}
        {selectedAgent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
              
              {/* Detailed Agent Information */}
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <img 
                    src={selectedAgent.avatar} 
                    alt={selectedAgent.name} 
                    className="w-24 h-24 rounded-full mr-6 object-cover"
                  />
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">{selectedAgent.name}</h2>
                    <p className="text-gray-600">{selectedAgent.title}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Biography</h3>
                    <p className="text-gray-600 mb-4">{selectedAgent.bio}</p>
                    
                    <h3 className="text-xl font-semibold mb-4">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAgent.services.map((service, index) => (
                        <span 
                          key={index} 
                          className="bg-teal-50 text-teal-600 text-sm px-3 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Phone className="w-5 h-5 mr-3 text-teal-500" />
                        <span>{selectedAgent.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-teal-500 text-wrap" />
                        <span>{selectedAgent.email}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-4">Performance</h3>
                    <div className="flex items-center">
                      <Star className="text-yellow-500 mr-2" />
                      <span className="text-lg font-semibold">{selectedAgent.rating}</span>
                      <span className="text-gray-500 ml-2">
                        ({selectedAgent.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentsPage;