"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, SpotLight, useGLTF, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// --- OPTIMIZED 3D COMPONENTS ---
function Torch({ vec = new THREE.Vector3(), isMobile = false }) {
  const light = useRef<THREE.SpotLight>(null);
  
  useFrame((state) => {
    if (light.current) {
      if (!isMobile) {
        // Desktop: Follow cursor smoothly
        light.current.position.lerp(vec.set(state.pointer.x * 5, state.pointer.y * 5, 5), 0.1);
        light.current.target.position.lerp(vec.set(state.pointer.x * 2, state.pointer.y * 2, 0), 0.1);
      } else {
        // Mobile: Static cinematic angle (saves CPU/Battery)
        light.current.position.lerp(vec.set(0, 3, 6), 0.05);
        light.current.target.position.lerp(vec.set(0, -1, 0), 0.05);
      }
      light.current.target.updateMatrixWorld();
      
      // Keep the flicker, it's cheap and looks great
      light.current.intensity = 35 + Math.random() * 15; 
    }
  });
  
  // Disable real-time shadows from the torch on mobile
  return <SpotLight ref={light} castShadow={!isMobile} penumbra={0.8} distance={15} angle={0.5} attenuation={5} color="#ffaa00" position={[0, 0, 5]} />;
}

function DragonGlow() {
  const glowRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (glowRef.current) {
      // Slower, cheaper sine wave calculation
      glowRef.current.intensity = 15 + Math.sin(state.clock.elapsedTime * 2) * 5;
    }
  });
  return <pointLight ref={glowRef} position={[0, -2, -1]} color="#ff2a00" distance={10} />;
}

function IronThrone() {
  const { scene } = useGLTF("/models/throne.gltf");
  scene.traverse((child) => { 
    if ((child as THREE.Mesh).isMesh) { 
      child.castShadow = true; 
      child.receiveShadow = true; 
    } 
  });
  return <primitive object={scene} position={[0, -2.5, 0]} scale={2.2} rotation={[0, 0, 0]} />; 
}

// Preload the model so the page doesn't hang on initial load
useGLTF.preload("/models/throne.gltf");

