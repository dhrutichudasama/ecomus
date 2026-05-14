import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  Minus, Plus, Heart, Share2, 
  RefreshCw, MessageCircle, Ruler, Box, Package, 
  ShieldCheck, HelpCircle, Truck, Zap, Eye, Star,
  Maximize2, Clock
} from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

// Images
import pd1 from "../assets/product-detail-1.jpg";
import pd2 from "../assets/product-detail-2.jpg";
import pd3 from "../assets/product-detail-3.jpg";
import pd4 from "../assets/product-detail-4.jpg";
import pd5 from "../assets/product-detail-5.jpg";
import pd6 from "../assets/product-detail-6.jpg";

import pdb1 from "../assets/product-detail-black-1.jpg";
import pdb2 from "../assets/product-detail-black-2.jpg";
import pdb3 from "../assets/product-detail-black-3.jpg";
import pdb4 from "../assets/product-detail-black-4.jpg";

import pdbl1 from "../assets/product-detail-blue-1.jpg";
import pdbl2 from "../assets/product-detail-blue-2.jpg";
import pdbl3 from "../assets/product-detail-blue-3.jpg";
import pdbl4 from "../assets/product-detail-blue-4.jpg";

import pdw1 from "../assets/product-detail-white-1.jpg";
import pdw2 from "../assets/product-detail-white-2.jpg";
import pdw3 from "../assets/product-detail-white-3.jpg";

// Payment icons
import visa from "../assets/payment1.png";
import paypal from "../assets/payment2.png";
import mastercard from "../assets/payment3.png";
import amex from "../assets/payment4.png";
import discover from "../assets/payment5.png";

// Related products
import p1 from "../assets/product1.jpg";
import p1_2 from "../assets/product1-2.jpg";
import p2 from "../assets/product2.jpg";
import p2_2 from "../assets/product2-2.jpg";
import p3 from "../assets/product3.jpg";
import p3_2 from "../assets/product3-2.jpg";
import p4 from "../assets/product4.jpg";
import p4_2 from "../assets/product4-2.jpg";

const relatedProducts = [
  { id: 1, name: "Ribbed Tank Top", price: 18.00, image: p1, hoverImage: p1_2, badge: "Sale", rating: 5 },
  { id: 2, name: "Oversized T-Shirt", price: 25.00, image: p2, hoverImage: p2_2, badge: "New", rating: 4 },
  { id: 3, name: "Classic Linen Shirt", price: 45.00, image: p3, hoverImage: p3_2, badge: "", rating: 5 },
  { id: 4, name: "Straight-Leg Jeans", price: 60.00, image: p4, hoverImage: p4_2, badge: "Sale", rating: 4 },
];

const colorData = {
  Beige: { hex: "#E5D5C5", images: [pd1, pd2, pd3, pd4, pd5, pd6] },
  Black: { hex: "#000000", images: [pdb1, pdb2, pdb3, pdb4] },
  Blue: { hex: "#A3BBD3", images: [pdbl1, pdbl2, pdbl3, pdbl4] },
  White: { hex: "#FFFFFF", images: [pdw1, pdw2, pdw3] }
};

