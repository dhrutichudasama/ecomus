import React, { useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, MoveUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import {
  ShoppingBag,
  Heart,
  RefreshCw,
  Eye,
  Star
} from "lucide-react";

// Import images
import blog1 from "../assets/blog-1.jpg";
import blog2 from "../assets/blog-2.jpg";
import blog3 from "../assets/blog-3.jpg";
import blog4 from "../assets/blog-4.jpg";
import blog5 from "../assets/blog-5.jpg";
import blog6 from "../assets/blog-6.jpg";
import blog7 from "../assets/blog-7.jpg";
import blog8 from "../assets/blog-8.jpg";

const products = [
  { id: 1, name: "The next generation of leather alternatives", image: blog1 },
  { id: 2, name: "Is your wardrobe ready for the season?", image: blog2 },
  { id: 3, name: "How to style your favorite sweater 3 ways", image: blog3 },
  { id: 4, name: "From work to weekend: our favorite versatile pieces", image: blog4 },
  { id: 5, name: "V-Neck Sweater-Effortlessly Blends The Carefree Style", image: blog5 },
  { id: 6, name: "The Variety Of Styles And Prices Are Endless", image: blog6 },
  { id: 7, name: "Something About This Style Of Jeans", image: blog7 },
  { id: 8, name: "One Of The Most Iconic Fashion Bloggers", image: blog8 }
];

const Blog = () => {
  return (
    <div className="pt-[100px] md:pt-[120px] bg-white min-h-screen">

      {/* Page Title */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-12 md:py-18 mb-10 bg-pink-50 text-center">
        <h1 className="text-3xl md:text-5xl font-medium">Our Blog</h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Read through our latest selection of Blog
        </p>
      </div>

      {/* blog Grid */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <Link
                to={`/blog/${product.id}`}
                className="block relative aspect-[16/11] overflow-hidden rounded-xl bg-gray-100"
              >
                {/* Image wrapper (zoom effect) */}
                <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* 🔥 Accessories Button (fixed position) */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white text-black text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 shadow-sm hover:bg-black hover:text-white transition-all duration-300">
                    Accessories
                  </span>
                </div>
              </Link>

              {/* Info */}
              <div className="mt-6">
                <h3 className="text-lg md:text-xl font-medium leading-tight text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="mt-4">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tighter border-b-2 border-black pb-0.5 hover:text-red-600 hover:border-red-600 transition-all"
                  >
                    Read More
                    <MoveUpRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
