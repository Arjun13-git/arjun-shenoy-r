import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const HOUSES = [
  { id: "stark", name: "House Stark", title: "Core Languages", sigil: "/images/stark.png", glowColor: "rgba(100, 200, 255, 0.8)", inkColor: "text-slate-900", themeBorder: "border-slate-800", skills: ["Java (DSA)", "Python", "C / C++", "JavaScript", "SQL", "HTML + CSS"] },
  { id: "targaryen", name: "House Targaryen", title: "AI & Data Science", sigil: "/images/targaryen.png", glowColor: "rgba(255, 60, 0, 0.8)", inkColor: "text-red-950", themeBorder: "border-red-950", skills: ["TensorFlow", "Pandas", "NumPy", "OpenCV", "LangChain", "LangGraph", "LangFlow", "Agentic AI"] },
  { id: "lannister", name: "House Lannister", title: "Web Frameworks", sigil: "/images/lannister.png", glowColor: "rgba(255, 200, 0, 0.8)", inkColor: "text-yellow-950", themeBorder: "border-yellow-900", skills: ["React.js", "Node.js", "Express.js", "Vite", "Flask"] },
  { id: "baratheon", name: "House Baratheon", title: "Databases & Tooling", sigil: "/images/baratheon.png", glowColor: "rgba(255, 255, 255, 0.8)", inkColor: "text-stone-900", themeBorder: "border-stone-800", skills: ["MongoDB", "MySQL", "Git", "GitHub", "Jupyter", "VS Code", "Anaconda", "PyCharm"] }
];

interface SkillsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillsOverlay({ isOpen, onClose }: SkillsOverlayProps) {
  const [activeHouse, setActiveHouse] = useState<string | null>(null);
  const [pulsingHouse, setPulsingHouse] = useState<string | null>(null);

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

  const currentHouseData = HOUSES.find(h => h.id === activeHouse);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block">
          <div className="w-full max-w-6xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48">
            <button onClick={() => { onClose(); setActiveHouse(null); }} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">[ Return ]</button>
            
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

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-start gap-8 md:gap-12 w-full mt-4">
              <p className="text-gray-500 tracking-[0.4em] uppercase text-xs font-bold text-center border-b border-white/5 pb-4 w-full max-w-2xl">
                {activeHouse ? "Select a House to switch manuscripts" : "Select a House to unroll its manuscript"}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-5xl px-4">
                {HOUSES.map((house) => {
                  const isActive = activeHouse === house.id;
                  const isDimmed = activeHouse !== null && !isActive;
                  return (
                    <motion.button key={house.id} onClick={() => handleSigilClick(house.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} animate={{ opacity: isDimmed ? 0.4 : 1, scale: isDimmed ? 0.9 : (isActive ? 1.05 : 1) }} transition={{ duration: 0.3 }} className="relative flex flex-col items-center gap-4 group">
                      <AnimatePresence>
                        {pulsingHouse === house.id && (
                          <motion.div initial={{ scale: 0.5, opacity: 1 }} animate={{ scale: 2.5, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full pointer-events-none mix-blend-screen blur-xl" style={{ backgroundColor: house.glowColor }} />
                        )}
                      </AnimatePresence>
                      <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 bg-black/50 flex items-center justify-center p-4 transition-all duration-500 shadow-xl ${isActive ? 'border-white/50 bg-white/10' : 'border-white/5 group-hover:border-white/30'}`} style={{ boxShadow: pulsingHouse === house.id ? `0 0 80px ${house.glowColor}` : 'none' }}>
                        <img src={house.sigil} alt={house.name} className={`w-full h-full object-contain transition-opacity drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                      <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold transition-colors text-gray-300 group-hover:text-white opacity-80">{house.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeHouse && currentHouseData && (
                <motion.div key="manuscript" initial={{ height: 0, opacity: 0, marginTop: 0 }} animate={{ height: "auto", opacity: 1, marginTop: "4rem" }} exit={{ height: 0, opacity: 0, marginTop: 0, transition: { duration: 0.3, ease: "easeInOut" } }} transition={{ duration: 0.6, ease: "easeInOut" }} className={`w-full max-w-4xl mx-auto overflow-hidden border-y-[6px] border-double ${currentHouseData.themeBorder} relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-gradient-to-br from-[#fdfbf7] via-[#e8dcc4] to-[#d4c391] text-slate-900 rounded-sm mb-20`} style={{ transformOrigin: "top", boxShadow: "inset 0 0 60px rgba(166,138,86,0.4), 0 20px 50px rgba(0,0,0,0.8)" }}>
                  <div className="p-8 md:p-16 flex flex-col items-center relative z-10">
                    <img src={currentHouseData.sigil} alt="Sigil watermark" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-80 opacity-[0.06] pointer-events-none grayscale mix-blend-multiply" />
                    <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-[0.2em] mb-2 ${currentHouseData.inkColor} text-center font-serif drop-shadow-sm`}>{currentHouseData.name}</h3>
                    <h4 className={`tracking-[0.3em] uppercase text-[10px] md:text-xs mb-10 text-center border-b-2 ${currentHouseData.themeBorder} pb-4 px-10 ${currentHouseData.inkColor} font-bold opacity-80`}>{currentHouseData.title}</h4>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-5 relative z-10 w-full max-w-2xl">
                      {currentHouseData.skills.map((skill, index) => (
                        <motion.span key={skill} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (index * 0.05) }} className={`px-4 py-2 bg-transparent border-2 ${currentHouseData.themeBorder} text-[10px] md:text-xs tracking-widest uppercase ${currentHouseData.inkColor} font-bold shadow-sm hover:bg-black/5 transition-colors`}>{skill}</motion.span>
                      ))}
                    </div>
                    <button onClick={() => setActiveHouse(null)} className={`mt-12 text-[9px] md:text-[10px] tracking-[0.4em] uppercase hover:bg-black/10 transition-colors border-2 ${currentHouseData.themeBorder} ${currentHouseData.inkColor} font-bold px-6 py-2`}>Refurl Manuscript</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}