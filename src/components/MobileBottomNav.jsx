import React from "react";
import { Home, Search, Heart, User, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useModal } from "../context/ModalContext";

const MobileBottomNav = () => {
  const { cartItems } = useCart();
  const { openSearch, openAuth } = useModal();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-[999] md:hidden">
      <div className="flex justify-around items-center py-2">

        {/* Shop */}
        <Link to="/" className="flex flex-col items-center text-xs text-gray-600">
          <Home size={20} />
          <span>Shop</span>
        </Link>

        {/* Search */}
        <button 
          onClick={openSearch}
          className="flex flex-col items-center text-xs text-gray-600"
        >
          <Search size={20} />
          <span>Search</span>
        </button>

        {/* Wishlist */}
        <Link to="/wishlist" className="flex flex-col items-center text-xs text-gray-600">
          <Heart size={20} />
          <span>Wishlist</span>
        </Link>

        {/* Account */}
        <button 
          onClick={openAuth}
          className="flex flex-col items-center text-xs text-gray-600"
        >
          <User size={20} />
          <span>Account</span>
        </button>

        {/* Cart */}
        <div className="relative flex flex-col items-center text-xs text-gray-600 cursor-pointer">
          <ShoppingCart size={20} />
          <span>Cart</span>

          {/* Cart Count */}
          {cartItems.length > 0 && (
            <span className="absolute -top-1 right-2 bg-black text-white text-[10px] px-1.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default MobileBottomNav;