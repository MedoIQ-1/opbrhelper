import { motion } from 'framer-motion';
import { Youtube, MessageSquare } from 'lucide-react';

export function CommunityPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 flex flex-col justify-center min-h-[70vh]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div variants={itemVariants} className="space-y-2 text-center">
        <h1 className="text-3xl md:text-5xl font-display font-black text-slate-100 uppercase tracking-tight">
          MedoIQ Community
        </h1>
        <p className="text-slate-400 font-medium">Join our official platforms and keep track of premium releases and leaks.</p>
      </motion.div>

      {/* MedoIQ Centered Card */}
      <motion.div 
        variants={itemVariants} 
        className="relative overflow-hidden rounded-[32px] p-8 md:p-12 bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 border border-white/10 shadow-2xl relative group"
      >
        <div className="absolute top-[-100px] right-[-100px] w-64 h-64 bg-neon-purple/10 rounded-full blur-3xl pointer-events-none group-hover:bg-neon-purple/15 transition-all duration-700"></div>
        <div className="absolute bottom-[-100px] left-[-100px] w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl pointer-events-none group-hover:bg-neon-blue/15 transition-all duration-700"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center space-y-8">
          <div className="w-28 h-28 rounded-3xl bg-slate-900 border border-white/15 flex items-center justify-center p-1.5 shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <div className="w-full h-full bg-gradient-to-tr from-opbr-orange to-opbr-red rounded-2xl flex items-center justify-center">
               <span className="font-display font-black text-4xl text-white">MQ</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-display font-black text-white">MedoIQ Official Creator Hub</h2>
            <p className="text-slate-300 max-w-lg mx-auto leading-relaxed text-sm md:text-base">
              Welcome back! I am the creator of this application. Subscribe to my YouTube channel and join the Discord server for exclusive tier lists, custom guides, medal counters, and premium community events!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md pt-4">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FF0000] hover:bg-[#FF0000]/90 text-white font-black uppercase text-xs tracking-wider transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-red-500/20 w-full sm:w-auto"
            >
              <Youtube className="w-5 h-5" />
              YouTube Channel
            </a>
            <button 
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(new Event('open-discord-modal'));
              }}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#5865F2] hover:bg-[#5865F2]/95 text-white font-black uppercase text-xs tracking-wider transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-indigo-500/20 w-full sm:w-auto cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              Discord Server
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
