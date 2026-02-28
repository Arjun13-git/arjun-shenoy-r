import { motion, AnimatePresence } from "framer-motion";

interface ProjectsOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectsOverlay({ isOpen, onClose }: ProjectsOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
          className="absolute inset-0 z-30 bg-black/90 backdrop-blur-3xl flex flex-col items-center p-6 md:p-20 overflow-y-auto pointer-events-auto"
        >
          <div className="w-full max-w-7xl relative">
            <button onClick={onClose} className="absolute -top-10 md:top-0 right-0 text-white/50 hover:text-orange-500 uppercase tracking-widest text-xs md:text-sm font-bold transition-colors">
              [ Return to Realm ]
            </button>
            
            <div className="mb-16 border-b border-white/10 pb-8 mt-10 md:mt-0">
              <h2 className="text-orange-500 tracking-[0.5em] uppercase text-sm font-bold mb-4 italic">Expeditions</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest">Major Works & Hackathons</h3>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
              {/* SafeHorizon */}
              <a href="https://github.com/Arjun13-git/Disaster_Alert_Mgt" target="_blank" className="group bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                  <h4 className="text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">SafeHorizon</h4>
                  <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-6 uppercase">Real-time disaster alert management system leveraging Groq AI & NASA EONET data.</p>
                </div>
                <div className="text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>AI / Fullstack</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>
              {/* Project Aether */}
              <a href="https://github.com/Arjun13-git/Project-Aether" target="_blank" className="group bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-gray-400 text-[10px] tracking-widest uppercase mb-4 block font-bold border border-white/10 w-max px-2 py-1">Major Project</span>
                  <h4 className="text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">Project AETHER</h4>
                  <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-6 uppercase">Autonomous surveillance platform simulating defense workflows for satellite & aerial imagery.</p>
                </div>
                <div className="text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Python / YOLOv8</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>
              {/* HC-402 */}
              <a href="https://github.com/aniprogramer/hc402-kyc-platform" target="_blank" className="group bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                  <h4 className="text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">HC-402 KYC</h4>
                  <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-6 uppercase">Automated Digital KYC and Secure Onboarding Platform built during a February hackathon.</p>
                </div>
                <div className="text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Security / Auth</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>
              {/* Sentinel Agents */}
              <a href="https://github.com/aniprogramer/sentinel-agents" target="_blank" className="group bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                  <h4 className="text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">Sentinel Agents</h4>
                  <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-6 uppercase">Cybersecurity-focused agentic system designed to monitor and defend digital perimeters.</p>
                </div>
                <div className="text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Agentic AI / Security</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>
              {/* PromptGuard */}
              <a href="https://github.com/Arjun13-git/PromptGuard" target="_blank" className="group bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                  <h4 className="text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">PromptGuard</h4>
                  <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-6 uppercase">Defense mechanism engineered to protect LLMs against malicious prompt injection attacks.</p>
                </div>
                <div className="text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>LLM / Security</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>
              {/* The Realm */}
              <a href="https://github.com/Arjun13-git/arjun-shenoy-r" target="_blank" className="group bg-white/5 border border-white/10 p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-gray-400 text-[10px] tracking-widest uppercase mb-4 block font-bold border border-white/10 w-max px-2 py-1">Major Project</span>
                  <h4 className="text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">The Realm</h4>
                  <p className="text-gray-400 text-sm tracking-wide leading-relaxed mb-6 uppercase">Immersive 3D portfolio powered by React Three Fiber, Framer Motion, and Next.js.</p>
                </div>
                <div className="text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>WebGL / React</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}