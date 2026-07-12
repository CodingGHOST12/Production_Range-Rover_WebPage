"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface EditorialMosaicUIProps {
  images: any[]; 
}

export default function EditorialMosaicUI({ images }: EditorialMosaicUIProps) {
  // THE ORIGINAL STATIC TEMPLATE
  // This is the exact 10-slot interlocking masonry grid that the user loved.
  const getGridClass = (index: number) => {
    const i = index % 10;
    switch (i) {
      case 0: return 'lg:col-span-4 lg:row-span-2 md:col-span-4 md:row-span-2 col-span-1 row-span-2'; // Large feature
      case 1: return 'lg:col-span-2 lg:row-span-2 md:col-span-2 md:row-span-2 col-span-1 row-span-1'; // Tall portrait
      case 2: return 'lg:col-span-3 lg:row-span-1 md:col-span-2 md:row-span-2 col-span-1 row-span-1'; // Medium landscape
      case 3: return 'lg:col-span-3 lg:row-span-1 md:col-span-4 md:row-span-2 col-span-1 row-span-1'; // Medium wide
      case 4: return 'lg:col-span-2 lg:row-span-2 md:col-span-4 md:row-span-2 col-span-1 row-span-2'; // Tall portrait
      case 5: return 'lg:col-span-4 lg:row-span-2 md:col-span-2 md:row-span-1 col-span-1 row-span-2'; // Large feature
      case 6: return 'lg:col-span-6 lg:row-span-2 md:col-span-2 md:row-span-1 col-span-1 row-span-2'; // Full width wide block
      case 7: return 'lg:col-span-2 lg:row-span-1 md:col-span-4 md:row-span-2 col-span-1 row-span-1'; // Small detail
      case 8: return 'lg:col-span-2 lg:row-span-1 md:col-span-2 md:row-span-1 col-span-1 row-span-1'; // Small detail
      case 9: return 'lg:col-span-2 lg:row-span-1 md:col-span-2 md:row-span-1 col-span-1 row-span-1'; // Medium detail
      default: return 'col-span-1 row-span-1';
    }
  };

  const arrangedImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    
    // Create a copy of the raw array (which is alphabetically ordered by the backend)
    const pool = [...images];

    // Find the custom hero image requested by the user and move it to the very front (Slot 0)
    const customHeroIdx = pool.findIndex(img => img.src?.includes('ce050914142409a1c0e76debf5d93a91'));
    if (customHeroIdx !== -1) {
      const customHero = pool.splice(customHeroIdx, 1)[0];
      pool.unshift(customHero);
    }

    // Leave the remaining 11 images exactly in their natural raw order.
    // No algorithmic sorting by aspect ratio, score, or dynamic CSS generation.
    return pool;
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="relative w-full bg-[#F7F6F3] py-24 md:py-32 z-10">
      <div className="max-w-[1800px] mx-auto px-4 md:px-12 lg:px-24">
        
        <div className="bg-[#0A0A0A] rounded-[40px] p-6 md:p-12 lg:p-20 shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center w-full mb-16 md:mb-24"
          >
            <h2 className="font-display text-[24px] md:text-[36px] lg:text-[44px] text-[#F7F6F3] tracking-[0.4em] font-medium uppercase">
              GALLERY
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[250px] md:auto-rows-[300px] gap-6 md:gap-8 grid-flow-dense">
            {arrangedImages.map((item, index) => {
              const src = typeof item === 'string' ? item : item.src;
              
              return (
                <motion.div
                  key={src + index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: (index % 6) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden bg-[#1A1A1A] rounded-[18px] border-[2px] md:border-[3px] border-white/90 shadow-lg ${getGridClass(index)}`}
                >
                  <img
                    src={src}
                    alt={`Editorial Gallery Image ${index + 1}`}
                    loading="eager"
                    decoding="async"
                    fetchPriority={index < 4 ? "high" : "auto"}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                  />
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
