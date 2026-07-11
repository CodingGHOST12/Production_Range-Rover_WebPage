"use client";

import { ArrowUpRight } from "lucide-react";

export default function FloatingEnvironmentSwitch() {
  return (
    <div 
      className="fixed bottom-6 right-6 md:bottom-12 md:right-12 lg:bottom-24 lg:right-20 z-[999999] flex items-center justify-center pointer-events-none"
    >
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('cycle-environment'))}
        className="w-16 h-16 rounded-full flex items-center justify-center bg-[var(--color-panel-glass-bg)] backdrop-blur-xl border border-[var(--color-panel-glass-border)] shadow-2xl hover:bg-white/20 transition-all duration-300 hover:scale-105 group pointer-events-auto"
        title="Cycle Environment"
      >
        <ArrowUpRight size={26} strokeWidth={1.5} className="text-white group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" />
      </button>
    </div>
  );
}
