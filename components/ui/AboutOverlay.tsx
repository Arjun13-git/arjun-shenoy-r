import { motion, AnimatePresence } from "framer-motion";

interface AboutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutOverlay({ isOpen, onClose }: AboutOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto pointer-events-auto block">
          <div className="max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-8 md:gap-12 items-center min-h-screen p-6 pt-24 md:p-16 pb-32 relative">
            
            <button onClick={onClose} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">
              [ Close ]
            </button>
            
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-col gap-6">
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm backdrop-blur-sm">
                <h3 className="text-orange-500 tracking-[0.4em] uppercase text-[10px] md:text-sm font-bold mb-4 italic">The Architect</h3>
                <p className="text-lg md:text-2xl font-light tracking-wide leading-relaxed text-gray-100 uppercase">
                  A 6th-semester CS Engineer at <span className="text-white font-bold">Sahyadri College</span>. Dedicated to forging intelligent systems with a deep focus on AI/ML Engineering and Data Science.
                </p>
              </div>

              {/* Leadership Roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-6 hover:border-orange-500/30 transition-colors flex flex-col justify-between">
                  <div>
                    <h4 className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mb-2">Student Mentor</h4>
                    <p className="text-white text-sm md:text-base font-bold uppercase tracking-widest">SSTH 2024</p>
                    <p className="text-gray-400 text-[10px] md:text-xs uppercase mt-2 leading-relaxed">Mentored Pre-University teams in project conceptualization & technical implementation.</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 p-6 hover:border-orange-500/30 transition-colors flex flex-col justify-between">
                  <div>
                    <h4 className="text-gray-400 text-[10px] tracking-[0.3em] uppercase mb-2">Help Desk Lead</h4>
                    <p className="text-white text-sm md:text-base font-bold uppercase tracking-widest">Synergia 2023</p>
                    <p className="text-gray-400 text-[10px] md:text-xs uppercase mt-2 leading-relaxed">Primary point of contact managing attendee queries and registration.</p>
                  </div>
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
  );
}