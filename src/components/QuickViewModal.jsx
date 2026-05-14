import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Minus, Plus, Star } from 'lucide-react';
import { useQuickView } from '../context/QuickViewContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const QuickViewModal = () => {
  const { selectedProduct, isQuickViewOpen, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Beige');
  const [selectedSize, setSelectedSize] = useState('S');

  // Reset local state when product changes
  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setSelectedColor('Beige');
      setSelectedSize('S');
    }
  }, [selectedProduct]);

  if (!selectedProduct && !isQuickViewOpen) return null;

  const product = selectedProduct || {};

  return (
    <AnimatePresence>
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-md hover:bg-black hover:text-white transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-gray-50 h-[300px] md:h-auto overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < (product.rating || 5) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">(12 Reviews)</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-normal text-gray-900 mb-2">{product.name}</h2>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-[#f93c00]">${(product.price || 0).toFixed(2)}</span>
                  {product.badge === "Sale" && (
                    <span className="text-lg text-gray-400 line-through font-light">$30.00</span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                This premium product is crafted from sustainable materials, offering both style and comfort for your daily adventures. Features a modern fit and durable construction.
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Color: <span className="text-black">{selectedColor}</span></p>
                <div className="flex gap-3">
                  {[
                    { name: 'Beige', hex: '#E5D5C5' },
                    { name: 'Black', hex: '#000000' },
                    { name: 'Blue', hex: '#A3BBD3' }
                  ].map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === color.name ? 'border-black scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Size: <span className="text-black">{selectedSize}</span></p>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 border rounded-md text-sm font-bold transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-md h-12 bg-gray-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-full flex items-center justify-center hover:text-[#f93c00] transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-full flex items-center justify-center hover:text-[#f93c00] transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => {
                      addToCart(product, quantity);
                      closeQuickView();
                    }}
                    className="flex-1 bg-black text-white h-12 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-full h-12 border rounded-md font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                    isInWishlist(product.id)
                      ? 'border-red-500 bg-red-50 text-red-500'
                      : 'border-gray-200 hover:border-black text-gray-900'
                  }`}
                >
                  <Heart size={18} className={isInWishlist(product.id) ? "fill-red-500" : ""} />
                  {isInWishlist(product.id) ? "Saved to Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
