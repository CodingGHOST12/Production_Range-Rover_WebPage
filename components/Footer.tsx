"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#050505] text-white pt-24 pb-12 px-6 md:px-12 lg:px-24 flex flex-col items-center z-10 overflow-hidden">
      <div className="w-full max-w-[1400px] flex flex-col items-center">
        
        {/* Luxury CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center text-center mb-32"
        >
          <p className="font-sans text-[10px] md:text-[12px] uppercase tracking-[0.4em] text-white/50 mb-8">
            Experience the Original
          </p>
          <a 
            href="https://www.rangerover.com/en-in/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-10 py-5 md:px-14 md:py-6 overflow-hidden border border-white/20 bg-transparent hover:border-white transition-colors duration-700"
          >
            <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-700 ease-[0.19,1,0.22,1]" />
            <span className="relative z-10 font-sans text-[12px] md:text-[14px] uppercase tracking-[0.25em] text-white group-hover:text-[#050505] transition-colors duration-700">
              Visit Official Range Rover
            </span>
          </a>
        </motion.div>

        {/* Ultra-Thin Foundation Divider */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10"
        />

        {/* Foundation Level - Disclaimer Only */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl flex flex-col items-center text-center"
        >
          <p className="font-sans text-[10px] tracking-[0.05em] leading-relaxed text-[#555555]">
            Disclaimer: This is a fan-made tribute project created for learning, design, and entertainment purposes. It is dedicated to celebrating the legacy of Range Rover and other iconic dream cars. This website is not affiliated with, endorsed by, or associated with Jaguar Land Rover or any automotive manufacturer.
          </p>
          
          <div className="font-sans text-[9px] tracking-[0.2em] text-[#444444] uppercase mt-6">
            &copy; {new Date().getFullYear()} Fan Tribute Project
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