// --- MAIN SCENE ---
export default function HeroScene() {
  const [showAbout, setShowAbout] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  
  // Hardware/Mobile detection state
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the user is on a mobile device or a small screen
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openSection = (section: string) => {
    setShowNav(false);
    setShowAbout(section === "about");
    setShowProjects(section === "projects");
    setShowSkills(section === "skills");
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
      
      {/* 1. OPTIMIZED 3D WORLD */}
      <div className="absolute inset-0 z-0">
        {/* dpr={[1, 1.5]} limits pixel ratio so retina screens don't fry the GPU */}
        <Canvas shadows={!isMobile} dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: isMobile ? 60 : 45 }}>
          <ambientLight intensity={0.1} color="#000510" />
          <Suspense fallback={null}>
            <Torch isMobile={isMobile} />
            <DragonGlow />
            <IronThrone />
            
            {/* Reduce particles on mobile to save memory */}
            <Sparkles count={isMobile ? 50 : 150} scale={10} size={3} speed={0.8} opacity={0.8} color="#ff4400" noise={1} />
            
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow={!isMobile}>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#050505" roughness={0.9} />
            </mesh>
            <Environment preset="night" />
          </Suspense>
          
          {/* Only render the heavy EffectComposer on desktop */}
          {!isMobile && (
            <EffectComposer disableNormalPass>
              <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
              <Noise opacity={0.05} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      {/* 2. THE BRANDING LAYER & MENU BUTTON */}
      <div className="absolute inset-0 pointer-events-none z-10 p-6 md:p-10 flex flex-col justify-between text-white">
        <div className="flex justify-between items-start w-full pointer-events-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="pointer-events-none">
            <h1 className="text-3xl md:text-7xl font-black tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(255,170,0,0.3)] mt-2 md:mt-0">
              Arjun Shenoy R
            </h1>
            <h2 className="text-orange-500/90 tracking-[0.2em] md:tracking-[0.4em] uppercase text-[10px] md:text-sm font-bold mt-2 md:mt-4">
              AI/ML Engineer • Creative Developer
            </h2>
          </motion.div>

          <button onClick={() => setShowNav(true)} className="group flex items-center gap-3 hover:text-orange-500 transition-colors z-50 pointer-events-auto bg-black/50 p-3 md:p-0 md:bg-transparent rounded-full md:rounded-none backdrop-blur-md md:backdrop-blur-none mt-2 md:mt-0">
            <span className="text-xs tracking-[0.3em] uppercase font-bold hidden md:block">Menu</span>
            <div className="flex flex-col gap-1.5 opacity-80 group-hover:opacity-100">
              <div className="w-6 md:w-8 h-[2px] bg-current"></div>
              <div className="w-4 md:w-6 h-[2px] bg-current self-end"></div>
              <div className="w-6 md:w-8 h-[2px] bg-current"></div>
            </div>
          </button>
        </div>

        {!showAbout && !showProjects && !showSkills && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-[280px] md:max-w-md">
            <h3 className="text-orange-500/80 text-[10px] md:text-sm tracking-[0.3em] uppercase mb-2 md:mb-4 border-b border-white/10 pb-2 inline-block">The Mission</h3>
            <p className="text-gray-300 text-xs md:text-base leading-relaxed tracking-wider uppercase font-light">
              Bridging the gap between complex machine learning algorithms and automating tasks. Focusing on Agentic AI and intelligent systems.
            </p>
          </motion.div>
        )}
      </div>

      {/* 3. THE SLIDING GLASS NAVBAR */}
      <AnimatePresence>
        {showNav && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNav(false)} className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }} className="absolute top-0 right-0 w-[85%] md:w-[400px] h-full bg-black/90 backdrop-blur-2xl border-l border-white/10 z-50 p-8 md:p-10 flex flex-col justify-center">
              <button onClick={() => setShowNav(false)} className="absolute top-8 right-8 text-white/50 hover:text-orange-500 uppercase tracking-widest text-xs font-bold transition-colors">
                [ Close ]
              </button>
              
              <nav className="flex flex-col gap-8 md:gap-10 text-right mt-10">
                <button onClick={() => openSection("home")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">The Realm</button>
                <button onClick={() => openSection("about")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">The Archives</button>
                <button onClick={() => openSection("projects")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">Expeditions</button>
                <button onClick={() => openSection("skills")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-orange-500 hover:text-orange-400 transition-colors">The Forge</button>
              </nav>

              <div className="absolute bottom-10 right-8 md:right-10 flex gap-6 font-bold">
                <a href="https://github.com/Arjun13-git" target="_blank" className="text-gray-500 hover:text-orange-400 transition-colors tracking-widest text-[10px] md:text-xs uppercase">GitHub</a>
                <a href="https://www.linkedin.com/in/arjun-shenoy-r-586546285/" target="_blank" className="text-gray-500 hover:text-orange-400 transition-colors tracking-widest text-[10px] md:text-xs uppercase">LinkedIn</a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. THE PROJECTS OVERLAY (Expeditions) */}
      <AnimatePresence>
        {showProjects && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="absolute inset-0 z-30 bg-black/95 backdrop-blur-3xl flex flex-col items-center p-6 pt-24 md:p-20 overflow-y-auto pointer-events-auto">
            <div className="w-full max-w-7xl relative">
              <button onClick={() => setShowProjects(false)} className="fixed md:absolute top-6 md:-top-10 right-6 md:right-0 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-50">
                [ Return ]
              </button>
              
              <div className="mb-10 md:mb-16 border-b border-white/10 pb-6 md:pb-8">
                <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">Expeditions</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Major Works & Hackathons</h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-32">
                 {/* Dyslexia Risk AI */}
                 <a href="#" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                  <div>
                    <span className="text-gray-400 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-white/10 w-max px-2 py-1">Deep Learning</span>
                    <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">Dyslexia Risk AI</h4>
                    <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Predictive model using LSTM networks to analyze handwriting sequences. Improved accuracy by 15% via image preprocessing.</p>
                  </div>
                  <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                    <span>TensorFlow / OpenCV</span>
                    <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                  </div>
                </a>
                
                {/* SafeHorizon */}
                <a href="https://github.com/Arjun13-git/Disaster_Alert_Mgt" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                  <div>
                    <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                    <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">SafeHorizon</h4>
                    <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Real-time disaster alert management system leveraging Groq AI & NASA EONET data.</p>
                  </div>
                  <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                    <span>AI / Fullstack</span>
                    <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                  </div>
                </a>

                {/* Project Aether */}
                <a href="https://github.com/Arjun13-git/Project-Aether" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                  <div>
                    <span className="text-gray-400 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-white/10 w-max px-2 py-1">Major Project</span>
                    <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">Project AETHER</h4>
                    <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Autonomous surveillance platform simulating defense workflows for satellite & aerial imagery.</p>
                  </div>
                  <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                    <span>Python / YOLOv8</span>
                    <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                  </div>
                </a>

                {/* HC-402 KYC */}
                <a href="https://github.com/aniprogramer/hc402-kyc-platform" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                  <div>
                    <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                    <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">HC-402 KYC</h4>
                    <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Automated Digital KYC and Secure Onboarding Platform built during a February hackathon.</p>
                  </div>
                  <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                    <span>Security / Auth</span>
                    <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                  </div>
                </a>

                {/* Sentinel Agents */}
                <a href="https://github.com/aniprogramer/sentinel-agents" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                  <div>
                    <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                    <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">Sentinel Agents</h4>
                    <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Cybersecurity-focused agentic system designed to monitor and defend digital perimeters.</p>
                  </div>
                  <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                    <span>Agentic AI / Security</span>
                    <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                  </div>
                </a>

                {/* PromptGuard */}
                <a href="https://github.com/Arjun13-git/PromptGuard" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                  <div>
                    <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                    <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">PromptGuard</h4>
                    <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Defense mechanism engineered to protect LLMs against malicious prompt injection attacks.</p>
                  </div>
                  <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                    <span>LLM / Security</span>
                    <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. THE SKILLS & RESUME OVERLAY (The Forge) */}
      <AnimatePresence>
        {showSkills && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="absolute inset-0 z-30 bg-black/95 backdrop-blur-3xl flex flex-col items-center p-6 pt-24 md:p-20 overflow-y-auto pointer-events-auto">
            <div className="w-full max-w-6xl relative">
              <button onClick={() => setShowSkills(false)} className="fixed md:absolute top-6 md:-top-10 right-6 md:right-0 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-50">
                [ Return ]
              </button>
              
              <div className="mb-10 md:mb-12 border-b border-white/10 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                  <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">The Forge</h2>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Maester's Chain</h3>
                </div>
                
                <a href="/Arjun-Shenoy-R_Resume.pdf" download="Arjun_Shenoy_Resume.pdf" className="group relative px-6 py-3 md:py-4 bg-orange-500/10 border border-orange-500/50 hover:bg-orange-500 hover:text-black transition-all duration-300 text-white text-[10px] md:text-sm tracking-[0.3em] uppercase font-bold overflow-hidden w-full md:w-auto text-center flex justify-center">
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download Resume
                  </span>
                  <div className="absolute inset-0 bg-orange-500 w-0 group-hover:w-full transition-all duration-300 ease-out z-0"></div>
                </a>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
                <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                  <h4 className="text-gray-400 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-2">Core Languages</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {["Java (DSA)", "Python", "C / C++", "JavaScript", "SQL", "HTML + CSS"].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-black/60 border border-white/10 text-[10px] md:text-xs tracking-widest uppercase text-gray-200">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 p-6 md:p-8 shadow-[0_0_30px_rgba(255,170,0,0.05)]">
                  <h4 className="text-orange-500/80 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-2">AI / ML & Data Science</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {["TensorFlow", "Pandas", "NumPy", "OpenCV", "LangChain", "LangGraph", "LangFlow", "Agentic AI"].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-black/60 border border-orange-500/30 text-[10px] md:text-xs tracking-widest uppercase text-white font-bold">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 md:p-8">
                  <h4 className="text-gray-400 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-2">Web & Frameworks</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {["React.js", "Node.js", "Express.js", "Vite", "Flask"].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-black/60 border border-white/10 text-[10px] md:text-xs tracking-widest uppercase text-gray-200">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-6 md:p-8 lg:col-span-3">
                  <h4 className="text-gray-400 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-2">Databases & Tooling</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {["MongoDB", "MySQL", "Git", "GitHub", "Jupyter Notebooks", "VS Code", "Anaconda"].map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-black/60 border border-white/10 text-[10px] md:text-xs tracking-widest uppercase text-gray-200">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. THE ABOUT ME OVERLAY (The Archives) */}
      <AnimatePresence>
        {showAbout && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="absolute inset-0 z-30 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 pt-24 md:p-16 overflow-y-auto pointer-events-auto">
            <button onClick={() => setShowAbout(false)} className="fixed md:absolute top-6 md:top-10 right-6 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-50">
              [ Close ]
            </button>
            <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-8 md:gap-12 items-center h-full pb-20 md:pb-0 pt-10 md:pt-0">
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-6">
                <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm backdrop-blur-sm">
                  <h3 className="text-orange-500 tracking-[0.4em] uppercase text-[10px] md:text-sm font-bold mb-4 italic">The Architect</h3>
                  <p className="text-lg md:text-2xl font-light tracking-wide leading-relaxed text-gray-100 uppercase">
                    A 6th-semester CS Engineer at <span className="text-white font-bold">Sahyadri College</span>. Dedicated to forging intelligent systems with a deep focus on AI/ML Engineering and Data Science.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 hidden md:grid">
                  <div className="bg-white/5 border border-white/10 p-6 hover:border-orange-500/30 transition-colors">
                    <h4 className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-2">Project</h4>
                    <p className="text-white text-base md:text-lg font-bold uppercase tracking-widest">AETHER</p>
                    <p className="text-gray-300 text-sm uppercase mt-2">Autonomous surveillance platform</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-6 hover:border-orange-500/30 transition-colors">
                    <h4 className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-2">Hackathon</h4>
                    <p className="text-white text-base md:text-lg font-bold uppercase tracking-widest">Sentinel Agents</p>
                    <p className="text-gray-300 text-sm uppercase mt-2">Cybersecurity</p>
                  </div>
                </div>
              </motion.div>
              <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="relative group h-full flex flex-col justify-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative aspect-[4/5] w-full max-h-[50vh] md:max-h-[70vh] bg-neutral-900 border border-white/10 overflow-hidden rounded-sm shadow-2xl">
                  <img src="/images/your-profile.jpg" alt="Arjun Shenoy" className="w-full h-full object-cover duration-700 opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full animate-pulse pointer-events-none"></div>
                </div>
                <div className="mt-4 md:mt-6 flex justify-between items-center text-[9px] md:text-sm tracking-[0.3em] text-gray-500 uppercase">
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