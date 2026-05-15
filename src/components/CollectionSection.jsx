import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  RefreshCw,
  Eye,
  Star,
  List,
  LayoutGrid,
  Grid2X2,
  Grid3X3,
  Search,
  ChevronDown,
  ArrowUpDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { useModal } from "../context/ModalContext";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useQuickView } from "../context/QuickViewContext";
import { useCompare } from "../context/CompareContext";
import { Check } from "lucide-react";

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

const productsData = [
  { id: 1, name: "Ribbed Tank Top", price: 18.00, popularity: 95, createdAt: "2024-01-01", category: "Women", color: "Beige", size: "S", inStock: true, image: p1, hoverImage: p1_2, badge: "Sale", rating: 5, description: "Button-up shirt sleeves and a relaxed silhouette. It's tailored with drapey, crinkle-texture fabric that's made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces..." },
  { id: 2, name: "Oversized T-Shirt", price: 25.00, popularity: 88, createdAt: "2024-02-15", category: "Men", color: "Black", size: "L", inStock: true, image: p2, hoverImage: p2_2, badge: "New", rating: 4, description: "Casual oversized fit t-shirt made from premium cotton. Perfect for a relaxed everyday look." },
  { id: 3, name: "Classic Linen Shirt", price: 45.00, popularity: 92, createdAt: "2023-12-10", category: "Men", color: "White", size: "M", inStock: false, image: p3, hoverImage: p3_2, badge: "", rating: 5, description: "Breathable linen shirt for warm summer days. Features a classic collar and button-down front." },
  { id: 4, name: "Straight-Leg Jeans", price: 60.00, popularity: 85, createdAt: "2024-03-05", category: "Denim", color: "Blue", size: "XL", inStock: true, image: p4, hoverImage: p4_2, badge: "Sale", rating: 4, description: "Timeless straight-leg jeans with a comfortable high-waist fit. Durable denim that lasts." },
  { id: 5, name: "V-Neck Sweater", price: 35.00, popularity: 78, createdAt: "2024-01-20", category: "Fashion", color: "Orange", size: "S", inStock: true, image: p5, hoverImage: p5_2, badge: "", rating: 5, description: "Soft v-neck sweater perfect for layering. Made from a cozy wool blend." },
  { id: 6, name: "Cotton Chinos", price: 50.00, popularity: 82, createdAt: "2024-02-28", category: "Men", color: "Beige", size: "L", inStock: true, image: p6, hoverImage: p6_2, badge: "New", rating: 4, description: "Versatile cotton chinos for a smart-casual appearance. Available in multiple colors." },
  { id: 7, name: "Denim Jacket", price: 75.00, popularity: 96, createdAt: "2023-11-25", category: "Denim", color: "Blue", size: "M", inStock: true, image: p7, hoverImage: p7_2, badge: "", rating: 5, description: "Classic denim jacket with a modern twist. Features chest pockets and buttoned cuffs." },
  { id: 8, name: "Knit Cardigan", price: 40.00, popularity: 75, createdAt: "2024-03-12", category: "Women", color: "White", size: "S", inStock: false, image: p8, hoverImage: p8_2, badge: "Sale", rating: 4, description: "Cozy knit cardigan with a chunky texture. Great for chilly evenings." },
  { id: 9, name: "Urban Hoodie", price: 55.00, popularity: 89, createdAt: "2024-04-01", category: "Fashion", color: "Black", size: "XL", inStock: true, image: p9, hoverImage: p9_2, badge: "", rating: 4, description: "Stylish urban hoodie with a soft fleece lining. Features a kangaroo pocket and drawstring hood." },
  { id: 10, name: "Summer Dress", price: 65.00, popularity: 91, createdAt: "2024-03-20", category: "Dress", color: "White", size: "S", inStock: true, image: p10, hoverImage: p10_2, badge: "", rating: 4, description: "Light and airy summer dress with a floral pattern. Ideal for garden parties." },
  { id: 11, name: "Graphic Tee", price: 22.00, popularity: 70, createdAt: "2024-04-10", category: "Men", color: "Black", size: "M", inStock: true, image: p2, hoverImage: p2_2, badge: "", rating: 4, description: "Fun graphic tee with a unique design. Made from soft breathable cotton." },
  { id: 12, name: "Cargo Pants", price: 58.00, popularity: 84, createdAt: "2024-02-10", category: "Men", color: "Orange", size: "L", inStock: false, image: p3, hoverImage: p3_2, badge: "", rating: 5, description: "Practical cargo pants with multiple utility pockets. Rugged design for outdoor activities." }
];

