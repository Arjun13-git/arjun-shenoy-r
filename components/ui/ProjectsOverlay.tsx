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
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: 50 }} 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block"
        >
          <div className="w-full max-w-7xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48">
            
            <button onClick={onClose} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">
              [ Return ]
            </button>
            
            <div className="mb-10 md:mb-16 border-b border-white/10 pb-6 md:pb-8">
              <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">Expeditions</h2>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Major Works & Research</h3>
            </div>
            
            {/* 3x3 GRID LAYOUT */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* 1. QML-Galaxy Classification */}
              <a href="https://github.com/Arjun13-git/qml-galaxy-classification--exoplanet-detection" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Active Research</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">QML Galaxy Classification</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Ongoing research project utilizing Quantum Machine Learning for complex galaxy classification and exoplanet detection.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Quantum ML / VQCs</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>

              {/* 2. ZK-Swarm */}
              <a href="https://github.com/Arjun13-git/ZK-Swarm" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-gray-400 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-white/10 w-max px-2 py-1">Cryptography</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">ZK-Swarm</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Decentralized intelligence grid utilizing Fully Homomorphic Encryption (FHE) and TenSEAL for zero-knowledge multi-agent computations.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>FHE / LangChain</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>

              {/* 3. Project AETHER */}
              <a href="https://github.com/Arjun13-git/Project-Aether" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-gray-400 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-white/10 w-max px-2 py-1">Image Processing</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">Project AETHER</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Autonomous Geospatial Intelligence (GEOINT) surveillance platform simulating defense workflows for satellite and aerial imagery.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Python / YOLOv8</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>

              {/* 4. Sentinel Agents */}
              <a href="https://github.com/aniprogramer/sentinel-agents" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">Sentinel Agents</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Cybersecurity-focused agentic system designed to autonomously monitor, detect, and defend digital perimeters.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Agentic AI / Security</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>

              {/* 5. PromptGuard */}
              <a href="https://github.com/Arjun13-git/PromptGuard" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">PromptGuard</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Advanced defense mechanism engineered to protect Large Language Models against malicious prompt injection attacks.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>LLM / Security</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>

              {/* 6. HC-402 KYC Platform */}
              <a href="https://github.com/aniprogramer/hc402-kyc-platform" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">HC-402 KYC Platform</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Automated Digital KYC and Secure Onboarding Platform built for seamless fintech identity verification workflows.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Security / Auth</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>

              {/* 7. SafeHorizon */}
              <a href="https://github.com/Arjun13-git/Disaster_Alert_Mgt" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-orange-500/80 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-orange-500/30 w-max px-2 py-1 bg-orange-500/10">Hackathon</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">SafeHorizon</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Real-time disaster alert management system leveraging Groq AI and NASA EONET data streams.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>AI / Fullstack</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>

              {/* 8. Movie Recommendation Engine */}
              <a href="https://github.com/Arjun13-git/Movie_Recommendation_Engine" target="_blank" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-gray-400 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-white/10 w-max px-2 py-1">Agentic AI</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">Movie Rec Engine</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Content-based recommendation system utilizing Langchain and cosine similarity to match user preferences.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Langchain / Python</span>
                  <span className="group-hover:text-white transition-colors">[ View Repo ]</span>
                </div>
              </a>

              {/* 9. The Digital Portfolio */}
              <a href="#" className="group bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-white/10 hover:border-orange-500/50 transition-all flex flex-col justify-between h-full">
                <div>
                  <span className="text-gray-400 text-[9px] md:text-[10px] tracking-widest uppercase mb-4 block font-bold border border-white/10 w-max px-2 py-1">Frontend Development</span>
                  <h4 className="text-xl md:text-2xl text-white font-bold uppercase tracking-wider mb-3 group-hover:text-orange-400 transition-colors">The Realm (Portfolio)</h4>
                  <p className="text-gray-400 text-xs md:text-sm tracking-wide leading-relaxed mb-6 uppercase">Immersive 3D interactive portfolio engineered with React Three Fiber, Framer Motion, and Tailwind CSS.</p>
                </div>
                <div className="text-[9px] md:text-[10px] tracking-widest text-gray-500 font-bold flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                  <span>Next.js / Three.js</span>
                  <span className="group-hover:text-white transition-colors">[ You Are Here ]</span>
                </div>
              </a>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}