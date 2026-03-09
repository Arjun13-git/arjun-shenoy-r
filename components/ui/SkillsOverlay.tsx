import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SkillsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// THE GREAT HOUSES OF YOUR SKILLSET
const HOUSES = [
  {
    id: "stark",
    name: "House Stark",
    title: "Core Languages",
    sigil: "/images/stark.png",
    glowColor: "rgba(100, 200, 255, 0.8)", // Ice Blue
    borderColor: "border-blue-500/50",
    textColor: "text-blue-400",
    bgColor: "bg-blue-900/10",
    skills: ["Java (DSA)", "Python", "C / C++", "JavaScript", "SQL", "HTML + CSS"]
  },
  {
    id: "targaryen",
    name: "House Targaryen",
    title: "AI & Data Science",
    sigil: "/images/targaryen.png",
    glowColor: "rgba(255, 60, 0, 0.8)", // Dragonfire Red
    borderColor: "border-red-500/50",
    textColor: "text-red-500",
    bgColor: "bg-red-900/10",
    skills: ["TensorFlow", "Pandas", "NumPy", "OpenCV", "LangChain", "LangGraph", "LangFlow", "Agentic AI"]
  },
  {
    id: "lannister",
    name: "House Lannister",
    title: "Web Frameworks",
    sigil: "/images/lannister.png",
    glowColor: "rgba(255, 200, 0, 0.8)", // Lannister Gold
    borderColor: "border-yellow-500/50",
    textColor: "text-yellow-500",
    bgColor: "bg-yellow-900/10",
    skills: ["React.js", "Node.js", "Express.js", "Vite", "Flask"]
  },
  {
    id: "baratheon",
    name: "House Baratheon",
    title: "Databases & Tooling",
    sigil: "/images/baratheon.png",
    glowColor: "rgba(255, 255, 255, 0.8)", // Storm Lightning White
    borderColor: "border-gray-300/50",
    textColor: "text-gray-200",
    bgColor: "bg-gray-700/10",
    skills: ["MongoDB", "MySQL", "Git", "GitHub", "Jupyter", "VS Code", "Anaconda", "PyCharm"]
  }
];

export default function SkillsOverlay({ isOpen, onClose }: SkillsOverlayProps) {
  const [activeHouse, setActiveHouse] = useState<string | null>(null);
  const [pulsingHouse, setPulsingHouse] = useState<string | null>(null);

  // Trigger the pulse effect, then unroll the manuscript
  const handleSigilClick = (houseId: string) => {
    setPulsingHouse(houseId);
    setTimeout(() => {
      setActiveHouse(houseId);
      setPulsingHouse(null);
    }, 600); // 600ms pulse before opening
  };

  // Reset state when closing the overlay
  const handleClose = () => {
    onClose();
    setTimeout(() => setActiveHouse(null), 500);
  };

  const currentHouseData = HOUSES.find(h => h.id === activeHouse);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-0 z-30 bg-black/95 backdrop-blur-3xl flex flex-col items-center p-6 pt-24 md:p-20 overflow-y-auto pointer-events-auto"
        >
          <div className="w-full max-w-6xl relative h-full flex flex-col">
            
            <button onClick={handleClose} className="fixed md:absolute top-6 md:-top-10 right-6 md:right-0 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-50">
              [ Return to Realm ]
            </button>

            {/* HEADER & RESUME BUTTON */}
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

            {/* PHASE 1: THE SIGIL GRID */}
            {!activeHouse && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center gap-12"
              >
                <p className="text-gray-500 tracking-[0.4em] uppercase text-xs font-bold text-center">Select a House to Unroll the Manuscripts</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 w-full max-w-4xl px-4">
                  {HOUSES.map((house) => (
                    <motion.button
                      key={house.id}
                      onClick={() => handleSigilClick(house.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative flex flex-col items-center gap-6 group"
                    >
                      {/* The Pulse Effect */}
                      <AnimatePresence>
                        {pulsingHouse === house.id && (
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0.8 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute top-8 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full pointer-events-none mix-blend-screen blur-md"
                            style={{ backgroundColor: house.glowColor }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Sigil Image Container */}
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/10 bg-black/50 flex items-center justify-center p-4 transition-all duration-500 group-hover:border-white/40"
                           style={{ boxShadow: pulsingHouse === house.id ? `0 0 50px ${house.glowColor}` : 'none' }}>
                        {/* Fallback to emoji if image fails/is missing, but expects the PNG */}
                        <img src={house.sigil} alt={house.name} className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" 
                             onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                      </div>
                      <span className={`text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold transition-colors ${house.textColor} opacity-70 group-hover:opacity-100`}>
                        {house.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* PHASE 2: THE UNROLLING MANUSCRIPT */}
            <AnimatePresence mode="wait">
              {activeHouse && currentHouseData && (
                <motion.div 
                  key="manuscript"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} // Smooth unfurl easing
                  className={`w-full max-w-3xl mx-auto overflow-hidden border-y ${currentHouseData.borderColor} ${currentHouseData.bgColor} relative`}
                  style={{ transformOrigin: "top" }}
                >
                  {/* Decorative Manuscript Roll tops/bottoms */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-black via-gray-700 to-black opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-black via-gray-700 to-black opacity-50"></div>

                  <div className="p-8 md:p-12 flex flex-col items-center">
                    <img src={currentHouseData.sigil} alt="Sigil watermark" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 opacity-5 pointer-events-none grayscale" />
                    
                    <h3 className={`text-2xl md:text-4xl font-black uppercase tracking-[0.3em] mb-2 ${currentHouseData.textColor} drop-shadow-lg text-center`}>
                      {currentHouseData.name}
                    </h3>
                    <h4 className="text-gray-400 tracking-[0.4em] uppercase text-xs md:text-sm mb-10 text-center border-b border-white/10 pb-4 px-8">
                      {currentHouseData.title}
                    </h4>

                    <div className="flex flex-wrap justify-center gap-4 relative z-10 w-full">
                      {currentHouseData.skills.map((skill, index) => (
                        <motion.span 
                          key={skill}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + (index * 0.05) }} // Staggered text fade-in
                          className={`px-4 py-2 bg-black/80 border ${currentHouseData.borderColor} text-xs md:text-sm tracking-widest uppercase text-gray-200 shadow-lg`}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>

                    <button 
                      onClick={() => setActiveHouse(null)}
                      className="mt-16 text-[10px] md:text-xs tracking-[0.4em] uppercase text-gray-500 hover:text-white transition-colors border border-gray-600/50 hover:border-white px-6 py-2"
                    >
                      Fold Manuscript
                    </button>
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