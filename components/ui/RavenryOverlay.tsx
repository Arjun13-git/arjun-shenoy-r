import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import emailjs from '@emailjs/browser';

interface RavenryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RavenryOverlay({ isOpen, onClose }: RavenryOverlayProps) {
  const [ravenStatus, setRavenStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendRaven = (e: React.FormEvent) => {
    e.preventDefault();
    setRavenStatus("sending");

    
    const SERVICE_ID = "service_d4zrfpi";
    const TEMPLATE_ID = "template_i2okbfn";
    const PUBLIC_KEY = "DBNfqfZZL3-3bsKhK";

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        from_name: formData.name,
        reply_to: formData.email,
        message: formData.message,
    }, PUBLIC_KEY)
    .then(() => {
       setRavenStatus("sent");
       setFormData({ name: '', email: '', message: '' }); 
       setTimeout(() => setRavenStatus("idle"), 5000); 
    })
    .catch(() => {
       setRavenStatus("idle");
       alert("The raven was intercepted by a storm. Please try again or use direct email.");
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl overflow-y-auto pointer-events-auto block">
          <div className="w-full max-w-7xl mx-auto relative min-h-screen p-6 pt-24 md:p-20 pb-48">
            <button onClick={() => { onClose(); setRavenStatus("idle"); }} className="fixed top-6 right-6 md:top-10 md:right-10 text-white hover:text-orange-500 uppercase tracking-widest text-[10px] md:text-sm font-bold transition-colors bg-black/50 md:bg-transparent p-2 md:p-0 rounded-md z-[100]">[ Return ]</button>
            
            <div className="mb-12 md:mb-20 border-b border-white/10 pb-6 md:pb-8">
              <h2 className="text-orange-500 tracking-[0.5em] uppercase text-xs md:text-sm font-bold mb-2 md:mb-4 italic">The Ravenry</h2>
              <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest leading-tight">Dispatch a Message</h3>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-start">
              <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.2 } } }} className="flex flex-col gap-10">
                <div>
                  <h4 className="text-gray-400 tracking-[0.3em] uppercase text-xs font-bold mb-6 border-b border-white/10 pb-4 inline-block">Direct Channels</h4>
                  <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed uppercase tracking-wider mb-8">
                    The realm is vast, but messages travel fast. I am always open to discussing new projects, intelligent systems, or creative opportunities.
                  </p>
                </div>

                <div className="flex flex-col gap-8">
                  <motion.a variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} href="mailto:ranjalarjunshenoy@gmail.com" className="group flex items-center gap-6 p-4 -ml-4 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all text-xl">✉️</div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-orange-500/80 tracking-widest uppercase font-bold mb-1">Electronic Scroll</span>
                      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors tracking-widest">ranjalarjunshenoy@gmail.com</span>
                    </div>
                  </motion.a>
                  <motion.a variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} href="https://linkedin.com/in/arjun-shenoy-r-586546285" target="_blank" className="group flex items-center gap-6 p-4 -ml-4 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all text-xl">💼</div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-orange-500/80 tracking-widest uppercase font-bold mb-1">Professional Guild</span>
                      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors tracking-widest">Arjun Shenoy R</span>
                    </div>
                  </motion.a>
                  <motion.a variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} href="https://github.com/Arjun13-git" target="_blank" className="group flex items-center gap-6 p-4 -ml-4 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all text-xl">⚔️</div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-orange-500/80 tracking-widest uppercase font-bold mb-1">The Armory (GitHub)</span>
                      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors tracking-widest">Arjun13-git</span>
                    </div>
                  </motion.a>
                  <motion.a variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }} href="tel:+919844450000" className="group flex items-center gap-6 p-4 -ml-4 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 transition-all text-xl">📞</div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-orange-500/80 tracking-widest uppercase font-bold mb-1">Voice Frequencies</span>
                      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors tracking-widest">+91 98444 50000</span>
                    </div>
                  </motion.a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <h4 className="text-white text-xl md:text-2xl font-bold uppercase tracking-widest mb-2 relative z-10">Send a Raven</h4>
                <p className="text-gray-500 text-xs md:text-sm tracking-widest uppercase mb-8 relative z-10">Seal your words and dispatch.</p>
                <form onSubmit={handleSendRaven} className="flex flex-col gap-6 relative z-10">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Your Identity</label>
                    <input type="text" required placeholder="Jon Snow" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm outline-none focus:border-orange-500/80 focus:bg-orange-500/5 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Return Address (Email)</label>
                    <input type="email" required placeholder="lordcommander@wall.com" name="email" value={formData.email} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm outline-none focus:border-orange-500/80 focus:bg-orange-500/5 transition-all shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">The Message</label>
                    <textarea required placeholder="Winter is coming..." rows={5} name="message" value={formData.message} onChange={handleInputChange} className="w-full bg-black/50 border border-white/10 p-4 text-white text-sm outline-none focus:border-orange-500/80 focus:bg-orange-500/5 transition-all resize-none shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></textarea>
                  </div>
                  
                  {/* Button safely broken into multiple lines */}
                  <motion.button 
                    whileHover={ravenStatus === "idle" ? { scale: 1.02 } : {}} 
                    whileTap={ravenStatus === "idle" ? { scale: 0.98 } : {}} 
                    disabled={ravenStatus !== "idle"} 
                    className={`relative w-full p-4 mt-4 border font-bold uppercase tracking-[0.3em] text-xs transition-all overflow-hidden flex items-center justify-center gap-3
                      ${ravenStatus === "idle" ? "bg-orange-500/10 border-orange-500/50 text-white hover:bg-orange-500 hover:text-black cursor-pointer" : ""} 
                      ${ravenStatus === "sending" ? "bg-orange-500 border-orange-500 text-black cursor-wait" : ""} 
                      ${ravenStatus === "sent" ? "bg-green-900/50 border-green-500 text-green-400 cursor-default" : ""}
                    `}
                  >
                    {ravenStatus === "idle" && <><span className="relative z-10">Dispatch Raven</span><span className="text-lg relative z-10">🦅</span></>}
                    {ravenStatus === "sending" && <span className="relative z-10 flex items-center gap-2"><div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></div>Flying...</span>}
                    {ravenStatus === "sent" && <span className="relative z-10">Raven Delivered Successfully ✓</span>}
                  </motion.button>

                </form>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}