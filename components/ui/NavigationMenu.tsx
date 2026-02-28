import { motion, AnimatePresence } from "framer-motion";

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (section: string) => void;
}

export default function NavigationMenu({ isOpen, onClose, onNavigate }: NavigationMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm cursor-pointer"
          />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-black/80 backdrop-blur-2xl border-l border-white/10 z-50 p-10 flex flex-col justify-center"
          >
            <button onClick={onClose} className="absolute top-10 right-10 text-white/50 hover:text-orange-500 uppercase tracking-widest text-xs font-bold transition-colors">
              [ Close ]
            </button>
            
            <nav className="flex flex-col gap-10 text-right">
              <button onClick={() => onNavigate("home")} className="text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white hover:translate-x-[-10px] transition-all duration-300">The Realm</button>
              <button onClick={() => onNavigate("about")} className="text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white hover:translate-x-[-10px] transition-all duration-300">The Archives</button>
              <button onClick={() => onNavigate("projects")} className="text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white hover:translate-x-[-10px] transition-all duration-300">Expeditions <span className="text-xs ml-2 opacity-50 border border-white/20 px-2 py-1 rounded-sm">Projects</span></button>
              <button onClick={() => onNavigate("skills")} className="text-2xl tracking-[0.3em] uppercase text-orange-500 hover:text-orange-400 hover:translate-x-[-10px] transition-all duration-300">The Forge <span className="text-xs ml-2 opacity-50 border border-orange-500/50 px-2 py-1 rounded-sm">Skills</span></button>
              
              <div className="w-full h-[1px] bg-white/10 my-2"></div>
              <button className="text-lg tracking-[0.3em] uppercase text-gray-600 cursor-not-allowed">Trial of the Gods <span className="text-[9px] block mt-1 text-orange-500/50">Coming Soon</span></button>
            </nav>

            <div className="absolute bottom-10 right-10 flex gap-6 font-bold">
              <a href="https://github.com/Arjun13-git" target="_blank" className="text-gray-500 hover:text-orange-400 transition-colors tracking-widest text-xs uppercase">GitHub</a>
              <a href="https://www.linkedin.com/in/arjun-shenoy-r-586546285/" target="_blank" className="text-gray-500 hover:text-orange-400 transition-colors tracking-widest text-xs uppercase">LinkedIn</a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}