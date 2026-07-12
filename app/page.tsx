import Navbar from "@/components/Navbar";
import ScrollSequence from "@/components/ScrollSequence";
import HeroUI from "@/components/HeroUI";
import dynamic from 'next/dynamic';

const EditorialSection = dynamic(() => import('@/components/EditorialSection'));
const EditorialMosaic = dynamic(() => import('@/components/EditorialMosaic'));
const HistoryToFuture = dynamic(() => import('@/components/HistoryToFuture'));
const FooterTransition = dynamic(() => import('@/components/FooterTransition'));
const Footer = dynamic(() => import('@/components/Footer'));

import FloatingEnvironmentSwitch from "@/components/FloatingEnvironmentSwitch";
import fs from 'fs';
import path from 'path';

// Dynamically scan the mountain folder at runtime (Server Side)
function getMountainFrames() {
  try {
    const mountainDir = path.join(process.cwd(), 'public', 'sequence', 'mountain');
    if (!fs.existsSync(mountainDir)) return [];
    
    const files = fs.readdirSync(mountainDir);
    return files
      .filter(f => !f.startsWith('.')) // Ignore hidden files
      .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f)) // Only images
      .sort((a, b) => {
        // Extract the first contiguous number found in the filename, default to 0
        const matchA = a.match(/\d+/);
        const matchB = b.match(/\d+/);
        const numA = matchA ? parseInt(matchA[0], 10) : 0;
        const numB = matchB ? parseInt(matchB[0], 10) : 0;
        
        if (numA === numB) {
          // Fallback to strict alphabetical sort if numbers are missing or identical
          return a.localeCompare(b);
        }
        return numA - numB;
      })
      .map(f => `/sequence/mountain/${f}`);
  } catch (error) {
    console.error("Error reading mountain frames:", error);
    return [];
  }
}

import DesktopOnlyBlocker from "@/components/DesktopOnlyBlocker";

export default function Home() {
  const mountainFrames = getMountainFrames();

  return (
    <>
      <DesktopOnlyBlocker />
      <main className="relative min-h-screen hidden lg:block">
        {/* Premium Global Navigation Bar */}
      <Navbar />

      {/* Permanent Fixed Action Button */}
      <FloatingEnvironmentSwitch />

      {/* Cinematic Engine Section */}
      <div className="relative w-full">
        <ScrollSequence dynamicFrames={{ mountain: mountainFrames }} />
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <HeroUI />
          </div>
        </div>
      </div>

      {/* Premium Editorial Layout Section */}
      <EditorialSection />

      {/* Dynamic Editorial Mosaic Viewer */}
      <EditorialMosaic />

      {/* History to Future Timeline */}
      <HistoryToFuture />

      {/* Premium Pre-Footer Transition */}
      <FooterTransition />

      {/* Footer */}
      <Footer />
    </main>
    </>
  );
}
