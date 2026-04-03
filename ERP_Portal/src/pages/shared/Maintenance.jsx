import React from 'react';
import { Wrench, Clock, ShieldAlert } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 font-sans text-white overflow-hidden relative">
      {/* Background Orbs for Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Animated Icon Container */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-20 animate-pulse" />
          <div className="bg-slate-800/50 border border-slate-700 p-8 rounded-3xl backdrop-blur-xl relative">
            <Wrench className="w-16 h-16 text-blue-400 animate-bounce" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent">
          System Maintenance
        </h1>
        
        <div className="bg-slate-800/30 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-md mb-8">
          <p className="text-xl text-slate-300 leading-relaxed">
            We are currently performing scheduled technical updates to improve your ERP experience. 
            The platform will be back online shortly. We apologize for any inconvenience.
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
          <div className="bg-slate-800/40 border border-white/5 p-4 rounded-xl flex items-start gap-4">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Estimated Duration</h3>
              <p className="text-sm text-slate-400">Typically 15-30 minutes</p>
            </div>
          </div>
          <div className="bg-slate-800/40 border border-white/5 p-4 rounded-xl flex items-start gap-4">
            <div className="bg-amber-500/10 p-2 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-100">Portal Security</h3>
              <p className="text-sm text-slate-400">All data remains securely stored</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => window.location.reload()} 
          className="px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5"
        >
          Check Connectivity
        </button>
      </div>
    </div>
  );
};

export default Maintenance;
