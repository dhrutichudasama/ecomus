import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Check } from "lucide-react";
import { useModal } from "../context/ModalContext";

const FilterSection = ({ title, isOpen, onToggle, children }) => (
  <div className="border-b border-gray-100 py-6">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between group"
    >
      <span className="text-sm font-bold uppercase tracking-[0.2em] group-hover:text-gray-500 transition-colors">
        {title}
      </span>
      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-6">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FilterSidebar = ({
  filters,
  setFilters,
  clearFilters,
  totalItems
}) => {
  const { isFilterOpen, closeFilter } = useModal();
  const [openSections, setOpenSections] = useState({
    categories: true,
    availability: true,
    price: true,
    colors: true,
    sizes: true
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const current = prev[type];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [type]: next };
    });
  };

  const categories = ["Fashion", "Men", "Women", "Denim", "Dress"];
  const colors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
    { name: "Orange", hex: "#ff8a00" },
    { name: "Beige", hex: "#e5d5c5" },
    { name: "Blue", hex: "#a3bbd3" }
  ];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <AnimatePresence>
      {isFilterOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFilter}
            className="fixed inset-0 bg-black/40 z-[9998]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-screen w-full sm:w-[350px] bg-white z-[9999] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold uppercase tracking-widest">Filter By</h2>
              <button
                onClick={closeFilter}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto px-8 custom-scrollbar">
              {/* Categories */}
              <FilterSection
                title="Product Categories"
                isOpen={openSections.categories}
                onToggle={() => toggleSection("categories")}
              >
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCheckboxChange("categories", cat)}
                      className={`block text-sm transition-all duration-300 ${
                        filters.categories.includes(cat)
                          ? "text-black font-bold translate-x-2"
                          : "text-gray-500 hover:text-black hover:translate-x-1"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Availability */}
              <FilterSection
                title="Availability"
                isOpen={openSections.availability}
                onToggle={() => toggleSection("availability")}
              >
                <div className="space-y-4">
                  {[
                    { label: "In Stock", value: "true" },
                    { label: "Out of Stock", value: "false" }
                  ].map((item) => (
                    <label key={item.label} htmlFor={`availability-${item.value}`} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`relative w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${filters.availability.includes(item.value) ? "border-black bg-black" : "border-gray-200 group-hover:border-black"}`}>
                        <input
                          id={`availability-${item.value}`}
                          type="checkbox"
                          className="sr-only"
                          checked={filters.availability.includes(item.value)}
                          onChange={() => handleCheckboxChange("availability", item.value)}
                        />
                        {filters.availability.includes(item.value) && (
                          <Check size={14} className="text-white" strokeWidth={4} />
                        )}
                      </div>
                      <span className={`text-sm transition-colors ${filters.availability.includes(item.value) ? "text-black font-medium" : "text-gray-500"}`}>
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              {/* Price Range */}
              <FilterSection
                title="Price"
                isOpen={openSections.price}
                onToggle={() => toggleSection("price")}
              >
                <div className="space-y-6 px-1">
                   <div className="flex justify-between text-sm font-medium mb-4">
                      <span>Price: ${filters.priceRange[0]} — ${filters.priceRange[1]}</span>
                   </div>
                   <input 
                      type="range"
                      min="0"
                      max="500"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters(prev => ({...prev, priceRange: [0, parseInt(e.target.value)]}))}
                      className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                   />
                   <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <span>$0</span>
                      <span>$500</span>
                   </div>
                </div>
              </FilterSection>

              {/* Color Filter */}
              <FilterSection
                title="Color"
                isOpen={openSections.colors}
                onToggle={() => toggleSection("colors")}
              >
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleCheckboxChange("colors", color.name)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all transform active:scale-90 ${
                        filters.colors.includes(color.name)
                          ? "border-black scale-110"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color.hex, border: color.name === "White" ? "1px solid #eee" : "" }}
                    >
                      {filters.colors.includes(color.name) && (
                         <Check size={14} className={color.name === "White" ? "text-black mx-auto" : "text-white mx-auto"} strokeWidth={4} />
                      )}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Size Filter */}
              <FilterSection
                title="Size"
                isOpen={openSections.sizes}
                onToggle={() => toggleSection("sizes")}
              >
                <div className="grid grid-cols-2 gap-3">
                  {sizes.map((size) => (
                    <label key={size} htmlFor={`size-${size}`} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`relative w-5 h-5 border-2 rounded transition-all flex items-center justify-center ${filters.sizes.includes(size) ? "border-black bg-black" : "border-gray-200 group-hover:border-black"}`}>
                        <input
                          id={`size-${size}`}
                          type="checkbox"
                          className="sr-only"
                          checked={filters.sizes.includes(size)}
                          onChange={() => handleCheckboxChange("sizes", size)}
                        />
                        {filters.sizes.includes(size) && (
                          <Check size={14} className="text-white" strokeWidth={4} />
                        )}
                      </div>
                      <span className={`text-sm transition-colors ${filters.sizes.includes(size) ? "text-black font-medium" : "text-gray-500"}`}>
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>
            </div>

            {/* Footer */}
            <div className="p-8 border-t bg-gray-50">
              <div className="flex items-center justify-between mb-6">
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{totalItems} Items Found</span>
                 <button 
                  onClick={clearFilters}
                  className="text-xs font-bold uppercase tracking-widest border-b border-black hover:text-gray-500 hover:border-gray-500 transition-all"
                 >
                    Clear All
                 </button>
              </div>
              <button 
                onClick={closeFilter}
                className="w-full bg-black text-white font-bold py-4 uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-black/10"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;
