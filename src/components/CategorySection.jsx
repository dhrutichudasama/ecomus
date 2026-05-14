import React, { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// Import images
import cat1 from "../assets/cat1.jpg";
import cat2 from "../assets/cat2.jpg";
import cat3 from "../assets/cat3.jpg";
import cat4 from "../assets/cat4.jpg";
import cat5 from "../assets/cat5.jpg";

const categories = [
  { id: 1, name: "Clothing", image: cat1 },
  { id: 2, name: "Sunglasses", image: cat2 },
  { id: 3, name: "Bags", image: cat3 },
  { id: 4, name: "Fashion", image: cat4 },
  { id: 5, name: "Accessories", image: cat5 },
];

const CategorySection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 px-6 max-w-[1400px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-end mb-6 gap-4">
        <div className="flex gap-3">
          <button 
            onClick={() => scroll("left")}
            className="p-1.5 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="p-1.5 rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div>
          <h2 className="text-[20px] uppercase">Shop by Categories</h2>
        </div>
      </div>

      <div className="relative flex gap-6">
        {/* Left Side: Scrollable Categories */}
        <div 
          ref={scrollRef}
          className="flex-1 flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth py-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => (
            <div 
              key={category.id}
              className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Text */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300 flex items-end p-6 md:p-8">
                  <div className="text-white">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <div className="h-0.5 w-0 group-hover:w-full bg-white transition-all duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Fixed Card */}
        <div className="hidden md:flex flex-none md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
          <div className="w-full aspect-[4/5] bg-white border border-gray-100 shadow-xl rounded-2xl flex flex-col items-center justify-center text-center p-6 md:p-8 group hover:border-black transition-all duration-500">
            <div className="mb-4 md:mb-6 p-4 rounded-full bg-gray-50 group-hover:bg-black group-hover:text-white transition-all duration-500">
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Discover all <br /> new items
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mb-6 md:mb-8 px-4">
              Explore our latest collection and find your perfect style.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 md:px-8 py-2 md:py-3 bg-black text-white rounded-full text-xs md:text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              View All
            </motion.button>
          </div>
        </div>
      </div>

      {/* Custom Styles for hiding scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;
