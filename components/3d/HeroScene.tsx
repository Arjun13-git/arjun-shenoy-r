"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, SpotLight, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, Suspense, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

function Torch({ vec = new THREE.Vector3() }) {
  const light = useRef<THREE.SpotLight>(null);
  useFrame((state) => {
    if (light.current) {
      light.current.position.lerp(vec.set(state.pointer.x * 5, state.pointer.y * 5, 5), 0.1);
      light.current.target.position.lerp(vec.set(state.pointer.x * 2, state.pointer.y * 2, 0), 0.1);
      light.current.target.updateMatrixWorld();
    }
  });
  return <SpotLight ref={light} castShadow penumbra={0.8} distance={15} angle={0.4} attenuation={5} intensity={40} color="#ffaa00" position={[0, 0, 5]} />;
}

function IronThrone() {
  const { scene } = useGLTF("/models/throne.gltf");
  scene.traverse((child) => { if ((child as THREE.Mesh).isMesh) { child.castShadow = true; child.receiveShadow = true; } });
  // FIXED: Returned to exact center [0, -2.5, 0] with 0 rotation for maximum impact
  return <primitive object={scene} position={[0, -2.5, 0]} scale={2.2} rotation={[0, 0, 0]} />; 
}

export default function HeroScene() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* 1. THE 3D WORLD - PERFECTLY CENTERED */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.1} color="#001133" />
          <Suspense fallback={null}>
            <Torch />
            <IronThrone />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#050505" roughness={0.9} />
            </mesh>
            <Environment preset="night" />
          </Suspense>
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
            <Noise opacity={0.04} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 2. THE BRANDING LAYER */}
      <div className="absolute inset-0 pointer-events-none z-10 p-10 flex flex-col justify-between text-white">
        <div className="flex justify-between items-start w-full">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }}>
            <h1 className="text-5xl md:text-7xl font-black tracking-[0.3em] uppercase drop-shadow-[0_0_20px_rgba(255,170,0,0.3)]">
              Arjun Shenoy R
            </h1>
            <h2 className="text-orange-500/90 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mt-3">
              AI/ML Engineer • Creative Developer
            </h2>
          </motion.div>

          <div className="flex gap-6 pointer-events-auto mt-4 font-bold">
            <a href="https://github.com/Arjun13-git" target="_blank" className="hover:text-orange-400 transition-colors tracking-widest text-[10px] uppercase border-b border-white/10 pb-1">GitHub</a>
            <a href="https://www.linkedin.com/in/arjun-shenoy-r-586546285/" className="hover:text-orange-400 transition-colors tracking-widest text-[10px] uppercase border-b border-white/10 pb-1">LinkedIn</a>
          </div>
        </div>

        {/* CLICK TRIGGER - OPEN THE ARCHIVES */}
        {!showAbout && (
          <motion.button 
            onClick={() => setShowAbout(true)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="self-center pointer-events-auto flex flex-col items-center gap-4 group cursor-pointer mb-10"
          >
            <span className="text-[10px] tracking-[0.5em] uppercase font-black text-gray-400 group-hover:text-orange-400 transition-colors">Open the Archives</span>
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-orange-500/50 transition-all duration-500 animate-pulse">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            </div>
          </motion.button>
        )}
      </div>

      {/* 3. THE ABOUT ME OVERLAY */}
      <AnimatePresence>
        {showAbout && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 md:p-20"
          >
            <button 
              onClick={() => setShowAbout(false)}
              className="absolute top-10 right-10 text-white/40 hover:text-orange-500 uppercase tracking-widest text-xs font-bold transition-colors"
            >
              [ Close ]
            </button>

            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
              {/* LEFT: DATA PROFILE */}
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <h3 className="text-orange-500 tracking-[0.6em] uppercase text-sm font-bold mb-6 italic">The Archives</h3>
                <p className="text-xl md:text-2xl font-light tracking-wide leading-relaxed text-gray-200 uppercase">
                  A 6th-semester CS Engineer at <span className="text-white font-bold">Sahyadri College</span>. 
                  Passionate about AI/ML Engineering and Data Science. 
                  
                </p>
                
                <div className="grid grid-cols-2 gap-8 mt-12">
                  <div>
                    <h4 className="text-gray-500 uppercase tracking-widest text-[9px] mb-4 border-b border-white/5 pb-2">Technical Arsenal</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "Machine Learning", "Agentic AI", "Generative AI", "Java / DSA"].map(s => (
                        <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 text-[9px] tracking-widest uppercase text-gray-400 font-bold">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-gray-500 uppercase tracking-widest text-[9px] mb-4 border-b border-white/5 pb-2">Expeditions</h4>
                    <ul className="text-gray-400 text-[10px] tracking-[0.2em] uppercase space-y-2">
                      <li>• </li>
                      <li>• </li>
                      <li>• </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* RIGHT: PORTRAIT FRAME */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative aspect-[4/5] w-full bg-neutral-900 border border-white/10 overflow-hidden rounded-sm shadow-2xl">
                  {/* Ensure your image is in /public/images/your-profile.jpg */}
                  <img 
                    src="/images/your-profile.jpg" 
                    alt="Arjun Shenoy" 
                    className="w-full h-full object-cover  duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full animate-pulse pointer-events-none"></div>
                </div>
                <div className="mt-4 flex justify-between items-center text-[9px] tracking-[0.4em] text-gray-600 uppercase">
                  <span>ID: ARJUN_13_GIT</span>
                  <span>LOC: MANGALURU_IN</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}