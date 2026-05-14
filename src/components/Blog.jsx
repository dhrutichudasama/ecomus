import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  const [columns, setColumns] = useState(3); // default 4 columns

  return (
    <div className="pt-[120px] bg-white min-h-screen">

      {/* Page Title */}
      <div className="max-w-[1400px] mx-auto px-10 py-18 mb-10 bg-pink-50 text-center">
        <h1 className="text-3xl md:text-4xl ">Our Blog</h1>
        <p className="text-gray-500 mt-2">
          Read through our latest selection of Blog
        </p>
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
            <div key={product.id} className="group">

              <Link
                to={`/blog/${product.id}`}
                className="block relative aspect-[6/4]  overflow-hidden rounded-2xl bg-gray-100"
              >
                <div className="relative w-full h-[300px] transition-transform duration-700 group-hover:scale-110">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[300px] object-cover transition-opacity duration-300"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="mt-5 text-center">
                <h3 className="text-[20px] text-left text-gray-900">
                  {product.name}
                </h3>

                <p className="text-gray-900 font-bold mt-1">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Blog;
