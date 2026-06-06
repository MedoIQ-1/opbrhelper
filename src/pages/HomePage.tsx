import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronRight, Store, Info, Newspaper } from 'lucide-react';
import { ArticleModal } from '../components/ArticleModal';

export function HomePage() {
  const [news, setNews] = useState<any[]>([]);
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticleUrl, setSelectedArticleUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Theme listener for adaptive responsive color matching
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    const handleGlobalSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSearchQuery(customEvent.detail || '');
    };

    window.addEventListener('theme-change', handleThemeChange);
    window.addEventListener('global-search', handleGlobalSearch);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
      window.removeEventListener('global-search', handleGlobalSearch);
    };
  }, []);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setNews(data.data.news || []);
          setBanners(data.data.banners || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredNews = news.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(query)) ||
      (item.category && item.category.toLowerCase().includes(query)) ||
      (item.date && item.date.toLowerCase().includes(query))
    );
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 relative"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Flowing background elements specifically for Homepage glass layout depth */}
      <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none z-0 overflow-hidden">
        <div className={`absolute top-10 left-10 w-[400px] h-[400px] rounded-full blur-[130px] opacity-10 ${theme === 'light' ? 'bg-orange-500' : 'bg-opbr-orange'}`} />
        <div className={`absolute top-40 right-20 w-[450px] h-[450px] rounded-full blur-[140px] opacity-[0.08] ${theme === 'light' ? 'bg-sky-500' : 'bg-blue-500'}`} />
      </div>

      {/* Hero Welcome Section */}
      <motion.section variants={itemVariants} className="relative z-10">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[2] relative h-[280px] rounded-[24px] overflow-hidden border border-white/10 group shadow-lg">
            {banners.length > 0 && banners[0].img ? (
              <img src={banners[0].img} alt="Featured Banner" className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-103" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-850 z-0"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10"></div>
            <div className="absolute inset-0 bg-opbr-orange/15 mix-blend-overlay z-10"></div>
            <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full group">
              <span className="px-3 py-1 rounded-full bg-opbr-orange text-white text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">Featured Highlight</span>
              <h2 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight uppercase italic max-w-2xl line-clamp-2 drop-shadow-xl font-display">
                 {banners.length > 0 && banners[0].title ? banners[0].title.replace(/^\d+:/, '') : "Stay informed with the latest OPBR updates"}
              </h2>
            </div>
            <div className="absolute top-0 right-0 p-6 z-20">
              <a 
                href={banners.length > 0 ? banners[0].link : '#'} 
                onClick={(e) => {
                  if (banners.length > 0 && banners[0].link) {
                    e.preventDefault();
                    setSelectedArticleUrl(banners[0].link);
                  }
                }}
                className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 flex items-center justify-center hover:bg-white/25 text-white transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {/* Store card formatted as a beautiful liquid-glass plate */}
            <div className={`flex-1 border rounded-2xl p-5 flex flex-col justify-center relative overflow-hidden group hover:border-opbr-orange/55 transition-all duration-300 backdrop-blur-md shadow-md ${
              theme === 'light' ? 'bg-white/60 border-zinc-200/85 text-zinc-900' : 'bg-white/5 border-white/5 text-white'
            }`}>
              <span className="text-opbr-orange text-[10px] font-bold uppercase tracking-widest mb-1 font-mono">Official Store</span>
              <h3 className={`text-lg font-bold leading-tight mb-2 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>OPBR Global Store <br/>Live Offers</h3>
              <Link to="/store" className="mt-2 text-xs font-black uppercase text-opbr-orange flex items-center gap-1 hover:text-orange-500 transition-colors">
                ENTER WEB STORE <ChevronRight className="w-4 h-4 animate-pulse" />
              </Link>
            </div>

            {/* Community card formatted as a beautiful liquid-glass plate */}
            <div className={`flex-1 border rounded-2xl p-5 flex flex-col justify-center hover:border-indigo-500/55 transition-all duration-300 backdrop-blur-md shadow-md ${
              theme === 'light' ? 'bg-white/60 border-zinc-200/85 text-zinc-900' : 'bg-white/5 border-white/5 text-white'
            }`}>
              <span className="text-indigo-500 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-1 font-mono">Community Hub</span>
              <h3 className={`text-lg font-bold leading-tight mb-2 ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>MedoIQ Creator Hub <br/>Discord & Videos</h3>
              <Link to="/community" className="mt-2 text-xs font-black uppercase text-indigo-550 dark:text-indigo-400 flex items-center gap-1 hover:text-indigo-600 transition-colors font-mono">
                VIEW SOCIAL HUBS <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Official Quick Links styled in Glassmorphism */}
      <motion.section variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
        {[
          { title: "Official Japanese Info", icon: Info, link: "https://web-bounty-rush.com/", color: "from-blue-600/10 to-blue-800/10", iconColor: "text-blue-500" },
          { title: "Official Global Info", icon: Info, link: "https://web-bounty-rush.com/en/", color: "from-blue-500/10 to-blue-600/10", iconColor: "text-blue-500" }
        ].map((item, idx) => (
          <a 
            key={idx} 
            href={item.link} 
            target="_blank" 
            rel="noreferrer"
            className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-350 group cursor-pointer backdrop-blur-md shadow-sm ${
              theme === 'light' 
                ? 'bg-white/60 border-zinc-200/80 hover:bg-white/85 hover:border-zinc-350 hover:shadow-md' 
                : 'bg-white/5 border-white/8 hover:bg-white/8 hover:border-white/12 hover:shadow-lg'
            }`}
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-inner`}>
              <item.icon className={`w-6 h-6 ${item.iconColor}`} />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold transition-colors ${theme === 'light' ? 'text-zinc-800 group-hover:text-black' : 'text-slate-150 group-hover:text-white'}`}>{item.title}</h3>
            </div>
            <ExternalLink className={`w-4 h-4 transition-colors ${theme === 'light' ? 'text-zinc-400 group-hover:text-zinc-650' : 'text-slate-500 group-hover:text-slate-300'}`} />
          </a>
        ))}
      </motion.section>

      {/* Latest News bulletins */}
      <motion.section variants={itemVariants} className="space-y-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border ${theme === 'light' ? 'bg-white border-zinc-200' : 'bg-white/5 border-white/10'}`}>
            <Newspaper className="w-5 h-5 text-opbr-orange" />
          </div>
          <h2 className={`font-display text-2xl font-black uppercase tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>Latest Official News</h2>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-32 rounded-3xl animate-pulse border ${theme === 'light' ? 'bg-zinc-150/40 border-zinc-200' : 'bg-white/5 border-white/10'}`}></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.length === 0 ? (
              <div className={`col-span-full h-48 border rounded-3xl p-8 flex flex-col items-center justify-center text-center gap-3 backdrop-blur-md ${
                theme === 'light' ? 'bg-white/45 border-zinc-200 text-zinc-800' : 'bg-white/3 border-white/5 text-slate-350'
              }`}>
                <p className="text-xs font-mono font-black uppercase tracking-wider">No matching announcements or bulletins</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    window.dispatchEvent(new CustomEvent('global-search', { detail: '' }));
                  }}
                  className="px-3.5 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-wider bg-opbr-orange hover:bg-orange-600 text-white transition-all cursor-pointer shadow-md"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              filteredNews.map((item, idx) => (
                <motion.a
                  href={item.link}
                  onClick={(e) => {
                    if (item.link) {
                      e.preventDefault();
                      setSelectedArticleUrl(item.link);
                    }
                  }}
                  key={idx}
                  className={`group relative flex flex-col justify-between p-5 rounded-[22px] overflow-hidden border backdrop-blur-md transition-all duration-400 h-[170px] cursor-pointer ${
                    theme === 'light' 
                      ? 'bg-white/60 border-zinc-200/80 hover:border-opbr-orange/55 hover:shadow-[0_12px_24px_rgba(249,115,22,0.06)]' 
                      : 'bg-[#16181f]/40 border-white/5 hover:border-opbr-orange/45 hover:shadow-xl hover:shadow-opbr-orange/5'
                  }`}
                  whileHover={{ y: -4 }}
                >
                  {/* Background article graphic image banner */}
                  {item.img && (
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={item.img} 
                        alt="" 
                        className={`w-full h-full object-cover transition-all duration-500 object-center ${
                          theme === 'light' ? 'opacity-[0.14] group-hover:opacity-20' : 'opacity-[0.25] group-hover:opacity-40'
                        }`} 
                        referrerPolicy="no-referrer" 
                      />
                      <div className={`absolute inset-0 ${
                        theme === 'light' ? 'bg-gradient-to-t from-[#f7f9fc] via-[#f7f9fc]/90 to-transparent' : 'bg-gradient-to-t from-[#0e0f14] via-[#0e0f14]/85 to-transparent'
                      }`}></div>
                    </div>
                  )}
                  
                  <div className="relative z-10 w-full flex flex-col justify-between h-full">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        {item.category === 'Bug' ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-red-500/10 text-red-500 border border-red-500/20">Issue / Bug</span>
                        ) : item.category === 'Important' ? (
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-yellow-500/15 text-yellow-600 border border-yellow-500/20">Important</span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-500 border border-blue-500/20">Notice</span>
                        )}
                        
                        {item.isNew && (
                          <span className="px-2 py-0.5 rounded-md text-[9px] font-extrabold bg-opbr-orange text-white uppercase tracking-wider animate-pulse shadow-md shadow-opbr-orange/20">New</span>
                        )}
                      </div>
                      
                      <h3 className={`font-bold text-sm leading-snug line-clamp-2 transition-colors duration-300 ${
                        theme === 'light' ? 'text-zinc-800 group-hover:text-black line-through-none' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className={`flex items-center justify-between border-t pt-2 mt-2 ${theme === 'light' ? 'border-zinc-200/60' : 'border-white/5'}`}>
                       <span className={`text-[10px] font-mono tracking-tighter ${theme === 'light' ? 'text-zinc-500 font-bold' : 'text-slate-500'}`}>
                         {item.date}
                       </span>
                       <div className={`flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                         theme === 'light' ? 'text-zinc-700 group-hover:text-opbr-orange' : 'text-slate-400 group-hover:text-opbr-orange'
                       }`}>
                         Read Bulletin <ChevronRight className="w-4 h-4 transition-colors" />
                       </div>
                    </div>
                  </div>
                </motion.a>
              ))
            )}
          </div>
        )}
      </motion.section>

      <ArticleModal 
        url={selectedArticleUrl} 
        onClose={() => setSelectedArticleUrl(null)} 
      />
    </motion.div>
  );
}
