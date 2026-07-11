"use client";

import { useRef, useEffect, useState } from "react";


export default function EditorialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [topTornPath, setTopTornPath] = useState("");

  useEffect(() => {
    // Generate an incredibly organic, premium mountain silhouette / torn edge
    // Using combined absolute sine waves creates sharp peaks and smooth valleys (bouncing ball effect inverted)
    const generateSilhouette = (offset = 0) => {
      let path = "M 0 150 L 0 100 ";
      for (let i = 0; i <= 2400; i += 8) {
        // Macro mountains (large sweeping ranges)
        const macro = Math.abs(Math.sin(i * 0.003 + offset) * 50);
        // Mid mountains
        const mid = Math.abs(Math.sin(i * 0.012 + offset * 2) * 20);
        // Micro rough edges (torn paper texture)
        const micro = Math.abs(Math.sin(i * 0.05 + offset * 3) * 6);
        
        const y = 140 - macro - mid - micro;
        path += `L ${i} ${y} `;
      }
      path += "L 2400 100 V 150 Z";
      return path;
    };

    setTopTornPath(generateSilhouette(0));
  }, []);

  return (
    <section 
      id="editorial-section"
      ref={containerRef} 
      className="relative w-full bg-[#F7F6F3] text-[#191919] overflow-visible z-20"
      // Pushed down to add spacing between Hero content and the transition mask, preventing overlap
      style={{ marginTop: "150px" }} 
    >
      {/* Top Mountain Silhouette Transition (overlapping cinematic sequence slightly) */}
      <div className="absolute top-0 left-0 w-full h-[150px] md:h-[200px] z-30 transform -translate-y-[99%] pointer-events-none">
        {topTornPath && (
          <svg 
            viewBox="0 0 2000 150"  
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            preserveAspectRatio="none"
            className="w-full h-full drop-shadow-[0_-10px_20px_rgba(0,0,0,0.3)]"
          >
            <path 
              d={topTornPath} 
              fill="#F7F6F3" 
            />
          </svg>
        )}
      </div>

      {/* The Editorial Body has been completely removed per user request */}

    </section>
  );
}
