"use client";

import { motion } from "framer-motion";

export default function DesktopOnlyBlocker() {
  return (
    <div className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#050505] text-white px-8 text-center lg:hidden">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="max-w-[420px]"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8 font-sans">
          Notice
        </div>
        
        <h2 className="font-display text-3xl leading-[1.2] tracking-wide mb-6">
          Desktop Experience Only
        </h2>
        
        <div className="w-16 h-[1px] bg-white/20 mx-auto mb-6" />
        
        <p className="text-[14px] leading-[1.8] text-white/50 font-sans">
          This website has been designed and optimized exclusively for large desktop and laptop screens to deliver the intended premium experience. Please visit using a desktop or laptop for the best viewing experience.
        </p>
      </motion.div>
    </div>
  );
}
