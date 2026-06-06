import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, ExternalLink } from 'lucide-react';

interface ArticleModalProps {
  url: string | null;
  onClose: () => void;
}

export function ArticleModal({ url, onClose }: ArticleModalProps) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Listen to theme changes from the parent layout
  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setError(null);
    setData(null);

    fetch(`/api/news/detail?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 'ok') {
          setData(res.data);
        } else {
          setError(res.message || 'Failed to fetch bulletin');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('Connection time-out. Could not download notification detail.');
      })
      .finally(() => setLoading(false));
  }, [url]);

  if (!url) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 pb-20 md:pb-6 overflow-hidden">
        {/* Semi-transparent liquid glass backdrop blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/35 backdrop-blur-xl z-0"
        />

        {/* Ambient sliding liquid glass blobs directly behind the modal body */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1.25, 0.9, 1],
              rotate: [0, 90, 180, 270, 360],
              x: [-60, 60, -40, -60],
              y: [-40, 50, -60, -40]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-[450px] h-[450px] rounded-full blur-[110px] opacity-[0.24] ${theme === 'light' ? 'bg-amber-400' : 'bg-opbr-orange'}`}
          />
          <motion.div 
            animate={{ 
              scale: [1.15, 0.9, 1.25, 1.15],
              rotate: [360, 270, 180, 90, 0],
              x: [70, -50, 60, 70],
              y: [60, -70, 50, 60]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.2] ${theme === 'light' ? 'bg-sky-400' : 'bg-[#2563eb]'}`}
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 210 }}
          className={`relative w-full max-w-4xl max-h-[85vh] ${
            theme === 'light' 
              ? 'bg-white/60 border-white/50 text-zinc-900 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.12)]' 
              : 'bg-zinc-950/45 border-white/10 text-slate-200 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7)]'
          } backdrop-blur-3xl rounded-[32px] overflow-hidden border flex flex-col z-20`}
        >
          {/* Custom Stylesheet Scoper to Redesign the raw Bandai markup */}
          <style dangerouslySetInnerHTML={{ __html: `
            .article-content {
              font-family: 'Inter', system-ui, sans-serif !important;
              font-size: 15px !important;
              line-height: 1.8 !important;
              color: ${theme === 'light' ? '#27272a' : '#e2e8f0'} !important;
            }
            .article-content p {
              margin-bottom: 14px !important;
            }
            /* Bullets & Headings */
            .article-content .info_detail_m {
              font-family: 'Outfit', sans-serif !important;
              font-size: 1.15rem !important;
              font-weight: 800 !important;
              color: #f97316 !important; /* Premium OPBR Orange */
              text-transform: uppercase !important;
              letter-spacing: 0.04em !important;
              border-left: 4px solid #f97316 !important;
              padding-left: 14px !important;
              margin-top: 32px !important;
              margin-bottom: 16px !important;
              display: block !important;
            }
            /* Liquid Glossy Wrappers */
            .article-content .wrap01, .article-content .wrap02 {
              background: ${theme === 'light' ? 'rgba(255,255,255,0.4)' : 'rgba(255, 255, 255, 0.02)'} !important;
              border: 1px solid ${theme === 'light' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)'} !important;
              border-radius: 24px !important;
              padding: 26px !important;
              margin: 24px 0 !important;
              backdrop-filter: blur(16px) !important;
              box-shadow: ${theme === 'light' ? '0 8px 32px rgba(0,0,0,0.02)' : '0 8px 32px rgba(0,0,0,0.15)'} !important;
            }
            /* Responsive tables styling */
            .article-content table {
              width: 100% !important;
              border-collapse: collapse !important;
              margin: 24px 0 !important;
              font-size: 13.5px !important;
              border-radius: 20px !important;
              overflow: hidden !important;
              border: 1px solid ${theme === 'light' ? 'rgba(0,0,0,0.06)' : 'rgba(255, 255, 255, 0.06)'} !important;
              background: ${theme === 'light' ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.01)'} !important;
              backdrop-filter: blur(10px) !important;
            }
            .article-content th, .article-content td {
              padding: 14px 18px !important;
              text-align: left !important;
              border-bottom: 1px solid ${theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255, 255, 255, 0.04)'} !important;
            }
            .article-content th {
              font-weight: 800 !important;
              text-transform: uppercase !important;
              font-size: 10.5px !important;
              letter-spacing: 0.06em !important;
              background: ${theme === 'light' ? 'rgba(244,245,247,0.5)' : 'rgba(37, 99, 235, 0.08)'} !important;
              color: ${theme === 'light' ? '#18181b' : '#93c5fd'} !important;
            }
            .article-content td {
              color: ${theme === 'light' ? '#3f3f46' : '#cbd5e1'} !important;
            }
            .article-content tr:nth-child(even) {
              background-color: ${theme === 'light' ? 'rgba(0,0,0,0.01)' : 'rgba(255, 255, 255, 0.005)'};
            }
            .article-content tr:hover {
              background-color: ${theme === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255, 255, 255, 0.02)'} !important;
            }
            /* Image Styling overrides */
            .article-content img {
              max-width: 100% !important;
              height: auto !important;
              border-radius: 24px !important;
              margin: 20px auto !important;
              display: block !important;
              box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12) !important;
              border: 1px solid ${theme === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255, 255, 255, 0.06)'} !important;
            }
            /* Highlight colors from server */
            .article-content .accent-blue {
              color: #3b82f6 !important;
              font-weight: bold !important;
            }
            .article-content .accent-red {
              color: #ef4444 !important;
              font-size: 1rem !important;
              margin-bottom: 12px !important;
            }
            .article-content .L1, .article-content ul {
              list-style-type: disc !important;
              padding-left: 20px !important;
              margin-bottom: 12px !important;
            }
            .article-content .L1 li, .article-content ul li {
              margin-bottom: 8px !important;
            }
          ` }} />

          <div className={`flex items-center justify-between p-5 border-b shrink-0 ${theme === 'light' ? 'border-zinc-200/50 bg-white/20' : 'border-white/5 bg-black/15'}`}>
            <h3 className={`font-display font-black text-xs uppercase tracking-widest ${theme === 'light' ? 'text-zinc-900' : 'text-slate-150'} flex items-center gap-2.5`}>
              <span className="w-2.5 h-2.5 rounded-full bg-opbr-orange animate-ping"></span>
              Official News Transmitter
            </h3>
            <div className="flex items-center gap-2">
               <a 
                 href={url} 
                 target="_blank" 
                 rel="noreferrer" 
                 className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                   theme === 'light' 
                     ? 'bg-zinc-100/50 border-zinc-200 hover:bg-zinc-200 text-zinc-700' 
                     : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300'
                 }`} 
                 title="Open Original Source"
               >
                 <ExternalLink className="w-4 h-4" />
               </a>
               <button 
                 onClick={onClose} 
                 className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                   theme === 'light' 
                     ? 'bg-zinc-100/50 border-zinc-200 hover:bg-zinc-200 text-zinc-700' 
                     : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300'
                 }`}
               >
                 <X className="w-4 h-4" />
               </button>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 p-6 md:p-8 custom-scrollbar relative z-10">
            {loading ? (
              <div className={`flex flex-col items-center justify-center h-64 gap-3.5 ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'}`}>
                <Loader2 className="w-9 h-9 animate-spin text-opbr-orange" />
                <p className="text-[10px] font-black tracking-widest uppercase font-mono">Synchronizing bulletin frames...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center h-64 gap-3.5 text-red-500 bg-red-500/5 p-6 rounded-2xl border border-red-500/10 max-w-sm mx-auto my-12">
                <p className="text-xs font-mono font-bold uppercase leading-relaxed text-center">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/15 text-red-500 rounded-xl text-[10px] font-black uppercase tracking-wider transition-colors"
                >
                  Reload Page
                </button>
              </div>
            ) : data ? (
              <div className="article-content space-y-6">
                
                {/* Custom polished title and categories rather than mirroring style */}
                <div className={`mb-6 space-y-4 border-b pb-6 ${theme === 'light' ? 'border-zinc-200/55' : 'border-white/5'}`}>
                  <div className="flex items-center gap-2.5">
                    {data.category === 'Bug' ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">Issue / Bug Report</span>
                    ) : data.category === 'Important' ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-600 border border-amber-500/20">Important Notice</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-sky-500/10 text-sky-500 border border-sky-500/20">Official Announcement</span>
                    )}
                    <span className={`text-[10px] font-mono tracking-tighter px-2.5 py-1 rounded-full border ${theme === 'light' ? 'bg-zinc-100 text-zinc-550 border-zinc-200' : 'bg-white/5 text-slate-400 border-white/5'}`}>
                      {data.date}
                    </span>
                  </div>
                  
                  <h1 className={`text-xl md:text-3xl font-display font-black leading-tight tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                    {data.title.replace(/^\d+:/, '')}
                  </h1>
                </div>
                
                {/* Redesigned content pane */}
                <div 
                  className={`prose ${theme === 'light' ? 'prose-zinc prose-a:text-opbr-orange' : 'prose-invert prose-slate prose-a:text-opbr-orange'} max-w-none prose-img:rounded-3xl prose-img:border`}
                  dangerouslySetInnerHTML={{ __html: data.content }} 
                />
              </div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
