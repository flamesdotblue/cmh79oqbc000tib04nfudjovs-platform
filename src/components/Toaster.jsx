import { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const ToasterContext = createContext({ toast: () => {} });

export default function ToasterProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const toast = useCallback(({ title, description, variant = 'default', duration = 3000 }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, duration);
  }, []);

  return (
    <ToasterContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-0 z-[100] flex flex-col items-end gap-2 p-4 sm:p-6">
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className={`pointer-events-auto max-w-sm w-full rounded-lg border shadow-sm bg-white/90 backdrop-blur p-4 ${
                t.variant === 'success' ? 'border-green-200' : t.variant === 'error' ? 'border-red-200' : 'border-slate-200'
              }`}
            >
              <div className="text-sm font-medium text-slate-900">{t.title}</div>
              {t.description && <div className="mt-1 text-sm text-slate-600">{t.description}</div>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToasterContext.Provider>
  );
}

export function useToaster() {
  return useContext(ToasterContext);
}
