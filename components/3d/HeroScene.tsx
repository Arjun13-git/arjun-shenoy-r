"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, SpotLight, useGLTF, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser'; // NEW: Import EmailJS

// --- THE GREAT HOUSES OF YOUR SKILLSET ---
const HOUSES = [
  {
    id: "stark",
    name: "House Stark",
    title: "Core Languages",
    sigil: "/images/stark.png",
    glowColor: "rgba(100, 200, 255, 0.8)", 
    inkColor: "text-slate-900", 
    themeBorder: "border-slate-800",
    skills: ["Java (DSA)", "Python", "C / C++", "JavaScript", "SQL", "HTML + CSS"]
  },
  {
    id: "targaryen",
    name: "House Targaryen",
    title: "AI & Data Science",
    sigil: "/images/targaryen.png",
    glowColor: "rgba(255, 60, 0, 0.8)", 
    inkColor: "text-red-950",
    themeBorder: "border-red-950",
    skills: ["TensorFlow", "Pandas", "NumPy", "OpenCV", "LangChain", "LangGraph", "LangFlow", "Agentic AI"]
  },
  {
    id: "lannister",
    name: "House Lannister",
    title: "Web Frameworks",
    sigil: "/images/lannister.png",
    glowColor: "rgba(255, 200, 0, 0.8)", 
    inkColor: "text-yellow-950",
    themeBorder: "border-yellow-900",
    skills: ["React.js", "Node.js", "Express.js", "Vite", "Flask"]
  },
  {
    id: "baratheon",
    name: "House Baratheon",
    title: "Databases & Tooling",
    sigil: "/images/baratheon.png",
    glowColor: "rgba(255, 255, 255, 0.8)", 
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
  const [showRavenry, setShowRavenry] = useState(false);
  
  const [isMobile, setIsMobile] = useState(false);
  
  const [activeHouse, setActiveHouse] = useState<string | null>(null);
  const [pulsingHouse, setPulsingHouse] = useState<string | null>(null);

  // Form states
  const [ravenStatus, setRavenStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
    setShowRavenry(section === "ravenry");
    if (section === "skills") setActiveHouse(null);
    if (section === "ravenry") {
      setRavenStatus("idle");
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleSigilClick = (houseId: string) => {
    if (activeHouse === houseId) {
      setActiveHouse(null);
      return;
    }
    setPulsingHouse(houseId);
    setTimeout(() => {
      setActiveHouse(houseId);
      setPulsingHouse(null);
    }, 400); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendRaven = (e: React.FormEvent) => {
    e.preventDefault();
    setRavenStatus("sending");

    // Replace these 3 strings with your actual EmailJS keys!
    const SERVICE_ID = "service_d4zrfpi";
    const TEMPLATE_ID = "template_i2okbfn";
    const PUBLIC_KEY = "DBNfqfZZL3-3bsKhK";

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
      },
      PUBLIC_KEY
    )
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
       setRavenStatus("sent");
       setFormData({ name: '', email: '', message: '' }); // Clear the form
       setTimeout(() => setRavenStatus("idle"), 5000); // Reset button after 5s
    })
    .catch((err) => {
       console.log('FAILED...', err);
       setRavenStatus("idle");
       alert("The raven was intercepted by a storm. Please try again or use direct email.");
    });
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
        {!showAbout && !showProjects && !showSkills && !showRavenry && (
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
                <button onClick={() => openSection("skills")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">The Forge</button>
                <button onClick={() => openSection("ravenry")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-orange-500 hover:text-orange-400 transition-colors">The Ravenry</button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. EXPEDITIONS OVERLAY */}
      <AnimatePresence>
        {showProjects && (
           <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block">
            <div className="w-full max-w-7xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48">
              <button onClick={() => setShowProjects(false)} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">[ Return ]</button>
              <div className="mb-10 md:mb-16 border-b border-white/10 pb-6 md:pb-8">
                <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">Expeditions</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Major Works & Hackathons</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. THE FORGE OVERLAY */}
      <AnimatePresence>
        {showSkills && (
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block">
             <div className="w-full max-w-6xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48">
              <button onClick={() => setShowSkills(false)} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">[ Return ]</button>
              <div className="mb-10 md:mb-12 border-b border-orange-500/30 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
                <div>
                  <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">The Forge</h2>
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Maester's Chain</h3>
                </div>
              </div>

              {!activeHouse && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center gap-16 pb-20 mt-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-5xl px-4">
                    {HOUSES.map((house) => (
                      <motion.button key={house.id} onClick={() => handleSigilClick(house.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative flex flex-col items-center gap-6 group">
                        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white/5 bg-black/50 flex items-center justify-center p-6 transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/5 shadow-2xl">
                          <img src={house.sigil} alt={house.name} className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                        </div>
                        <span className="text-[10px] md:text-sm tracking-[0.3em] uppercase font-bold transition-colors text-gray-300 group-hover:text-white opacity-60 group-hover:opacity-100">{house.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <AnimatePresence mode="wait">
                {activeHouse && currentHouseData && (
                  <motion.div 
                    key="manuscript"
                    initial={{ height: 0, opacity: 0.5 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.7 }}
                    className={`w-full max-w-3xl mx-auto overflow-hidden border-y-8 border-double ${currentHouseData.themeBorder} relative mt-10 mb-20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-gradient-to-br from-[#fdfbf7] via-[#e8dcc4] to-[#d4c391] text-slate-900 rounded-sm`}
                    style={{ transformOrigin: "top", boxShadow: "inset 0 0 60px rgba(166,138,86,0.4), 0 20px 50px rgba(0,0,0,0.8)" }}
                  >
                    <div className="p-8 md:p-16 flex flex-col items-center relative z-10">
                      <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-[0.3em] mb-2 ${currentHouseData.inkColor} text-center font-serif drop-shadow-sm`}>{currentHouseData.name}</h3>
                      <h4 className={`tracking-[0.4em] uppercase text-xs md:text-sm mb-12 text-center border-b-2 ${currentHouseData.themeBorder} pb-4 px-10 ${currentHouseData.inkColor} font-bold opacity-80`}>{currentHouseData.title}</h4>
                      <div className="flex flex-wrap justify-center gap-4 md:gap-6 relative z-10 w-full">
                        {currentHouseData.skills.map((skill, index) => (
                          <motion.span key={skill} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + (index * 0.05) }} className={`px-5 py-3 bg-transparent border-2 ${currentHouseData.themeBorder} text-xs md:text-sm tracking-widest uppercase ${currentHouseData.inkColor} font-bold shadow-sm hover:bg-black/5 transition-colors`}>
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                      <button onClick={() => setActiveHouse(null)} className={`mt-16 text-[10px] md:text-xs tracking-[0.4em] uppercase hover:bg-black/10 transition-colors border-2 ${currentHouseData.themeBorder} ${currentHouseData.inkColor} font-bold px-8 py-3`}>Refurl</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
           </motion.div>
        )}
      </AnimatePresence>

      {/* 6. THE RAVENRY OVERLAY (Actual Email Sending) */}
      <AnimatePresence>
        {showRavenry && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block">
            <div className="w-full max-w-7xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48">
              
              <button onClick={() => setShowRavenry(false)} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">
                [ Return ]
              </button>
              
              <div className="mb-12 md:mb-20 border-b border-white/10 pb-6 md:pb-8">
                <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">The Ravenry</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Dispatch a Message</h3>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
                
                {/* Left Side: Contact Information */}
                <motion.div 
                  initial="hidden" animate="show"
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
                  className="flex flex-col gap-10"
                >
                  <div>
                    <h4 className="text-gray-400 tracking-[0.3em] uppercase text-xs font-bold mb-6 border-b border-white/10 pb-4 inline-block">Direct Channels</h4>
                    <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed uppercase tracking-wider mb-8">
                      The realm is vast, but messages travel fast. I am always open to discussing new projects, intelligent systems, or creative opportunities.
                    </p>
                  </div>

                  <div className="flex flex-col gap-8">
                    {/* Email */}
                    <motion.a variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} href="mailto:ranjalarjunshenoy@gmail.com" className="group flex items-center gap-6 p-4 -ml-4 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all text-xl">✉️</div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-orange-500/80 tracking-widest uppercase font-bold mb-1">Electronic Scroll</span>
                        <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors tracking-widest">ranjalarjunshenoy@gmail.com</span>
                      </div>
                    </motion.a>

                    {/* LinkedIn */}
                    <motion.a variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} href="https://linkedin.com/in/arjun-shenoy-r-586546285" target="_blank" className="group flex items-center gap-6 p-4 -ml-4 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all text-xl">💼</div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-orange-500/80 tracking-widest uppercase font-bold mb-1">Professional Guild</span>
                        <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors tracking-widest">Arjun Shenoy R</span>
                      </div>
                    </motion.a>

                    {/* GitHub */}
                    <motion.a variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} href="https://github.com/Arjun13-git" target="_blank" className="group flex items-center gap-6 p-4 -ml-4 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all text-xl">⚔️</div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-orange-500/80 tracking-widest uppercase font-bold mb-1">The Armory (GitHub)</span>
                        <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors tracking-widest">Arjun13-git</span>
                      </div>
                    </motion.a>

                    {/* Phone */}
                    <motion.a variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} href="tel:+919844450000" className="group flex items-center gap-6 p-4 -ml-4 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all text-xl">📞</div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-orange-500/80 tracking-widest uppercase font-bold mb-1">Voice Frequencies</span>
                        <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors tracking-widest">+91 98444 50000</span>
                      </div>
                    </motion.a>
                  </div>
                </motion.div>

                {/* Right Side: The Form */}
                <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 p-8 md:p-12 relative overflow-hidden">
                  
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>

                  <h4 className="text-white text-xl md:text-2xl font-bold uppercase tracking-widest mb-2 relative z-10">Send a Raven</h4>
                  <p className="text-gray-500 text-xs md:text-sm tracking-widest uppercase mb-8 relative z-10">Seal your words and dispatch.</p>

                  <form onSubmit={handleSendRaven} className="flex flex-col gap-6 relative z-10">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Your Identity</label>
                      <input 
                        type="text" required placeholder="Jon Snow" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm outline-none focus:border-orange-500/80 focus:bg-orange-500/5 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Return Address (Email)</label>
                      <input 
                        type="email" required placeholder="lordcommander@wall.com" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm outline-none focus:border-orange-500/80 focus:bg-orange-500/5 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">The Message</label>
                      <textarea 
                        required placeholder="Winter is coming..." rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm outline-none focus:border-orange-500/80 focus:bg-orange-500/5 transition-all resize-none shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"
                      ></textarea>
                    </div>

                    <motion.button 
                      whileHover={ravenStatus === "idle" ? { scale: 1.02 } : {}}
                      whileTap={ravenStatus === "idle" ? { scale: 0.98 } : {}}
                      disabled={ravenStatus !== "idle"}
                      className={`relative w-full p-4 mt-4 border font-bold uppercase tracking-[0.3em] text-xs transition-all overflow-hidden flex items-center justify-center gap-3
                        ${ravenStatus === "idle" ? "bg-orange-500/10 border-orange-500/50 text-white hover:bg-orange-500 hover:text-black cursor-pointer" : ""}
                        ${ravenStatus === "sending" ? "bg-orange-500 border-orange-500 text-black cursor-wait" : ""}
                        ${ravenStatus === "sent" ? "bg-green-900/50 border-green-500 text-green-400 cursor-default" : ""}
                      `}
                    >
                      {ravenStatus === "idle" && (
                         <>
                           <span className="relative z-10">Dispatch Raven</span>
                           <span className="text-lg relative z-10">🦅</span>
                         </>
                      )}
                      
                      {ravenStatus === "sending" && (
                         <>
                           <span className="relative z-10 flex items-center gap-2">
                             <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                             Flying...
                           </span>
                         </>
                      )}

                      {ravenStatus === "sent" && (
                         <span className="relative z-10">Raven Delivered Successfully ✓</span>
                      )}
                    </motion.button>
                  </form>
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. ABOUT OVERLAY */}
      <AnimatePresence>
         {/* Your About Me overlay... (Kept intact in your local file) */}
      </AnimatePresence>

    </div>
  );
}