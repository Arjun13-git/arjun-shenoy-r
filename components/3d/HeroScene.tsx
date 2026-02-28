"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, SpotLight, useGLTF, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, Suspense, useState } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

// Import our new UI Overlays
import NavigationMenu from "../ui/NavigationMenu";
import AboutOverlay from "../ui/AboutOverlay";
import ProjectsOverlay from "../ui/ProjectsOverlay";
import SkillsOverlay from "../ui/SkillsOverlay";

// --- 3D COMPONENTS ---
function Torch({ vec = new THREE.Vector3() }) {
  const light = useRef<THREE.SpotLight>(null);
  useFrame((state) => {
    if (light.current) {
      light.current.position.lerp(vec.set(state.pointer.x * 5, state.pointer.y * 5, 5), 0.1);
      light.current.target.position.lerp(vec.set(state.pointer.x * 2, state.pointer.y * 2, 0), 0.1);
      light.current.target.updateMatrixWorld();
      light.current.intensity = 35 + Math.random() * 15; 
    }
  });
  return <SpotLight ref={light} castShadow penumbra={0.8} distance={15} angle={0.5} attenuation={5} color="#ffaa00" position={[0, 0, 5]} />;
}

function DragonGlow() {
  const glowRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 15 + Math.sin(state.clock.elapsedTime * 4) * 5 + Math.random() * 5;
    }
  });
  return <pointLight ref={glowRef} position={[0, -2, -1]} color="#ff2a00" distance={10} />;
}

function IronThrone() {
  const { scene } = useGLTF("/models/throne.gltf");
  scene.traverse((child) => { if ((child as THREE.Mesh).isMesh) { child.castShadow = true; child.receiveShadow = true; } });
  return <primitive object={scene} position={[0, -2.5, 0]} scale={2.2} rotation={[0, 0, 0]} />; 
}

// --- MAIN SCENE ---
export default function HeroScene() {
  const [showAbout, setShowAbout] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  // Centralized Navigation Handler
  const openSection = (section: string) => {
    setShowNav(false);
    setShowAbout(section === "about");
    setShowProjects(section === "projects");
    setShowSkills(section === "skills");
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
      
      {/* 1. THE 3D WORLD */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.1} color="#000510" />
          <Suspense fallback={null}>
            <Torch />
            <DragonGlow />
            <IronThrone />
            <Sparkles count={150} scale={10} size={3} speed={0.8} opacity={0.8} color="#ff4400" noise={1} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#050505" roughness={0.9} />
            </mesh>
            <Environment preset="night" />
          </Suspense>
          <EffectComposer>
            <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
            <Noise opacity={0.05} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* 2. THE BRANDING LAYER */}
      <div className="absolute inset-0 pointer-events-none z-10 p-6 md:p-10 flex flex-col justify-between text-white">
        
        <div className="flex justify-between items-start w-full pointer-events-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="pointer-events-none">
            <h1 className="text-4xl md:text-7xl font-black tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(255,170,0,0.3)]">
              Arjun Shenoy R
            </h1>
            <h2 className="text-orange-500/90 tracking-[0.4em] uppercase text-xs md:text-sm font-bold mt-4">
              AI/ML Engineer • Creative Developer
            </h2>
          </motion.div>

          <button 
            onClick={() => setShowNav(true)}
            className="group flex items-center gap-3 hover:text-orange-500 transition-colors z-50 pointer-events-auto"
          >
            <span className="text-xs tracking-[0.3em] uppercase font-bold hidden md:block">Menu</span>
            <div className="flex flex-col gap-1.5 opacity-80 group-hover:opacity-100">
              <div className="w-8 h-[2px] bg-current"></div>
              <div className="w-6 h-[2px] bg-current self-end"></div>
              <div className="w-8 h-[2px] bg-current"></div>
            </div>
          </button>
        </div>

        {!showAbout && !showProjects && !showSkills && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-10 left-10 max-w-md hidden md:block">
            <h3 className="text-orange-500/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 border-b border-white/10 pb-2 inline-block">The Mission</h3>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed tracking-wider uppercase font-light">
              Bridging the gap between complex machine learning algorithms and automating tasks. Focusing on Agentic AI and intelligent systems.
            </p>
          </motion.div>
        )}

        {!showAbout && !showProjects && !showSkills && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-10 right-10 text-right hidden md:block">
             <h3 className="text-orange-500/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 border-b border-white/10 pb-2 inline-block">Current Status</h3>
             <ul className="text-gray-300 text-sm md:text-base tracking-[0.1em] uppercase font-light space-y-3">
               <li>6th Sem CS Engineer</li>
               <li>Sahyadri College of Engineering</li>
             </ul>
          </motion.div>
        )}
      </div>

      {/* 3. INJECT UI OVERLAYS */}
      <NavigationMenu isOpen={showNav} onClose={() => setShowNav(false)} onNavigate={openSection} />
      <SkillsOverlay isOpen={showSkills} onClose={() => setShowSkills(false)} />
      <ProjectsOverlay isOpen={showProjects} onClose={() => setShowProjects(false)} />
      <AboutOverlay isOpen={showAbout} onClose={() => setShowAbout(false)} />
      
    </div>
  );
}