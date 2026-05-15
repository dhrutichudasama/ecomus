import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Trash2, RefreshCw, Eye, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useQuickView } from '../context/QuickViewContext';
import { useCompare } from '../context/CompareContext';
import { Check } from 'lucide-react';

const ProductCard = ({ product, isWishlist = false }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const { addToCompare, isInCompare } = useCompare();

  const isCompared = isInCompare(product.id);

  return (
    <div className="group">
      {/* Image Container */}
      <div className="block relative aspect-[3/4] overflow-hidden rounded-md bg-gray-100">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <div className="relative w-full h-full transition-transform duration-700 group-hover:scale-110">
            {/* Primary Image */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            />
            {/* Hover Image */}
            {product.hoverImage && (
              <img 
                src={product.hoverImage} 
                alt={`${product.name} alternate`} 
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
            )}
          </div>
        </Link>
        
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${
            product.badge === "Sale" ? "bg-red-500" : "bg-black"
          }`}>
            {product.badge}
          </div>
        )}

        {/* Staggered Action Buttons */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
          <button
            onClick={() => addToCart(product)}
            className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 delay-[0ms] hover:bg-black hover:text-white"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          
          {isWishlist ? (
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 delay-[100ms] hover:bg-red-500 hover:text-white text-red-500"
              title="Remove from Wishlist"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => toggleWishlist(product)}
              className={`w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 delay-[100ms] hover:bg-black hover:text-white ${
                isInWishlist(product.id) ? "text-red-500 bg-red-50" : ""
              }`}
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-red-500" : ""}`} />
            </button>
          )}

          <button
            onClick={() => addToCompare(product)}
            className={`w-8 h-8 rounded-md flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 delay-[200ms] ${
              isCompared ? 'bg-black text-white' : 'bg-white text-gray-900 hover:bg-black hover:text-white'
            }`}
            title="Compare"
          >
            {isCompared ? <Check className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
          </button>
          <button
            onClick={() => openQuickView(product)}
            className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 delay-[300ms] hover:bg-black hover:text-white"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Subtle Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </div>

      {/* Product Info */}
      <div className="mt-5 text-center">
        {/* Rating */}
        <div className="flex justify-start gap-0.5 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3.5 h-3.5 ${i < (product.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
            />
          ))}
        </div>
        <Link to={`/product/${product.id}`} className="block flex justify-start">
          <h3 className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 font-bold mt-1 text-start">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
