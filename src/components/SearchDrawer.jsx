import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search as SearchIcon } from "lucide-react";
import { useModal } from "../context/ModalContext";

const products = ["T-shirt", "Jeans", "Shoes", "Jacket", "Bag"];

const SearchDrawer = () => {
  const { isSearchOpen, closeSearch } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input when drawer opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    } else {
      setSearchTerm("");
      setResults([]);
    }
  }, [isSearchOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeSearch]);

  // Search logic with dummy debounce simulation (simple useEffect)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setResults([]);
      } else {
        const filtered = products.filter((p) =>
          p.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/40 z-[9998]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full sm:w-[400px] bg-white z-[9999] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-widest">Search Products</h2>
              <button
                onClick={closeSearch}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Input Area */}
            <div className="p-6">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-b-2 border-gray-200 py-3 pl-2 pr-10 focus:border-black outline-none transition-all text-lg font-medium"
                />
                <SearchIcon className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Suggestions/Results */}
            <div className="flex-1 overflow-y-auto px-6 pb-6">
              {searchTerm === "" ? (
                <div className="text-center mt-10">
                   <p className="text-gray-500 italic">Start typing to search...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Matching Results</p>
                  {results.map((product, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      key={product}
                      className="group flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all border border-transparent hover:border-gray-100"
                    >
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-colors">
                            <SearchIcon size={18} />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">{product}</p>
                            <p className="text-xs text-gray-400">In Fashion Category</p>
                        </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center mt-10">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <X className="text-gray-300" size={32} />
                    </div>
                  <p className="text-gray-500 font-medium">No results found for "{searchTerm}"</p>
                  <p className="text-sm text-gray-400 mt-1">Try checking for typos or use more general terms</p>
                </div>
              )}
            </div>

            {/* Bottom Info */}
            <div className="p-6 bg-gray-50 border-t">
                <p className="text-xs text-gray-400 text-center uppercase tracking-tighter">Press ESC to close search drawer</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchDrawer;
