import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ShoppingBag } from "lucide-react";

// Import images
import banner1 from "../assets/banner-1.jpg";
import banner2 from "../assets/banner-2.jpg";
import p1 from "../assets/product1.jpg";
import p2 from "../assets/product2.jpg";
import p3 from "../assets/product3.jpg";

const hotspots = [
  {
    id: 1,
    imageIndex: 0,
    top: "65%",
    left: "45%",
    product: {
      name: "Ribbed Tank Top",
      price: "$18.00",
      image: p1
    }
  },
  {
    id: 2,
    imageIndex: 0,
    top: "85%",
    left: "60%",
    product: {
      name: "Straight-Leg Jeans",
      price: "$60.00",
      image: p2
    }
  },
  {
    id: 3,
    imageIndex: 1,
    top: "20%",
    left: "60%",
    product: {
      name: "Oversized T-Shirt",
      price: "$25.00",
      image: p3
    }
  }
];

const ShopTheLook = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const containerRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setActiveHotspot(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="py-10 overflow-hidden" ref={containerRef}>
      {/* Heading */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-4xl font-bold mb-4">Shop the look</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Inspire and let yourself be inspired, from one unique fashion to another.
        </p>
      </div>

      {/* Banner Layout */}
      <div className="flex flex-col md:flex-row w-full">
        {/* Banner 1 */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-[400px] group overflow-hidden">
          <img 
            src={banner1} 
            alt="Banner 1" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {hotspots.filter(h => h.imageIndex === 0).map(hotspot => (
            <Hotspot 
              key={hotspot.id} 
              hotspot={hotspot} 
              active={activeHotspot === hotspot.id} 
              onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
            />
          ))}
        </div>

        {/* Banner 2 */}
        <div className="relative w-full md:w-1/2 h-[400px] md:h-[400px] group overflow-hidden">
          <img 
            src={banner2} 
            alt="Banner 2" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {hotspots.filter(h => h.imageIndex === 1).map(hotspot => (
            <Hotspot 
              key={hotspot.id} 
              hotspot={hotspot} 
              active={activeHotspot === hotspot.id} 
              onClick={() => setActiveHotspot(activeHotspot === hotspot.id ? null : hotspot.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Hotspot = ({ hotspot, active, onClick }) => {
  return (
    <div 
      className="absolute z-20" 
      style={{ top: hotspot.top, left: hotspot.left }}
    >
      {/* Hotspot Dot */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="relative flex items-center justify-center w-4 h-4 md:w-8 md:h-8 bg-white rounded-full shadow-lg group"
      >
        <Plus className={`w-4 h-4 transition-transform duration-300 ${active ? "rotate-45" : ""}`} />
        
        {/* Ripple/Ping Effect */}
        <span className="absolute inset-0 rounded-full bg-white opacity-75 animate-ping"></span>
      </button>

      {/* Popup Card */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`absolute z-30 bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 md:w-56 bg-white rounded-xl shadow-2xl p-4 overflow-hidden`}
          >
            <div className="relative">
              <img 
                src={hotspot.product.image} 
                alt={hotspot.product.name} 
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="absolute top-1 right-1 p-1 bg-white/80 backdrop-blur-sm rounded-full text-gray-500 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{hotspot.product.name}</h4>
            <p className="text-sm text-gray-500 mb-3 font-medium">{hotspot.product.price}</p>
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-black text-white text-xs font-bold rounded-lg hover:bg-gray-800 transition-colors">
              <ShoppingBag className="w-4 h-4" />
              View Product
            </button>
            
            {/* Arrow pointing to hotspot */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopTheLook;
