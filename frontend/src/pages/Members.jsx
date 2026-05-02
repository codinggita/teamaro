import React, { useState, useMemo } from 'react';
import { 
  Users, Search, ShieldCheck, Star, Award, 
  Filter, ArrowRight, Activity, 
  Target, Cpu, Terminal, Shield, ExternalLink,
  ChevronRight, Zap, Globe, Lock, User, MoreVertical,
  Fingerprint, Command
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AeroCard, AeroButton, GlassPanel, TechnicalDivider } from '../components/AeroUI';
import SEO from '../components/SEO';
import useDebounce from '../hooks/useDebounce';
import { getAllMembers } from '../utils/userMapping';

const Members = () => {
  const navigate = useNavigate();
  const allMembers = useMemo(() => getAllMembers(), []);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 350);

  const filteredMembers = useMemo(() => {
    const term = debouncedSearch.trim().toLowerCase();
    return term
      ? allMembers.filter((m) =>
          m.name?.toLowerCase().includes(term) ||
          m.accountId?.toLowerCase().includes(term) ||
          m.role?.toLowerCase().includes(term)
        )
      : allMembers;
  }, [debouncedSearch, allMembers]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.03 } 
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="min-h-screen pb-40"
    >
      <SEO
        title="Squadron Roster"
        description="Vanguard AERO Elite Operator Directory. High-fidelity identity grid."
        url="/members"
      />

      {/* ── Fixed Header Section ────────────────────────────────────────── */}
      <section className="pt-20 pb-16 border-b border-white/5 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-end justify-between gap-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-sky-400"
            >
              <Fingerprint size={16} /> Identity Verification Required
            </motion.div>
            <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-[0.8] italic uppercase">
              Vanguard<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Collective</span>
            </h1>
          </div>

          <div className="w-full md:w-[400px] space-y-4">
             <p className="text-white/30 text-sm font-medium italic leading-relaxed">
                Displaying 30 active operators authorized for system-wide deployment. All identities are verified via GR-Serial encryption.
             </p>
             <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-sky-500 transition-colors" size={18} />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="LOCATE OPERATOR..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-8 text-[11px] font-black text-white focus:border-sky-500/50 transition-all outline-none placeholder:text-white/10 tracking-[0.2em]"
                />
             </div>
          </div>
        </div>
      </section>

      {/* ── The Aurora Identity Grid ────────────────────────────────────── */}
      <motion.div 
        variants={containerVariants}
        className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 px-6 mt-1"
      >
        <AnimatePresence>
          {filteredMembers.map((member, index) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: index * 0.02 }}
              className="group relative"
            >
              {/* The Glass Panel */}
              <div className="vanguard-glass-dark relative h-[420px] border-white/5 group-hover:border-white/20 transition-all duration-700 overflow-hidden flex flex-col p-10">
                
                {/* Background Aurora Effect */}
                <div className={`absolute -top-20 -right-20 w-64 h-64 blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000 pointer-events-none
                  ${member.role === 'admin' ? 'bg-amber-500' : 'bg-sky-500'}`} 
                />

                {/* Identity Readout */}
                <div className="flex justify-between items-start relative z-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Auth-Level</p>
                    <p className={`text-xs font-black uppercase tracking-widest ${member.role === 'admin' ? 'text-amber-400' : 'text-sky-400'}`}>
                       {member.role === 'admin' ? 'SEC-LEVEL-01' : 'SEC-LEVEL-04'}
                    </p>
                  </div>
                  <MoreVertical className="text-white/10 group-hover:text-white/40 transition-colors" size={20} />
                </div>

                {/* Main Identity Content */}
                <div className="mt-auto relative z-10 space-y-6">
                  {/* Floating Avatar Strip */}
                  <div className="flex items-end gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group-hover:scale-110 group-hover:-rotate-3 transition-all duration-700">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-950 bg-emerald-500" />
                    </div>
                    <div className="space-y-0.5 mb-2">
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] font-mono">{member.accountId}</p>
                       <h3 className="text-4xl font-black text-white tracking-tighter leading-none italic uppercase truncate max-w-[180px]">
                         {member.name}
                       </h3>
                    </div>
                  </div>

                  {/* Bio readout */}
                  <p className="text-xs text-white/40 font-medium italic leading-relaxed line-clamp-2 pr-10 group-hover:text-white/70 transition-colors duration-500">
                    "{member.bio}"
                  </p>

                  {/* Tech Action */}
                  <div className="pt-6">
                    <button 
                      onClick={() => navigate(`/profile/${member.id}`)}
                      className="group/btn flex items-center gap-3 text-[10px] font-black text-sky-400 uppercase tracking-[0.4em] hover:text-white transition-all"
                    >
                      Initialize Link <ChevronRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Aesthetic Decoration - Line scan */}
                <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-10">
                   {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="py-40 text-center space-y-6">
           <Command className="mx-auto text-white/10 animate-spin" size={48} />
           <p className="text-sm font-black text-white/20 uppercase tracking-[0.5em]">Searching Central Database...</p>
        </div>
      )}

      <TechnicalDivider />
    </motion.div>
  );
};

export default Members;
