import { motion, AnimatePresence } from "framer-motion";

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutOverlay({ isOpen, onClose }: AboutOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 50 }} 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block"
        >
          <div className="w-full max-w-5xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48 flex flex-col items-center">
            
            <button onClick={onClose} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">
              [ Return ]
            </button>

            <div className="mb-12 md:mb-20 border-b border-white/10 pb-6 md:pb-8 w-full">
              <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic text-center md:text-left">The Archives</h2>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight text-center md:text-left">The Architect</h3>
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-start w-full">
              
              {/* Left Side: The Image (Now styled as an artifact) */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: 0.2 }} 
                className="w-full md:w-5/12 flex flex-col items-center"
              >
                <div className="relative group w-full aspect-[4/5] max-w-sm">
                  {/* Glowing frame effect */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-orange-500/20 via-transparent to-orange-500/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 blur-lg rounded-sm"></div>
                  
                  {/* The actual image container */}
                  <div className="relative w-full h-full bg-neutral-900 border border-white/10 overflow-hidden rounded-sm shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                    <img src="/images/your-profile.jpg" alt="Arjun Shenoy" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" />
                    
                    {/* Inner scanner line effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/10 to-transparent h-[200%] w-full animate-scan pointer-events-none mix-blend-overlay"></div>
                  </div>
                  
                  {/* High-tech corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-orange-500"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-orange-500"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-orange-500"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-orange-500"></div>
                </div>

                <div className="mt-8 flex w-full justify-between items-center text-[9px] md:text-xs tracking-[0.3em] text-gray-500 uppercase font-mono border-t border-b border-white/5 py-3">
                  <span>ID: ARJUN_13_GIT</span>
                  <span className="text-orange-500/70">CLASS: ENGINEER</span>
                  <span>LOC: MGL_IN</span>
                </div>
              </motion.div>

              {/* Right Side: The Lore (Text) */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }} 
                animate={{ x: 0, opacity: 1 }} 
                transition={{ delay: 0.4 }} 
                className="w-full md:w-7/12 flex flex-col gap-8"
              >
                <div>
                  <h4 className="text-orange-500 tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold mb-4 border-l-2 border-orange-500 pl-3">Designation</h4>
                  <p className="text-xl md:text-3xl font-light tracking-wide leading-tight text-white uppercase font-serif">
                    Sixth-Semester CS Engineer forging autonomous and intelligent systems.
                  </p>
                </div>

                <div className="space-y-6 text-sm md:text-base text-gray-400 font-light leading-relaxed tracking-wide">
                  <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-orange-500 first-letter:float-left first-letter:mr-3 first-letter:mt-1">
                    My fascination lies at the intersection of raw data and autonomous reasoning. The modern web is no longer just a static interface; it is an evolving ecosystem that requires agentic systems capable of perceiving, deciding, and acting without continuous human oversight.
                  </p>
                  
                  <p>
                    I specialize in bridging Machine Learning research with scalable backend architectures. Whether I am architecting a hybrid Quantum-Classical pipeline for galaxy classification and exoplanet detection, or constructing secure, zero-knowledge decentralized grids like ZK-Swarm, my goal is always to push the boundaries of what computational intelligence can achieve.
                  </p>

                  <p>
                    Through rigorous technical traininggits, I have honed my expertise in building robust, production-ready AI tools. From the localized defense perimeters of PromptGuard to the autonomous surveillance protocols of Project AETHER, I engineer systems designed to adapt, scale, and secure the digital frontier.
                  </p>
                </div>
                
                {/* Tech Stack Mini-Display */}
                <div className="mt-8 border border-white/10 bg-white/5 p-6 rounded-sm">
                  <h4 className="text-gray-500 tracking-[0.3em] uppercase text-[10px] font-bold mb-4">Current Arsenal</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Agentic AI", "Quantum ML", "Backend Architecture", "TensorFlow", "PyTorch", "LangChain", "Qiskit"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-black/50 border border-white/10 text-[10px] text-gray-300 tracking-widest uppercase">{skill}</span>
                    ))}
                  </div>
                </div>

              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}