import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Store, Bell, Menu, X, Settings, Trash2, Sparkles, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DiscordModal } from './DiscordModal';

const NAV_ITEMS = [
  { id: 'home', label: 'Official', icon: Home, path: '/' },
  { id: 'builder', label: 'Medal Builder', icon: Sliders, path: '/builder' },
  { id: 'store', label: 'Global Store', icon: Store, path: '/store' },
  { id: 'community', label: 'Community', icon: Users, path: '/community' },
];

export function Layout() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [glowState, setGlowState] = useState(() => localStorage.getItem('ambient-glow') !== 'false');
  const [glassStyle, setGlassStyle] = useState(() => localStorage.getItem('glass-style') || 'default');
  const [isDiscordModalOpen, setIsDiscordModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const isStore = location.pathname === '/store';

  useEffect(() => {
    const handleOpenDiscord = () => {
      setIsDiscordModalOpen(true);
    };

    const handleGlobalSearch = (e: Event) => {
      const customEvent = e as CustomEvent;
      setSearchQuery(customEvent.detail || '');
    };

    window.addEventListener('open-discord-modal', handleOpenDiscord);
    window.addEventListener('global-search', handleGlobalSearch);

    return () => {
      window.removeEventListener('open-discord-modal', handleOpenDiscord);
      window.removeEventListener('global-search', handleGlobalSearch);
    };
  }, []);

  useEffect(() => {
    // Set initial class list configuration
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }

    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };

    const handleGlowChange = () => {
      setGlowState(localStorage.getItem('ambient-glow') !== 'false');
    };

    const handleGlassStyleChange = () => {
      setGlassStyle(localStorage.getItem('glass-style') || 'default');
    };

    window.addEventListener('theme-change', handleThemeChange);
    window.addEventListener('ambient-glow-change', handleGlowChange);
    window.addEventListener('glass-style-change', handleGlassStyleChange);

    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
      window.removeEventListener('ambient-glow-change', handleGlowChange);
      window.removeEventListener('glass-style-change', handleGlassStyleChange);
    };
  }, [theme]);

  useEffect(() => {
    // Synchronize HTML classes for the glass-style options
    const styles = ['default', 'transparent', 'blur'];
    styles.forEach((s) => {
      document.documentElement.classList.remove(`glass-style-${s}`);
    });
    document.documentElement.classList.add(`glass-style-${glassStyle}`);
  }, [glassStyle]);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#f7f9fc]' : 'bg-zinc-950'} flex flex-col pb-20 md:pb-0 font-sans ${theme === 'light' ? 'text-zinc-900' : 'text-zinc-50'} overflow-hidden relative transition-colors duration-300`}>
      
      {/* Liquid Blobs Background (glowing ambiance) */}
      <AnimatePresence>
        {glowState && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
          >
            <div className={`absolute top-[-100px] left-[-100px] w-[500px] h-[500px] ${theme === 'light' ? 'bg-sky-200/40' : 'bg-sky-950/20'} rounded-full blur-[120px]`}></div>
            <div className={`absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] ${theme === 'light' ? 'bg-orange-200/30' : 'bg-opbr-orange/10'} rounded-full blur-[150px]`}></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full flex flex-col min-h-screen">
        
        {/* Mobile Header */}
        <header className={`sticky top-0 z-40 w-full backdrop-blur-md ${theme === 'light' ? 'bg-white/45 border-zinc-200/80' : 'bg-black/30 border-white/5'} border-b px-4 h-16 flex items-center justify-between md:hidden transition-colors`}>
          <div className="flex items-center gap-3">
            <button 
              id="mobile-sidebar-toggle"
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 rounded-xl border ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-zinc-800' : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-300'} cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all`}
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
              <div className="flex flex-col gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-opbr-orange" />
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-tr from-opbr-orange to-opbr-red rounded-lg flex items-center justify-center shadow-lg shadow-opbr-orange/20">
                <span className="font-display font-black text-white text-sm">BR</span>
              </div>
              <div>
                <h1 className={`font-display font-bold text-sm leading-tight tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-slate-100'}`}>OPBR Helper</h1>
                <p className={`text-[9px] uppercase tracking-widest leading-none ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'}`}>By MedoIQ</p>
              </div>
            </div>
          </div>
          <button className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors relative ${theme === 'light' ? 'bg-zinc-100 text-zinc-705 font-bold' : 'bg-white/5 text-slate-400'}`}>
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2.5 w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse border border-black"></span>
          </button>
        </header>

        {/* Desktop Header */}
        <header className={`hidden md:flex h-20 px-8 items-center justify-between backdrop-blur-md ${theme === 'light' ? 'bg-white/45 border-zinc-200/80' : 'bg-white/5 border-white/5'} border-b gap-4 transition-colors`}>
          <div className="flex items-center gap-4">
            {/* 3 dots + lines Trigger Menu Button */}
            <button 
              id="desktop-sidebar-toggle"
              onClick={() => setIsSidebarOpen(true)}
              className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 hover:scale-[1.02] ${
                theme === 'light' 
                  ? 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-900 shadow-sm' 
                  : 'bg-white/5 border-white/10 hover:bg-white/8 text-slate-200'
              }`}
              title="Open Navigation Controls"
            >
              <Menu className="w-5 h-5 text-opbr-orange" />
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-opbr-orange animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse delay-75" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse delay-150" />
              </div>
            </button>
            <div className="relative flex-1 min-w-[320px]">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearchQuery(val);
                  window.dispatchEvent(new CustomEvent('global-search', { detail: val }));
                }}
                placeholder="Search characters, medals, or news..." 
                className={`w-full ${theme === 'light' ? 'bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 font-medium' : 'bg-white/5 border-white/10 text-slate-100 placeholder:text-slate-500'} border rounded-full px-5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-opbr-orange/40 transition-all shadow-sm`} 
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4">
              <span className={`p-2.5 rounded-xl border relative flex items-center cursor-pointer hover:scale-103 transition-all ${theme === 'light' ? 'bg-white border-zinc-200 text-zinc-700' : 'bg-white/5 border-white/10 text-slate-400'}`}>
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black"></span>
              </span>
            </div>
          </div>
        </header>

        {/* Global Floating/Overlay Sliding Sidebar Drawer */}
        <AnimatePresence>
          {isSidebarOpen && (
            <div className="fixed inset-0 z-50 flex">
              {/* Dark fluid blur overlay backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md z-40"
              />

              {/* Sidebar drawer body */}
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className={`relative z-50 flex flex-col w-72 md:w-80 h-full border-r ${
                  theme === 'light' 
                    ? 'bg-white/95 border-zinc-200 text-zinc-900 shadow-2xl' 
                    : 'bg-[#0a0b0e]/95 border-white/10 text-slate-200 shadow-[20px_0_50px_rgba(0,0,0,0.85)]'
                } backdrop-blur-3xl shrink-0`}
              >
                {/* Header inside drawer */}
                <div className={`p-6 flex items-center justify-between border-b ${theme === 'light' ? 'border-zinc-200' : 'border-white/5'} shrink-0`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-tr from-opbr-orange to-opbr-red rounded-lg flex items-center justify-center shadow-lg shadow-opbr-orange/20 animate-pulse">
                      <span className="font-display font-black text-white text-xl">BR</span>
                    </div>
                    <div>
                      <h1 className={`font-display font-black text-sm uppercase tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-slate-100'}`}>
                        OPBR Helper
                      </h1>
                      <p className="text-[10px] text-opbr-orange font-mono tracking-widest font-black uppercase leading-none mt-0.5">By MedoIQ</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className={`p-2 rounded-xl transition-all cursor-pointer ${
                      theme === 'light' ? 'hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900' : 'hover:bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <X className="w-5 h-5 animate-pulse" />
                  </button>
                </div>

                {/* Primary Nav Links */}
                <nav className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                  <span className={`px-4 text-[9px] font-black uppercase tracking-widest leading-none mb-2 ${theme === 'light' ? 'text-zinc-500' : 'text-slate-500'}`}>
                    Primary Stations
                  </span>
                  
                  {NAV_ITEMS.map((item) => (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 border ${
                          isActive
                            ? 'bg-gradient-to-r from-opbr-orange/15 to-opbr-red/5 text-opbr-orange border-opbr-orange/25 font-black shadow-md shadow-opbr-orange/5'
                            : theme === 'light' 
                              ? 'text-zinc-605 hover:text-zinc-900 hover:bg-zinc-100 border-transparent' 
                              : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border-transparent'
                        }`
                      }
                    >
                      <item.icon className="w-5 h-5 relative z-10" />
                      <span className="relative z-10 text-[11px] font-bold uppercase tracking-wider">{item.label}</span>
                    </NavLink>
                  ))}

                  {/* PREMIUM SIDEBAR SETTINGS INTEGRATION */}
                  <div className={`mt-8 border-t ${theme === 'light' ? 'border-zinc-200' : 'border-white/5'} pt-6 space-y-5`}>
                    <div className="flex items-center gap-2 px-4 mb-1">
                      <Settings className="w-4 h-4 text-opbr-orange animate-spin-slow" />
                      <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${theme === 'light' ? 'text-zinc-500' : 'text-slate-500'}`}>
                        Control Dashboard
                      </span>
                    </div>

                    {/* Theme Mode Toggles */}
                    <div className="px-4 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wide ${theme === 'light' ? 'text-zinc-600' : 'text-slate-400'}`}>
                          Light & Dark Mood
                        </span>
                        <div className={`p-0.5 rounded-lg flex items-center ${theme === 'light' ? 'bg-zinc-100' : 'bg-white/5'}`}>
                          <button
                            onClick={() => {
                              localStorage.setItem('theme', 'dark');
                              window.dispatchEvent(new Event('theme-change'));
                            }}
                            className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md transition-all ${
                              theme === 'dark' ? 'bg-black/40 text-opbr-orange border border-white/5' : 'text-zinc-405 hover:text-zinc-800'
                            }`}
                          >
                            DARK
                          </button>
                          <button
                            onClick={() => {
                              localStorage.setItem('theme', 'light');
                              window.dispatchEvent(new Event('theme-change'));
                            }}
                            className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-wider rounded-md transition-all ${
                              theme === 'light' ? 'bg-white text-opbr-orange border border-zinc-200 shadow-sm' : 'text-slate-450 hover:text-white'
                            }`}
                          >
                            LIGHT
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Ambient Glow Controller Toggle status */}
                    <div className="px-4 flex items-center justify-between">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wide ${theme === 'light' ? 'text-zinc-600' : 'text-slate-400'}`}>
                        Ambient Fluid Glows
                      </span>
                      <button
                        onClick={() => {
                          const state = localStorage.getItem('ambient-glow') !== 'false';
                          localStorage.setItem('ambient-glow', (!state).toString());
                          window.dispatchEvent(new Event('ambient-glow-change'));
                        }}
                        className={`px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-lg border transition-all ${
                          glowState 
                            ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/20' 
                            : 'bg-red-500/15 text-red-500 border-red-500/20'
                        }`}
                      >
                        {glowState ? 'Active' : 'Muted'}
                      </button>
                    </div>

                    {/* Liquid Glass style controllers */}
                    <div className="px-4 space-y-1.5">
                      <div className="flex flex-col gap-1.5">
                        <span className={`text-[10px] font-extrabold uppercase tracking-wide ${theme === 'light' ? 'text-zinc-600' : 'text-slate-400'}`}>
                          Liquid Glass Style
                        </span>
                        <div className={`p-0.5 rounded-xl flex items-center w-full justify-between ${theme === 'light' ? 'bg-zinc-100' : 'bg-white/5'}`}>
                          <button
                            onClick={() => {
                              localStorage.setItem('glass-style', 'default');
                              window.dispatchEvent(new Event('glass-style-change'));
                            }}
                            className={`flex-1 text-center py-1.5 text-[8.5px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                              glassStyle === 'default'
                                ? theme === 'light' ? 'bg-white text-opbr-orange border border-zinc-200/50 shadow-sm font-black' : 'bg-black/50 text-opbr-orange border border-white/5 font-black'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Default
                          </button>
                          <button
                            onClick={() => {
                              localStorage.setItem('glass-style', 'transparent');
                              window.dispatchEvent(new Event('glass-style-change'));
                            }}
                            className={`flex-1 text-center py-1.5 text-[8.5px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                              glassStyle === 'transparent'
                                ? theme === 'light' ? 'bg-white text-opbr-orange border border-zinc-200/50 shadow-sm font-black' : 'bg-black/50 text-opbr-orange border border-white/5 font-black'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Transparent
                          </button>
                          <button
                            onClick={() => {
                              localStorage.setItem('glass-style', 'blur');
                              window.dispatchEvent(new Event('glass-style-change'));
                            }}
                            className={`flex-1 text-center py-1.5 text-[8.5px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                              glassStyle === 'blur'
                                ? theme === 'light' ? 'bg-white text-opbr-orange border border-zinc-200/50 shadow-sm font-black' : 'bg-black/50 text-opbr-orange border border-white/5 font-black'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Frost Blur
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Cache clean and system restore */}
                    <div className="px-4 pt-2">
                      <button
                        onClick={() => {
                          localStorage.clear();
                          localStorage.setItem('theme', 'dark');
                          localStorage.setItem('ambient-glow', 'true');
                          localStorage.setItem('glass-style', 'default');
                          window.dispatchEvent(new Event('theme-change'));
                          window.dispatchEvent(new Event('ambient-glow-change'));
                          window.dispatchEvent(new Event('glass-style-change'));
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full py-2.5 rounded-xl border text-[10px] font-black tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md ${
                          theme === 'light' 
                            ? 'bg-red-50 text-red-650 border-red-200 hover:bg-red-100' 
                            : 'bg-red-500/10 text-red-400 border-red-500/15 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Wipe Saved Data
                      </button>
                    </div>

                  </div>
                </nav>

                {/* Drawers footer parameters */}
                <div className={`p-6 border-t ${theme === 'light' ? 'border-zinc-200' : 'border-white/5'} text-[9px] font-mono tracking-widest opacity-50 flex items-center justify-between uppercase shrink-0`}>
                  <span>MedoIQ Systems v2.2</span>
                  <span className="text-opbr-orange font-black">Secure Core</span>
                </div>
              </motion.aside>
            </div>
          )}
        </AnimatePresence>

        {/* Global Page Container */}
        <section className="flex-1 w-full relative">
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </section>

        {/* Footer Info Rail */}
        <footer className={`hidden md:flex h-14 px-8 items-center justify-between backdrop-blur-xl border-t text-[10px] uppercase tracking-[0.2em] font-black transition-colors ${
          theme === 'light' 
            ? 'bg-white/60 border-zinc-200 text-zinc-500' 
            : 'bg-black/60 border-white/5 text-slate-500'
        } w-full mt-auto`}>
          <div className="flex gap-8 items-center">
            <span>Server Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
              Gateway status: Live Sync
            </span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-opbr-orange transition-colors">Documentation</a>
            <a href="#" className="hover:text-opbr-orange transition-colors font-mono">OPBR Portal</a>
            <span className="text-opbr-orange">© 2026 MedoIQ Systems</span>
          </div>
        </footer>

        {/* Sitewide Themed Floating Discord Button (Glowing Liquid Glass Theme) */}
        <motion.button
          onClick={(e) => {
            e.preventDefault();
            setIsDiscordModalOpen(true);
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`fixed bottom-6 right-6 z-40 p-4 rounded-2xl flex items-center justify-center border transition-all duration-300 group cursor-pointer ${
            theme === 'light'
              ? 'bg-white/80 border-zinc-200 text-[#5865F2] shadow-[0_10px_30px_rgba(88,101,242,0.15)] hover:shadow-[0_15px_35px_rgba(88,101,242,0.25)] hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2]'
              : 'bg-black/40 border-white/10 text-slate-200 hover:text-white shadow-[0_10px_30px_rgba(0,0,0,0.5),_0_0_20px_rgba(88,101,242,0.15)] hover:shadow-[0_15px_35px_rgba(88,101,242,0.4)] hover:bg-[#5865F2]/20 hover:border-[#5865F2]/45'
          } backdrop-blur-xl`}
          title="Join MedoIQ's Official Discord Server"
        >
          {/* Inner Liquid Glow Ring */}
          <span className="absolute inset-0 rounded-2xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          
          {/* Glowing pulse aura when in dark mode */}
          {theme === 'dark' && (
            <span className="absolute -inset-1 rounded-3xl bg-[#5865F2]/20 blur-md opacity-30 group-hover:opacity-100 transition-all group-hover:scale-105 pointer-events-none" />
          )}
          
          <svg className="w-6 h-6 shrink-0 relative z-10" viewBox="0 0 127.14 96.36" fill="currentColor">
            <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.5-5c.9-.65,1.76-1.34,2.58-2.06a75.48,75.48,0,0,0,72.76,0c.82.72,1.68,1.41,2.58,2.06a68.43,68.43,0,0,1-10.5,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31-18.83C129.81,49.19,122.9,26.43,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z" />
          </svg>
          
          {/* Subtle expand text on hover side helper */}
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out font-sans text-[10px] font-black tracking-widest uppercase text-left pl-0 group-hover:pl-3 whitespace-nowrap hidden md:inline-block relative z-10">
            Join Discord
          </span>
        </motion.button>

        <DiscordModal 
          isOpen={isDiscordModalOpen} 
          onClose={() => setIsDiscordModalOpen(false)} 
        />

      </div>
    </div>
  );
}
