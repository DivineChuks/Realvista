"use client"
import React, { useEffect, useState } from 'react';
import { 
  Star, 
  Phone, 
  Mail, 
  BadgeCheck,
  X,
  MapPin,
  Calendar,
  Building,
  ArrowRight,
  Search,
  Filter,
  MessageSquare
} from 'lucide-react';
import api from '@/config/apiClient';

// Define TypeScript interfaces based on API response
interface Agent {
  id: number;
  user: string;
  avatar: string | null;
  agency_name: string;
  agency_address: string;
  phone_number: string;
  whatsapp_number: string;
  experience_years: number;
  preferred_contact_mode: string;
  verified: boolean;
  featured: boolean;
  bio: string;
  created_at: string;
  updated_at: string;
  rating?: number;
  total_reviews?: number;
  services?: string[];
}

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  main_image: string | null;
}

interface AgentWithListings extends Agent {
  listings?: Property[];
}

interface AgentCardProps {
  agent: Agent;
  onDetailsClick: (id: number) => void;
}

interface PropertyCardProps {
  property: Property;
}

interface AgentDetailModalProps {
  agentId: number;
  onClose: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, onDetailsClick }) => {
  // Create default services array if none provided by API
  const services = agent.services || [
    agent.agency_name ? "Agency Representation" : "Independent Agent",
    `${agent.experience_years}+ Years Experience`
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img 
          src={agent.avatar || "/api/placeholder/400/400"} 
          alt={agent.agency_name} 
          className="w-full h-64 object-cover"
        />
        {agent.verified && (
          <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full flex items-center">
            <BadgeCheck className="mr-2 w-4 h-4" /> Verified
          </div>
        )}
        {agent.featured && (
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">{agent.agency_name}</h3>
            <p className="text-gray-600">{agent.user}</p>
          </div>
          <div className="flex items-center">
            <Star className="text-yellow-500 mr-1" />
            <span className="font-semibold">{agent.rating || 5.0}</span>
            <span className="text-gray-500 ml-1">({agent.total_reviews || 0})</span>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{agent.bio}</p>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">Services</h4>
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
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
              <span>{agent.phone_number}</span>
            </div>
            {agent.preferred_contact_mode === "whatsapp" && (
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-teal-500" />
                <span className="text-sm">WhatsApp Preferred</span>
              </div>
            )}
          </div>
          <button 
            onClick={() => onDetailsClick(agent.id)}
            className="bg-teal-500 text-white cursor-pointer text-nowrap px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={property.main_image || "/api/placeholder/400/300"} 
          alt={property.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <span className="text-white font-bold text-lg">${property.price.toLocaleString()}</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-gray-800 mb-2">{property.title}</h4>
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-1" />
            <span>{property.bedrooms} bd | {property.bathrooms} ba</span>
          </div>
          <div>
            <span>{property.area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentDetailModal: React.FC<AgentDetailModalProps> = ({ agentId, onClose }) => {
  const [agent, setAgent] = useState<AgentWithListings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/agents/${agentId}/`);
        setAgent(response.data);
      } catch (error) {
        console.error("Error fetching agent details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (agentId) {
      fetchAgentDetails();
    }
  }, [agentId]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-4xl w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return null;
  }

  // Create default services array if none provided by API
  const services = agent.services || [
    agent.agency_name ? "Agency Representation" : "Independent Agent",
    `${agent.experience_years}+ Years Experience`
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 bg-white rounded-full p-1 shadow-md z-10"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="relative">
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-48"></div>
          <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 flex justify-center">
            <img 
              src={agent.avatar || "/api/placeholder/200/200"} 
              alt={agent.agency_name} 
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>
        </div>
        
        <div className="mt-16 p-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">{agent.agency_name}</h2>
            <p className="text-gray-600">{agent.user}</p>
            <div className="flex items-center justify-center mt-2">
              <Star className="text-yellow-500 mr-1" />
              <span className="font-semibold">{agent.rating || 5.0}</span>
              <span className="text-gray-500 ml-1">({agent.total_reviews || 0} reviews)</span>
              {agent.verified && (
                <span className="ml-3 bg-teal-50 text-teal-600 px-3 py-1 rounded-full flex items-center text-sm">
                  <BadgeCheck className="mr-1 w-4 h-4" /> Verified Agent
                </span>
              )}
              {agent.featured && (
                <span className="ml-3 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Featured
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">About</h3>
                <p className="text-gray-600">{agent.bio}</p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-teal-100 rounded-full p-2 mr-4">
                      <Phone className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{agent.phone_number}</p>
                    </div>
                  </div>
                  
                  {agent.whatsapp_number && (
                    <div className="flex items-center">
                      <div className="bg-teal-100 rounded-full p-2 mr-4">
                        <MessageSquare className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">WhatsApp</p>
                        <p className="font-medium">{agent.whatsapp_number}</p>
                        {agent.preferred_contact_mode === "whatsapp" && (
                          <p className="text-xs text-teal-600">Preferred contact method</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <div className="bg-teal-100 rounded-full p-2 mr-4">
                      <Mail className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{agent.user}</p>
                    </div>
                  </div>
                  
                  {agent.agency_address && (
                    <div className="flex items-center">
                      <div className="bg-teal-100 rounded-full p-2 mr-4">
                        <MapPin className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Office</p>
                        <p className="font-medium">{agent.agency_address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Specializations</h3>
                <div className="flex flex-wrap gap-2">
                  {services.map((service, index) => (
                    <span 
                      key={index} 
                      className="bg-teal-50 text-teal-600 px-3 py-2 rounded-lg"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Experience & Credentials</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-teal-600" />
                    <span>{agent.experience_years} Years in Real Estate</span>
                  </div>
                  <div className="flex items-center">
                    <BadgeCheck className="w-5 h-5 mr-3 text-teal-600" />
                    <span>Member since {new Date(agent.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Agent's Listings Section */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Current Listings</h3>
            {agent.listings && agent.listings.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agent.listings.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <p className="text-gray-600">No active listings at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentsPage: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterVerified, setFilterVerified] = useState<boolean>(false);
  const [filterFeatured, setFilterFeatured] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [experienceFilter, setExperienceFilter] = useState<string>("all");

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const response = await api.get('/agents/');
        setAgents(response.data);
        setFilteredAgents(response.data);
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAgents();
  }, []);

  useEffect(() => {
    let result = [...agents];
    
    // Apply verified filter if selected
    if (filterVerified) {
      result = result.filter(agent => agent.verified);
    }
    
    // Apply featured filter if selected
    if (filterFeatured) {
      result = result.filter(agent => agent.featured);
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(agent => 
        agent.agency_name.toLowerCase().includes(term) || 
        agent.bio.toLowerCase().includes(term) ||
        agent.agency_address.toLowerCase().includes(term)
      );
    }
    
    // Apply experience filter
    if (experienceFilter !== "all") {
      const minExperience = parseInt(experienceFilter);
      result = result.filter(agent => agent.experience_years >= minExperience);
    }
    
    setFilteredAgents(result);
  }, [agents, filterVerified, filterFeatured, searchTerm, experienceFilter]);

  const handleAgentDetailsClick = (agentId: number) => {
    setSelectedAgentId(agentId);
  };

  const handleCloseModal = () => {
    setSelectedAgentId(null);
  };

  if (loading) {
    return (
      <div className="bg-teal-50 min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-teal-50 to-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Our Real Estate Experts
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team of dedicated professionals is committed to helping you find your perfect property. 
            With extensive market knowledge and personalized service, we turn your real estate dreams into reality.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="verified"
                    checked={filterVerified}
                    onChange={() => setFilterVerified(!filterVerified)}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="verified" className="ml-2 text-gray-700">
                    Verified
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={filterFeatured}
                    onChange={() => setFilterFeatured(!filterFeatured)}
                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <label htmlFor="featured" className="ml-2 text-gray-700">
                    Featured
                  </label>
                </div>
                
                <div className="relative w-full md:w-auto">
                  <Filter className="absolute left-3 top-3 text-gray-400" />
                  <select
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 py-2 px-10 rounded-full leading-tight focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="all">All Experience Levels</option>
                    <option value="1">At least 1 year</option>
                    <option value="3">At least 3 years</option>
                    <option value="5">At least 5 years</option>
                    <option value="10">At least 10 years</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                    <ArrowRight className="w-4 h-4 text-gray-400 transform rotate-90" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredAgents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAgents.map(agent => (
              <AgentCard 
                key={agent.id} 
                agent={agent} 
                onDetailsClick={handleAgentDetailsClick}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">No agents found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any agents matching your current filters. Please try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterVerified(false);
                setFilterFeatured(false);
                setExperienceFilter("all");
              }}
              className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Agent Detail Modal */}
        {selectedAgentId && (
          <AgentDetailModal
            agentId={selectedAgentId}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default AgentsPage;