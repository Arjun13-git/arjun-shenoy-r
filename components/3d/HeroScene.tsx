"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, SpotLight, useGLTF, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";

// --- THE GREAT HOUSES OF YOUR SKILLSET (Updated for Ink on Parchment) ---
const HOUSES = [
  {
    id: "stark",
    name: "House Stark",
    title: "Core Languages",
    sigil: "/images/stark.png",
    glowColor: "rgba(100, 200, 255, 0.8)", // Ice Blue pulse
    inkColor: "text-slate-900", // Dark ink for parchment
    themeBorder: "border-slate-800",
    skills: ["Java (DSA)", "Python", "C / C++", "JavaScript", "SQL", "HTML + CSS"]
  },
  {
    id: "targaryen",
    name: "House Targaryen",
    title: "AI & Data Science",
    sigil: "/images/targaryen.png",
    glowColor: "rgba(255, 60, 0, 0.8)", // Dragonfire Red pulse
    inkColor: "text-red-950",
    themeBorder: "border-red-950",
    skills: ["TensorFlow", "Pandas", "NumPy", "OpenCV", "LangChain", "LangGraph", "LangFlow", "Agentic AI"]
  },
  {
    id: "lannister",
    name: "House Lannister",
    title: "Web Frameworks",
    sigil: "/images/lannister.png",
    glowColor: "rgba(255, 200, 0, 0.8)", // Lannister Gold pulse
    inkColor: "text-yellow-950",
    themeBorder: "border-yellow-900",
    skills: ["React.js", "Node.js", "Express.js", "Vite", "Flask"]
  },
  {
    id: "baratheon",
    name: "House Baratheon",
    title: "Databases & Tooling",
    sigil: "/images/baratheon.png",
    glowColor: "rgba(255, 255, 255, 0.8)", // Storm Lightning White pulse
    inkColor: "text-stone-900",
    themeBorder: "border-stone-800",
    skills: ["MongoDB", "MySQL", "Git", "GitHub", "Jupyter", "VS Code", "Anaconda", "PyCharm"]
  }
];

// --- 3D COMPONENTS ---
function Torch({ vec = new THREE.Vector3(), isMobile = false }) {
  const light = useRef<THREE.SpotLight>(null);
  useFrame((state) => {
    if (light.current) {
      if (!isMobile) {
        light.current.position.lerp(vec.set(state.pointer.x * 5, state.pointer.y * 5, 5), 0.1);
        light.current.target.position.lerp(vec.set(state.pointer.x * 2, state.pointer.y * 2, 0), 0.1);
      } else {
        light.current.position.lerp(vec.set(0, 3, 6), 0.05);
        light.current.target.position.lerp(vec.set(0, -1, 0), 0.05);
      }
      light.current.target.updateMatrixWorld();
      light.current.intensity = 35 + Math.random() * 15; 
    }
  });
  return <SpotLight ref={light} castShadow={!isMobile} penumbra={0.8} distance={15} angle={0.5} attenuation={5} color="#ffaa00" position={[0, 0, 5]} />;
}

function DragonGlow() {
  const glowRef = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 15 + Math.sin(state.clock.elapsedTime * 2) * 5;
    }
  });
  return <pointLight ref={glowRef} position={[0, -2, -1]} color="#ff2a00" distance={10} />;
}

function IronThrone() {
  const { scene } = useGLTF("/models/throne.gltf");
  scene.traverse((child) => { if ((child as THREE.Mesh).isMesh) { child.castShadow = true; child.receiveShadow = true; } });
  return <primitive object={scene} position={[0, -2.5, 0]} scale={2.2} rotation={[0, 0, 0]} />; 
}

useGLTF.preload("/models/throne.gltf");

