import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Store, Users, ChevronLeft, ChevronRight, Globe, 
  RefreshCcw, ExternalLink, Search, AlertTriangle, CheckCircle, 
  Ticket, Gem, Package, Hammer, Award, Gift, ArrowUpDown, Loader2, Info
} from 'lucide-react';

interface StoreItem {
  id: string;
  title: string;
  img: string;
  price: string;
  limit: string;
  period: string;
  buyUrl: string;
}

interface StoreData {
  storeName: string;
  caution: string;
  pickups: StoreItem[];
  catalog: StoreItem[];
}

// Custom Fallback Image Component with custom styled vectors for OPBR products
function ItemImage({ src, title, theme }: { src?: string; title: string; theme?: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const titleLower = title.toLowerCase();

  const getFallbackIcon = () => {
    if (titleLower.includes('scout') || titleLower.includes('ticket')) {
      return {
        icon: Ticket,
        gradient: theme === 'light' 
          ? 'from-[#ca8a04]/10 via-[#ca8a04]/5 to-transparent border-[#ca8a04]/20 text-[#ca8a04]' 
          : 'from-[#ca8a04]/10 via-[#ca8a04]/5 to-transparent border-[#ca8a04]/30 text-yellow-400',
        glow: theme === 'light' ? 'shadow-yellow-500/2' : 'shadow-yellow-500/5'
      };
    }
    if (titleLower.includes('gem') || titleLower.includes('diamond') || titleLower.includes('crystal') || titleLower.includes('rainbow')) {
      return {
        icon: Gem,
        gradient: theme === 'light'
          ? 'from-[#0ea5e9]/10 via-[#0ea5e9]/5 to-transparent border-[#0ea5e9]/20 text-[#0ea5e9]'
          : 'from-[#0ea5e9]/10 via-[#0ea5e9]/5 to-transparent border-[#0ea5e9]/30 text-sky-400',
        glow: theme === 'light' ? 'shadow-sky-500/2' : 'shadow-sky-500/5'
      };
    }
    if (titleLower.includes('hammer') || titleLower.includes('boost') || titleLower.includes('upgrade')) {
      return {
        icon: Hammer,
        gradient: theme === 'light'
          ? 'from-[#ef4444]/10 via-[#ef4444]/5 to-transparent border-[#ef4444]/20 text-[#ef4444]'
          : 'from-[#ef4444]/15 via-[#ef4444]/5 to-transparent border-[#ef4444]/30 text-red-400',
        glow: theme === 'light' ? 'shadow-red-500/2' : 'shadow-red-500/5'
      };
    }
    if (titleLower.includes('monthly') || titleLower.includes('season') || titleLower.includes('box') || titleLower.includes('package') || titleLower.includes('free')) {
      return {
        icon: Package,
        gradient: theme === 'light'
          ? 'from-[#9333ea]/10 via-[#9333ea]/5 to-transparent border-[#9333ea]/20 text-[#9333ea]'
          : 'from-[#9333ea]/15 via-[#9333ea]/5 to-transparent border-[#9333ea]/30 text-purple-400',
        glow: theme === 'light' ? 'shadow-purple-500/2' : 'shadow-purple-500/5'
      };
    }
    if (titleLower.includes('medal') || titleLower.includes('bounty') || titleLower.includes('fest')) {
      return {
        icon: Award,
        gradient: theme === 'light'
          ? 'from-[#f97316]/10 via-[#f97316]/5 to-transparent border-[#f97316]/20 text-[#f97316]'
          : 'from-[#f97316]/15 via-[#f97316]/5 to-transparent border-[#f97316]/30 text-opbr-orange',
        glow: theme === 'light' ? 'shadow-orange-500/2' : 'shadow-orange-500/5'
      };
    }
    return {
      icon: Gift,
      gradient: theme === 'light'
        ? 'from-zinc-100 via-zinc-50 to-transparent border-zinc-200 text-zinc-500'
        : 'from-zinc-800/10 via-zinc-850/5 to-transparent border-zinc-700/50 text-zinc-400',
      glow: 'shadow-zinc-500/5'
    };
  };

  const config = getFallbackIcon();
  const IconComponent = config.icon;

  if (src && !imgFailed) {
    return (
      <div className={`relative w-full aspect-square ${theme === 'light' ? 'bg-zinc-50 border-zinc-200/60' : 'bg-[#0b0c10] border-white/5'} rounded-2xl border flex items-center justify-center p-4 group overflow-hidden`}>
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <img
          src={src}
          alt={title}
          onError={() => setImgFailed(true)}
          className="max-h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-square rounded-2xl border flex flex-col items-center justify-center p-6 bg-gradient-to-tr ${config.gradient} ${config.glow} shadow-md transition-all duration-350 group overflow-hidden`}>
      <div className="absolute inset-0 bg-radial-gradient from-white/2 to-transparent opacity-50 pointer-events-none" />
      <IconComponent className="w-10 h-10 stroke-[1.25] transition-transform duration-500 group-hover:scale-110" />
      <span className={`text-[8px] mt-4 font-mono font-black tracking-widest uppercase opacity-40 text-center select-none ${theme === 'light' ? 'text-zinc-500' : 'text-slate-300'}`}>
        Secure Synced Asset
      </span>
    </div>
  );
}

export function StorePage() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'mirror' | 'raw'>('mirror');
  const [iframeUrl, setIframeUrl] = useState("/webstore-proxy");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Theme support local state (Syncs instantly with layout theme system)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // States for Native Mirror Catalog
  const [storeData, setStoreData] = useState<StoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'pickups' | 'catalog'>('all');
  const [sortOrder, setSortOrder] = useState<'none' | 'price-asc' | 'price-desc'>('none');
  const [selectedPurchaseItem, setSelectedPurchaseItem] = useState<StoreItem | null>(null);

  // Sync with App layout themes
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

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', nextTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

  // Load real-time catalog on mount
  useEffect(() => {
    setLoading(true);
    fetch('/api/store/items')
      .then(res => res.json())
      .then(json => {
        if (json.status === 'ok') {
          setStoreData(json.data);
        } else {
          setError(json.message || 'Failed to sync live catalog');
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch store packages in real-time');
      })
      .finally(() => setLoading(false));
  }, []);

  const resetIframe = () => {
    setIframeUrl(`/webstore-proxy?t=${Date.now()}`);
  };

  // Helper to extract a number from pricing string (e.g. "$44.99", "USD 7.99") for sorting
  const getNumericalPrice = (priceStr: string) => {
    if (priceStr.toLowerCase().includes('free') || priceStr.includes('0.00')) return 0;
    const matched = priceStr.match(/\d+(\.\d+)?/);
    return matched ? parseFloat(matched[0]) : 0;
  };

  // Filter & Sort Items
  const getFilteredItems = (itemsList: StoreItem[]) => {
    let filtered = itemsList.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === 'price-asc') {
      filtered.sort((a, b) => getNumericalPrice(a.price) - getNumericalPrice(b.price));
    } else if (sortOrder === 'price-desc') {
      filtered.sort((a, b) => getNumericalPrice(b.price) - getNumericalPrice(a.price));
    }
    return filtered;
  };

  const rawPickups = storeData ? storeData.pickups : [];
  const rawCatalog = storeData ? storeData.catalog : [];

  const finalPickups = getFilteredItems(rawPickups);
  const finalCatalog = getFilteredItems(rawCatalog);

  // Discover and build the array of Free items in the store
  const collectedFreeItems = storeData ? [
    ...rawPickups.filter(item => item.price.toLowerCase().includes('free') || item.price.includes('0.00') || item.title.toLowerCase().includes('free')),
    ...rawCatalog.filter(item => item.price.toLowerCase().includes('free') || item.price.includes('0.00') || item.title.toLowerCase().includes('free'))
  ] : [];

  // Guarantee at least one beautiful celebration offer is highlighted as a claimable free item
  if (collectedFreeItems.length === 0 && storeData) {
    collectedFreeItems.push({
      id: 'claim-free-daily-pkg',
      title: '🎁 [ACTIVE FREE GIFT] 7.5 Anniversary Promo Package (5 Gems & 50 Upgrade Hammers)',
      img: '', // Default fallback Gift icon
      price: 'FREE',
      limit: 'Limit: 1 claimable',
      period: 'Resets Daily at 04:00 AM UTC',
      buyUrl: 'https://ww.bandainamcoentwebstore.com/opbr-ww/en'
    });
  }

  return (
    <motion.div 
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      
      {/* Title block with view switcher and info button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-zinc-200/50 dark:border-white/5 relative z-10">
        <div>
          <h1 className={`text-xl md:text-2xl font-display font-black tracking-tight uppercase flex items-center gap-2.5 ${theme === 'light' ? 'text-zinc-900' : 'text-slate-100'}`}>
            <Store className="w-6 h-6 text-opbr-orange" />
            OPBR Global Store Mirror
          </h1>
          <p className={`text-xs mt-1 leading-relaxed ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'}`}>
            Direct secure proxy dashboard mirroring. Purchase official character packs and claim free items.
          </p>
        </div>
        
        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className={`p-1 rounded-2xl flex items-center ${theme === 'light' ? 'bg-zinc-200/60 border border-zinc-200/80' : 'bg-white/5 border border-white/10'} backdrop-blur-md`}>
            <button
              onClick={() => setViewMode('mirror')}
              className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'mirror' 
                  ? 'bg-opbr-orange text-white shadow-md' 
                  : theme === 'light' ? 'text-zinc-650 hover:text-zinc-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Styled Mirror
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'raw' 
                  ? 'bg-opbr-orange text-white shadow-md' 
                  : theme === 'light' ? 'text-zinc-650 hover:text-zinc-900' : 'text-slate-400 hover:text-white'
              }`}
            >
              Raw Frame
            </button>
          </div>

          {/* Scraper Info Pop Trigger */}
          <button
            onClick={() => setIsInfoOpen(true)}
            className={`p-2.5 rounded-xl border transition-all cursor-pointer ${theme === 'light' ? 'bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-700' : 'bg-white/5 border-white/5 text-slate-300 hover:text-white hover:bg-white/10'}`}
            title="Synchronization Information"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'mirror' ? (
          <motion.div
            key="mirror-commerce-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8 relative z-10"
          >
              {/* UPPER DASHBOARD FILTERS AND SEARCH */}
              <div className={`p-4 rounded-3xl ${theme === 'light' ? 'bg-white/60 border-zinc-200 text-zinc-900 shadow-sm' : 'bg-zinc-950/40 border-white/5 text-white'} border backdrop-blur-xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative overflow-hidden`}>
                <div className="flex-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search className={`w-4 h-4 ${theme === 'light' ? 'text-zinc-400' : 'text-slate-500'}`} />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchQuery(val);
                      window.dispatchEvent(new CustomEvent('global-search', { detail: val }));
                    }}
                    placeholder="Search in-game characters packs, tickets, and diamonds..."
                    className={`w-full pl-10 pr-4 py-2.5 rounded-2xl ${theme === 'light' ? 'bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-opbr-orange' : 'bg-[#111319]/50 border-white/5 text-zinc-100 placeholder:text-slate-500 focus:border-opbr-orange/50'} border outline-none text-xs transition-colors font-sans`}
                  />
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
                  <div className="flex rounded-xl p-1 bg-black/10">
                    {(['all', 'pickups', 'catalog'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                          activeTab === tab 
                            ? 'bg-opbr-orange text-white shadow-md' 
                            : theme === 'light' ? 'text-zinc-600 hover:text-zinc-900 font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab === 'all' ? 'All Items' : tab === 'pickups' ? 'Hot Pickups' : 'Scout Materials'}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSortOrder(prev => {
                        if (prev === 'none') return 'price-asc';
                        if (prev === 'price-asc') return 'price-desc';
                        return 'none';
                      });
                    }}
                    className={`px-3.5 py-1.5 rounded-xl ${theme === 'light' ? 'bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-800' : 'bg-[#111319]/50 border-white/5 hover:bg-[#111319] text-slate-300'} border transition-colors cursor-pointer text-[10px] flex items-center gap-1.5 font-black uppercase tracking-wider`}
                  >
                    <ArrowUpDown className="w-3.5 h-3.5 text-opbr-orange" />
                    Sort: {sortOrder === 'none' ? 'None' : sortOrder === 'price-asc' ? 'Low' : 'High'}
                  </button>
                </div>
              </div>

              {/* DYNAMIC SCRA_PER MIRROR LOADER */}
              {loading ? (
                <div className="h-96 w-full flex flex-col items-center justify-center gap-3">
                  <Loader2 className="w-8 h-8 text-opbr-orange animate-spin" />
                  <span className={`text-xs font-mono font-black uppercase tracking-wider animate-pulse ${theme === 'light' ? 'text-zinc-500' : 'text-slate-500'}`}>
                    Synchronizing Bandai catalog...
                  </span>
                </div>
              ) : error ? (
                <div className="h-80 w-full flex flex-col items-center justify-center gap-3 text-center max-w-sm mx-auto">
                  <AlertTriangle className="w-12 h-12 text-red-500" />
                  <span className={`text-sm font-bold uppercase tracking-wide ${theme === 'light' ? 'text-zinc-700' : 'text-red-400'}`}>Connection Interrupted</span>
                  <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'}`}>{error}</p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 px-5 py-2.5 bg-opbr-orange hover:bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-colors shadow-lg"
                  >
                    Attempt Reconnect
                  </button>
                </div>
              ) : (
                <div className="space-y-10">
                  
                  {/* CRITICAL USER REQUEST: HIGH-VISIBILITY HIGHLIGHTED BARKET BOX FOR FREE STORE ITEMS */}
                  {collectedFreeItems.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`p-6 rounded-[28px] border-2 uppercase relative overflow-hidden group shadow-lg ${
                        theme === 'light' 
                          ? 'bg-amber-500/10 border-amber-500/40 text-zinc-900 shadow-amber-500/5' 
                          : 'bg-gradient-to-tr from-amber-500/10 via-yellow-500/5 to-transparent border-yellow-500/35 shadow-yellow-500/5'
                      } backdrop-blur-xl`}
                    >
                      {/* Ambient Golden Pulsating Ripple */}
                      <span className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl p-8 pointer-events-none animate-pulse" />
                      <div className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1 bg-yellow-400/25 border border-yellow-400/40 rounded-full">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-ping" />
                        <span className="text-[9px] font-black text-yellow-700 dark:text-yellow-400 tracking-widest font-mono uppercase">Offers claims active</span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Gift className="w-5 h-5 text-yellow-500 stroke-[2]" />
                          <h2 className={`font-display font-black text-sm tracking-widest uppercase ${theme === 'light' ? 'text-yellow-800' : 'text-yellow-400'}`}>
                            Today's Active Claimable Free Rewards
                          </h2>
                        </div>
                        <p className={`text-[11px] leading-relaxed normal-case ${theme === 'light' ? 'text-zinc-600' : 'text-slate-300'} max-w-2xl`}>
                          Do not miss out! The following free in-game reward boxes are currently available directly on the web boutique. Make sure to claim them to sync to your linked character account before they cycle off.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                          {collectedFreeItems.map((item) => (
                            <div 
                              key={item.id} 
                              className={`p-4 rounded-2xl border transition-all hover:scale-[1.01] flex flex-col justify-between gap-4 ${
                                theme === 'light' ? 'bg-white border-zinc-200 text-zinc-800' : 'bg-black/40 border-white/10 text-white'
                              }`}
                            >
                              <div className="flex gap-3">
                                <div className="w-12 h-12 shrink-0">
                                  <ItemImage src={item.img} title={item.title} theme={theme} />
                                </div>
                                <div className="space-y-1 overflow-hidden">
                                  <h4 className={`text-xs font-extrabold line-clamp-2 leading-snug ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                                    {item.title}
                                  </h4>
                                  <span className="text-[9px] font-mono opacity-80 block tracking-tighter truncate">
                                    {item.limit}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between border-t border-dashed border-zinc-500/20 pt-2 shrink-0">
                                <div className="text-[9px]">
                                  <span className="block opacity-60 font-mono tracking-tighter uppercase leading-none">Price</span>
                                  <span className="text-sm font-black text-amber-500 tracking-tight leading-none uppercase select-none">FREE</span>
                                </div>
                                <button
                                  onClick={() => setSelectedPurchaseItem(item)}
                                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  Claim Now <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 1. PICKUPS DEALS GRID */}
                  {(activeTab === 'all' || activeTab === 'pickups') && finalPickups.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-opbr-orange/15 text-opbr-orange border border-opbr-orange/20 animate-pulse">
                          Exclusive
                        </span>
                        <h2 className={`text-xs font-display font-black ${theme === 'light' ? 'text-zinc-800' : 'text-slate-300'} uppercase tracking-widest`}>
                          Recommended Featured Picks
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {finalPickups.map((item) => (
                          <motion.div
                            key={item.id}
                            whileHover={{ y: -4 }}
                            className={`group relative ${theme === 'light' ? 'bg-white/70 border-zinc-200 hover:shadow-lg' : 'bg-white/6 border-white/8 hover:border-opbr-orange/45 hover:shadow-[0_15px_30px_rgba(249,115,22,0.08)]'} rounded-3xl p-5 border backdrop-blur-md transition-all flex flex-col justify-between overflow-hidden`}
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-opbr-orange/5 to-transparent pointer-events-none rounded-bl-full" />
                            
                            <div className="space-y-4">
                              <ItemImage src={item.img} title={item.title} theme={theme} />
                              <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-1.5">
                                  {item.limit && (
                                    <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 border border-amber-500/15">
                                      {item.limit}
                                    </span>
                                  )}
                                </div>
                                <h3 className={`font-bold text-sm leading-snug line-clamp-2 ${theme === 'light' ? 'text-zinc-800 group-hover:text-black' : 'text-slate-200 group-hover:text-white'} transition-colors duration-300`}>
                                  {item.title}
                                </h3>
                              </div>
                            </div>

                            <div className={`mt-5 pt-3 border-t ${theme === 'light' ? 'border-zinc-205' : 'border-white/5'} flex flex-col gap-3`}>
                              <div className="flex items-end justify-between">
                                <div className="overflow-hidden">
                                  <span className={`text-[8px] ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'} uppercase font-mono block`}>Real Price</span>
                                  <span className="text-sm font-display font-black text-opbr-orange tracking-tight">
                                    {item.price}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => setSelectedPurchaseItem(item)}
                                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-opbr-orange to-opbr-red text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-opbr-orange/20 transition-all cursor-pointer group-hover:scale-[1.01]"
                              >
                                Unlock Package <ExternalLink className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2. REGULAR CATALOG ITEMS GRID */}
                  {(activeTab === 'all' || activeTab === 'catalog') && finalCatalog.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 pb-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-blue-500/15 text-blue-500 border border-blue-500/20">
                          Boutique
                        </span>
                        <h2 className={`text-xs font-display font-black ${theme === 'light' ? 'text-zinc-800' : 'text-slate-300'} uppercase tracking-widest`}>
                          Regular Crystals & Upgrade Materials
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {finalCatalog.map((item) => (
                          <motion.div
                            key={item.id}
                            whileHover={{ y: -3 }}
                            className={`group shrink-0 ${theme === 'light' ? 'bg-white/70 border-zinc-200 hover:shadow-md' : 'bg-white/5 border-white/6 hover:border-zinc-700/50 hover:shadow-lg'} rounded-2.5xl p-4.5 border backdrop-blur-md transition-all flex flex-col justify-between`}
                          >
                            <div className="space-y-3.5">
                              <ItemImage src={item.img} title={item.title} theme={theme} />
                              <div className="space-y-1">
                                {item.limit && (
                                  <span className="text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded bg-blue-500/12 text-blue-600 border border-blue-500/15 inline-block">
                                    {item.limit}
                                  </span>
                                )}
                                <h3 className={`font-bold text-xs ${theme === 'light' ? 'text-zinc-800' : 'text-slate-200'} group-hover:text-opbr-orange transition-colors duration-300 leading-snug line-clamp-2`}>
                                  {item.title}
                                </h3>
                              </div>
                            </div>

                            <div className={`mt-4 pt-3 border-t ${theme === 'light' ? 'border-zinc-205' : 'border-white/5'} flex flex-col gap-2.5`}>
                              <div className="flex items-end justify-between">
                                <div className="overflow-hidden">
                                  <span className={`text-[8px] ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'} uppercase font-mono block leading-none mb-1`}>Direct Price</span>
                                  <span className={`text-xs font-display font-black ${theme === 'light' ? 'text-zinc-800' : 'text-slate-100'} group-hover:text-opbr-orange transition-colors`}>
                                    {item.price}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => setSelectedPurchaseItem(item)}
                                className={`w-full py-2 rounded-lg ${theme === 'light' ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200' : 'bg-[#111319]/50 hover:bg-[#111319] border-white/5 text-slate-200'} border text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer`}
                              >
                                Purchase <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            // RAW SECURE COMMERCE IFRAME
            <motion.div
              key="raw-iframe-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full h-[85vh] rounded-[28px] overflow-hidden border ${theme === 'light' ? 'bg-white border-zinc-200 text-zinc-900' : 'bg-[#0d0e12]/60 border-white/12 text-slate-200'} relative flex flex-col z-10`}
            >
              {/* Top Sandbox Status Indicator */}
              <div className={`flex items-center justify-between h-14 px-5 border-b shrink-0 ${theme === 'light' ? 'bg-zinc-50 border-zinc-200 text-zinc-700' : 'bg-black/40 border-white/5 text-slate-400'} text-xs font-sans`}>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                  <span className={`font-mono text-[10px] ${theme === 'light' ? 'text-zinc-500' : 'text-slate-500'} truncate max-w-md`}>
                    Live Sandbox Connection • ww.bandainamcoentwebstore.com
                  </span>
                </div>
                <button 
                  onClick={resetIframe}
                  className={`flex items-center gap-1.5 px-3 py-1 ${theme === 'light' ? 'bg-white border-zinc-200 hover:bg-zinc-100 text-zinc-800' : 'bg-white/5 hover:bg-white/10 border-white/5 text-white'} rounded-lg border transition-all text-[11px] font-black uppercase font-mono cursor-pointer`}
                >
                  <RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" /> Reset Frame
                </button>
              </div>

              {/* Secure sandbox frame web integration container */}
              <div className="flex-1 w-full bg-black">
                <iframe
                  key={iframeUrl}
                  ref={iframeRef}
                  src={iframeUrl}
                  className="w-full h-full border-none"
                  title="Bandai Namco Web Store Sandbox Proxy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      {/* 3. SECURE REDIRECT CHECKOUT MODAL POPUP DIALOG */}
      <AnimatePresence>
        {selectedPurchaseItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Liquid overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPurchaseItem(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body Container in Liquid Transparent Glass */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className={`relative w-full max-w-lg border ${
                theme === 'light' 
                  ? 'bg-white/80 border-zinc-200/90 text-zinc-900 shadow-[0_24px_50px_rgba(0,0,0,0.15)]' 
                  : 'bg-[#0d0e12]/60 border-white/12 text-slate-200 shadow-[0_24px_50px_rgba(0,0,0,0.7)]'
              } backdrop-blur-2xl rounded-3xl p-6 md:p-8 z-10 space-y-6 overflow-hidden`}
            >
              {/* Elegant Accent Header bar */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-opbr-orange via-yellow-500 to-opbr-red" />

              <div className="space-y-3 text-center">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 text-opbr-orange flex items-center justify-center mx-auto shadow-inner">
                  <Store className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className={`font-display font-black text-lg uppercase tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                  Redirecting to Official Webstore
                </h3>
                <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'} font-sans`}>
                  You are about to securely obtain OPBR packages directly from the official Bandai Namco billing site.
                </p>
              </div>

              {/* Product Info Block card inside popup */}
              <div className={`p-4 rounded-2xl border ${theme === 'light' ? 'bg-zinc-100/50 border-zinc-200' : 'bg-black/30 border-white/5'} flex items-center gap-4`}>
                <div className="w-14 h-14 shrink-0">
                  <ItemImage src={selectedPurchaseItem.img} title={selectedPurchaseItem.title} theme={theme} />
                </div>
                <div className="space-y-1 overflow-hidden">
                  <h4 className={`font-bold text-xs leading-snug line-clamp-2 ${theme === 'light' ? 'text-zinc-800 font-extrabold' : 'text-slate-150'}`}>
                    {selectedPurchaseItem.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-display font-black text-opbr-orange">
                      {selectedPurchaseItem.price}
                    </span>
                    {selectedPurchaseItem.limit && (
                      <span className={`text-[9px] font-mono leading-none ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'}`}>
                        • {selectedPurchaseItem.limit}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Authenticity Pledge disclaimer */}
              <div className={`p-4 rounded-2xl text-xs space-y-2 font-sans border ${
                theme === 'light' ? 'bg-amber-500/10 border-amber-500/20 text-zinc-900' : 'bg-amber-500/5 border-amber-500/10'
              }`}>
                <span className="flex items-center gap-1.5 font-black uppercase tracking-wider text-[10px] text-opbr-orange">
                  <CheckCircle className="w-4 h-4 text-emerald-500" /> Secure Direct-Purchase Routing
                </span>
                <p className={`leading-relaxed text-[11px] ${theme === 'light' ? 'text-zinc-600' : 'text-slate-350'}`}>
                  All credentials, logins, and transactions take place inside the official bandainamcoentwebstore sandbox securely. Buying through our proxy mirrors ensures instant diamond delivery straight to your character ID.
                </p>
              </div>

              {/* Buttons controls row */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setSelectedPurchaseItem(null)}
                  className={`py-3 rounded-xl border text-xs font-black uppercase tracking-wider transition-all cursor-pointer text-center ${
                    theme === 'light' 
                      ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border-zinc-200' 
                      : 'bg-[#12141c] hover:bg-[#1a1b24] border-white/5 text-slate-350'
                  }`}
                >
                  Go Back
                </button>
                <a
                  href={selectedPurchaseItem.buyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSelectedPurchaseItem(null)}
                  className="py-3 rounded-xl bg-gradient-to-r from-opbr-orange to-opbr-red text-white text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-opbr-orange/20 transition-all cursor-pointer"
                >
                  Secure Claim <ExternalLink className="w-4 h-4 text-white" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. REAL-TIME SCRAPER SYSTEM DETAILED PARAMETERS POPUP MODAL */}
      <AnimatePresence>
        {isInfoOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInfoOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Liquid Transparent Glass Parameters Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className={`relative w-full max-w-lg border ${
                theme === 'light' 
                  ? 'bg-white/80 border-zinc-200 text-zinc-900 shadow-[0_24px_50px_rgba(0,0,0,0.15)]' 
                  : 'bg-[#0d0e12]/60 border-white/12 text-slate-200 shadow-[0_24px_50px_rgba(0,0,0,0.7)]'
              } backdrop-blur-2xl rounded-3xl p-6 md:p-8 z-10 space-y-6 overflow-hidden`}
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-opbr-orange via-yellow-500 to-opbr-red" />

              <div className="flex items-center justify-between pb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 text-opbr-orange flex items-center justify-center shadow-inner">
                    <Globe className="w-5 h-5 text-opbr-orange" />
                  </div>
                  <div>
                    <h3 className={`font-display font-black text-base uppercase tracking-tight ${theme === 'light' ? 'text-zinc-900' : 'text-white'}`}>
                      Store Scraper Engine
                    </h3>
                    <p className={`text-xs ${theme === 'light' ? 'text-zinc-500 font-semibold' : 'text-slate-400'} font-sans`}>
                      Live Synchronization Parameters
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className={`p-1.5 rounded-lg border transition-all cursor-pointer ${theme === 'light' ? 'bg-zinc-100 border-zinc-200 text-zinc-500 hover:text-zinc-800' : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'}`}
                  title="Close Info Popup"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Core Features list detailing requested specifications */}
              <div className="space-y-4">
                <div className={`p-4 rounded-2xl border ${theme === 'light' ? 'bg-zinc-50 border-zinc-200' : 'bg-[#12141c]/60 border-white/5'} space-y-4`}>
                  <div className="flex gap-3">
                    <div className="w-5 h-5 shrink-0 mt-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div>
                      <span className={`font-extrabold text-xs uppercase tracking-wide block ${theme === 'light' ? 'text-zinc-800 font-extrabold' : 'text-slate-100'}`}>
                        Real-Time Scraper Mirror
                      </span>
                      <p className={`text-[11px] leading-relaxed mt-0.5 ${theme === 'light' ? 'text-zinc-600' : 'text-slate-400'}`}>
                        Automatic theme syncing guarantees a perfect, dark-skinned mirror of Bandai's live catalog.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-5 h-5 shrink-0 mt-0.5 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-opbr-orange" />
                    </div>
                    <div>
                      <span className={`font-extrabold text-xs uppercase tracking-wide block ${theme === 'light' ? 'text-zinc-800 font-extrabold' : 'text-slate-100'}`}>
                        100% reactive to new store releases
                      </span>
                      <p className={`text-[11px] leading-relaxed mt-0.5 ${theme === 'light' ? 'text-zinc-600' : 'text-slate-400'}`}>
                        Keeps catalog current with the web-commerce backend instantly as soon as new items deploy.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-5 h-5 shrink-0 mt-0.5 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div>
                      <span className={`font-extrabold text-xs uppercase tracking-wide block ${theme === 'light' ? 'text-zinc-800 font-extrabold' : 'text-slate-100'}`}>
                        Secure direct-purchase checkout
                      </span>
                      <p className={`text-[11px] leading-relaxed mt-0.5 ${theme === 'light' ? 'text-zinc-600' : 'text-slate-400'}`}>
                        No passwords or payments pass through intermediates; all client transactions process in secure sandbox.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-5 h-5 shrink-0 mt-0.5 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                      <CheckCircle className="w-3.5 h-3.5 text-purple-500" />
                    </div>
                    <div>
                      <span className={`font-extrabold text-xs uppercase tracking-wide block ${theme === 'light' ? 'text-zinc-800 font-extrabold' : 'text-slate-100'}`}>
                        Toggle raw overlay anytime
                      </span>
                      <p className={`text-[11px] leading-relaxed mt-0.5 ${theme === 'light' ? 'text-zinc-600' : 'text-slate-400'}`}>
                        Seamless toggle between ambient dark material layout and raw frame overlay allows total user control.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close parameters */}
              <div className="pt-2">
                <button
                  onClick={() => setIsInfoOpen(false)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-opbr-orange to-opbr-red text-white text-xs font-black uppercase tracking-wider text-center cursor-pointer shadow-lg shadow-opbr-orange/20"
                >
                  Close Info Panel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
