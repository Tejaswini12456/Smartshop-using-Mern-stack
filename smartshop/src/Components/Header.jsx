import React, { useState } from 'react';
import { ShoppingCart, Search, Home, Lightbulb, Grid, User } from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, totalItems, setShowCart }) => {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [profileOpen, setProfileOpen] = useState(false);

const links = [
{ name: 'Home', href: '#', icon: Home },
{ name: 'Recommended', href: '#recommended', icon: Lightbulb },
{ name: 'Categories', href: '#categories', icon: Grid },
];

return ( <header className="bg-white shadow-md sticky top-0 z-50"> <div className="flex items-center justify-between px-4 md:px-8 py-3">


    {/* Logo */}
    <div className="text-2xl font-bold text-orange-500 flex-shrink-0">
      SmartShop
    </div>

    {/* Search Bar */}
    <div className="flex-1 mx-4 relative hidden md:flex">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-r-lg flex items-center">
        <Search size={20} />
      </button>
    </div>

    {/* Desktop Links */}
    <nav className="hidden md:flex items-center gap-6 mr-6">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="flex items-center gap-1 text-gray-700 hover:text-orange-500 font-semibold"
        >
          <link.icon size={20} />
          {link.name}
        </a>
      ))}
    </nav>

    {/* Right Icons */}
    <div className="flex items-center gap-4">

      {/* Profile with arrow */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen(!profileOpen)}
          className="flex items-center gap-1 px-3 py-1 rounded-md hover:bg-gray-100 transition"
        >
          <User size={24} className="text-gray-700" />
          <span className="text-gray-700 text-sm font-medium">Account</span>
          <svg
            className={`w-3 h-3 text-gray-700 transform transition-transform ${
              profileOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
            <a className="block px-4 py-2 hover:bg-gray-100">My Profile</a>
            <a className="block px-4 py-2 hover:bg-gray-100">Wishlist</a>
            <a className="block px-4 py-2 hover:bg-gray-100">Orders</a>
            <a className="block px-4 py-2 hover:bg-gray-100">Gift Cards</a>
          </div>
        )}
      </div>

      {/* Cart */}
      <button onClick={() => setShowCart(true)} className="relative">
        <ShoppingCart size={28} className="text-gray-700" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        )}
      </button>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 border rounded-lg"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  {mobileMenuOpen && (
    <div className="md:hidden bg-white shadow-md px-4 py-4 space-y-3">
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 font-semibold"
          >
            <link.icon size={20} />
            {link.name}
          </a>
        ))}
      </div>

      <div className="relative mt-2 flex">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-l-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 rounded-r-lg flex items-center">
          <Search size={20} />
        </button>
      </div>
    </div>
  )}
</header>


);
};

export default Header;
