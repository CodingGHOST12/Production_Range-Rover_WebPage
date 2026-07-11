"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Mountain, Activity, Gauge, Zap, Wind, Compass, Sun, Snowflake, Map } from "lucide-react";

const ENVIRONMENTS = ["forest", "desert", "mountain"];

const environmentContent = {
  forest: {
    eyebrow: "EXPLORE THE WILD",
    title: "Conquer Every Forest Trail",
    paragraph: "Experience the pinnacle of woodland exploration. With intelligent all-wheel drive and unmatched traction, navigate the densest forests with absolute confidence, where raw capability meets refined luxury in nature.",
    stats: [
      { icon: Mountain, value: "TR® 2", label: "Terrain Response" },
      { icon: Activity, value: "Adaptive", label: "Air Suspension" },
      { icon: Gauge, value: "ATPC", label: "Off-Road Assist" },
      { icon: Zap, value: "900 mm", label: "Wading Depth" },
    ]
  },
  desert: {
    eyebrow: "MASTER THE DUNES",
    title: "Power Beyond the Horizon",
    paragraph: "Forged for extreme heat and open landscapes. Effortless torque and unwavering stability let you conquer endless dunes with absolute confidence. Peerless performance, engineered for the sand.",
    stats: [
      { icon: Sun, value: "Sand", label: "Traction Mode" },
      { icon: Wind, value: "Dynamic", label: "Cooling System" },
      { icon: Compass, value: "Active", label: "Locking Diff" },
      { icon: Gauge, value: "33°", label: "Departure Angle" },
    ]
  },
  mountain: {
    eyebrow: "REACH NEW HEIGHTS",
    title: "Engineered for Every Summit",
    paragraph: "Master the steepest climbs with legendary capability. Intelligent Hill Descent Control and adaptive air suspension bring supreme confidence to the world's most demanding peaks. Absolute control at any altitude.",
    stats: [
      { icon: Snowflake, value: "Snow", label: "Terrain Program" },
      { icon: Activity, value: "HDC", label: "Hill Descent Control" },
      { icon: Map, value: "Torque", label: "Vectoring" },
      { icon: Mountain, value: "296 mm", label: "Clearance" },
    ]
  }
};

export default function HeroUI() {
  const [envIndex, setEnvIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const handleCycle = () => {
      setIsFading(true);
      setTimeout(() => {
        setEnvIndex(prev => (prev + 1) % ENVIRONMENTS.length);
        setIsFading(false);
      }, 200); // 200ms coordinates perfectly with the 400ms background crossfade
    };
    window.addEventListener('cycle-environment', handleCycle);
    
    return () => {
      window.removeEventListener('cycle-environment', handleCycle);
    };
  }, []);

  const content = environmentContent[ENVIRONMENTS[envIndex] as keyof typeof environmentContent];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 w-full h-[100vh]">

      {/* Left Content Block */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-[345px] left-5 md:left-12 lg:left-16 w-full max-w-[420px] pointer-events-auto z-20"
      >
        <div className={`transition-opacity duration-200 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          <motion.div variants={itemVariants} className="text-[11px] md:text-[12px] uppercase tracking-[2px] text-[var(--color-text-muted)] mb-4">
            {content.eyebrow}
          </motion.div>
          <motion.h2 variants={itemVariants} className="font-display text-4xl md:text-[56px] leading-[1.1] mb-5">
            {content.title.split(' ').map((word, i, arr) => (
              <span key={i}>
                {word}
                {i === 0 ? <br /> : ' '}
              </span>
            ))}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[15px] leading-[1.6] text-[var(--color-text-muted)] max-w-[340px] mb-0">
            {content.paragraph}
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 md:bottom-[30px] left-1/2 -translate-x-1/2 w-[calc(100%-40px)] md:w-[556px] z-20 pointer-events-auto"
      >
        <div className={`bg-[var(--color-panel-glass-bg)] backdrop-blur-[14px] rounded-[18px] border border-[var(--color-panel-glass-border)] flex flex-row items-center divide-x divide-white/10 overflow-x-auto md:overflow-visible transition-opacity duration-200 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          
          {content.stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center justify-center py-6 px-4 min-w-[120px] text-center">
                <Icon size={22} className="mb-2 opacity-80" strokeWidth={1.5} />
                <div className="font-bold text-[20px] leading-tight whitespace-nowrap">{stat.value}</div>
                <div className="text-[11px] text-[var(--color-text-muted)] mt-1 whitespace-nowrap">{stat.label}</div>
              </div>
            );
          })}

        </div>
      </motion.div>

      {/* Decorative sparkle (Right side) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="hidden md:block absolute right-[100px] bottom-[100px] w-7 h-7 text-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
        </svg>
      </motion.div>
    </div>
  );
}
