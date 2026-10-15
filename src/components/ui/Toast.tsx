import React from 'react';
import { useBlog } from '../../context/BlogContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { notifications, removeNotification } = useBlog();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {notifications.map((item) => {
        const isSuccess = item.type === 'success';
        const isError = item.type === 'error';
        const isWarning = item.type === 'warning';

        return (
          <div
            key={item.id}
            className="pointer-events-auto bg-[#0e1424]/95 border border-purple-500/30 backdrop-blur-xl p-4 rounded-2xl shadow-2xl shadow-purple-950/50 flex items-start space-x-3 transition-all duration-300 transform translate-y-0"
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {isError && <XCircle className="w-5 h-5 text-rose-400" />}
              {isWarning && <AlertCircle className="w-5 h-5 text-amber-400" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-cyan-400" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-100">{item.message}</p>
              <span className="text-[10px] text-slate-500">{item.timestamp}</span>
            </div>
            <button
              onClick={() => removeNotification(item.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
