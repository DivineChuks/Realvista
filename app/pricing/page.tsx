"use client"
import React, { useState } from 'react';
import { Check, ArrowRight, Star, Info, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// TypeScript interfaces
interface Feature {
  name: string;
  tooltip?: string;
}

interface PricingPlan {
  name: string;
  price: number | 'Free';
  yearlyPrice?: number;
  sixMonthPrice?: number;
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
    sixMonth?: PricingPlan[];
  };
}

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'sixMonth' | 'yearly'>('monthly');
  const [userType, setUserType] = useState<'individual' | 'team'>('individual');
  const [showBoostOptions, setShowBoostOptions] = useState<boolean>(false);

  const baseMonthlyPlans: PricingPlan[] = [
    {
      name: 'Free',
      price: 'Free',
      description: 'Perfect for new agents',
      badge: 'Free',
      features: [
        { name: 'Up to 2 property listings per month', tooltip: 'List up to 2 properties each month' },
        { name: 'Enhanced property features (images only)', tooltip: 'Include high-quality images for your properties' },
        { name: 'Standard customer support', tooltip: 'Access to our support team during business hours' },
        { name: 'Access to property search tools and filters', tooltip: 'Find properties that match specific criteria' },
        { name: 'Access to agent search and listings', tooltip: 'Connect with other real estate professionals' },
        { name: 'Option to list 5 properties in your portfolio', tooltip: 'Showcase up to 5 properties in your profile' },
        { name: 'Access to join a mutual fund group', tooltip: 'Participate in real estate investment groups' }
      ],
      mostPopular: false,
      ctaText: 'Get Started Free'
    },
    {
      name: 'Basic',
      price: 5000,
      sixMonthPrice: 4500, // 10% discount
      yearlyPrice: 3500, // 30% discount
      description: 'Perfect for individual agents',
      badge: 'Basic',
      features: [
        { name: 'Up to 10 property listings per month', tooltip: 'List up to 10 properties each month' },
        { name: 'Enhanced property features (images & videos)', tooltip: 'Include high-quality images and videos' },
        { name: 'Priority customer support', tooltip: 'Faster response times to your inquiries' },
        { name: 'Advanced listing analytics and market trends', tooltip: 'Get insights on your listing performance' },
        { name: 'Customizable agent profile', tooltip: 'Create a professional profile to attract clients' },
        { name: 'Free weekly property boost across our platforms', tooltip: 'Automatic weekly promotion to increase visibility' },
        { name: 'Access to free courses and materials', tooltip: 'Enhance your skills with our learning resources' },
        { name: 'Up to 10 property listings in your portfolio', tooltip: 'Showcase up to 10 properties in your profile' },
        { name: 'All features from the free plan', tooltip: 'Includes everything in the Free plan' },
        { name: 'Access to join a mutual fund group', tooltip: 'Participate in real estate investment groups' }
      ],
      mostPopular: true,
      ctaText: 'Choose Basic'
    },
    {
      name: 'Premium',
      price: 15000,
      sixMonthPrice: 13500, // 10% discount
      yearlyPrice: 10500, // 30% discount
      description: 'Advanced features for serious agents',
      badge: 'Premium',
      features: [
        { name: 'Unlimited property listings per month', tooltip: 'No restriction on the number of monthly listings' },
        { name: 'Advanced analytics, market trends & lead management', tooltip: 'Comprehensive insights and lead tracking' },
        { name: 'Premium property features (images & videos)', tooltip: 'Showcase your properties with high-quality media' },
        { name: 'Priority listing on search results', tooltip: 'Appear higher in search rankings' },
        { name: 'Featured listings across multiple channels', tooltip: 'Get exposure on our website, social media, and partner sites' },
        { name: '24/7 dedicated customer support', tooltip: 'Round-the-clock assistance' },
        { name: 'Unlimited property listings in portfolio', tooltip: 'No limit on properties in your profile' },
        { name: 'Customizable agent profile', tooltip: 'Create a standout professional profile' },
        { name: 'All features included in the previous plans', tooltip: 'Everything from Basic plan and more' },
        { name: 'Access to create limited mutual funding group', tooltip: 'Start your own investment groups' }
      ],
      mostPopular: false,
      ctaText: 'Go Premium'
    },
    {
      name: 'Enterprise',
      price: 70000,
      sixMonthPrice: 63000, // 10% discount
      yearlyPrice: 49000, // 30% discount
      description: 'Complete solution for teams and agencies',
      badge: 'Enterprise',
      features: [
        { name: 'Unlimited property listings per month', tooltip: 'List as many properties as you need' },
        { name: 'Up to 10 team members (Realtors)', tooltip: 'Add multiple agents to your account' },
        { name: 'Premium property features (images & videos)', tooltip: 'Showcase properties with high-quality media' },
        { name: 'Priority listing in search results', tooltip: 'Maximum visibility in search' },
        { name: 'Featured listings across all channels', tooltip: 'Prominent placement everywhere' },
        { name: 'Advanced monthly team reports and analytics', tooltip: 'Comprehensive performance insights' },
        { name: 'VIP support with dedicated 24/7 hotline', tooltip: 'Exclusive support channel' },
        { name: 'Customizable pricing structure and discounts', tooltip: 'Create special offers for clients' },
        { name: 'Enhanced visibility for top-tier properties', tooltip: 'Special treatment for premium listings' },
        { name: 'Agent and team management tools (multi-agent access)', tooltip: 'Multi-agent collaboration features' },
        { name: 'Access to create unlimited mutual fund groups', tooltip: 'Unlimited investment opportunities' },
        { name: 'All features included in the previous plans', tooltip: 'Everything from Premium plan and more' }
      ],
      mostPopular: false,
      ctaText: 'Contact Sales'
    }
  ];

  const plans: PricingPlans = {
    individual: {
      monthly: baseMonthlyPlans
    },
    team: {
      monthly: baseMonthlyPlans.filter(plan => plan.name === 'Enterprise')
    }
  };

  // Generate pricing for other billing cycles
  Object.keys(plans).forEach(type => {
    plans[type].sixMonth = plans[type].monthly.map(plan => {
      if (plan.price === 'Free') return plan;
      return {
        ...plan,
        description: `${plan.description} - Save 10% with 6-month billing`,
      };
    });

    plans[type].yearly = plans[type].monthly.map(plan => {
      if (plan.price === 'Free') return plan;
      return {
        ...plan,
        description: `${plan.description} - Save 30% with annual billing`,
      };
    });
  });

  const boostOptions = [
    {
      title: 'Featured Listings',
      options: [
        {
          price: 500,
          duration: '48 hours',
          description: 'Appear at the top of search results and on the website for increased visibility.'
        },
        {
          price: 1000,
          duration: '48 hours',
          description: 'Appear at the top of search results, on our social media pages, and on the website for enhanced visibility.'
        },
        {
          price: 5000,
          duration: '1 month',
          description: 'Appear at the top of search results, on our social media pages, our website, and partner websites for maximum visibility.'
        }
      ]
    },
    {
      title: 'Agent Boosting',
      options: [
        {
          price: 1000,
          duration: '1 week',
          description: 'Appear at the top of the agent search results and as a featured agent on the website for increased visibility.'
        }
      ]
    }
  ];

  // Format price for display
  const formatPrice = (price: number | 'Free'): React.ReactNode => {
    if (price === 'Free') {
      return (
        <>
          <span className="text-5xl font-extrabold">Free</span>
        </>
      );
    }

    const formattedPrice = typeof price === 'number' ? price.toLocaleString() : price;

    return (
      <>
        <span className="text-5xl font-extrabold">₦{formattedPrice}</span>
      </>
    );
  };

  const getDisplayPrice = (plan: PricingPlan): number | 'Free' => {
    if (plan.price === 'Free') return 'Free';

    if (billingCycle === 'sixMonth' && plan.sixMonthPrice) {
      return plan.sixMonthPrice;
    } else if (billingCycle === 'yearly' && plan.yearlyPrice) {
      return plan.yearlyPrice;
    }

    return plan.price;
  };

  const getDiscountBadge = (cycle: string) => {
    if (cycle === 'sixMonth') {
      return <Badge className="ml-2 bg-[#348b8b]">Save 10%</Badge>;
    } else if (cycle === 'yearly') {
      return <Badge className="ml-2 bg-[#348b8b]">Save 30%</Badge>;
    }
    return null;
  };

  const currentPlans = plans[userType][billingCycle] || plans[userType].monthly;

  return (
    <TooltipProvider>
      <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">RealVista Subscription Plans</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your real estate needs. No hidden fees, transparent pricing.
            </p>
          </div>

          {/* User Type Selector */}
          <div className="flex justify-center mb-10">
            <div className="bg-white rounded-full p-1.5 flex items-center shadow-lg max-w-md w-full">
              <button
                onClick={() => setUserType('individual')}
                className={`
                  flex-1 px-6 py-3 rounded-full transition-all duration-300 font-medium
                  ${userType === 'individual'
                    ? 'bg-[#348b8b] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                  text-center
                `}
              >
                Individual
              </button>
              <button
                onClick={() => setUserType('team')}
                className={`
                  flex-1 px-6 py-3 rounded-full transition-all duration-300 font-medium
                  ${userType === 'team'
                    ? 'bg-[#348b8b] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                  }
                  text-center
                `}
              >
                Team
              </button>
            </div>
          </div>

          {/* Billing Cycle Selector with Switch */}
          <div className="flex justify-center mb-16">
            <div className="flex items-center space-x-4 bg-white p-2 rounded-full shadow-md">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300
                  ${billingCycle === 'monthly'
                    ? 'bg-[#348b8b] text-white'
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Monthly
              </button>

              <button
                onClick={() => setBillingCycle('sixMonth')}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center
                  ${billingCycle === 'sixMonth'
                    ? 'bg-[#348b8b] text-white'
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                6 Months {getDiscountBadge('sixMonth')}
              </button>

              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center
                  ${billingCycle === 'yearly'
                    ? 'bg-[#348b8b] text-white'
                    : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Yearly {getDiscountBadge('yearly')}
              </button>
            </div>
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8">
            {currentPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`
                  overflow-hidden h-max transition-all duration-300 border
                  ${plan.mostPopular ? 'border-[#348b8b] shadow-xl shadow-[#348b8b]/10 ring-1 ring-[#348b8b]' : 'border-gray-200 shadow-lg'}
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
                    <Badge variant="outline" className={`
                      ${plan.name === 'Free' ? 'bg-gray-50 text-gray-700' :
                        plan.name === 'Basic' ? 'bg-blue-50 text-blue-700' :
                          plan.name === 'Premium' ? 'bg-purple-50 text-purple-700' :
                            'bg-green-50 text-green-700'}
                      border-gray-200`}
                    >
                      {plan.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 min-h-12">{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-0">
                  <div className="mb-6 flex items-center justify-center">
                    <div className="flex items-baseline">
                      {formatPrice(getDisplayPrice(plan))}
                      {plan.price !== 'Free' && <span className="text-gray-600 ml-2 text-lg">/ month</span>}
                    </div>
                  </div>

                  {plan.price !== 'Free' && billingCycle !== 'monthly' && (
                    <div className="-mt-4 mb-6 text-sm text-gray-600">
                      {billingCycle === 'sixMonth'
                        ? `₦${(plan.sixMonthPrice! * 6).toLocaleString()} billed every 6 months`
                        : `₦${(plan.yearlyPrice! * 12).toLocaleString()} billed annually`}
                    </div>
                  )}

                  <button
                    className={`
                      w-full py-3 px-4 rounded-lg font-bold transition-all duration-300 flex items-center justify-center
                      ${plan.mostPopular
                        ? 'bg-[#348b8b] text-white hover:bg-[#297979]'
                        : plan.name === 'Free'
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-gray-200'
                          : plan.name === 'Basic'
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : plan.name === 'Premium'
                              ? 'bg-purple-600 text-white hover:bg-purple-700'
                              : 'bg-green-600 text-white hover:bg-green-700'
                      }
                    `}
                  >
                    {plan.ctaText || 'Get Started'} <ArrowRight className="ml-2 w-5 h-5" />
                  </button>

                  <div className="mt-8 text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Check className="w-5 h-5 mr-2 text-[#348b8b]" />
                      Features Included
                    </h3>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => {
                        const isFeatureObject = typeof feature !== 'string';
                        const featureName = isFeatureObject ? (feature as Feature).name : feature;
                        const tooltip = isFeatureObject ? (feature as Feature).tooltip : undefined;

                        return (
                          <li key={i} className="flex items-start text-gray-700">
                            <div className="w-5 h-5 mr-3 flex-shrink-0 text-[#348b8b] mt-1">
                              <Check className="w-full h-full" />
                            </div>
                            <div className="flex items-center flex-wrap">
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

          {/* Boosting Options Section */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <button
                onClick={() => setShowBoostOptions(!showBoostOptions)}
                className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors shadow-md"
              >
                {showBoostOptions ? 'Hide Boosting Options' : 'View Boosting Options'}
                <Zap className="ml-2 w-5 h-5" />
              </button>
            </div>

            {showBoostOptions && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900">Optional Boosting Packages</h2>
                  <p className="text-gray-600 mt-2">Increase your visibility and leads with our flexible boosting options</p>
                </div>

                {boostOptions.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-16 last:mb-0">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                      <Zap className="w-6 h-6 mr-2 text-[#348b8b]" />
                      {category.title}
                    </h3>

                    <div className="grid md:grid-cols-3 gap-6">
                      {category.options.map((option, optionIndex) => (
                        <Card key={optionIndex} className="border border-gray-200 transition-all duration-300 hover:shadow-lg">
                          <CardHeader>
                            <div className="flex justify-between items-center mb-2">
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">{option.duration}</Badge>
                              <span className="text-2xl font-bold text-gray-900">₦{option.price.toLocaleString()}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700">{option.description}</p>
                          </CardContent>
                          <CardFooter>
                            <button className="w-full py-3 rounded-lg bg-gray-100 hover:bg-gray-200 font-medium text-gray-800 transition-colors">
                              Add Boost
                            </button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  question: "How do I upgrade my subscription?",
                  answer: "You can upgrade your subscription at any time from your account dashboard. The price difference will be prorated for the remainder of your billing cycle."
                },
                {
                  question: "Are there any setup fees?",
                  answer: "No, there are no setup fees for any of our plans. What you see is what you pay."
                },
                {
                  question: "Can I cancel my subscription anytime?",
                  answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
                },
                {
                  question: "How do the boosting options work?",
                  answer: "Boosting options provide additional visibility for your listings or agent profile. You can purchase these on-demand for specific listings or time periods."
                }
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-6">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Plan CTA */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Need a Custom Enterprise Solution?</h2>
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
                  quote: "RealVista has transformed my business. The leads I get from featured listings have tripled my sales.",
                  name: "Adebayo Johnson",
                  title: "Premium Agent, Lagos"
                },
                {
                  quote: "The analytics tools help me understand what my clients want. I couldn't run my business without it now.",
                  name: "Ngozi Okafor",
                  title: "Real Estate Consultant, Abuja"
                },
                {
                  quote: "Our team's productivity doubled after switching to RealVista's Enterprise plan. Worth every naira.",
                  name: "Emmanuel Nwosu",
                  title: "Team Lead, Horizon Properties"
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