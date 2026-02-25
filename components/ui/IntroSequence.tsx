"use client";

import { useState, useRef, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// --- NEW: THE DRAGONSTONE 3D BACKGROUND ---
function Dragonstone() {
  const { scene } = useGLTF("/models/dragonstone/dragonstone.gltf");
  const group = useRef<THREE.Group>(null);

  // Slowly rotate the throne to make it feel cinematic and alive
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.003; 
    }
  });

  return (
    <group ref={group}>
      <primitive 
        object={scene} 
        position={[0, -2, -8]} // -3 pushes it down so we see the seat, -8 pushes it back
        scale={0.5}           // The sweet spot between 0.8 and 0.05
      />
    </group>
  );
}
// ------------------------------------------

export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<'waiting' | 'playing'>('waiting');

  const startSequence = () => {
    setStage('playing');
    
    const audio = new Audio('/sounds/theme.mp3');
    audio.volume = 0.6;
    audio.loop = true; 
    audio.play().catch(e => console.error("Audio blocked by browser:", e));

    setTimeout(() => {
      onComplete();
    }, 14000);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
        exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
      >
        
        {/* --- NEW: THE BACKGROUND CANVAS --- */}
        {/* We drop the opacity to 30% so it acts like a dark, moody background */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.1} color="#4a5568" /> {/* Cold blue light */}
            <spotLight position={[5, 10, 5]} intensity={20} color="#ffaa00" /> {/* Fire accent */}
            <Suspense fallback={null}>
              <Dragonstone />
              <Environment preset="night" />
            </Suspense>
          </Canvas>
        </div>
        {/* ---------------------------------- */}

        {/* STAGE 1: THE IGNITION SWITCH */}
        {stage === 'waiting' && (
          <motion.div 
            onClick={startSequence}
            className="relative z-10 cursor-pointer text-center group"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl md:text-4xl text-white tracking-[0.5em] uppercase font-light drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              Begin the Journey
            </h1>
            <p className="mt-4 text-gray-500 tracking-widest text-sm uppercase group-hover:text-orange-400 transition-colors duration-500">
              Enter the Realm
            </p>
          </motion.div>
        )}

        {/* STAGE 2: THE EXTENDED COIN FLIP */}
        {stage === 'playing' && (
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
            
            <div className="relative w-48 h-48 md:w-64 md:h-64" style={{ perspective: "1000px" }}>
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ scale: 0, rotateY: 0 }}
                animate={{ 
                  scale:   [0, 1.2, 1.2, 1.2, 1.2, 0], 
                  rotateY: [0, 1080, 1080, 1260, 1260, 2340] 
                }}
                transition={{ 
                  duration: 14, 
                  ease: "easeInOut",
                  times: [0, 0.107, 0.464, 0.536, 0.893, 1] 
                }}
              >
                <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden" }}>
                  <img src="/images/coin-face.png" alt="Face" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,170,0,0.4)]" />
                </div>
                
                <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <img src="/images/coin-text.png" alt="Text" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(255,170,0,0.4)]" />
                </div>
              </motion.div>
            </div>

            <div className="absolute bottom-1/4 flex flex-col items-center justify-center w-full">
              <motion.h2 
                className="absolute text-white text-2xl md:text-5xl tracking-[0.4em] font-bold text-center w-full drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 1, 0, 0] }}
                transition={{ duration: 14, times: [0, 0.107, 0.464, 0.5, 1] }}
              >
                VALAR MORGHULIS
              </motion.h2>

              <motion.h2 
                className="absolute text-white text-2xl md:text-5xl tracking-[0.4em] font-bold text-center w-full drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
                transition={{ duration: 14, times: [0, 0.5, 0.536, 0.893, 0.928, 1] }}
              >
                VALAR DOHAERIS
              </motion.h2>
            </div>

          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}