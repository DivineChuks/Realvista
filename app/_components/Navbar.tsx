"use client"
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  Search,
  MapPin,
  Home,
  Building2,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState('all');

  const navItems = [
    {
      label: 'PRICING',
      type: 'link',
      href: '/pricing'
    },
    {
      label: 'LISTINGS',
      type: 'link',
      href: '/listings'
    },
    {
      label: 'FAQ',
      type: 'link',
      href: '/faq'
    },
    {
      label: 'TREND',
      type: 'link',
      href: '/trend'
    },
    {
      label: 'CONTACT',
      type: 'link',
      href: '/contact'
    },
    // {
    //   label: 'PRIVACY',
    //   type: 'link',
    //   href: '/privacy'
    // },
  ];

  const searchFilters = [
    { value: 'all', label: 'All Properties', icon: <Home className="mr-2 w-4 h-4" /> },
    { value: 'residential', label: 'Residential', icon: <Home className="mr-2 w-4 h-4" /> },
    { value: 'commercial', label: 'Commercial', icon: <Building2 className="mr-2 w-4 h-4" /> },
    { value: 'location', label: 'By Location', icon: <MapPin className="mr-2 w-4 h-4" /> },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);

    // Close mobile menu if open
    setIsMobileMenuOpen(false);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleNavigation = (item: any) => {
    if (item.type === 'scroll') {
      // Remove the '#' and scroll to the section
      scrollToSection(item.href);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching:', searchQuery, 'Filter:', searchFilter);
  };

  return (
    <nav className="bg-white sticky top-0 shadow-sm py-2 w-full z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link href="/" className='cursor-pointer'>
            <Image src="/logo.webp" width={200} height={30} alt="logo" />
          </Link>

          {/* Search Bar */}
          <div className="hidden lg:block relative w-[400px] mx-4">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-24 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#348b8b]"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.type === 'scroll' ? (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item)}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200 text-sm font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
            <Link href="/register" className='cursor-pointer'>
              <button className="bg-[#FB902D] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors duration-200 ml-4">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none transition duration-150 ease-in-out"
            >
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {/* Mobile Search */}
          <div className="px-3 pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

              {/* Mobile Search Filter */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <button
                  type="button"
                  onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
                  className="flex items-center px-3 text-gray-600 hover:text-gray-900"
                >
                  {searchFilters.find(f => f.value === searchFilter)?.label}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </button>

                {isSearchDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border">
                    {searchFilters.map((filter) => (
                      <button
                        key={filter.value}
                        type="button"
                        onClick={() => {
                          setSearchFilter(filter.value);
                          setIsSearchDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-50"
                      >
                        {filter.icon}
                        {filter.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {navItems.map((item) => (
            item.type === 'scroll' ? (
              <button
                key={item.label}
                onClick={() => handleNavigation(item)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            )
          ))}
          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-full text-base font-medium hover:bg-blue-700 transition-colors duration-200 mt-2">
            Download App
          </button>
        </div>
      </div>
    </nav>
  );
}