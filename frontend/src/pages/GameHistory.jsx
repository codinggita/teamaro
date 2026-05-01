import React from 'react';
import { History, Trophy, Calendar, Users, Map, ChevronRight, Activity, Zap, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { AeroCard, AeroButton, GlassPanel, TechnicalDivider } from '../components/AeroUI';

const GameHistory = () => {
  const games = [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16 pb-32 pt-16"
    >
      {/* Community Timeline Header */}
      <header className="max-w-4xl space-y-6">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-sky-100">
            <History size={14}/> Community Timeline
         </div>
         <h1 className="text-5xl lg:text-8xl font-black text-slate-950 tracking-tight leading-none">
           Event <span className="text-sky-600">ARCHIVES</span>
         </h1>
         <p className="text-slate-500 text-lg lg:text-xl font-medium opacity-80 border-l-2 border-sky-500 pl-6">
           A comprehensive record of community engagements, decision sessions, and collective milestones.
         </p>
      </header>

      <div className="space-y-12">
         {games.map((game, i) => (
            <motion.div key={game.id} variants={itemVariants}>
               <GlassPanel className="p-0 overflow-hidden group border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-700 !bg-white/80">
                  <div className="p-8 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-10 bg-slate-50/50">
                     <div className="space-y-4">
                        <div className="flex items-center gap-6">
                           <span className="text-[10px] font-bold text-sky-600 bg-white px-4 py-1.5 rounded-xl shadow-sm border border-sky-100 uppercase tracking-widest">Event #0{game.id}</span>
                           <div className="flex items-center gap-2 text-slate-400">
                              <Calendar size={16} className="text-sky-500"/>
                              <span className="text-[10px] font-bold uppercase tracking-widest">{game.date}</span>
                           </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-950 tracking-tight leading-none group-hover:text-sky-600 transition-colors">{game.name}</h2>
                        <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
                           <Map size={18} className="text-slate-300"/> Location: {game.map}
                        </div>
                     </div>

                     <div className="bg-sky-600 p-8 lg:p-10 rounded-3xl flex items-center gap-8 shadow-xl shadow-sky-600/20 relative overflow-hidden group/winner">
                        <div className="absolute inset-0 bg-white/10 blur-[60px] pointer-events-none" />
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white shadow-xl relative z-10 group-hover/winner:scale-105 transition-transform border border-white/20">
                           <Trophy size={32} className="text-white"/>
                        </div>
                        <div className="relative z-10">
                           <p className="text-[10px] font-black text-sky-100 uppercase tracking-widest mb-1">Top Group</p>
                           <p className="text-2xl font-black text-white tracking-tight">{game.winner}</p>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 lg:p-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {game.scores.map((score) => (
                        <div 
                          key={score.team} 
                          className={`p-6 rounded-3xl border transition-all duration-500
                            ${score.isWinner 
                              ? 'bg-sky-50 border-sky-100 text-sky-950 shadow-md' 
                              : 'bg-white border-slate-100'}`}
                        >
                           <p className={`text-[10px] font-bold uppercase tracking-widest mb-4
                             ${score.isWinner ? 'text-sky-600' : 'text-slate-300'}`}>Team {score.team}</p>
                           <div className="flex items-end justify-between">
                              <h4 className="text-4xl font-black tabular-nums tracking-tight text-slate-950">{score.score}</h4>
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                 ${score.isWinner ? 'bg-sky-500 text-white' : 'bg-slate-50 text-slate-300 shadow-inner'}`}>
                                 {score.isWinner ? <Activity size={20}/> : <Zap size={20}/>}
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                  
                  <footer className="p-8 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-slate-100">
                     <div className="flex items-center gap-6">
                        <div className="flex -space-x-3">
                           {[1,2,3,4,5].map(j => <div key={j} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 shadow-sm"><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=H${j}`} className="rounded-full" /></div>)}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">32 Verified Participants</span>
                     </div>
                     <AeroButton variant="secondary" className="!px-8 !py-3 !rounded-xl !text-[10px] !bg-white !text-slate-950 !shadow-md group/btn">
                        View Full Summary <ChevronRight size={14} className="inline ml-2 group-hover/btn:translate-x-1 transition-transform"/>
                     </AeroButton>
                  </footer>
               </GlassPanel>
            </motion.div>
         ))}
      </div>
      <TechnicalDivider />
    </motion.div>
  );
};

export default GameHistory;
