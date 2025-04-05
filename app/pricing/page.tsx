"use client"

import React, { useState } from 'react';
import { Check, ArrowRight, Star, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

// TypeScript interfaces
interface Feature {
  name: string;
  tooltip?: string;
}

interface PricingPlan {
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  features: Feature[] | string[];
  mostPopular: boolean;
  ctaText?: string;
  badge?: string;
}

interface PricingPlans {
  [key: string]: {
    monthly: PricingPlan[];
    yearly?: PricingPlan[];
  };
}

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userType, setUserType] = useState<'agent' | 'company'>('agent');

  const calculateYearlyPrice = (monthlyPrice: number): string => {
    // 17% off means paying for 10.5 months instead of 12
    return (monthlyPrice * 12 * 0.83).toFixed(2);
  };

  const plans: PricingPlans = {
    agent: {
      monthly: [
        {
          name: 'Starter',
          price: 29,
          yearlyPrice: parseFloat(calculateYearlyPrice(29)),
          description: 'Perfect for individual agents',
          badge: 'Basic',
          features: [
            { name: 'Up to 5 active property listings', tooltip: 'List up to 5 properties simultaneously' },
            { name: 'Basic property details', tooltip: 'Include essential information about your properties' },
            { name: 'Standard photo uploads', tooltip: 'Upload and display high-quality images' },
            { name: 'Email support', tooltip: '24-48 hour response time' },
            { name: 'Lead capture form', tooltip: 'Collect potential client information' }
          ],
          mostPopular: false,
          ctaText: 'Start your journey'
        },
        {
          name: 'Professional',
          price: 99,
          yearlyPrice: parseFloat(calculateYearlyPrice(99)),
          description: 'Ideal for established agents',
          badge: 'Popular',
          features: [
            { name: 'Up to 25 active property listings', tooltip: 'List up to 25 properties simultaneously' },
            { name: 'Advanced property details', tooltip: 'Include comprehensive property information' },
            { name: 'Professional photo gallery', tooltip: 'Create stunning visual showcases' },
            { name: 'Priority email & chat support', tooltip: '4-8 hour response time' },
            { name: '3D virtual tour integration', tooltip: 'Offer immersive property experiences' },
            { name: 'Market analysis reports', tooltip: 'Provide data-driven insights' },
            { name: 'Social media marketing tools', tooltip: 'Promote listings across platforms' }
          ],
          mostPopular: true,
          ctaText: 'Upgrade now'
        },
        {
          name: 'Elite',
          price: 249,
          yearlyPrice: parseFloat(calculateYearlyPrice(249)),
          description: 'Comprehensive solution for top agents',
          badge: 'Premium',
          features: [
            { name: 'Unlimited property listings', tooltip: 'No restriction on the number of listings' },
            { name: 'Premium listing placement', tooltip: 'Get featured at the top of search results' },
            { name: 'Advanced marketing tools', tooltip: 'Access to our complete marketing suite' },
            { name: 'Dedicated account manager', tooltip: 'Personal support from our team' },
            { name: 'Custom branding', tooltip: 'Tailor the experience to your brand' },
            { name: 'Comprehensive analytics', tooltip: 'Deep insights into performance metrics' },
            { name: 'AI-powered lead scoring', tooltip: 'Identify high-value prospects automatically' },
            { name: 'White-label reporting', tooltip: 'Create branded reports for clients' }
          ],
          mostPopular: false,
          ctaText: 'Dominate your market'
        }
      ]
    },
    company: {
      monthly: [
        {
          name: 'Small Brokerage',
          price: 199,
          yearlyPrice: parseFloat(calculateYearlyPrice(199)),
          description: 'For small real estate firms',
          badge: 'Teams',
          features: [
            { name: 'Up to 10 user accounts', tooltip: 'Support for your entire small team' },
            { name: '50 active property listings', tooltip: 'Showcase your brokerage portfolio' },
            { name: 'Team collaboration tools', tooltip: 'Work efficiently together' },
            { name: 'Shared listing dashboard', tooltip: 'Centralized property management' },
            { name: 'Basic performance tracking', tooltip: 'Monitor key metrics' },
            { name: 'Email support', tooltip: '24-48 hour response time' }
          ],
          mostPopular: false,
          ctaText: 'Empower your team'
        },
        {
          name: 'Mid-size Brokerage',
          price: 499,
          yearlyPrice: parseFloat(calculateYearlyPrice(499)),
          description: 'For growing real estate companies',
          badge: 'Business',
          features: [
            { name: 'Up to 25 user accounts', tooltip: 'Scale your team as needed' },
            { name: 'Unlimited property listings', tooltip: 'No limits on your portfolio size' },
            { name: 'Advanced team management', tooltip: 'Organize and optimize your workforce' },
            { name: 'Comprehensive analytics', tooltip: 'Deep insights into performance metrics' },
            { name: 'Custom branding', tooltip: 'Maintain your company identity' },
            { name: 'Priority support', tooltip: '4-8 hour response time' },
            { name: 'CRM integration', tooltip: 'Connect with your existing tools' },
            { name: 'Training resources', tooltip: 'Onboard new agents efficiently' }
          ],
          mostPopular: true,
          ctaText: 'Scale your business'
        },
        {
          name: 'Enterprise',
          price: 999,
          yearlyPrice: parseFloat(calculateYearlyPrice(999)),
          description: 'Comprehensive solution for large firms',
          badge: 'Enterprise',
          features: [
            { name: 'Unlimited user accounts', tooltip: 'No restrictions on team size' },
            { name: 'Unlimited property listings', tooltip: 'Support for your entire inventory' },
            { name: 'Full custom integration', tooltip: 'Connect with your entire tech stack' },
            { name: 'Dedicated account manager', tooltip: 'Personal assistance available anytime' },
            { name: 'Advanced AI tools', tooltip: 'Cutting-edge technology advantages' },
            { name: 'Custom reporting', tooltip: 'Tailor analytics to your needs' },
            { name: 'Enterprise-grade security', tooltip: 'Top-tier data protection' },
            { name: 'Quarterly business reviews', tooltip: 'Strategic planning sessions' }
          ],
          mostPopular: false,
          ctaText: 'Transform your enterprise'
        }
      ]
    }
  };

  // Dynamically populate yearly pricing with discounted rates
  Object.keys(plans).forEach((type) => {
    plans[type].yearly = plans[type].monthly.map((plan) => ({
      ...plan,
      price: parseFloat((plan.yearlyPrice / 12).toFixed(2)), // Showing monthly equivalent for yearly billing
      description: `${plan.description} - Billed annually`
    }));
  });

  // Format price for display
  const formatPrice = (price: number): string => {
    const [dollars, cents] = price.toFixed(2).split('.');
    return (
      <>
        <span className="text-5xl font-extrabold">${dollars}</span>
        <span className="text-xl">.{cents}</span>
      </>
    ) as unknown as string; // Type assertion to satisfy typescript
  };

  return (
    <TooltipProvider>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your real estate needs. No hidden fees, no complicated contracts.
            </p>
          </div>

          {/* User Type Selector */}
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-full p-1.5 flex items-center shadow-lg max-w-md w-full">
              {['agent', 'company'].map((type) => (
                <button
                  key={type}
                  onClick={() => setUserType(type as 'agent' | 'company')}
                  className={`
                    flex-1 px-6 py-3 rounded-full transition-all duration-300 font-medium
                    ${userType === type
                      ? 'bg-[#348b8b] text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                    }
                    capitalize text-center
                  `}
                >
                  {type} Plans
                </button>
              ))}
            </div>
          </div>

          {/* Billing Cycle Selector with Switch */}
          <div className="flex justify-center mb-16">
            <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-md">
              <span className={`px-4 py-2 font-medium ${billingCycle === 'monthly' ? 'text-[#348b8b]' : 'text-gray-500'}`}>Monthly</span>
              
              <div className="flex items-center">
                <Switch
                  id="billing-toggle"
                  checked={billingCycle === 'yearly'}
                  onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
                  className="data-[state=checked]:bg-[#348b8b]"
                />
              </div>
              
              <div className="flex items-center">
                <span className={`px-4 py-2 font-medium ${billingCycle === 'yearly' ? 'text-[#348b8b]' : 'text-gray-500'}`}>Yearly</span>
                <Badge className="ml-2 bg-[#348b8b]">Save 17%</Badge>
              </div>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mt-8">
            {plans[userType][billingCycle]?.map((plan) => (
              <Card
                key={plan.name}
                className={`
                  overflow-hidden transition-all duration-300 border
                  ${plan.mostPopular ? 'border-[#348b8b] shadow-xl shadow-[#348b8b]/10' : 'border-gray-200 shadow-lg'}
                  hover:shadow-2xl hover:transform hover:-translate-y-1
                  relative
                `}
              >
                {plan.mostPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-[#348b8b] text-white text-center py-1.5 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <CardHeader className={`${plan.mostPopular ? 'pt-10' : 'pt-6'} text-center`}>
                  <div className="flex justify-center mb-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      {plan.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 min-h-12">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-0">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="flex items-baseline">
                      {formatPrice(plan.price)}
                      <span className="text-gray-600 ml-2 text-lg">/ month</span>
                    </div>
                  </div>

                  {billingCycle === 'yearly' && (
                    <div className="-mt-4 mb-6 text-sm text-gray-600">
                      ${(plan.price * 12).toFixed(2)} billed yearly
                    </div>
                  )}

                  <button
                    className={`
                      w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center
                      ${plan.mostPopular
                        ? 'bg-[#348b8b] text-white hover:bg-[#297979]'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                      }
                    `}
                  >
                    {plan.ctaText || 'Get Started'} <ArrowRight className="ml-2 w-5 h-5" />
                  </button>

                  <div className="mt-8 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-[#348b8b]" />
                      Included Features
                    </h3>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => {
                        const isFeatureObject = typeof feature !== 'string';
                        const featureName = isFeatureObject ? (feature as Feature).name : feature;
                        const tooltip = isFeatureObject ? (feature as Feature).tooltip : undefined;

                        return (
                          <li key={i} className="flex items-center text-gray-700">
                            <div className="w-5 h-5 mr-3 flex-shrink-0 text-[#348b8b]">
                              <Check className="w-full h-full" />
                            </div>
                            <div className="flex items-center">
                              {featureName}
                              {tooltip && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="w-4 h-4 ml-1.5 text-gray-400 cursor-pointer hover:text-gray-600" />
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    <p>{tooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="px-6 py-4 mt-6 bg-gray-50 border-t border-gray-100">
                  <p className="text-sm text-gray-600 w-full text-center">
                    {plan.mostPopular ? 'Most popular choice for real estate professionals' : 'Cancel or change plans anytime'}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Custom Solution CTA */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Solution?</h2>
            <p className="text-gray-600 mb-6">
              Our team can create a tailored plan to meet your specific business requirements and goals.
            </p>
            <button className="inline-flex items-center px-6 py-3 rounded-lg bg-[#348b8b] text-white hover:bg-[#297979] transition-colors font-semibold">
              Contact our sales team <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          {/* Testimonials */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl font-bold mb-12">Trusted by Real Estate Professionals</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "This platform revolutionized how I manage my listings. Worth every penny.",
                  name: "Sarah Johnson",
                  title: "Independent Agent, 10+ years"
                },
                {
                  quote: "The marketing tools have helped us increase conversion rates by over 30%.",
                  name: "Michael Chen",
                  title: "Broker, Golden Gate Properties"
                },
                {
                  quote: "Our team's productivity doubled after switching to this platform.",
                  name: "Jessica Rivera",
                  title: "Team Lead, Coastal Homes"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex justify-center mb-4 text-[#348b8b]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default PricingPage;