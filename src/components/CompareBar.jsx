import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, ChevronRight } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const CompareBar = () => {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();

  return (
    <AnimatePresence>
      {compareItems.length > 0 && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[998] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-gray-100"
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-10 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Header / Stats */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                <RefreshCw size={20} className="animate-spin-slow" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 leading-tight">Compare Products</h4>
                <p className="text-xs text-gray-500">{compareItems.length} of 4 items selected</p>
              </div>
            </div>

            {/* Selected Items */}
            <div className="flex-1 flex justify-center gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {compareItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="relative group flex-shrink-0"
                  >
                    <div className="w-16 h-20 md:w-20 md:h-24 rounded-lg overflow-hidden bg-gray-50 border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <button
                      onClick={() => removeFromCompare(item.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-lg transition-all"
                    >
                      <X size={14} />
                    </button>
                    <p className="hidden md:block absolute -bottom-6 left-0 right-0 text-[10px] text-center font-medium truncate w-full text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.name}
                    </p>
                  </motion.div>
                ))}
                
                {/* Empty Slots */}
                {[...Array(4 - compareItems.length)].map((_, i) => (
                  <div key={`empty-${i}`} className="w-16 h-20 md:w-20 md:h-24 rounded-lg border-2 border-dashed border-gray-100 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
                      <Plus size={16} />
                    </div>
                  </div>
                ))}
              </AnimatePresence>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={clearCompare}
                className="text-xs font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
              >
                Clear All
              </button>
              <button className="bg-black text-white px-8 py-3 rounded-md font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all transform active:scale-95 flex items-center gap-2 group shadow-xl">
                Compare Now
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          <style>{`
            .animate-spin-slow {
              animation: spin 8s linear infinite;
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareBar;
