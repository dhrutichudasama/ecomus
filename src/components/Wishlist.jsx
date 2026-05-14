import React from "react";
import { Link } from "react-router-dom";
import { Trash2, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "./ProductCard";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <div className="pt-[110px] pb-10 px-4 sm:px-4 lg:px-8 max-w-[full] mx-auto min-h-screen">
      <div className="text-center mb-16 bg-pink-100 p-20">
        <h1 className="text-4xl font-normal text-gray-900 mb-4">Your Wishlist</h1>
      </div>

      {wishlistItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200"
        >
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Heart size={40} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            You haven't saved any items yet. Start exploring our collection and save your favorites!
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-black text-white px-10 py-4 rounded-md font-bold hover:bg-gray-800 transition-all transform active:scale-95 shadow-lg"
          >
            Go to Shop
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {wishlistItems.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProductCard product={product} isWishlist={true} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
