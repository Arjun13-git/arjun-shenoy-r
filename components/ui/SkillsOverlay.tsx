import { motion, AnimatePresence } from "framer-motion";

interface SkillsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SkillsOverlay({ isOpen, onClose }: SkillsOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-0 z-30 bg-black/90 backdrop-blur-3xl flex flex-col items-center p-6 md:p-20 overflow-y-auto pointer-events-auto"
        >
          <div className="w-full max-w-6xl relative">
            <button onClick={onClose} className="absolute -top-10 md:top-0 right-0 text-white/50 hover:text-orange-500 uppercase tracking-widest text-xs md:text-sm font-bold transition-colors">
              [ Return to Realm ]
            </button>
            
            <div className="mb-12 border-b border-white/10 pb-8 mt-10 md:mt-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h2 className="text-orange-500 tracking-[0.5em] uppercase text-sm font-bold mb-4 italic">The Forge</h2>
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest">Maester's Chain</h3>
              </div>
              
              <a 
                href="/Arjun-Shenoy-R_Resume.pdf" 
                download="Arjun_Shenoy_Resume.pdf"
                className="group relative px-6 py-3 bg-orange-500/10 border border-orange-500/50 hover:bg-orange-500 hover:text-black transition-all duration-300 text-white text-xs md:text-sm tracking-[0.3em] uppercase font-bold overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  Download Resume
                </span>
                <div className="absolute inset-0 bg-orange-500 w-0 group-hover:w-full transition-all duration-300 ease-out z-0"></div>
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
              {/* Core Languages */}
              <div className="bg-white/5 border border-white/10 p-8 hover:border-orange-500/30 transition-colors">
                <h4 className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-2">Core Languages</h4>
                <div className="flex flex-wrap gap-3">
                  {["Java (DSA)", "Python", "C / C++", "JavaScript", "SQL", "HTML + CSS"].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-black/60 border border-white/10 text-xs tracking-widest uppercase text-gray-200">{skill}</span>
                  ))}
                </div>
              </div>

              {/* AI / ML & Data Science */}
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 p-8 shadow-[0_0_30px_rgba(255,170,0,0.05)]">
                <h4 className="text-orange-500/80 text-xs tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-2">AI / ML & Data Science</h4>
                <div className="flex flex-wrap gap-3">
                  {["TensorFlow", "Pandas", "NumPy", "OpenCV", "LangChain", "LangGraph", "LangFlow", "Agentic AI"].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-black/60 border border-orange-500/30 text-xs tracking-widest uppercase text-white font-bold">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Web & Architecture */}
              <div className="bg-white/5 border border-white/10 p-8 hover:border-orange-500/30 transition-colors">
                <h4 className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-2">Web & Frameworks</h4>
                <div className="flex flex-wrap gap-3">
                  {["React.js", "Node.js", "Express.js", "Vite", "Flask"].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-black/60 border border-white/10 text-xs tracking-widest uppercase text-gray-200">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Databases & Tools */}
              <div className="bg-white/5 border border-white/10 p-8 hover:border-orange-500/30 transition-colors lg:col-span-3">
                <h4 className="text-gray-400 text-xs tracking-[0.3em] uppercase mb-6 border-b border-white/10 pb-2">Databases & Tooling</h4>
                <div className="flex flex-wrap gap-3">
                  {["MongoDB", "MySQL", "Git", "GitHub", "Jupyter Notebooks", "VS Code", "Anaconda"].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-black/60 border border-white/10 text-xs tracking-widest uppercase text-gray-200">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}