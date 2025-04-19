"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function TermsOfUsePage() {
  const [expandedSections, setExpandedSections] = useState<any>({
    introduction: true,
    acceptance: false,
    registration: false,
    use: false,
    listings: false,
    mutual: false,
    content: false,
    prohibited: false,
    fees: false,
    privacy: false,
    liability: false,
    indemnification: false,
    thirdParty: false,
    termination: false,
    governing: false,
    severability: false,
    contact: false
  });

  const toggleSection = (section:any) => {
    setExpandedSections((prev:any) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSection = (id:any, title:any, content:any) => {
    return (
      <div className="border-b border-gray-200 py-4">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => toggleSection(id)}
        >
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {expandedSections[id] ? 
            <ChevronUp className="text-white w-5 h-5" /> : 
            <ChevronDown className="text-white w-5 h-5" />
          }
        </div>
        {expandedSections[id] && (
          <div className="mt-3 text-white text-opacity-90 leading-relaxed">
            {content}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-teal-700 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Terms of Use</h1>
          <p className="mt-2 text-teal-100">Last Revised: February 9, 2025</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Terms Panel */}
          <div className="md:flex">
            {/* Navigation Sidebar */}
            <div className="md:w-1/4 bg-gray-50 p-4">
              <div className="sticky top-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Contents</h2>
                <nav className="space-y-2">
                  {Object.entries(expandedSections).map(([key, expanded]) => (
                    <button 
                      key={key}
                      onClick={() => toggleSection(key)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm hover:bg-teal-100 hover:text-teal-700 transition-colors ${expanded ? 'bg-teal-100 text-teal-700 font-medium' : 'text-gray-600'}`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Terms Content */}
            <div className="md:w-3/4 p-6 md:p-8">
              <div className="bg-teal-700 rounded-lg p-6 mb-8" style={{backgroundColor: '#348b8b'}}>
                {renderSection(
                  'introduction',
                  'Introduction',
                  <p>Welcome and thank you for your interest in Realvista Properties Ltd ("Company," "we," "our," or "us") services. By accessing, downloading, registering or using our website (www.realvistaproperties.com), our mobile app (RealVista) or any associated services/content, you agree to comply with and be bound by the following Terms of Use ("Terms") as updated from time to time. Please read these Terms carefully before using our services.<br /><br />If you do not agree with these Terms, you should not use our website, Mobile app or our services.</p>
                )}

                {renderSection(
                  'acceptance',
                  'Acceptance of Terms',
                  <p>By accessing, downloading, registering or using our website, mobile app, services or contents, you acknowledge that you have read, understood, and agree to be bound by these Terms, including any future modifications, additions, or updates. We reserve the right to change or modify these Terms at any time, and such changes will be effective immediately upon posting on the Site. It is your responsibility to review these Terms periodically.</p>
                )}

                {renderSection(
                  'registration',
                  'User Registration and Account',
                  <p>You must be at least 18 years of age to use our Services. By agreeing to these Terms of Use, you represent and warrant that: (a) you are at least 18 years of age; (b) you have not previously been suspended or removed from the Services; and (c) your registration and your use of the Services complies with all applicable national and international laws and regulations. To access certain features of our Site and App, you may be required to create an account and agree to a Product's Terms, to the extent applicable to that service, which may be incorporated herein or available on a separate link. You agree to provide and maintain accurate, complete, and up-to-date information about yourself during the registration process (email address, phone number, or other contact information). You are responsible for maintaining the confidentiality of your account credentials, password, and for all activities that occur under your account.<br /><br />You must notify us immediately of any unauthorized use of your account or any other security breach. We are not liable for any losses resulting from unauthorized access to your account.</p>
                )}

                {renderSection(
                  'use',
                  'Use of Our Services',
                  <p>Our services include property/portfolio management, Real estate investments, browsing listings, viewing images, videos, or floor plans, searching for properties, contacting real estate agents, or using any other features or services we provide. You agree to use our website and services solely for lawful purposes and in a manner consistent with all applicable local, state, national and international laws. Furthermore, some of our services or products may be subject to further specific Product Terms. However, unless provided for in your Product's Terms, Realvista Properties Ltd assumes no responsibility for any result or consequence related directly or indirectly to any action or inaction that you or any user takes based on the Services or any other information available through or in connection with the Services.</p>
                )}

                {renderSection(
                  'listings',
                  'Property Listings and Content',
                  <p>We make every effort to ensure the verification of agents and users listing properties and the accuracy of property listings on our mobile app or website. However, we do not guarantee the genuineness, accuracy, completeness, or timeliness of any user or content, including property descriptions, pricing, availability, coordinates or images. The information provided on our mobile app or website is for informational purposes only and should not be relied upon without verification. Ensure to verify the authenticity of the agent/user and the property before making any financial commitment. We are not responsible and cannot be held responsible for any false or fake transaction between users.<br /><br />You may not use any content on our mobile app or website for commercial purposes without express written consent from us.</p>
                )}

                {renderSection(
                  'mutual',
                  'Mutual Investment',
                  <p>Please note that each mutual investment group is independently managed by the group members. We do not create or add users to any group. Do not accept invitation to any group if you did not request to be added to the group yourself. We advise you to make every necessary inquiry about the group and the investments before joining or making any investment decision/commitment. We are not liable and cannot be held responsible for any misuse/mismanagement of group funds or failed investment by any mutual investment group.</p>
                )}

                {renderSection(
                  'content',
                  'User-Generated Content',
                  <p>If you submit, post, or upload any content to our mobile app or website, including but not limited to reviews, comments, photos, or inquiries, you grant us a non-exclusive, royalty-free, worldwide, perpetual, irrevocable, and fully sublicensable right to use, display, distribute, and modify such content in any media or format.<br /><br />You are responsible for the content you post, and you represent and warrant that you own or have the necessary rights to use and post the content, and that it does not infringe upon the intellectual property rights or privacy rights of others.</p>
                )}

                {renderSection(
                  'prohibited',
                  'Prohibited Activities',
                  <div>
                    <p>By using our services, you agree to refrain from:</p>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li>Reproduce, modify, distribute, display, or otherwise provide access to, create derivative works from, decompile, disassemble, or reverse engineer any part of the Services, except as explicitly permitted by the Terms of the applicable product.</li>
                      <li>Remove or alter any copyright or intellectual property notices found in the Services.</li>
                      <li>Use the Services in any unlawful way or in a manner that harms the Companies, its service providers, suppliers, affiliates, or any other user.</li>
                      <li>Discriminate against individuals or groups protected under the law, or promote illegal, racist, or discriminatory activities.</li>
                      <li>Post or make publicly available an offer of buyer agent compensation (amount or percentage) in connection with a specific property on the Services.</li>
                      <li>Distribute unsolicited messages, spam, pyramid schemes, or similar communications through our Services.</li>
                      <li>Impersonate another person or entity, misrepresent your affiliation with someone else, or provide false information to third parties.</li>
                      <li>Reproduce or make accessible any reviews, ratings, or profile information about professionals, real estate listings, or other data available on the Services, unless explicitly permitted.</li>
                      <li>Upload invalid data, viruses, worms, or other harmful software to the Services.</li>
                      <li>Post or make accessible any content that is deemed illegal, offensive, discriminatory, harassing, or otherwise objectionable.</li>
                      <li>Interfere with or compromise the security or integrity of our Services, or bypass measures designed to restrict access.</li>
                      <li>Conduct automated activities, such as data mining, screen scraping, crawling, or using robots or other automated methods to collect information from our Services.</li>
                      <li>Use the Companies' trademarks as part of your screen name or email address or opening any mutual investment group on the Services.</li>
                      <li>Access or use the Services to create competitive products or services.</li>
                      <li>Attempt, or allow any third party to attempt, to do any of the above.</li>
                      <li>Attempting to gain unauthorized access to any part of the Site or any user's account.</li>
                    </ul>
                  </div>
                )}

                {renderSection(
                  'fees',
                  'Fees',
                  <div>
                    <h4 className="font-semibold mb-2">A. General Payment Terms</h4>
                    <p>To access certain features of our Services, you may be required to pay fees. All fees are charged in Naira and are non-refundable. In the event we change the fees for any part of the Services, such as by adding new charges, we will notify you in advance. If you do not accept the changes, we may stop providing the affected Services to you. Payment for the Services will be processed through our authorized third-party payment processors, who will charge the payment method you provided at the time of purchase or as agreed for the selected Service. By using the Services, you authorize us to charge any applicable fees to the payment method you've designated. If you pay using a credit card, we may pre-authorize your card before processing your purchase to verify that it is valid and has sufficient funds or available credit to cover the transaction.</p>
                    
                    <h4 className="font-semibold mt-4 mb-2">B. Subscription Services</h4>
                    <p>Certain Services may include recurring payments for periodic charges ("Subscription Service"). If you activate a Subscription Service, you authorize us to charge the specified payment method on a recurring basis for all sums due, starting from the payment due date, until you cancel the subscription or your account is terminated. The subscription will continue until you either cancel it or we terminate it. To avoid being charged for the next subscription period, you must cancel the Subscription Service before it renews. We will charge the periodic subscription fee to the payment method you provided during registration or to any updated payment method you provide thereafter. We may adjust the subscription fee for any future subscription periods, but we will notify you in advance of any fee increases. Unless otherwise stated in your Product's Terms, you can cancel your Subscription Service through your account settings or by contacting us at (contact.realvistaproperties.com).</p>
                  </div>
                )}

                {renderSection(
                  'privacy',
                  'Privacy Policy',
                  <p>Your use of our mobile app and website is also governed by our Privacy Policy, which can be found <a href="https://realvistaproperties.com/privacy-policy" className="underline hover:text-teal-200 transition-colors">https://realvistaproperties.com/privacy-policy</a>. By using the mobile app and website, you consent to the collection and use of your information in accordance with the Privacy Policy.</p>
                )}

                {renderSection(
                  'liability',
                  'Limitation of Liability',
                  <p>To the fullest extent permitted by law, Realvista Properties Ltd and its directors, affiliates, officers, employees, and agents are not liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of the mobile app, website or services, even if we have been advised of the possibility of such damages.<br /><br />We accept no liability or responsibility for: (i) any errors, inaccuracies, or mistakes in the materials; (ii) any personal injury or property damage, of any kind, arising from your access to or use of our services; (iii) any unauthorized access to or use of our secure servers and any personal information stored within; (iv) any interruptions or disruptions in the transmission to or from our services; (v) any bugs, viruses, Trojan horses, or similar issues that may be transmitted through our services by third parties; or (vi) any errors, omissions, or losses incurred from the use of materials posted, emailed, transmitted, or otherwise made available through our services.<br /><br />Our total liability to you, whether in contract, tort (including negligence), or otherwise, shall not exceed the amount paid by you, if any, for accessing or using the mobile app, website or services.</p>
                )}

                {renderSection(
                  'indemnification',
                  'Indemnification',
                  <p>You agree to indemnify, defend, and hold harmless RealVista Properties Ltd and its directors, affiliates, officers, employees, agents, and licensors from any and all claims, damages, liabilities, losses, and expenses (including attorneys' fees) arising from (i) your access to or use of our mobile app, website or services; (ii) your breach of these Terms of Use; (iii) your violation of any law or the rights of a third party; (iv) any dispute or issue between you and any third party; (v) any User Materials you upload to, or otherwise make available through, the Services; (vi) your wilful misconduct; and (vii) any other party's access to or use of our Services using your account and password. We reserve the right, at their own expense, to assume the exclusive defence and control of any matter otherwise subject to indemnification by you, and in that case, you agree to cooperate with our defence of that claim.</p>
                )}

                {renderSection(
                  'thirdParty',
                  'Third-Party Links and Services',
                  <p>Our mobile app and website may contain links to third-party websites or services that are subject to additional third-party terms, and are not owned or controlled by RealVista Properties Ltd. We are not responsible for the content, privacy practices, or actions of any third parties. By using our mobile app and website, you agree not to hold us liable from any liability arising from your use of third-party websites or services.</p>
                )}

                {renderSection(
                  'termination',
                  'Termination',
                  <p>We may suspend or terminate your access to the mobile app, website or services at any time, without notice, for any reason, including but not limited to violations of these Terms. Upon termination, your right to use the mobile app, website or services will cease, and you must immediately stop using the mobile app, website or services.</p>
                )}

                {renderSection(
                  'governing',
                  'Governing Law',
                  <p>These Terms are governed by the laws of federation of Nigeria without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Nigeria for any disputes related to these Terms.</p>
                )}

                {renderSection(
                  'severability',
                  'Severability',
                  <p>If any provision of these Terms is found to be unlawful, void, or unenforceable, the remaining provisions will continue in full force and effect.</p>
                )}

                {renderSection(
                  'contact',
                  'Contact Information',
                  <p>If you have any questions, concerns, or requests regarding this Terms of use, please contact us at: <a href="mailto:contact@realvistaproperties.com" className="underline hover:text-teal-200 transition-colors">contact@realvistaproperties.com</a>.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Realvista Properties Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}