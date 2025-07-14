"use client";
import { Tooltip } from "@material-tailwind/react";
import Auth from "@/components/Auth/Auth";
import MyModal from "../../Modal/MyModal";
import UserProfile from "@/components/UserProfile/UserProfile";
import Link from "next/link";
import * as React from "react";
import Cart from "../../cart/Cart";
import Image from "next/image";
import MySearchField from "@/components/SearchField/MySearchField";
import { getLeadDetails } from "@/utils/functions";

const FullHeader = ({
  handleCloseProfile,
  handleOpenProfile,
  genLogo,
  applySearch,
  customHandleCloseAuth,
  profile,
  checkoutInfo,
  authUser,
  cart,
  totalPrice,
  totalCount,
  setCart,
  theme,
  titleFont,
  handleOpenCart,
  handleCloseCart,
  openCart,
  openAuth,
  handleOpenAuth,
  openProfile,
  name,
  search,
  setSearch,
}) => {
  return (
    <main-content>
     <header className="bg-white shadow-lg">
  {/* Top header section */}
  <div className="flex justify-between items-center px-6 py-4 md:py-6">
    {/* Logo and Navigation */}
    <div className="flex items-center">
      <a href="/" className="text-2xl font-bold text-primary">
        Cake Shop
      </a>
      <nav className="hidden md:flex space-x-6 ml-10">
        <a href="/" className="text-lg text-gray-600 hover:text-primary">Home</a>
        <a href="/about" className="text-lg text-gray-600 hover:text-primary">About</a>
        <a href="/cakes" className="text-lg text-gray-600 hover:text-primary">Cakes</a>
        <a href="/contact" className="text-lg text-gray-600 hover:text-primary">Contact</a>
      </nav>
    </div>

    {/* Profile, Cart, and Login */}
    <div className="flex items-center space-x-4">
      {/* Profile Icon */}
      <button onClick={openAuth} className="focus:outline-none">
        <img
          src={profile.icon ? profile.icon : '/default-profile.png'}
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-200"
        />
      </button>
      
      {/* Cart Icon */}
      <button onClick={openCart} className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 text-gray-600 hover:text-primary"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l1.3 9.8a2 2 0 001.9 1.7h9.6a2 2 0 001.9-1.7L21 6H6" />
        </svg>
        {/* Cart count */}
        <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 text-center">
          {cartCount}
        </span>
      </button>
      
      {/* Login Button */}
      {!authUser && (
        <button onClick={openAuth} className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light">
          Login
        </button>
      )}
    </div>
  </div>

  {/* Mobile Menu */}
  <div className="md:hidden bg-white">
    <button className="flex items-center px-4 py-2" onClick={toggleMobileMenu}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 text-gray-600"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
      </svg>
    </button>

    <nav className={`flex flex-col space-y-4 p-4 bg-white ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
      <a href="/" className="text-gray-600 hover:text-primary">Home</a>
      <a href="/about" className="text-gray-600 hover:text-primary">About</a>
      <a href="/cakes" className="text-gray-600 hover:text-primary">Cakes</a>
      <a href="/contact" className="text-gray-600 hover:text-primary">Contact</a>
    </nav>
  </div>
</header>

    </main-content>
  );
};

export default FullHeader;
