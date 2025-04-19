"use client";

import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Phone, MessageCircle, Award, Clock, Mail, MapPin, Building, Star, ChevronUp } from "lucide-react";
import api from '@/config/apiClient';

// Define types
interface Agent {
  id: number;
  user: string;
  avatar: string | null;
  agency_name: string;
  agency_address: string | null;
  phone_number: string;
  whatsapp_number: string | null;
  experience_years: number;
  preferred_contact_mode: string;
  verified: boolean;
  featured: boolean;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  listing_type: string;
  photos: string[];
  agent: number;
  [key: string]: any; // For any additional fields
}

const FeaturedAgents: React.FC = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentListings, setAgentListings] = useState<Listing[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  // Brand color
  const primaryColor = "#348b8b";

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const response = await api.get('/agents/');
        const featuredAgents = response.data.filter((agent: Agent) => agent.verified === true && agent.featured === true);
        setAgents(featuredAgents);
        setFilteredAgents(featuredAgents);
      } catch (error) {
        console.error("Error fetching agents:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAgents();
  }, []);

  const fetchAgentDetails = async (agentId: number) => {
    setLoading(true);
    try {
      const agentResponse = await api.get(`/agents/${agentId}/`);
      setSelectedAgent(agentResponse.data);
      
      // Fetch this agent's listings
      const listingsResponse = await api.get(`/listings/?agent=${agentId}`);
      setAgentListings(listingsResponse.data);
    } catch (error) {
      console.error("Error fetching agent details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (agent: Agent) => {
    await fetchAgentDetails(agent.id);
    setIsDialogOpen(true);
  };

  const getInitials = (name: string | null | undefined): string => {
    if (!name) return "AG";
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-20 relative" style={{ background: `linear-gradient(to bottom, ${primaryColor}05, ${primaryColor}15)` }}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: primaryColor }}></div>
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full opacity-5" style={{ backgroundColor: primaryColor, transform: 'translate(30%, 30%)' }}></div>
      <div className="absolute top-20 left-0 h-32 w-32 rounded-full opacity-5" style={{ backgroundColor: primaryColor, transform: 'translate(-30%, -30%)' }}></div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4 text-white" style={{ backgroundColor: primaryColor }}>Our Experts</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Agents</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Meet our exceptional real estate professionals dedicated to helping you find your perfect property and navigate the market with confidence.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: `${primaryColor} transparent ${primaryColor} ${primaryColor}` }}></div>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="text-center py-12">
            <Building className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-500">No featured agents available at the moment</h3>
          </div>
        ) : (
          <Carousel className="w-full max-w-6xl mx-auto" opts={{ loop: true }}>
            <CarouselContent className="-ml-4">
              {filteredAgents.map((agent) => (
                <CarouselItem key={agent.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl border-0 shadow-md">
                    <div className="h-2 w-full" style={{ backgroundColor: primaryColor }}></div>
                    <CardContent className="pt-8 pb-4 flex-grow">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                            {agent.avatar ? (
                              <AvatarImage src={agent.avatar} alt={agent.agency_name} />
                            ) : (
                              <AvatarFallback style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                                {getInitials(agent.agency_name)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          {agent.verified && (
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold mb-1">{agent.agency_name}</h3>
                        <div className="flex items-center justify-center gap-1 mb-4">
                          <Award className="h-4 w-4" style={{ color: primaryColor }} />
                          <span className="text-sm text-gray-600">
                            {agent.experience_years} {agent.experience_years === 1 ? 'Year' : 'Years'} Experience
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-6 px-2">
                          {agent.bio || "Professional real estate agent committed to providing exceptional service and finding the perfect property to meet your needs."}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 pb-6 px-6">
                      <Button 
                        onClick={() => handleViewDetails(agent)}
                        className="w-full text-white shadow-md cursor-pointer transition-all hover:shadow-lg"
                        style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-10 gap-4">
              <CarouselPrevious 
                className="static transform-none mx-1 bg-white border-0 shadow-md hover:shadow-lg" 
                style={{ color: primaryColor }}
              />
              <CarouselNext 
                className="static transform-none mx-1 bg-white border-0 shadow-md hover:shadow-lg"
                style={{ color: primaryColor }}
              />
            </div>
          </Carousel>
        )}
        
        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-50 text-white transition-all hover:shadow-xl"
          style={{ backgroundColor: primaryColor }}
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      </div>

      {/* Agent Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-y-auto">
          {selectedAgent && (
            <>
              <DialogHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <DialogTitle className="text-2xl font-bold">{selectedAgent.agency_name}</DialogTitle>
                  <div className="flex gap-2">
                    {selectedAgent.verified && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        <Star className="w-3 h-3 mr-1 fill-green-800" /> Verified
                      </Badge>
                    )}
                    {selectedAgent.featured && (
                      <Badge style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                        <Award className="w-3 h-3 mr-1" /> Featured
                      </Badge>
                    )}
                  </div>
                </div>
                <DialogDescription>
                  Professional real estate agent with {selectedAgent.experience_years} {selectedAgent.experience_years === 1 ? 'year' : 'years'} of experience
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex flex-col md:flex-row gap-8 py-6">
                <div className="md:w-1/3 flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-6 border-4 border-white shadow-md">
                    {selectedAgent.avatar ? (
                      <AvatarImage src={selectedAgent.avatar} alt={selectedAgent.agency_name} />
                    ) : (
                      <AvatarFallback style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                        {getInitials(selectedAgent.agency_name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="space-y-3 w-full bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2 text-center" style={{ color: primaryColor }}>Contact Information</h4>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                        <Phone className="h-4 w-4" style={{ color: primaryColor }} />
                      </div>
                      <span className="text-sm">{selectedAgent.phone_number}</span>
                    </div>
                    {selectedAgent.whatsapp_number && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                          <MessageCircle className="h-4 w-4" style={{ color: primaryColor }} />
                        </div>
                        <span className="text-sm">{selectedAgent.whatsapp_number}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                        <Mail className="h-4 w-4" style={{ color: primaryColor }} />
                      </div>
                      <span className="text-sm">{selectedAgent.user}</span>
                    </div>
                    {selectedAgent.agency_address && (
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                          <MapPin className="h-4 w-4" style={{ color: primaryColor }} />
                        </div>
                        <span className="text-sm">{selectedAgent.agency_address}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full" style={{ backgroundColor: `${primaryColor}20` }}>
                        <Clock className="h-4 w-4" style={{ color: primaryColor }} />
                      </div>
                      <span className="text-sm">Member since {new Date(selectedAgent.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 w-full">
                    <h4 className="font-medium mb-2">Preferred Contact Method</h4>
                    <Badge className="w-full justify-center py-2 capitalize" style={{ backgroundColor: primaryColor }}>
                      {selectedAgent.preferred_contact_mode}
                    </Badge>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <Tabs defaultValue="about">
                    <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: `${primaryColor}20` }}>
                      <TabsTrigger 
                        value="about" 
                        className="data-[state=active]:text-white" 
                        style={{ 
                          color: primaryColor, 
                          "--accent-foreground": "white",
                          "--accent": primaryColor 
                        } as React.CSSProperties}
                      >
                        About
                      </TabsTrigger>
                      <TabsTrigger 
                        value="listings" 
                        className="data-[state=active]:text-white" 
                        style={{ 
                          color: primaryColor, 
                          "--accent-foreground": "white",
                          "--accent": primaryColor 
                        } as React.CSSProperties}
                      >
                        Properties
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="about" className="mt-6">
                      <h4 className="font-medium mb-3 text-lg" style={{ color: primaryColor }}>Agent Bio</h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {selectedAgent.bio || "No bio information available. This agent has not provided a detailed bio yet."}
                        </p>
                      </div>
                      
                      <h4 className="font-medium mb-3 mt-6 text-lg" style={{ color: primaryColor }}>Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Residential</Badge>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Commercial</Badge>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Luxury</Badge>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Investment</Badge>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="listings" className="mt-6">
                      {loading ? (
                        <div className="flex justify-center py-12">
                          <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: `${primaryColor} transparent ${primaryColor} ${primaryColor}` }}></div>
                        </div>
                      ) : agentListings.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {agentListings.map(listing => (
                            <Card key={listing.id} className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all cursor-pointer">
                              <div className="h-44 bg-gray-200 relative">
                                {listing.photos && listing.photos.length > 0 ? (
                                  <img 
                                    src={listing.photos[0]} 
                                    alt={listing.title} 
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <Building className="h-8 w-8 text-gray-400" />
                                  </div>
                                )}
                                <Badge 
                                  className="absolute top-2 right-2 text-white"
                                  style={{ backgroundColor: primaryColor }}
                                >
                                  {listing.listing_type}
                                </Badge>
                              </div>
                              <CardContent className="p-4">
                                <h5 className="font-medium mb-1 line-clamp-1 text-lg">{listing.title}</h5>
                                <p className="text-gray-500 text-sm mb-2 line-clamp-1 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1 inline" /> {listing.location}
                                </p>
                                <p className="font-semibold text-lg" style={{ color: primaryColor }}>${listing.price.toLocaleString()}</p>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <Building className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                          <p className="text-gray-500">No active listings available from this agent.</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FeaturedAgents;