const CollectionSection = () => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const { addToCompare, isInCompare } = useCompare();
  const { isFilterOpen, openFilter } = useModal();

  const [columns, setColumns] = useState(4);
  const [sortBy, setSortBy] = useState("Featured");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState({});
  const [selectedSize, setSelectedSize] = useState({});

  // Filter State
  const [filters, setFilters] = useState({
    categories: [],
    availability: [],
    priceRange: [0, 500],
    colors: [],
    sizes: []
  });

  const sortOptions = [
    "Featured",
    "Best Selling",
    "Alphabetically (A–Z)",
    "Alphabetically (Z–A)",
    "Price: Low → High",
    "Price: High → Low"
  ];

  const getSortedProducts = () => {
    // 1. First Filter
    let filtered = productsData.filter(product => {
      // Category Filter
      const categoryMatch = filters.categories.length === 0 || 
        (product.category && filters.categories.includes(product.category));

      // Availability Filter
      const availabilityMatch = filters.availability.length === 0 || 
        (filters.availability.includes("true") && product.inStock === true) || 
        (filters.availability.includes("false") && product.inStock === false);

      // Price Filter
      const minPrice = filters.priceRange[0] ?? 0;
      const maxPrice = filters.priceRange[1] ?? 500;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;

      // Color Filter
      const colorMatch = filters.colors.length === 0 || 
        (product.color && filters.colors.includes(product.color));

      // Size Filter
      const sizeMatch = filters.sizes.length === 0 || 
        (product.size && filters.sizes.includes(product.size));

      return categoryMatch && availabilityMatch && priceMatch && colorMatch && sizeMatch;
    });

    // 2. Then Sort
    switch (sortBy) {
      case "Best Selling":
        return filtered.sort((a, b) => b.popularity - a.popularity);
      case "Alphabetically (A–Z)":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "Alphabetically (Z–A)":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case "Price: Low → High":
        return filtered.sort((a, b) => a.price - b.price);
      case "Price: High → Low":
        return filtered.sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  };

  const products = getSortedProducts();

  const clearFilters = () => {
    setFilters({
      categories: [],
      availability: [],
      priceRange: [0, 500],
      colors: [],
      sizes: []
    });
  };

  const removeFilter = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(v => v !== value)
    }));
  };

  return (
    <div className="pt-[100px] bg-white min-h-screen">

      {/* Page Title */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 text-center">
        <h1 className="text-4xl font-normal tracking-tight text-gray-900">New Arrival</h1>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="text-black">New Arrival</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <button 
          onClick={openFilter}
          className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded hover:border-black transition-all group"
        >
          <ArrowUpDown size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          <span className="text-sm font-medium uppercase tracking-widest">Filter</span>
        </button>

        <div className="flex items-center gap-8">
          {/* Layout Toggles */}
          <div className="hidden min-[900px]:flex items-center gap-5">
            <button
              onClick={() => setColumns(1)}
              className={`flex flex-col gap-0.5 transition-all ${columns === 1 ? "text-black" : "text-gray-300 hover:text-gray-500"}`}
              title="List View"
            >
              <div className="w-5 h-1 bg-current rounded-full"></div>
              <div className="w-5 h-1 bg-current rounded-full"></div>
            </button>
            <button
              onClick={() => setColumns(2)}
              className={`grid grid-cols-2 gap-1 transition-all ${columns === 2 ? "text-black" : "text-gray-300 hover:text-gray-500"}`}
              title="2 Columns"
            >
              <div className="w-2 h-2 bg-current rounded-full"></div>
              <div className="w-2 h-2 bg-current rounded-full"></div>
              <div className="w-2 h-2 bg-current rounded-full"></div>
              <div className="w-2 h-2 bg-current rounded-full"></div>
            </button>
            <button
              onClick={() => setColumns(3)}
              className={`grid grid-cols-3 gap-1 transition-all ${columns === 3 ? "text-black" : "text-gray-300 hover:text-gray-500"}`}
              title="3 Columns"
            >
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-current rounded-full"></div>
              ))}
            </button>
            <button
              onClick={() => setColumns(4)}
              className={`grid grid-cols-4 gap-1 transition-all ${columns === 4 ? "text-black" : "text-gray-300 hover:text-gray-500"}`}
              title="4 Columns"
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-current rounded-full"></div>
              ))}
            </button>
          </div>


        </div>
        {/* Sort Dropdown */}
        <div className="relative min-w-[200px]">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full flex items-center justify-between gap-4 px-4 py-2.5 border border-gray-200 rounded hover:border-black transition-all bg-white"
          >
            <span className="text-sm font-medium text-gray-700">{sortBy}</span>
            <ChevronDown size={16} className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
          </button>

          {isSortOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 shadow-xl rounded-md z-[60] overflow-hidden">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setIsSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50 ${sortBy === option ? "text-black font-bold bg-gray-50" : "text-gray-600"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Filters & Product Count */}
      <div className="max-w-[1400px] mx-auto px-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
           <div className="flex flex-wrap items-center gap-2">
              {filters.categories.map(cat => (
                <span key={cat} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {cat}
                  <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeFilter('categories', cat)} />
                </span>
              ))}
              {filters.colors.map(color => (
                <span key={color} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {color}
                  <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeFilter('colors', color)} />
                </span>
              ))}
              {filters.sizes.map(size => (
                <span key={size} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  {size}
                  <X size={14} className="cursor-pointer hover:text-red-500" onClick={() => removeFilter('sizes', size)} />
                </span>
              ))}
              {(filters.categories.length > 0 || filters.colors.length > 0 || filters.sizes.length > 0) && (
                <button 
                  onClick={clearFilters}
                  className="text-xs font-bold uppercase tracking-widest text-red-500 hover:underline ml-2"
                >
                  Clear All
                </button>
              )}
           </div>
           <p className="text-sm text-gray-500 font-medium">
             Showing <span className="text-black font-bold">{products.length}</span> products
           </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        {products.length > 0 ? (
          <div
            className={`grid gap-x-8 gap-y-12
                ${columns === 1 ? "grid-cols-1" : ""}
                ${columns === 2 ? "grid-cols-2" : ""}
                ${columns === 3 ? "grid-cols-2 lg:grid-cols-3" : ""}
                ${columns === 4 ? "grid-cols-2 lg:grid-cols-4" : ""}
              `}
          >
            {products.map((product) => (
              columns === 1 ? (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col md:flex-row gap-8 bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  {/* Left: Image */}
                  <div className="w-full md:w-[40%] relative overflow-hidden h-[400px] md:h-auto">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {product.badge && (
                      <span className={`absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-full ${product.badge === "Sale" ? "bg-red-500" : "bg-black"}`}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Right: Details */}
                  <div className="w-full md:w-[60%] p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < product.rating ? "currentColor" : "none"} />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">(12 reviews)</span>
                    </div>

                    <h3 className="text-2xl font-normal text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg">
                      {product.description}
                    </p>

                    {/* Options */}
                    <div className="space-y-6 mb-10">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Color: <span className="text-black">{selectedColor[product.id] || "Beige"}</span></p>
                        <div className="flex gap-2">
                          {["#E5D5C5", "#000000", "#A3BBD3"].map((color, i) => {
                            const colorNames = ["Beige", "Black", "Blue"];
                            return (
                              <button
                                key={i}
                                type="button"
                                onClick={() => setSelectedColor(prev => ({ ...prev, [product.id]: colorNames[i] }))}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor[product.id] === colorNames[i] ? "border-black scale-110" : "border-transparent hover:border-black"}`}
                                style={{ backgroundColor: color }}
                              />
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Size: <span className="text-black">{selectedSize[product.id] || "S"}</span></p>
                        <div className="flex gap-2">
                          {["S", "M", "L", "XL"].map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => setSelectedSize(prev => ({ ...prev, [product.id]: size }))}
                              className={`w-10 h-10 border flex items-center justify-center text-xs font-bold transition-all ${selectedSize[product.id] === size ? "bg-black text-white border-black" : "border-gray-200 hover:border-black"}`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 min-w-[200px] h-14 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 flex items-center justify-center gap-3"
                      >
                        <ShoppingBag size={18} />
                        Add to Cart
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleWishlist(product)}
                          className={`w-14 h-14 border flex items-center justify-center transition-all ${isInWishlist(product.id) ? "bg-red-50 text-red-500 border-red-500" : "border-gray-200 hover:bg-black hover:text-white"}`}
                        >
                          <Heart size={20} className={isInWishlist(product.id) ? "fill-red-500" : ""} />
                        </button>
                        <button
                          onClick={() => addToCompare(product)}
                          className={`w-14 h-14 border flex items-center justify-center transition-all ${isInCompare(product.id) ? "bg-black text-white border-black" : "border-gray-200 hover:bg-black hover:text-white"}`}
                        >
                          {isInCompare(product.id) ? <Check size={20} /> : <RefreshCw size={20} />}
                        </button>
                        <button
                          onClick={() => openQuickView(product)}
                          className="w-14 h-14 border border-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-all"
                        >
                          <Eye size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <ProductCard product={product} />
                </motion.div>
              )
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
             <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-50 rounded-full mb-6">
                <Search size={40} className="text-gray-300" />
             </div>
             <h2 className="text-2xl font-bold text-gray-900 mb-2">No Products Found</h2>
             <p className="text-gray-500 mb-8">Try adjusting your filters to find what you're looking for.</p>
             <button 
              onClick={clearFilters}
              className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
             >
               Clear All Filters
             </button>
          </div>
        )}
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

      <FilterSidebar 
        filters={filters} 
        setFilters={setFilters} 
        clearFilters={clearFilters} 
        totalItems={products.length}
      />
    </div>
  );
};

export default CollectionSection;
