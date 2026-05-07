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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm cursor-pointer" />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }} className="absolute top-0 right-0 w-[85%] md:w-[400px] h-full bg-black/90 backdrop-blur-2xl border-l border-white/10 z-50 p-8 md:p-10 flex flex-col justify-center">
            <button onClick={onClose} className="absolute top-8 right-8 text-white/50 hover:text-orange-500 uppercase tracking-widest text-xs font-bold transition-colors">[ Close ]</button>
            <nav className="flex flex-col gap-8 md:gap-10 text-right mt-10">
              <button onClick={() => onNavigate("home")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">The Realm</button>
              <button onClick={() => onNavigate("about")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">The Archives</button>
              <button onClick={() => onNavigate("projects")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">Expeditions</button>
              <button onClick={() => onNavigate("skills")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-gray-400 hover:text-white transition-colors">The Forge</button>
              <button onClick={() => onNavigate("ravenry")} className="text-xl md:text-2xl tracking-[0.3em] uppercase text-orange-500 hover:text-orange-400 transition-colors">The Ravenry</button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}