"use client";

import { useState } from "react";
import HeroScene from "@/components/3d/HeroScene";
import IntroSequence from "@/components/ui/IntroSequence";
import { AnimatePresence } from "framer-motion"; // <-- NEW IMPORT

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <main className="w-full min-h-screen bg-black overflow-hidden relative">
      
      {/* The 3D Scene renders immediately in the background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* AnimatePresence allows the exit animation to play BEFORE destroying the component */}
      <AnimatePresence>
        {!introFinished && (
          <IntroSequence key="intro" onComplete={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>
      
    </main>
  );
}