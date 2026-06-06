import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Sparkles, Trash2, HelpCircle, CheckCircle, Flame, Shield, Zap, Search, Info, HelpCircle as HelpIcon, RefreshCw, Layers
} from 'lucide-react';

interface Medal {
  id: string;
  name: string;
  subName?: string;
  trait: string;
  tier: 'SS' | 'S' | 'A';
  tags: string[];
}

const META_MEDALS: Medal[] = [
  {
    id: '310110100',
    name: 'Kaido Medal',
    subName: 'Lead Performer Captain',
    trait: 'When attacked by an enemy, 100% chance to reduce Skill 1 cooldown by 4%.',
    tier: 'SS',
    tags: ['Land of Wano', 'Animal Kingdom Pirates', 'Zoan', 'Captain', 'The Four Emperors', 'Former Rocks Pirates']
  },
  {
    id: '310200132',
    name: 'Wildfire Medal',
    subName: 'King / Lead Performer',
    trait: 'When your team secured less treasure, boost capture speed by 14%.',
    tier: 'SS',
    tags: ['Land of Wano', 'Animal Kingdom Pirates', 'Zoan', 'Lead Performer']
  },
  {
    id: '310200210',
    name: 'Kaido (Human-Monster Form)',
    subName: 'Hybrid Emperor',
    trait: 'After KOing an enemy, reduce the cooldown time of Skill 1 by 8%.',
    tier: 'SS',
    tags: ['Land of Wano', 'Animal Kingdom Pirates', 'Zoan', 'Captain', 'The Four Emperors', 'Former Rocks Pirates']
  },
  {
    id: '310110262',
    name: 'Gear Five Luffy',
    subName: 'Sun God Nika',
    trait: 'When in opponent treasure area, increase damage dealt by 5%.',
    tier: 'SS',
    tags: ['Straw Hat Pirates', 'Captain', 'Paramecia', 'Zoan', 'Land of Wano', 'Worst Generation', 'The Four Emperors']
  },
  {
    id: '310110170',
    name: 'Raid Onigashima Luffy',
    subName: 'Alliance Leader',
    trait: 'When team has more treasure secured, reduce damage received by 5%.',
    tier: 'S',
    tags: ['Straw Hat Pirates', 'Captain', 'Paramecia', 'Land of Wano', 'Worst Generation']
  },
  {
    id: '310200205',
    name: 'Three Captains Luffy',
    subName: 'Red Roc Rising',
    trait: 'Reduce damage received when allies are not near the treasure area by 5%.',
    tier: 'S',
    tags: ['Straw Hat Pirates', 'Captain', 'Paramecia', 'Worst Generation', 'Land of Wano']
  },
  {
    id: '310110235',
    name: 'Olin Medal',
    subName: 'Big Mom Empress',
    trait: 'When in your owned treasure area, reduce damage received by 5%.',
    tier: 'SS',
    tags: ['Big Mom Pirates', 'Captain', 'Paramecia', 'Former Rocks Pirates', 'The Four Emperors']
  },
  {
    id: '310110086',
    name: 'Katakuri Medal',
    subName: 'Sweet Three General',
    trait: 'Boost critical hit rate by 10% on defeating an opponent.',
    tier: 'S',
    tags: ['Big Mom Pirates', 'Charlotte Family', 'Paramecia', 'Sweet 3 General']
  },
  {
    id: '310110242',
    name: 'Cracker Medal',
    subName: 'Biscuit Warrior',
    trait: 'When inflicted with a status effect, recover HP by 5% and reduce Skill 2 cooldown.',
    tier: 'SS',
    tags: ['Big Mom Pirates', 'Charlotte Family', 'Paramecia', 'Sweet 3 General']
  },
  {
    id: '310110237',
    name: 'Enma Zoro',
    subName: 'King of Hell Zoro',
    trait: 'Increase damage dealt if HP is above 70% by 5%.',
    tier: 'SS',
    tags: ['Straw Hat Pirates', 'Worst Generation', 'Land of Wano', 'Combatant']
  },
  {
    id: '310110221',
    name: 'Shanks (FILM RED)',
    subName: 'Red Emperor Movie',
    trait: 'After KOing an enemy, recover HP by 5%.',
    tier: 'SS',
    tags: ['Red-Haired Pirates', 'Captain', 'The Four Emperors', 'FILM RED', 'Former Rocks Pirates']
  },
  {
    id: '310110156',
    name: 'Roger Medal',
    subName: 'Pirate King Roger',
    trait: 'After KOing an enemy, increase attack by 10% (can stack up to 50%).',
    tier: 'S',
    tags: ['Roger Pirates', 'Captain']
  },
  {
    id: '310110173',
    name: 'Raid Law Medal',
    subName: 'Room Tactician',
    trait: 'When in opponent treasure area, reduce Skill 2 cooldown by 8%.',
    tier: 'S',
    tags: ['Worst Generation', 'Captain', 'Heart Pirates', 'Paramecia', 'Land of Wano']
  },
  {
    id: '310110172',
    name: 'Raid Kid Medal',
    subName: 'Metal Punk Leader',
    trait: 'When team has less treasure secured, reduce Skill 1 cooldown by 8%.',
    tier: 'S',
    tags: ['Worst Generation', 'Captain', 'Kid Pirates', 'Paramecia', 'Land of Wano']
  },
  {
    id: '310110196',
    name: 'Yamato Medal',
    subName: 'Oden Avenger',
    trait: 'Reduce Skill 1 cooldown when HP is below 50% by 10%.',
    tier: 'S',
    tags: ['Land of Wano', 'Former Rocks Pirates', 'Zoan']
  },
  {
    id: '310200222',
    name: 'Yamato (Post-Onigashima)',
    subName: 'Samurai Guardian',
    trait: 'When in opponent flag area, reduce damage taken by 4%.',
    tier: 'S',
    tags: ['Land of Wano', 'Zoan']
  },
  {
    id: '310110109',
    name: 'Fujitora Medal',
    subName: 'Navy Gravity Admiral',
    trait: 'When in your owned treasure area, reduce damage received by 3%.',
    tier: 'SS',
    tags: ['Navy', 'Royalty / Former Royalty', 'Dressrosa']
  },
  {
    id: '310110135',
    name: 'Corazon Medal',
    subName: 'Silent Savior',
    trait: 'When in own treasure area, reduce damage taken by 3%.',
    tier: 'SS',
    tags: ['Dressrosa', 'Captain', 'Don Quixote Family']
  },
  {
    id: '310200076',
    name: 'Hobby-Hobby Medal',
    subName: 'Sugar Toymaker',
    trait: 'When dodge succeeds, recover HP by 3%.',
    tier: 'S',
    tags: ['Dressrosa', 'Don Quixote Family', 'Paramecia']
  },
  {
    id: '310110054',
    name: 'Hancock Medal',
    subName: 'Warlord Kuja Empress',
    trait: 'When team secures treasure, recover HP by 4%.',
    tier: 'SS',
    tags: ['Sabaody Archipelago / Island of Women', 'Captain', 'The Seven Warlords of the Sea', 'Kuja Pirates', 'Paramecia']
  }
];

