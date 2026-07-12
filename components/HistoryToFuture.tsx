"use client";

import { m as motion } from "framer-motion";


export default function HistoryToFuture() {
  return (
    <section className="relative w-full bg-[#F7F6F3] pt-0 pb-32 md:pb-48 lg:pb-64 z-10 overflow-hidden flex flex-col items-center">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 w-full flex flex-col items-center relative">
        
        {/* =========================================
            EDITORIAL TYPOGRAPHY BRIDGE
        ========================================== */}
        <div className="absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-[800px] px-8 md:px-0 flex flex-col items-center justify-center z-0 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex justify-center"
          >
            <span className="font-display font-light text-[20px] md:text-[32px] uppercase tracking-[0.5em] text-[#666666]">
              THE LEGACY CONTINUES
            </span>
          </motion.div>
        </div>


        {/* =========================================
            CHAPTER 1: HISTORY 
        ========================================== */}
        <div className="w-full flex flex-col items-center relative mb-[150px] md:mb-[250px] lg:mb-[350px]">
          
          {/* HISTORY Typography */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="z-0"
          >
            <h2 className="font-display text-[60px] md:text-[120px] lg:text-[160px] text-[#111111] tracking-[0.1em] font-medium uppercase leading-none text-center select-none">
              HISTORY
            </h2>
          </motion.div>

          {/* HISTORY Vehicle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[80%] md:w-[65%] lg:w-[55%] max-w-[1000px] z-20 pointer-events-none -mt-24 md:-mt-40 lg:-mt-56"
          >

            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-black/40 blur-[35px] rounded-[100%]" />
            <motion.div
              animate={{ y: [0, -24, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full"
            >
              <img
                src="/download (1)-Photoroom.png"
                alt="Range Rover Classic Heritage"
                decoding="async"
                loading="lazy"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* =========================================
            CHAPTER 2: FUTURE 
        ========================================== */}
        <div className="w-full flex flex-col items-center relative">
          
          {/* FUTURE Typography */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="z-0"
          >
            <h2 className="font-display text-[60px] md:text-[120px] lg:text-[160px] text-[#111111] tracking-[0.1em] font-medium uppercase leading-none text-center select-none">
              FUTURE
            </h2>
          </motion.div>

          {/* FUTURE Vehicle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[90%] md:w-[75%] lg:w-[65%] max-w-[1100px] z-20 pointer-events-none -mt-8 md:-mt-20 lg:-mt-32"
          >
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-[80%] h-[20px] bg-black/30 blur-[30px] rounded-[100%]" />
            <motion.div
              animate={{ y: [0, -24, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="relative w-full"
            >
              <img
                src="/download-Photoroom.png"
                alt="Range Rover Modern Evolution"
                decoding="async"
                loading="lazy"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
