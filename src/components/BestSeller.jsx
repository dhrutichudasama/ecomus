import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

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

const products = [
  { id: 1, name: "Ribbed Tank Top", price: 18.00, image: p1, hoverImage: p1_2, badge: "Sale", rating: 5 },
  { id: 2, name: "Oversized T-Shirt", price: 25.00, image: p2, hoverImage: p2_2, badge: "New", rating: 4 },
  { id: 3, name: "Classic Linen Shirt", price: 45.00, image: p3, hoverImage: p3_2, badge: "", rating: 5 },
  { id: 4, name: "Straight-Leg Jeans", price: 60.00, image: p4, hoverImage: p4_2, badge: "Sale", rating: 4 },
  { id: 5, name: "V-Neck Sweater", price: 35.00, image: p5, hoverImage: p5_2, badge: "", rating: 5 },
  { id: 6, name: "Cotton Chinos", price: 50.00, image: p6, hoverImage: p6_2, badge: "New", rating: 4 },
  { id: 7, name: "Denim Jacket", price: 75.00, image: p7, hoverImage: p7_2, badge: "", rating: 5 },
  { id: 8, name: "Knit Cardigan", price: 40.00, image: p8, hoverImage: p8_2, badge: "Sale", rating: 4 },
];

const BestSeller = () => {
  return (
    <section className="py-12 px-6 max-w-[1400px] mx-auto">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Best Seller</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Shop the Latest Styles: Stay ahead of the curve with our newest arrivals
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
