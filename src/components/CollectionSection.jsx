import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  RefreshCw,
  Eye,
  Star
} from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Import images
import p1 from "../assets/product1.jpg";
import p1_2 from "../assets/product1-2.jpg";
import p2 from "../assets/product2.jpg";
import p2_2 from "../assets/product2-2.jpg";
import p3 from "../assets/product3.jpg";
import p3_2 from "../assets/product3-2.jpg";
import p4 from "../assets/product4.jpg";
import p4_2 from "../assets/product4-2.jpg";
import p5 from "../assets/product5.jpg";
import p5_2 from "../assets/product5-2.jpg";
import p6 from "../assets/product6.jpg";
import p6_2 from "../assets/product6-2.jpg";
import p7 from "../assets/product7.jpg";
import p7_2 from "../assets/product7-2.jpg";
import p8 from "../assets/product8.jpg";
import p8_2 from "../assets/product8-2.jpg";
import p9 from "../assets/product9.jpg";
import p9_2 from "../assets/product9-2.jpg";
import p10 from "../assets/product10.jpg";
import p10_2 from "../assets/product10-2.jpg";

const products = [
  { id: 1, name: "Ribbed Tank Top", price: 18.00, image: p1, hoverImage: p1_2, badge: "Sale", rating: 5 },
  { id: 2, name: "Oversized T-Shirt", price: 25.00, image: p2, hoverImage: p2_2, badge: "New", rating: 4 },
  { id: 3, name: "Classic Linen Shirt", price: 45.00, image: p3, hoverImage: p3_2, badge: "", rating: 5 },
  { id: 4, name: "Straight-Leg Jeans", price: 60.00, image: p4, hoverImage: p4_2, badge: "Sale", rating: 4 },
  { id: 5, name: "V-Neck Sweater", price: 35.00, image: p5, hoverImage: p5_2, badge: "", rating: 5 },
  { id: 6, name: "Cotton Chinos", price: 50.00, image: p6, hoverImage: p6_2, badge: "New", rating: 4 },
  { id: 7, name: "Denim Jacket", price: 75.00, image: p7, hoverImage: p7_2, badge: "", rating: 5 },
  { id: 8, name: "Knit Cardigan", price: 40.00, image: p8, hoverImage: p8_2, badge: "Sale", rating: 4 },
  { id: 9, name: "Knit Cardigan", price: 40.00, image: p9, hoverImage: p9_2, badge: "", rating: 4 },
  { id: 10, name: "Knit Cardigan", price: 40.00, image: p10, hoverImage: p10_2, badge: "", rating: 4 },
  { id: 11, name: "Oversized T-Shirt", price: 25.00, image: p2, hoverImage: p2_2, badge: "", rating: 4 },
  { id: 12, name: "Classic Linen Shirt", price: 45.00, image: p3, hoverImage: p3_2, badge: "", rating: 5 }
];

const CollectionSection = () => {
  const [columns, setColumns] = useState(4); // default 4 columns

  return (
    <div className="pt-[120px] bg-white min-h-screen">

      {/* Page Title */}
      <div className="max-w-[1400px] mx-auto px-10 py-18 mb-10 bg-pink-50 text-center">
        <h1 className="text-3xl md:text-4xl ">New Arrival</h1>
        <p className="text-gray-500 mt-2">
          Shop through our latest selection of Fashion
        </p>
      </div>

      <div className="flex justify-center items-center gap-4 mb-10 ">
        {/* 2 Columns */}
        <div
          onClick={() => setColumns(2)}
          className={`grid grid-cols-2 gap-1 cursor-pointer p-1 "
            }`}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 block rounded-full ${columns === 2 ? "bg-black" : "bg-gray-400"
                }`}
            ></span>
          ))}
        </div>

        {/* 3 Columns */}
        <div
          onClick={() => setColumns(3)}
          className={`grid grid-cols-3 gap-1 cursor-pointer p-1'}`}
        >
          {[...Array(6)].map((_, i) => (
            <span 
            key={i}
            className={`w-1.5 h-1.5 block rounded-full ${columns === 3 ? "bg-black" : "bg-gray-400"
          }`}
          ></span>
          ))}
        </div>

        {/* 4 Columns */}
        <div
          onClick={() => setColumns(4)}
          className={`grid grid-cols-4 gap-1 cursor-pointer}`}
        >
          {[...Array(8)].map((_, i) => (
            <span
            key={i}
            className={`w-1.5 h-1.5 block rounded-full ${columns === 4 ? "bg-black" : "bg-gray-400"
            }`}
            ></span>
          ))}
        </div>

      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div
          className={`grid gap-8
              ${columns === 2 ? "grid-cols-2" : ""}
              ${columns === 3 ? "grid-cols-3" : ""}
              ${columns === 4 ? "grid-cols-4" : ""}
            `}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12">

        {/* Page Numbers */}
        {[1, 2, 3, 4].map((page) => (
          <button
            key={page}
            className={`w-10 h-10 flex items-center justify-center rounded-md border transition ${page === 1
              ? "bg-black text-white"
              : "text-gray-700 hover:bg-black hover:text-white"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button className="px-3 py-2 border rounded-md text-gray-500 hover:bg-black hover:text-white transition">
          &gt;
        </button>

      </div>
    </div>
  );
};

export default CollectionSection;
