import React from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  X
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/share/1FaQPGrXEN/' },
    { icon: Instagram, href: 'https://www.instagram.com/realvista_ng?igsh=MXVtazk2aWV5Mzl1ZA==' },
    { icon: X, href: 'https://x.com/Realvista_NG?t=4wyone_-O3TiMPEgw9Gw-w&s=09' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/realvista-ng/' }
  ];

  const companyLinks = [
    {
      name: "Faq", link: "/faq"
    },
    {
      name: "Trend", link: "/trend"
    },
    {
      name: "Contact Us", link: "/contact"
    }

  ];

  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* App Description Column */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-white">R</span>
            </div>
            <h2 className="text-2xl font-bold">Realvista</h2>
          </div>
          <p className="text-white/80">
            Realvista is user-friendly and offers features like onboarding tutorials, simple tools for tracking finances, and guidance for first-time buyers and investors.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              >
                <social.icon className="text-white" size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Company Links Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Company</h3>
          <ul className="space-y-4">
            {companyLinks.map((link, index) => (
              <Link
                key={index}
                href={link.link}
                className="flex items-center group text-white/80 hover:text-white transition-colors"
              >
                <ChevronRight
                  size={16}
                  className="mr-2 text-white/50 group-hover:translate-x-1 transition-transform"
                />
                {link.name}
              </Link>

            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <MapPin size={20} className="text-white/50" />
              <span>123 Realvista Street</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin size={20} className="text-white/50" />
              <span>Location, City, Country</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={20} className="text-white/50" />
              <span>contact@realvista.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={20} className="text-white/50" />
              <span>+1 (555) 123-4567</span>
            </li>
          </ul>
        </div>

        {/* QR Code and Download Column */}
        <div className="flex flex-col items-center space-y-6">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <div className="w-32 h-32 bg-gray-100 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">QR Code</span>
            </div>
          </div>

          <button className="bg-[#FB902D] text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors flex items-center space-x-2">
            <span>Download App</span>
          </button>
        </div>
      </div>

      {/* Copyright and Additional Links */}
      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
        <p className="text-white/70 text-sm">
          © Realvista 2025. All rights reserved.
        </p>
        <div className="flex space-x-4 text-sm text-white/70">
          <a href="https://www.realvistaproperties.com/privacy-policy" className="hover:text-white">Privacy Policy</a>
          <a href="https://www.realvistaproperties.com/terms-of-use" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}