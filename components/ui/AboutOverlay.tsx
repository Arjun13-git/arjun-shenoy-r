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
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 z-30 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6 md:p-16 overflow-y-auto pointer-events-auto"
        >
          <button onClick={onClose} className="absolute top-10 right-10 text-white/50 hover:text-orange-500 uppercase tracking-widest text-sm md:text-base font-bold transition-colors z-30">
            [ Close ]
          </button>
          <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center h-full max-h-[90vh]">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-6">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm backdrop-blur-sm">
                <h3 className="text-orange-500 tracking-[0.4em] uppercase text-sm font-bold mb-4 italic">The Architect</h3>
                <p className="text-xl md:text-2xl font-light tracking-wide leading-relaxed text-gray-100 uppercase">
                  A 6th-semester CS Engineer at <span className="text-white font-bold">Sahyadri College</span>. Dedicated to forging intelligent systems with a deep focus on AI/ML Engineering and Data Science.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 p-8 rounded-sm">
                <h4 className="text-orange-500/80 uppercase tracking-widest text-sm mb-5">Technical Arsenal</h4>
                <div className="flex flex-wrap gap-3">
                  {["Python", "Machine Learning", "Data Science", "Agentic AI", "Generative AI", "Java / DSA"].map(s => (
                    <span key={s} className="px-4 py-2 bg-black/60 border border-white/10 text-xs md:text-sm tracking-widest uppercase text-gray-200 font-bold hover:border-orange-500/50 hover:text-white transition-all cursor-default">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="relative group h-full flex flex-col justify-center">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative aspect-[4/5] w-full max-h-[70vh] bg-neutral-900 border border-white/10 overflow-hidden rounded-sm shadow-2xl">
                <img src="/images/your-profile.jpg" alt="Arjun Shenoy" className="w-full h-full object-cover duration-700 opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-1/2 w-full animate-pulse pointer-events-none"></div>
              </div>
              <div className="mt-6 flex justify-between items-center text-xs md:text-sm tracking-[0.3em] text-gray-500 uppercase">
                <span>ID: ARJUN_13_GIT</span>
                <span>LOC: MANGALURU_IN</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}