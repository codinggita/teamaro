import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { setUser } from '../redux/slices/authSlice';
import { ShieldAlert, Key, Globe, Lock, Terminal, Activity, ArrowRight, Zap, Cpu, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AeroButton, GlassPanel, AeroCard } from '../components/AeroUI';

const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) return <Navigate to="/admin/control" />;

  const handleAdminAuth = (e) => {
    if (e) e.preventDefault();
    if ((adminId === 'admin1' || adminId === 'admin2') && authCode === '1234567890') {
      dispatch(setUser({ 
        name: adminId === 'admin1' ? 'Admin_Alpha' : 'Admin_Beta', 
        role: 'admin', 
        id: adminId 
      }));
      navigate('/admin/control');
    } else {
      setError('AUTH_REJECT: ACCESS_DENIED');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen vanguard-mesh flex items-center justify-center px-6 relative overflow-hidden bg-slate-950">
      {/* Immersive Background Effects */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(14,165,233,0.15)_0%,_transparent_70%)]" />
         <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(14,165,233,0.05)_0%,_transparent_50%)]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <GlassPanel className="p-12 lg:p-16 !bg-slate-900/80 border-white/10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.8)] !rounded-[48px]">
           <header className="text-center space-y-8 mb-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-white/5 rounded-3xl border border-white/10 shadow-xl mb-2 group relative">
                 <Shield size={40} className="text-sky-500 relative z-10 group-hover:scale-110 transition-transform"/>
                 <div className="absolute inset-0 bg-sky-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-white tracking-tight">Administrative <span className="text-sky-500">ACCESS</span></h2>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest opacity-60">Professional Governance Portal</p>
              </div>
           </header>

           <form onSubmit={handleAdminAuth} className="space-y-8">
              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">Admin Terminal ID</label>
                    <div className="relative group">
                       <Terminal className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-500 transition-colors" size={18}/>
                       <input 
                         type="text" 
                         placeholder="Enter ID..."
                         value={adminId}
                         onChange={(e) => setAdminId(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-16 pr-6 text-sm font-bold text-white focus:bg-white/10 focus:border-sky-500/50 transition-all outline-none"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-4">Access Key</label>
                    <div className="relative group">
                       <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-sky-500 transition-colors" size={18}/>
                       <input 
                         type="password" 
                         placeholder="••••••••"
                         value={authCode}
                         onChange={(e) => setAuthCode(e.target.value)}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-16 pr-6 text-sm font-bold text-white focus:bg-white/10 focus:border-sky-500/50 transition-all outline-none"
                       />
                    </div>
                 </div>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-4 text-rose-500"
                  >
                     <ShieldAlert size={18} />
                     <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <AeroButton 
                type="submit"
                className="w-full py-5 !bg-sky-600 !text-white !rounded-2xl !text-[11px] !font-bold !uppercase !tracking-widest shadow-xl shadow-sky-900/20 active:scale-95 transition-all group"
              >
                Authenticate <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-1 transition-transform"/>
              </AeroButton>

              <div className="text-center pt-4">
                 <Link to="/login" className="text-[10px] font-bold text-slate-600 uppercase tracking-widest hover:text-sky-500 transition-colors">
                    Return to Member Login
                 </Link>
              </div>
           </form>
           
           <div className="flex justify-center gap-8 mt-12 pt-8 border-t border-white/5 opacity-20">
              <Cpu size={14} className="text-white"/>
              <Activity size={14} className="text-white"/>
              <Globe size={14} className="text-white"/>
           </div>
        </GlassPanel>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
