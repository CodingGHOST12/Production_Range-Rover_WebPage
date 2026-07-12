"use client";

import { useState } from "react";
import { m as motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Navbar() {
  const [isLiked, setIsLiked] = useState(false);

  const scrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-[100] flex items-center justify-between px-6 md:px-12 lg:px-16 py-6 bg-transparent pointer-events-auto"
    >
      {/* Left: Official Brand Wordmark */}
      <div className="flex-1 flex justify-start">
        <a href="#" aria-label="Home" className="group">
          <span className="font-sans font-medium uppercase text-[14px] md:text-[15px] tracking-[0.35em] text-white group-hover:opacity-70 transition-opacity duration-500">
            RANGE ROVER
          </span>
        </a>
      </div>

      {/* Center: Exclusive Navigation */}
      <div className="hidden md:flex flex-1 justify-center">
        <button onClick={scrollToGallery} aria-label="Navigate to Gallery" className="group relative py-2">
          <span className="font-sans font-medium uppercase text-[11px] tracking-[0.2em] text-white group-hover:opacity-80 transition-opacity duration-300">
            Gallery
          </span>
          {/* Elegant Underline Hover */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.19,1,0.22,1]" />
        </button>
      </div>

      {/* Right: Luxury Actions */}
      <div className="flex-1 flex justify-end items-center space-x-6 md:space-x-8">
        
        {/* Favorite/Heart Action */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          aria-label="Favorites"
          className="group relative flex items-center justify-center text-white"
        >
          <motion.div
            animate={{ scale: isLiked ? [1, 1.15, 1] : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Heart 
              size={20} 
              strokeWidth={1.5} 
              fill={isLiked ? "#c97a7e" : "transparent"}
              color={isLiked ? "#c97a7e" : "currentColor"}
              className="transition-colors duration-300 group-hover:opacity-80" 
            />
          </motion.div>
        </button>

        {/* Custom Luxury Menu Button */}
        <button 
          aria-label="Menu"
          className="group flex flex-col items-end justify-center w-8 h-8 space-y-[5px] overflow-hidden"
        >
          <div className="w-6 h-[1.5px] bg-white transform origin-right group-hover:scale-x-75 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
          <div className="w-4 h-[1.5px] bg-white transform origin-right group-hover:scale-x-150 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
        </button>

      </div>
    </motion.nav>
  );
}