const PRESETS = [
  {
    name: 'Triple Luffy (All-Rounder Max CD)',
    description: 'Extremely popular set. Maximizes Skill 1 & 2 cooldowns and provides massive flag damage bonuses.',
    medalIds: ['310110262', '310110170', '310200205']
  },
  {
    name: 'Triple Kaido (Attacker CD Meta)',
    description: 'Reduces Skill 1 on attacked, on KOing, and maximizes Land of Wano / Animal Kingdom Pirates tags.',
    medalIds: ['310110100', '310200132', '310200210']
  },
  {
    name: 'Triple Big Mom (Defender Defense)',
    description: 'Perfect for Defenders. Reduces damage taken in flag areas, while boosting Skill 2 and dodge skills.',
    medalIds: ['310110235', '310110086', '310110242']
  },
  {
    name: 'Dressrosa Hard-Defense Set',
    description: 'The standard premium defensive set. Drastically lowers damage taken in treasure flags.',
    medalIds: ['310110109', '310110135', '310200076']
  }
];

export function BuilderPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [equipped, setEquipped] = useState<(Medal | null)[]>([null, null, null]);
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => {
      window.removeEventListener('theme-change', handleThemeChange);
    };
  }, []);

  const handleEquip = (medal: Medal) => {
    const newEquipped = [...equipped];
    // Check if medal is already equipped in another slot to avoid exact duplicates
    const alreadyIndex = newEquipped.findIndex(m => m?.id === medal.id);
    if (alreadyIndex !== -1 && alreadyIndex !== selectedSlot) {
      // Swapping slots or alert
      newEquipped[alreadyIndex] = null;
    }
    newEquipped[selectedSlot] = medal;
    setEquipped(newEquipped);
    
    // Auto-advance to next empty slot
    const nextEmpty = newEquipped.findIndex((m) => m === null);
    if (nextEmpty !== -1) {
      setSelectedSlot(nextEmpty);
    }
  };

  const handleRemove = (slotIndex: number) => {
    const newEquipped = [...equipped];
    newEquipped[slotIndex] = null;
    setEquipped(newEquipped);
    setSelectedSlot(slotIndex);
  };

  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    const newEquipped = preset.medalIds.map(id => {
      return META_MEDALS.find(m => m.id === id) || null;
    });
    setEquipped(newEquipped);
    // Find next empty or default to first
    const nextEmpty = newEquipped.findIndex(m => m === null);
    setSelectedSlot(nextEmpty !== -1 ? nextEmpty : 0);
  };

  const currentGlassStyle = localStorage.getItem('ambient-glow') !== 'false';

  // Calculate dynamic tag synergies
  const getActiveTagStats = () => {
    const validMedals = equipped.filter((m): m is Medal => m !== null);
    if (validMedals.length === 0) return [];

    const tagCounts: { [tag: string]: number } = {};
    validMedals.forEach(medal => {
      medal.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .map(([tag, count]) => {
        let type: 'skill1' | 'skill2' | 'capture' | 'dodge' | 'damage_up' | 'damage_down' = 'skill1';
        let detail = '';
        let percent = 0;

        // Map tag to game rule bonuses
        if (['Land of Wano', 'East Blue', 'The Grand Line', 'Alabasta', 'Sky Island', 'Water 7', 'Dressrosa', 'Whole Cake Island', 'Egghead'].includes(tag)) {
          type = 'skill1';
          percent = count === 2 ? 14 : count === 3 ? 20 : 0;
          detail = `Skill 1 Cooldown Speed +${percent}%`;
        } else if (['Straw Hat Pirates', 'Kid Pirates', 'Heart Pirates', 'Big Mom Pirates', 'Animal Kingdom Pirates', 'Red-Haired Pirates', 'Roger Pirates', 'Navy', 'Cipher Pol'].includes(tag)) {
          type = 'skill2';
          percent = count === 2 ? 14 : count === 3 ? 20 : 0;
          detail = `Skill 2 Cooldown Speed +${percent}%`;
        } else if (['Captain', 'Lead Performer', 'Sweet 3 General', 'Worst Generation', 'Combatant', 'Officer Agent'].includes(tag)) {
          type = 'capture';
          percent = count === 2 ? 14 : count === 3 ? 20 : 0;
          detail = `Capture Speed +${percent}%`;
        } else if (['Zoan', 'Paramecia', 'Logia'].includes(tag)) {
          type = 'dodge';
          percent = count === 2 ? 10 : count === 3 ? 15 : 0;
          detail = `Dodge Cooldown +${percent}%`;
        } else if (['Former Rocks Pirates', 'Blood Brothers', 'Charlotte Family', 'Gorgon Sisters', 'Minks'].includes(tag)) {
          type = 'damage_up';
          percent = count === 2 ? 7 : count === 3 ? 10 : 0;
          detail = `Increase damage dealt by ${percent}%`;
        } else {
          type = 'damage_down';
          percent = count === 2 ? 7 : count === 3 ? 10 : 0;
          detail = `Reduce damage received by ${percent}%`;
        }

        return { tag, count, type, percent, detail };
      })
      .filter(item => item.count >= 2) // only pairs and trios represent active synergies
      .sort((a, b) => b.count - a.count);
  };

  const activeSynergies = getActiveTagStats();

  const filteredCatalog = META_MEDALS.filter(medal => {
    const matchesSearch = medal.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          medal.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          medal.trait.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'ALL' || medal.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <motion.div 
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-zinc-200/50 dark:border-white/5">
        <div>
          <h1 className={`text-xl md:text-2xl font-display font-black tracking-tight uppercase flex items-center gap-2.5 ${theme === 'light' ? 'text-zinc-900' : 'text-slate-100'}`}>
            <Award className="w-6 h-6 text-opbr-orange" />
            Meta Medal Builder
          </h1>
          <p className={`text-xs mt-1 leading-relaxed ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'}`}>
            Equip, test, and maximize synergetic tags. Zero lagging iframes, ultra-clean desktop and mobile UI.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Clear Workspace */}
          <button
            onClick={() => setEquipped([null, null, null])}
            className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
              theme === 'light' 
                ? 'bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50' 
                : 'bg-white/5 border-white/5 text-slate-350 hover:bg-white/8'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" /> Clear All
          </button>
          
          <button
            onClick={() => setIsHelpOpen(true)}
            className={`px-3.5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all flex items-center gap-1.5 cursor-pointer ${
              theme === 'light' 
                ? 'bg-zinc-150 border-zinc-300 text-zinc-800' 
                : 'bg-opbr-orange/10 border-opbr-orange/20 text-opbr-orange hover:bg-opbr-orange/15'
            }`}
          >
            <HelpIcon className="w-3.5 h-3.5" /> Set Rules
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left Side: Selected Slots & Active Tag Results (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Sockets Card */}
          <div className={`p-6 rounded-[24px] border ${
            theme === 'light' 
              ? 'bg-white/70 border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)]' 
              : 'bg-[#14161d]/40 border-white/5 shadow-2xl'
          } backdrop-blur-md relative overflow-hidden`}>
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-5 flex items-center gap-2">
              <Layers className="w-4 h-4 text-opbr-orange" /> Equipped Slots
            </h2>

            {/* Sockets Row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {equipped.map((medal, idx) => {
                const isActive = selectedSlot === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedSlot(idx)}
                    className={`relative w-full aspect-square rounded-2xl flex flex-col items-center justify-center p-2 border transition-all cursor-pointer ${
                      isActive 
                        ? 'border-opbr-orange bg-opbr-orange/5 shadow-[0_0_15px_rgba(249,115,22,0.15)] scale-[1.03]' 
                        : theme === 'light' 
                          ? 'border-zinc-200 bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-300' 
                          : 'border-white/5 bg-white/3 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    {medal ? (
                      <>
                        <motion.img 
                          layoutId={`medal-anim-${medal.id}`}
                          src={`https://ace-kyle.github.io/OPBR-medal-set-builder/img/medals/img_icon_medal_${medal.id}.png`}
                          alt={medal.name}
                          className="w-14 h-14 md:w-16 md:h-14 object-contain shadow-inner"
                          referrerPolicy="no-referrer"
                        />
                        <span className={`text-[8.5px] font-black uppercase absolute bottom-2 tracking-widest ${
                          theme === 'light' ? 'text-zinc-800' : 'text-slate-350'
                        } truncate w-11/12 text-center`}>
                          {medal.name.split(' ')[0]}
                        </span>
                        
                        {/* Remove Hover Cross button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(idx);
                          }}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-650 text-white rounded-full flex items-center justify-center text-[10px] font-black shadow-md border border-white/10"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center ${
                          theme === 'light' ? 'border-zinc-300 bg-zinc-100' : 'border-white/10 bg-white/2'
                        }`}>
                          <span className={`text-[10px] font-mono ${theme === 'light' ? 'text-zinc-400' : 'text-slate-500'}`}>0{idx + 1}</span>
                        </div>
                        <span className={`text-[8px] font-extrabold tracking-widest uppercase ${
                          theme === 'light' ? 'text-zinc-550' : 'text-slate-500'
                        }`}>Empty</span>
                      </div>
                    )}

                    {/* Indicator Circle active dot */}
                    {isActive && (
                      <span className="absolute -bottom-1 w-2 h-2 bg-opbr-orange rounded-full shadow-[0_0_8px_#f97316]"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Display equipped stats inside socket block */}
            <div className={`p-4 rounded-2xl ${
              theme === 'light' ? 'bg-zinc-50/50' : 'bg-white/1'
            } text-xs space-y-2`}>
              <div className="flex justify-between text-[10px] uppercase font-black tracking-wider text-slate-550 border-b border-zinc-200/40 dark:border-white/5 pb-1.5">
                <span>Unique Slot Affiliation</span>
                <span>Tier Rank</span>
              </div>
              {equipped.map((medal, idx) => (
                <div key={idx} className="flex justify-between items-center h-6 font-semibold">
                  <span className={`text-[11px] truncate max-w-[200px] ${medal ? 'text-slate-200 dark:text-slate-100' : 'text-slate-500 font-mono text-[10px]'}`}>
                    {idx + 1}. {medal ? medal.name : '[ Socket Vacant ]'}
                  </span>
                  {medal && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-orange-500 text-white leading-none">
                      {medal.tier} MET
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Synergetic Tags Results Card */}
          <div className={`p-6 rounded-[24px] border ${
            theme === 'light' 
              ? 'bg-white/70 border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)]' 
              : 'bg-[#14161d]/40 border-white/5 shadow-2xl'
          } backdrop-blur-md`}>
            
            <h2 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-opbr-orange animate-pulse" /> Synergetic Tags
            </h2>

            {activeSynergies.length === 0 ? (
              <div className="py-10 text-center flex flex-col items-center justify-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  theme === 'light' ? 'bg-zinc-100 text-zinc-400' : 'bg-white/3 text-slate-500'
                }`}>
                  <Info className="w-4 h-4" />
                </div>
                <p className={`text-[11px] leading-relaxed max-w-[220px] ${theme === 'light' ? 'text-zinc-500' : 'text-slate-400'}`}>
                  Equip 2 or 3 medals sharing matching tags to unlock performance upgrades.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeSynergies.map(({ tag, count, type, percent, detail }, index) => (
                  <motion.div 
                    key={tag}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-3 rounded-2xl relative overflow-hidden border ${
                      theme === 'light' ? 'bg-zinc-50 border-zinc-200/60' : 'bg-white/3 border-white/5'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[12px] font-black text-slate-800 dark:text-zinc-100 flex items-center gap-1.5">
                        {type === 'skill1' && <Flame className="w-3.5 h-3.5 text-orange-500" />}
                        {type === 'skill2' && <Zap className="w-3.5 h-3.5 text-yellow-500" />}
                        {type === 'dodge' && <Sparkles className="w-3.5 h-3.5 text-blue-500" />}
                        {type === 'capture' && <Award className="w-3.5 h-3.5 text-emerald-500" />}
                        {type === 'damage_up' && <Flame className="w-3.5 h-3.5 text-red-500" />}
                        {type === 'damage_down' && <Shield className="w-3.5 h-3.5 text-purple-500" />}
                        {tag}
                      </span>
                      <span className="text-[9px] font-mono font-black tracking-wider uppercase px-2 py-0.5 rounded-full bg-opbr-orange/15 text-opbr-orange">
                        {count === 3 ? 'Trio Active' : 'Pair Active'}
                      </span>
                    </div>

                    <p className={`text-[11px] font-medium leading-relaxed ${
                      theme === 'light' ? 'text-zinc-700' : 'text-slate-350'
                    }`}>
                      {detail}
                    </p>

                    {/* Progress indicator */}
                    <div className="mt-2 w-full h-1.5 rounded-full bg-zinc-200 dark:bg-white/5 relative overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          count === 3 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-orange-500'
                        }`} 
                        style={{ width: count === 3 ? '100%' : '66%' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Presets & Grid Catalog (7 Columns) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Quick Presets Selection */}
          <div className="space-y-3">
            <h3 className={`text-[10px] uppercase font-black tracking-widest ${
              theme === 'light' ? 'text-zinc-700' : 'text-slate-400'
            }`}>
              Premade Meta Archetypes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                    theme === 'light' 
                      ? 'bg-white border-zinc-200 shadow-sm hover:border-opbr-orange hover:shadow-md' 
                      : 'bg-[#14161d]/40 border-white/5 hover:border-opbr-orange/30 hover:bg-[#14161d]/60'
                  }`}
                >
                  <div>
                    <span className="text-[11.5px] font-black uppercase text-slate-800 dark:text-zinc-100 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-opbr-orange" />
                      {preset.name.split(' (')[0]}
                    </span>
                    <p className={`text-[10px] mt-1 space-y-1 font-medium leading-normal ${
                      theme === 'light' ? 'text-zinc-500' : 'text-slate-400'
                    }`}>
                      {preset.description}
                    </p>
                  </div>
                  <div className="flex gap-1.5 mt-3.5 border-t border-zinc-200/40 dark:border-white/5 pt-2">
                    {preset.medalIds.map(id => (
                      <img 
                        key={id} 
                        src={`https://ace-kyle.github.io/OPBR-medal-set-builder/img/medals/img_icon_medal_${id}.png`}
                        alt="" 
                        className="w-6 h-6 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Search & Collection List Panel */}
          <div className={`p-6 rounded-[24px] border ${
            theme === 'light' 
              ? 'bg-white/70 border-zinc-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)]' 
              : 'bg-[#14161d]/40 border-white/5 shadow-2xl'
          } backdrop-blur-md space-y-4`}>
            
            {/* Search Input bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Query medals by Kaido, Luffy, Zoan, Attacker..."
                  className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-opbr-orange transition-all ${
                    theme === 'light' 
                      ? 'bg-zinc-100/50 border-zinc-200 text-zinc-900 placeholder:text-zinc-500' 
                      : 'bg-white/2 border-white/5 text-slate-100 placeholder:text-slate-500'
                  }`}
                />
              </div>

              {/* Tier Filters tabs */}
              <div className={`p-0.5 rounded-xl flex items-center border ${
                theme === 'light' ? 'bg-zinc-100 border-zinc-200' : 'bg-white/5 border-white/5'
              }`}>
                {['ALL', 'SS', 'S'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTier(t)}
                    className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider rounded-lg transition-all ${
                      selectedTier === t
                        ? 'bg-opbr-orange text-white'
                        : theme === 'light' ? 'text-zinc-550 hover:text-zinc-900' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t === 'ALL' ? 'All tiers' : `${t} tier`}
                  </button>
                ))}
              </div>
            </div>

            {/* Medal results grid view */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[46vh] overflow-y-auto pr-1">
              {filteredCatalog.length === 0 ? (
                <div className="col-span-full py-10 text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">No matching medals found</p>
                </div>
              ) : (
                filteredCatalog.map((medal) => {
                  const isEquippedInSlot = equipped.some(m => m?.id === medal.id);
                  return (
                    <button
                      key={medal.id}
                      onClick={() => handleEquip(medal)}
                      className={`p-3.5 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                        isEquippedInSlot
                          ? 'border-opbr-orange bg-opbr-orange/5 ring-1 ring-opbr-orange'
                          : theme === 'light' 
                            ? 'bg-white border-zinc-200 hover:border-zinc-300' 
                            : 'bg-white/2 border-white/5 hover:bg-white/4 hover:border-white/10'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img 
                          src={`https://ace-kyle.github.io/OPBR-medal-set-builder/img/medals/img_icon_medal_${medal.id}.png`}
                          alt={medal.name}
                          className="w-11 h-11 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className={`absolute -top-1 -left-1 px-1 py-0.5 rounded text-[7px] font-black ${
                          medal.tier === 'SS' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                        }`}>
                          {medal.tier}
                        </span>
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <h4 className={`text-[12px] font-black uppercase truncate ${
                          theme === 'light' ? 'text-zinc-800' : 'text-slate-100'
                        }`}>
                          {medal.name}
                        </h4>
                        <p className={`text-[10px] leading-relaxed truncate ${theme === 'light' ? 'text-zinc-550' : 'text-slate-400'}`}>
                          {medal.trait}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {medal.tags.slice(0, 3).map(tag => (
                            <span 
                              key={tag} 
                              className={`text-[8.5px] px-1.5 py-0.5 rounded font-extrabold uppercase ${
                                theme === 'light' ? 'bg-zinc-100 text-zinc-650' : 'bg-white/5 text-slate-400'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Manual Instructions Modal popup */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHelpOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-w-xl border ${
                theme === 'light' 
                  ? 'bg-white text-zinc-900 border-zinc-200' 
                  : 'bg-[#0d0e12] text-slate-200 border-white/12'
              } rounded-3xl p-6 md:p-8 z-10 space-y-6 max-h-[85vh] overflow-y-auto`}
            >
              <div className="flex justify-between items-center pb-2 border-b border-zinc-200/40 dark:border-white/5">
                <h3 className="font-display font-black uppercase text-base tracking-tight text-opbr-orange">
                  OPBR Synergy Tag Rulebook
                </h3>
                <button
                  onClick={() => setIsHelpOpen(false)}
                  className="p-1 rounded bg-black/20 text-slate-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 text-xs font-semibold leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase mb-1">1. Skill 1 Cooldown Tags</h4>
                  <p className="text-slate-400">
                    East Blue, The Grand Line, Sky Island, Water 7, Dressrosa, Whole Cake Island, Egghead, and Land of Wano tags.
                    <br />• 2-Pair matching: Cooldown speed +14%
                    <br />• 3-Trio matching: Cooldown speed +20%
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase mb-1">2. Skill 2 Cooldown Tags</h4>
                  <p className="text-slate-400">
                    Straw Hat Pirates, Kid Pirates, Heart Pirates, Big Mom Pirates, Animal Kingdom Pirates, Red-Haired Pirates, Roger Pirates, Navy, and Cipher Pol.
                    <br />• 2-Pair matching: Cooldown speed +14%
                    <br />• 3-Trio matching: Cooldown speed +20%
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase mb-1">3. Capture Speed Tags</h4>
                  <p className="text-slate-400">
                    Captain, Lead Performer, Sweet Three General, Worst Generation, Combatant, and Officer Agent tags.
                    <br />• 2-Pair matching: Capture speed +14%
                    <br />• 3-Trio matching: Capture speed +20%
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white uppercase mb-1">4. Dodge Reduction Tags</h4>
                  <p className="text-slate-400">
                    Zoan, Paramecia, and Logia classification tags.
                    <br />• 2-Pair matching: Dodge cooldown speed +10%
                    <br />• 3-Trio matching: Dodge cooldown speed +15%
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsHelpOpen(false)}
                className="w-full py-3 rounded-2xl bg-opbr-orange text-white text-xs font-black uppercase text-center cursor-pointer shadow-md hover:bg-orange-600"
              >
                Return to Workspace
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
