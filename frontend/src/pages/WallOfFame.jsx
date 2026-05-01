import React from 'react';
import { 
  Award, Zap, Crosshair, Shield, TrendingUp, 
  Sparkles, Star, ChevronRight, Activity, Terminal,
  Cpu, HardDrive, Share2, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { AeroCard, AeroButton, GlassPanel, TechnicalDivider } from '../components/AeroUI';

const WallOfFame = () => {
  const achievements = [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0, scale: 0.95 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-24 pb-32 pt-20 px-4 lg:px-0"
    >
      {/* Immersive Header */}
      <header className="relative text-center space-y-8 max-w-5xl mx-auto px-6 overflow-hidden py-12">
        <div className="absolute inset-0 bg-sky-500/5 blur-[100px] rounded-full -z-10" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 bg-slate-950 text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl border border-white/10"
        >
          <Sparkles size={16} className="text-sky-400 animate-pulse" /> Hall of Fame
        </motion.div>
        
        <h1 className="text-6xl lg:text-9xl font-black text-slate-950 tracking-tighter leading-none">
          WALL OF <span className="text-sky-600">FAME</span>
        </h1>
        
        <p className="text-slate-500 text-lg lg:text-2xl font-medium max-w-3xl mx-auto leading-relaxed opacity-90 border-t border-slate-100 pt-8">
           Celebrating the most prestigious contributions and leadership milestones within our community.
        </p>
      </header>

      {/* Honor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 relative z-10">
        {achievements.map((item, index) => (
          <motion.div key={item.id} variants={itemVariants}>
            <GlassPanel className="group p-0 overflow-hidden border-white shadow-2xl hover:shadow-[0_50px_100px_-20px_rgba(14,165,233,0.15)] transition-all duration-700 !bg-white/90 rounded-[48px] border-2">
               <div className="flex flex-col xl:flex-row h-full">
                  {/* Portrait Section */}
                  <div className="xl:w-2/5 aspect-[4/5] xl:aspect-auto bg-slate-50 relative overflow-hidden group/img">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.seed}`} 
                      className="w-full h-full object-cover group-hover/img:scale-110 group-hover/img:rotate-2 transition-transform duration-[1.5s] ease-out" 
                      alt={item.player} 
                    />
                    
                    {/* Rank Badge */}
                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white flex items-center gap-2">
                       <item.icon size={16} className="text-sky-600" />
                       <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{item.stat}</span>
                    </div>

                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  {/* Info Section */}
                  <div className="xl:w-3/5 p-10 lg:p-12 flex flex-col justify-between space-y-8 bg-white/40">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Layers size={14} className="text-sky-500"/>
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-sky-600">{item.game}</span>
                         </div>
                         <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-lg">
                            <item.icon size={18} />
                         </div>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] mb-1">Achievement #{item.id}</p>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-950 tracking-tighter leading-none">{item.player}</h2>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-[2px] bg-sky-500" />
                          <p className="text-lg font-black text-sky-600 tracking-tight uppercase">{item.title}</p>
                        </div>
                      </div>

                      <p className="text-lg text-slate-500 font-medium leading-relaxed italic opacity-80 pl-6 border-l-2 border-slate-200">
                        "{item.desc}"
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 pt-8 border-t border-slate-100">
                       <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                          <Cpu size={14} className="text-slate-400" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Verified Member</span>
                       </div>
                       <button className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-3.5 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-sky-600 transition-colors shadow-xl group/btn">
                          View Details <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>
                       </button>
                    </div>
                  </div>
               </div>
            </GlassPanel>
          </motion.div>
        ))}
      </div>

      {/* Call to Action: Recognition Program */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="bg-slate-950 rounded-[64px] p-16 lg:p-32 text-center text-white relative overflow-hidden max-w-6xl mx-auto shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)] group"
      >
         {/* Animated Grid Background */}
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         </div>
         
         <div className="absolute inset-0 bg-gradient-to-br from-sky-600/20 via-transparent to-transparent pointer-events-none" />
         
         <div className="relative z-10 space-y-12">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 2, ease: "linear", repeat: Infinity }}
              className="w-24 h-24 bg-sky-600 rounded-[32px] flex items-center justify-center mx-auto shadow-2xl"
            >
               <Activity size={48} className="text-white"/>
            </motion.div>
            
            <div className="space-y-6">
               <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight lg:max-w-4xl mx-auto">
                 WANT YOUR NAME ON THE <span className="text-sky-400">WALL?</span>
               </h2>
               <p className="text-slate-400 max-w-2xl mx-auto text-xl lg:text-2xl font-medium opacity-90 leading-relaxed italic border-x border-sky-500/30 px-8">
                 "Excellence is not an act, but a habit. Contribution is the currency of our community."
               </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <AeroButton className="w-full sm:w-auto !px-16 !py-6 !text-[12px] !font-black !uppercase !tracking-[0.3em] !bg-sky-600 !shadow-[0_20px_40px_rgba(14,165,233,0.3)] !rounded-2xl group">
                  Submit Achievement <Terminal size={20} className="ml-4 group-hover:translate-x-1 transition-transform"/>
               </AeroButton>
               <AeroButton variant="secondary" className="w-full sm:w-auto !px-12 !py-6 !text-[12px] !font-black !uppercase !tracking-[0.3em] !bg-white/10 !text-white !border-white/20 !backdrop-blur-xl">
                  Community Rules <Share2 size={18} className="ml-3 opacity-60"/>
               </AeroButton>
            </div>
         </div>
      </motion.div>

      <TechnicalDivider />
    </motion.div>
  );
};

export default WallOfFame;
