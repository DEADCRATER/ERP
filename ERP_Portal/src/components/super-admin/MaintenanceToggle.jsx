import React, { useState, useEffect } from 'react';
import api from '../../lib/axios';
import { ShieldAlert, Terminal, CheckCircle2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const MaintenanceToggle = () => {
  const [status, setStatus] = useState({ isMaintenanceMode: false, maintenanceMessage: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const { data } = await api.get('/super-admin/maintenance');
      setStatus(data);
    } catch (err) {
      toast.error('Failed to fetch maintenance status');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    setUpdating(true);
    try {
      const { data } = await api.patch('/super-admin/maintenance', {
        isMaintenanceMode: !status.isMaintenanceMode
      });
      setStatus(data);
      toast.success(data.message, {
        icon: data.isMaintenanceMode ? '🚧' : '✅'
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update maintenance mode');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <div className="h-32 flex items-center justify-center bg-slate-800/20 rounded-2xl animate-pulse">
      <div className="text-slate-400 text-sm">Loading System Config...</div>
    </div>
  );

  return (
    <div className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
      status.isMaintenanceMode 
        ? 'bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/5' 
        : 'bg-emerald-500/10 border-emerald-500/30 shadow-lg shadow-emerald-500/5'
    }`}>
      <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className={`p-4 rounded-xl transition-colors duration-500 ${
            status.isMaintenanceMode ? 'bg-amber-500/20' : 'bg-emerald-500/20'
          }`}>
            {status.isMaintenanceMode ? (
              <ShieldAlert className="w-8 h-8 text-amber-500" />
            ) : (
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            )}
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-slate-100">Portal Status</h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                status.isMaintenanceMode ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
              }`}>
                {status.isMaintenanceMode ? 'Maintenance' : 'Active'}
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              {status.isMaintenanceMode 
                ? 'The portal is currently restricted. Only Super Admins can access modules. Students and Principals are redirected to the maintenance page.' 
                : 'The platform is fully operational. All users have access to their respective portal features.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleToggle}
            disabled={updating}
            className={`relative group px-8 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 ${
              status.isMaintenanceMode 
                ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400' 
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }`}
          >
            {updating ? (
              <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : status.isMaintenanceMode ? (
              <>
                <Terminal className="w-4 h-4" />
                Go Live
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4" />
                Set Maintenance
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Visual Status Bar */}
      <div className={`h-1.5 w-full transition-colors duration-500 ${
        status.isMaintenanceMode ? 'bg-amber-500/40' : 'bg-emerald-500/40'
      }`}>
        <div 
          className={`h-full transition-all duration-1000 ease-out ${
            status.isMaintenanceMode ? 'bg-amber-500 w-full' : 'bg-emerald-500 w-full'
          }`} 
        />
      </div>
    </div>
  );
};

export default MaintenanceToggle;
