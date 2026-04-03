import React from 'react';

const ReviewHistory = ({ history }) => {
  if (!history || history.length === 0) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-50 border-green-200';
      case 'REJECTED': return 'text-red-600 bg-red-50 border-red-200';
      case 'NEEDS_UPDATE': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'MANUAL_EDIT': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <h4 className="font-black text-gray-900 border-b-2 border-gray-100 pb-2 mb-6 uppercase tracking-widest text-[11px] flex items-center gap-3">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        Application Review History
      </h4>
      
      <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
        {history.map((item, idx) => (
          <div key={idx} className="relative pl-12 group">
            {/* Timeline Dot */}
            <div className={`absolute left-0 top-1 w-9 h-9 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${getStatusColor(item.action)}`}>
               {item.action === 'APPROVED' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
               {item.action === 'REJECTED' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>}
               {item.action === 'NEEDS_UPDATE' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>}
               {item.action === 'MANUAL_EDIT' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>}
            </div>

            <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${getStatusColor(item.action)}`}>
                  {item.action.replace('_', ' ')}
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {new Date(item.createdAt).toLocaleString('en-IN', { 
                    day: '2-digit', month: 'short', year: 'numeric', 
                    hour: '2-digit', minute: '2-digit' 
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-600">
                  {item.performedBy?.name?.[0] || 'A'}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-gray-700">{item.performedBy?.name || 'Administrator'}</span>
                  <span className="text-[8px] text-gray-400 uppercase tracking-tighter">{item.performedBy?.role || 'SYSTEM'}</span>
                </div>
              </div>

              {item.message && (
                <div className="bg-gray-50/50 rounded-lg p-3 text-[10px] text-gray-600 italic border-l-2 border-gray-200">
                  "{item.message}"
                </div>
              )}

              {item.action === 'MANUAL_EDIT' && item.changes && (
                <div className="mt-3 overflow-x-auto">
                   <table className="w-full text-[9px]">
                     <thead className="bg-gray-50 text-gray-500 uppercase">
                       <tr>
                         <th className="px-2 py-1 text-left">Field</th>
                         <th className="px-2 py-1 text-left">Previous</th>
                         <th className="px-2 py-1 text-left">New Value</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {Object.entries(item.changes).map(([key, val], i) => (
                           <tr key={i}>
                             <td className="px-2 py-1 font-bold text-gray-500">{key}</td>
                             <td className="px-2 py-1 text-red-400 line-through truncate max-w-[100px]">{String(val.old || 'N/A')}</td>
                             <td className="px-2 py-1 text-green-600 font-bold truncate max-w-[100px]">{String(val.new || 'N/A')}</td>
                           </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewHistory;
