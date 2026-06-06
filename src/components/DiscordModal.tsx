import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, ExternalLink, Calendar, Users, Award, Flame, Smile, Check, Coffee } from 'lucide-react';

interface DiscordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiscordModal({ isOpen, onClose }: DiscordModalProps) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, []);

  if (!isOpen) return null;

  const joinUrl = "https://discord.gg/medoiq-official-server-1092771090192932964";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
        {/* Semi-transparent liquid glass backdrop blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/45 backdrop-blur-xl z-0"
        />

        {/* Ambient sliding liquid glass blobs directly behind the modal body */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 0.95, 1],
              rotate: [0, 120, 240, 360],
              x: [-40, 40, -20, -40],
              y: [-30, 40, -30, -30]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.22] bg-[#5865F2]`}
          />
          <motion.div 
            animate={{ 
              scale: [1.1, 0.9, 1.15, 1.1],
              rotate: [360, 240, 120, 0],
              x: [50, -40, 40, 50],
              y: [40, -50, 40, 40]
            }}
            transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-[0.16] ${theme === 'light' ? 'bg-amber-400' : 'bg-opbr-orange'}`}
          />
        </div>

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 25 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className={`relative w-full max-w-2xl max-h-[85vh] ${
            theme === 'light' 
              ? 'bg-white/70 border-white/60 text-zinc-900 shadow-[0_24px_50px_rgba(88,101,242,0.15)]' 
              : 'bg-zinc-950/50 border-white/10 text-slate-250 shadow-[0_30px_70px_rgba(0,0,0,0.8)]'
          } backdrop-blur-3xl rounded-[32px] overflow-hidden border flex flex-col z-20`}
        >
          
          {/* Top Header Section with Server Banner background */}
          <div className="relative h-44 sm:h-52 w-full shrink-0 overflow-hidden bg-zinc-900">
            {/* Banner image */}
            <img 
              src="https://cdn.discordapp.com/discovery-splashes/1092771090192932964/ba5a3c41c869784f4f39b21149b0200d.jpg?size=2048&format=auto" 
              alt="MedoIQ Splash Banner" 
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            {/* Dark Mask overlay gradient to combine into bottom elements */}
            <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'light' ? 'from-white/70 via-transparent' : 'from-zinc-950/70 via-black/40'} to-black/35`} />

            {/* Action Bar inside Banner */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <svg className="w-4 h-4 text-white" viewBox="0 0 127.14 96.36" fill="currentColor">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2.06a75.48,75.48,0,0,0,72.76,0c.82.72,1.68,1.41,2.58,2.06a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.81,49.19,122.9,26.43,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
                </svg>
                <span className="text-[10px] text-white font-black tracking-widest font-mono uppercase">Verified Discord Server</span>
              </div>
              
              <button 
                onClick={onClose}
                className="p-2.5 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 text-white transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Guild Avatar positioning */}
            <div className="absolute -bottom-6 left-6 z-20">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-[24px] bg-slate-950 border-4 border-[#0e0f14] dark:border-zinc-950 overflow-hidden shadow-2xl flex items-center justify-center relative group"
              >
                <img 
                  src="https://cdn.discordapp.com/icons/1092771090192932964/a_71ad98098b9ce4e1dd4539d186b019b1.png?size=256" 
                  alt="MedoIQ Guild Icon" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>

          {/* Modal scrollable body container */}
          <div className="flex-1 overflow-y-auto px-6 pt-10 pb-6 custom-scrollbar relative z-10 space-y-6">
            
            {/* Title and stats layout block */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className={`text-xl sm:text-2xl font-display font-black tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-slate-100'}`}>
                    MedoIQ official server
                  </h1>
                  <span className="w-5 h-5 flex items-center justify-center bg-blue-500 rounded-full text-white inline-block text-[10px]" title="Discord Partner Verified">
                    ✓
                  </span>
                </div>
                <p className="text-[11px] text-opbr-orange font-black uppercase font-mono tracking-wider">Discord portal overrides</p>
              </div>

              {/* Members stats box */}
              <div className="flex items-center gap-3 shrink-0">
                <div className={`px-3 py-1.5 rounded-2xl flex items-center gap-2 border text-xs font-bold leading-none ${
                  theme === 'light' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-emerald-500/10 border-emerald-500/15 text-emerald-400'
                }`}>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  1,158 Online
                </div>
                <div className={`px-3 py-1.5 rounded-2xl flex items-center gap-2 border text-xs font-bold leading-none ${
                  theme === 'light' ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-white/5 border-white/5 text-slate-400'
                }`}>
                  <span className="w-2 h-2 bg-slate-400 dark:bg-slate-500 rounded-full" />
                  8,638 Members
                </div>
              </div>
            </div>

            {/* Server Description customized markup box */}
            <div className={`p-4 rounded-2xl border leading-relaxed ${
              theme === 'light' ? 'bg-zinc-50 border-zinc-200 text-zinc-700 text-sm' : 'bg-white/3 border-white/5 text-slate-300 text-sm'
            }`}>
              <p className="mb-2">
                Your central hub for all things One Piece Bounty Rush. We are a dedicated gaming community built for players who want to grind leagues, and stay ahead of the current meta.
              </p>
              <p>
                Get real-time access to the latest OPBR updates, datamines, guides, and MedoIQ's newest content. A premium place to drop your best gameplay clips, or just hang out and talk gaming!
              </p>
            </div>

            {/* Structured Server reasons highlights list/grid */}
            <div className="space-y-3">
              <h3 className={`text-[10px] font-black tracking-widest uppercase ${theme === 'light' ? 'text-zinc-500' : 'text-slate-500'} font-mono`}>
                Why Join Our Crew?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { icon: Coffee, title: "Chill Coffee Shop", desc: "Super chatty, helpful and zero toxic atmosphere" },
                  { icon: Calendar, title: "Est. April 4, 2023", desc: "Long-standing trusted OPBR dedicated core community" },
                  { icon: Award, title: "#1 OPBR Content", desc: "Meta Tier-lists, custom guides & optimized medals" },
                  { icon: Flame, title: "Early Leaks Room", desc: "First-hand access to game datamines & promo cycles" },
                  { icon: Smile, title: "Emojis & Stickers", desc: "Custom designed icons & One Piece reaction triggers" },
                  { icon: Check, title: "Always One Piece", desc: "Dedicated spaces for anime edits, memes, & multiplayer" }
                ].map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3 rounded-2xl border flex items-start gap-3 transition-colors ${
                      theme === 'light' ? 'bg-white border-zinc-200/50 hover:border-zinc-300' : 'bg-white/4 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="p-2 rounded-xl bg-gradient-to-tr from-[#5865F2]/10 to-[#5865F2]/25 text-[#5865F2] mt-0.5 shrink-0">
                      <item.icon className="w-4 h-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <h4 className={`text-xs font-black tracking-wide uppercase ${theme === 'light' ? 'text-zinc-800' : 'text-slate-200'}`}>{item.title}</h4>
                      <p className={`text-[11px] leading-snug mt-1 ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'}`}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-bold uppercase ${theme === 'light' ? 'text-zinc-500' : 'text-slate-500'} font-mono pr-2`}>
                Tags:
              </span>
              {['Fandom', 'Emoji', 'Anime & Manga', 'Gaming', 'News & Events'].map((cat, i) => (
                <span 
                  key={i} 
                  className={`px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase border ${
                    theme === 'light' ? 'bg-zinc-100 border-zinc-200 text-zinc-600' : 'bg-white/5 border-white/6 text-slate-300'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

          </div>

          {/* Action Footer */}
          <div className={`p-5 border-t shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4 ${
            theme === 'light' ? 'border-zinc-200/50 bg-zinc-50/50' : 'border-white/5 bg-black/20'
          }`}>
            <div className="text-center sm:text-left">
              <span className={`text-[8px] uppercase font-mono tracking-widest ${theme === 'light' ? 'text-zinc-500' : 'text-slate-500'} block`}>Redirection Route</span>
              <span className={`text-xs font-bold font-sans ${theme === 'light' ? 'text-zinc-800' : 'text-slate-200'}`}>Official MedoIQ Hub Connection</span>
            </div>

            <a 
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-102 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer"
            >
              Configure Portal Integration & Join <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
