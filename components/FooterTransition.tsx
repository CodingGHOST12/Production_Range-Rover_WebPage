"use client";

import { motion } from "framer-motion";

export default function FooterTransition() {
  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] flex flex-col items-center justify-center overflow-hidden z-0">
      
      {/* Immersive Atmospheric Gradient: Beige to Deep Black */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F6F3] via-[#111111] to-[#050505] pointer-events-none" />

      {/* Luxury Showroom Ambient Lighting */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[150%] md:w-[90%] h-[70%] bg-[#1a1a1a] blur-[120px] rounded-[100%] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-white/5 blur-[90px] rounded-[100%] pointer-events-none" />

      {/* Hero Editorial Statement */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-24 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-display text-[26px] md:text-[50px] lg:text-[72px] text-white tracking-[0.2em] font-light leading-snug uppercase">
            Crafted for <br className="md:hidden" /> Tomorrow
          </h2>
        </motion.div>
        
        {/* Subtle Geometric Guiding Line */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: "100px", opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 md:mt-20 w-[1px] bg-gradient-to-b from-white/40 via-white/10 to-transparent"
          style={{ height: '100px' }}
        />
      </div>
      
      {/* Smooth connection directly into Footer */}
      <div className="absolute bottom-0 w-full h-[15%] bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