// --- MAIN SCENE ---
export default function HeroScene() {
  const [showAbout, setShowAbout] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);
  
  // Sigil States
  const [activeHouse, setActiveHouse] = useState<string | null>(null);
  const [pulsingHouse, setPulsingHouse] = useState<string | null>(null);

  useEffect(() => {
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
    if (section === "skills") setActiveHouse(null);
  };

  const handleSigilClick = (houseId: string) => {
    if (activeHouse === houseId) return; 
    setPulsingHouse(houseId);
    setTimeout(() => {
      setActiveHouse(houseId);
      setPulsingHouse(null);
    }, 600); 
  };

  const currentHouseData = HOUSES.find(h => h.id === activeHouse);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
      
      {/* 1. 3D WORLD */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows={!isMobile} dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: isMobile ? 60 : 45 }}>
          <ambientLight intensity={0.1} color="#000510" />
          <Suspense fallback={null}>
            <Torch isMobile={isMobile} />
            <DragonGlow />
            <IronThrone />
            <Sparkles count={isMobile ? 50 : 150} scale={10} size={3} speed={0.8} opacity={0.8} color="#ff4400" noise={1} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow={!isMobile}>
              <planeGeometry args={[50, 50]} />
              <meshStandardMaterial color="#050505" roughness={0.9} />
            </mesh>
            <Environment preset="night" />
          </Suspense>
          {!isMobile && (
            <EffectComposer>
              <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
              <Noise opacity={0.05} />
              <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      {/* 2. BRANDING LAYER */}
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

      {/* 3. NAVIGATION DRAWER */}
      <AnimatePresence>
        {showNav && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowNav(false)} className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }} className="absolute top-0 right-0 w-[85%] md:w-[400px] h-full bg-black/90 backdrop-blur-2xl border-l border-white/10 z-50 p-8 md:p-10 flex flex-col justify-center">
              <button onClick={() => setShowNav(false)} className="absolute top-8 right-8 text-white/50 hover:text-orange-500 uppercase tracking-widest text-xs font-bold transition-colors">[ Close ]</button>
              <nav className="flex flex-col gap-8 md:gap-10 text-right mt-10">
                <button onClick={() => openSection("home")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">The Realm</button>
                <button onClick={() => openSection("about")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">The Archives</button>
                <button onClick={() => openSection("projects")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">Expeditions</button>
                <button onClick={() => openSection("skills")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-orange-500 hover:text-orange-400 transition-colors">The Forge</button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. EXPEDITIONS OVERLAY (Scroll Fixed) */}
      <AnimatePresence>
        {showProjects && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block">
            <div className="w-full max-w-7xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48">
              
              <button onClick={() => setShowProjects(false)} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">
                [ Return ]
              </button>
              
              <div className="mb-10 md:mb-16 border-b border-white/10 pb-6 md:pb-8">
                <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">Expeditions</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Major Works & Hackathons</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                
                {/* 1. Dyslexia Risk AI */}
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
                
                {/* 2. SafeHorizon */}
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

                {/* 3. Project Aether */}
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

                {/* 4. HC-402 KYC */}
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

                {/* 5. Sentinel Agents */}
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

                {/* 6. PromptGuard */}
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

      {/* 5. THE FORGE (Scroll Fixed) */}
      <AnimatePresence>
        {showSkills && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block"
          >
            <div className="w-full max-w-6xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48">
              
              <button onClick={() => setShowSkills(false)} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">
                [ Return ]
              </button>

              {/* HEADER */}
              <div className="mb-10 md:mb-12 border-b border-orange-500/30 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
                <div>
                  <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">The Forge</h2>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Maester's Chain</h3>
                </div>
                <a href="/Arjun-Shenoy-R_Resume.pdf" download="Arjun_Shenoy_Resume.pdf" className="group relative px-6 py-3 md:py-4 bg-orange-500/10 border border-orange-500/50 hover:bg-orange-500 hover:text-black transition-all duration-300 text-white text-[10px] md:text-sm tracking-[0.3em] uppercase font-bold overflow-hidden w-full md:w-auto text-center flex justify-center shadow-[0_0_15px_rgba(255,80,0,0.2)]">
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download Resume
                  </span>
                  <div className="absolute inset-0 bg-orange-500 w-0 group-hover:w-full transition-all duration-300 ease-out z-0"></div>
                </a>
              </div>

              {/* SIGIL GALLERY */}
              {!activeHouse && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-16 pb-20 mt-10">
                  <p className="text-gray-500 tracking-[0.4em] uppercase text-sm font-bold text-center border-b border-white/5 pb-4">Select a House to Unroll the Manuscripts</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-5xl px-4">
                    {HOUSES.map((house) => (
                      <motion.button
                        key={house.id}
                        onClick={() => handleSigilClick(house.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative flex flex-col items-center gap-6 group"
                      >
                        <AnimatePresence>
                          {pulsingHouse === house.id && (
                            <motion.div 
                              initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 2.5, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
                              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 rounded-full pointer-events-none mix-blend-screen blur-xl"
                              style={{ backgroundColor: house.glowColor }}
                            />
                          )}
                        </AnimatePresence>

                        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white/5 bg-black/50 flex items-center justify-center p-6 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/5 shadow-2xl" 
                             style={{ boxShadow: pulsingHouse === house.id ? `0 0 80px ${house.glowColor}` : 'none' }}>
                          <img src={house.sigil} alt={house.name} className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                        <span className="text-[10px] md:text-sm tracking-[0.3em] uppercase font-bold transition-colors text-gray-300 group-hover:text-white opacity-60 group-hover:opacity-100">
                          {house.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* THE UNFURLING MANUSCRIPT */}
              <AnimatePresence mode="wait">
                {activeHouse && currentHouseData && (
                  <motion.div 
                    key="manuscript"
                    initial={{ height: 0, opacity: 0.5 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }} 
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className={`w-full max-w-3xl mx-auto overflow-hidden border-y-8 border-double ${currentHouseData.themeBorder} relative mt-10 mb-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#e8dcc4] bg-[url('/images/parchment.jpeg')] bg-cover bg-center text-slate-900 rounded-sm`}
                    style={{ transformOrigin: "top" }}
                  >
                    <div className="p-8 md:p-16 flex flex-col items-center relative z-10">
                      <img src={currentHouseData.sigil} alt="Sigil watermark" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 opacity-[0.07] pointer-events-none grayscale mix-blend-multiply" />
                      
                      <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-[0.3em] mb-2 ${currentHouseData.inkColor} text-center font-serif drop-shadow-sm`}>
                        {currentHouseData.name}
                      </h3>
                      <h4 className={`tracking-[0.4em] uppercase text-xs md:text-sm mb-12 text-center border-b-2 ${currentHouseData.themeBorder} pb-4 px-10 ${currentHouseData.inkColor} font-bold opacity-80`}>
                        {currentHouseData.title}
                      </h4>

                      <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10 w-full">
                        {currentHouseData.skills.map((skill, index) => (
                          <motion.span 
                            key={skill} 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + (index * 0.05) }} 
                            className={`px-5 py-3 bg-transparent border-2 ${currentHouseData.themeBorder} text-xs md:text-sm tracking-widest uppercase ${currentHouseData.inkColor} font-bold shadow-sm hover:bg-black/5 transition-colors`}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>

                      <button 
                        onClick={() => setActiveHouse(null)} 
                        className={`mt-16 text-[10px] md:text-xs tracking-[0.4em] uppercase hover:bg-black/10 transition-colors border-2 ${currentHouseData.themeBorder} ${currentHouseData.inkColor} font-bold px-8 py-3`}
                      >
                        Refurl Manuscript
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. ABOUT OVERLAY (Scroll Fixed) */}
      <AnimatePresence>
        {showAbout && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto pointer-events-auto block">
            <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen p-6 pt-24 md:p-16 pb-32 relative">
              
              <button onClick={() => setShowAbout(false)} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">
                [ Close ]
              </button>
              
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-6">
                <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm backdrop-blur-sm">
                  <h3 className="text-orange-500 tracking-[0.4em] uppercase text-[10px] md:text-sm font-bold mb-4 italic">The Architect</h3>
                  <p className="text-lg md:text-2xl font-light tracking-wide leading-relaxed text-gray-100 uppercase">
                    A 6th-semester CS Engineer at <span className="text-white font-bold">Sahyadri College</span>. Dedicated to forging intelligent systems with a deep focus on AI/ML Engineering and Data Science.
                  </p>
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