const ImageZoom = ({ src }) => {
  const [zoomStyle, setZoomStyle] = useState({
    transformOrigin: "center center",
    transform: "scale(1)",
  });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center center",
      transform: "scale(1)",
    });
  };

  return (
    <div
      className="w-full h-full overflow-hidden cursor-zoom-in relative bg-gray-50 rounded-lg"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt="Product"
        className="w-full h-full object-cover transition-transform duration-200 ease-out"
        style={zoomStyle}
      />
    </div>
  );
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 11,
    hours: 15,
    minutes: 45,
    seconds: 27,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border border-[#f93c00] rounded-md py-3 px-4 flex flex-col items-center justify-center mb-6 bg-[#fffafa]">
      <div className="flex items-center gap-1 mb-1">
        <Clock size={16} className="text-black" />
        <span className="text-black text-xs font-bold tracking-wider uppercase">
          Hurry Up! Sale ends in:
        </span>
      </div>
      <div className="text-[#f93c00] text-lg font-bold tracking-widest">
        {timeLeft.days}Days : {timeLeft.hours}Hours : {timeLeft.minutes}Mins : {timeLeft.seconds}Secs
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const [selectedColor, setSelectedColor] = useState("Beige");
  const [activeImages, setActiveImages] = useState(colorData["Beige"].images);
  const [mainImage, setMainImage] = useState(colorData["Beige"].images[0]);
  
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");

  const basePrice = 8.00;

  const handleColorChange = (color) => {
    setSelectedColor(color);
    const newImages = colorData[color].images;
    setActiveImages(newImages);
    setMainImage(newImages[0]);
  };

  const currentProduct = {
    id: id || "detail-1",
    name: "Cotton jersey top",
    price: basePrice,
    image: mainImage
  };

  const tabs = ["Description", "Additional Information", "Review", "Shipping", "Return Policies"];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-[120px] pb-10">
      <div className="text-sm text-gray-500 mb-6 flex gap-2">
        <Link to="/" className="hover:text-black">Home</Link> &gt; 
        <Link to="/shop" className="hover:text-black">Women</Link> &gt; 
        <span className="text-black">Cotton jersey top</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* LEFT - IMAGES (60%) */}
        <div className="w-full lg:w-[55%] flex flex-col-reverse md:flex-row gap-4 h-auto md:h-[700px]">
          {/* Thumbnails */}
          <div className="w-full md:w-20 flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto hidden-scrollbar pb-2 md:pb-0">
            {activeImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setMainImage(img)}
                className={`flex-shrink-0 w-20 h-28 rounded-md overflow-hidden border-2 ${
                  mainImage === img ? "border-black" : "border-transparent hover:border-gray-300"
                } transition-colors`}
              >
                <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          {/* Main Image */}
          <div className="flex-1 h-[400px] md:h-full rounded-lg overflow-hidden relative">
            <ImageZoom src={mainImage} />
          </div>
        </div>

        {/* RIGHT - DETAILS (40%) */}
        <div className="w-full lg:w-[45%] flex flex-col">
          <h1 className="text-3xl font-normal text-gray-900 mb-3">Cotton jersey top</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <span className="border border-black px-2 py-0.5 text-xs font-bold uppercase tracking-wide">Best seller</span>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Zap className="w-4 h-4 text-[#f93c00] fill-[#f93c00]" />
              Selling fast! 56 people have this in their carts.
            </div>
          </div>

          <div className="flex items-end gap-3 mb-4">
            <span className="text-3xl font-bold text-[#f93c00]">${basePrice.toFixed(2)}</span>
            <span className="text-xl text-gray-400 line-through mb-1">$30.00</span>
            <span className="bg-[#f93c00] text-white px-2 py-1 rounded text-xs font-bold mb-1 tracking-wide">20% OFF</span>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="bg-black text-white px-2 py-1 rounded-sm text-xs font-bold">20</div>
            <span className="text-sm font-bold text-gray-800">People are viewing this right now</span>
          </div>

          <CountdownTimer />

          {/* COLOR */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">
              Color: <span className="font-bold text-black">{selectedColor}</span>
            </p>
            <div className="flex gap-3">
              {Object.keys(colorData).map((colorName) => (
                <button
                  key={colorName}
                  onClick={() => handleColorChange(colorName)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border hover:border-black transition-colors ${
                    selectedColor === colorName ? "border-black border-2" : "border-transparent"
                  }`}
                >
                  <span
                    className="w-7 h-7 rounded-full border border-gray-200"
                    style={{ backgroundColor: colorData[colorName].hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-medium">Size: <span className="font-bold text-black">{selectedSize}</span></p>
              <a href="#" className="text-sm text-black underline underline-offset-4 decoration-1 font-medium hover:text-gray-600 transition-colors">Find your size</a>
            </div>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 border rounded-md flex items-center justify-center text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-black text-gray-700"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Quantity</p>
            <div className="flex items-center border border-gray-300 rounded-md w-28 bg-gray-50 h-11">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-full flex items-center justify-center hover:text-[#f93c00] transition-colors">
                <Minus size={16} />
              </button>
              <span className="flex-1 text-center text-sm font-bold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-full flex items-center justify-center hover:text-[#f93c00] transition-colors">
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 mb-4">
            <button 
              onClick={() => addToCart(currentProduct, quantity)}
              className="flex-1 bg-black text-white font-bold text-sm rounded-md py-3.5 hover:bg-gray-800 transition-colors transform active:scale-95"
            >
              Add to cart - ${(basePrice * quantity).toFixed(2)}
            </button>
            <button 
              onClick={() => toggleWishlist(currentProduct)}
              className={`w-[50px] border border-gray-200 rounded-md flex items-center justify-center hover:border-black transition-colors bg-white ${
                isInWishlist(currentProduct.id) ? "border-red-500 bg-red-50" : ""
              }`}
            >
              <Heart size={20} className={isInWishlist(currentProduct.id) ? "text-red-500 fill-red-500" : "text-gray-700"} />
            </button>
            <button className="w-[50px] border border-gray-200 rounded-md flex items-center justify-center hover:border-black transition-colors bg-white">
              <Maximize2 size={20} className="text-gray-700" />
            </button>
          </div>

          <button className="w-full bg-[#ffc439] text-black font-bold text-sm rounded-md py-3.5 flex items-center justify-center mb-3 hover:bg-[#f4b829] transition-colors">
            Buy with <img src={paypal} alt="PayPal" className="h-4 ml-1.5" />
          </button>
          
          <div className="text-center mb-8">
            <a href="#" className="text-xs text-gray-500 underline hover:text-black transition-colors">More payment options</a>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-black pt-4 pb-6">
            <button className="flex items-center gap-1.5 hover:text-[#f93c00] transition-colors"><RefreshCw size={14} /> Compare color</button>
            <button className="flex items-center gap-1.5 hover:text-[#f93c00] transition-colors"><HelpCircle size={14} /> Ask a question</button>
            <button className="flex items-center gap-1.5 hover:text-[#f93c00] transition-colors"><Truck size={14} /> Delivery & Return</button>
            <button className="flex items-center gap-1.5 hover:text-[#f93c00] transition-colors"><Share2 size={14} /> Share</button>
          </div>

          {/* DELIVERY BOXES */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center text-center hover:border-black transition-colors">
              <Truck size={24} strokeWidth={1.5} className="mb-3 text-black" />
              <p className="text-[11px] text-gray-600 leading-relaxed">Estimate delivery times: <span className="font-bold text-black">12-26 days</span> (International), <span className="font-bold text-black">3-6 days</span> (United States).</p>
            </div>
            <div className="border border-gray-200 rounded-md p-4 flex flex-col items-center justify-center text-center hover:border-black transition-colors">
              <RefreshCw size={24} strokeWidth={1.5} className="mb-3 text-black" />
              <p className="text-[11px] text-gray-600 leading-relaxed">Return within <span className="font-bold text-black">30 days</span> of purchase. Duties & taxes are non-refundable.</p>
            </div>
          </div>

          {/* SAFE CHECKOUT */}
          <div className="flex items-center justify-center gap-3 bg-gray-50 py-3 rounded-md border border-gray-100">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={18} className="text-black" />
              <span className="text-[11px] font-bold text-black uppercase tracking-wider">Guarantee Safe Checkout</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <img src={visa} alt="Visa" className="h-5 object-contain" />
              <img src={paypal} alt="PayPal" className="h-5 object-contain" />
              <img src={mastercard} alt="MasterCard" className="h-5 object-contain" />
              <img src={amex} alt="Amex" className="h-5 object-contain" />
              <img src={discover} alt="Discover" className="h-5 object-contain" />
            </div>
          </div>
        </div>
      </div>
      {/* TABS SECTION */}
      <div className="mt-20">
        <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center md:justify-start border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-base font-bold transition-colors relative ${
                activeTab === tab ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black"></span>
              )}
            </button>
          ))}
        </div>
        
        <div className="py-10 max-w-full text-sm text-gray-600 leading-relaxed">
          {activeTab === "Description" && (
            <div className="animate-fade-in">
              <p className="mb-8 max-w-5xl">
                Button-up shirt sleeves and a relaxed silhouette. It's tailored with drapey, crinkle-texture fabric that's made from LENZING™ ECOVERO™ Viscose — responsibly sourced wood-based fibres produced through a process that reduces impact on forests, biodiversity and water supply.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-black font-bold mb-4 text-base">Features</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                      Front button placket
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                      Adjustable sleeve tabs
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></span>
                      Babaton embroidered crest at placket and hem
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-black font-bold mb-4 text-base">Materials Care</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <RefreshCw size={18} className="text-gray-500" /> 
                      Content: 100% LENZING™ ECOVERO™ Viscose
                    </li>
                    <li className="flex items-center gap-3">
                      <Box size={18} className="text-gray-500" /> 
                      Care: Hand wash
                    </li>
                    <li className="flex items-center gap-3">
                      <Zap size={18} className="text-gray-500" /> 
                      Imported
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== "Description" && (
            <div className="animate-fade-in text-gray-500 py-10 text-center">
              Content for {activeTab} is currently unavailable.
            </div>
          )}
        </div>
      </div>

      {/* PEOPLE ALSO BOUGHT */}
      {/* <div className="mt-20">
        <h2 className="text-3xl font-medium text-center mb-12 text-black">People Also Bought</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div> */}

      <div className="mt-20">
        <h2 className="text-3xl font-medium text-center mb-12 text-black">Recently Viewed</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Tailwind basic animation utility for tabs */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hidden-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hidden-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;