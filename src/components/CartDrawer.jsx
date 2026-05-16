import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const FREE_SHIPPING_THRESHOLD = 500;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/50 z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Bar */}
            {/* Progress Bar with Truck */}
            <div className="px-4 py-4 border-b bg-gray-50">
              {cartTotal < FREE_SHIPPING_THRESHOLD ? (
                <p className="text-xs text-gray-600 mb-3">
                  Add <span className="font-semibold">${remaining.toFixed(2)}</span> more to unlock FREE shipping 🚚
                </p>
              ) : (
                <p className="text-xs text-green-600 font-medium mb-3">
                  🎉 Congrats! You’ve unlocked FREE shipping!
                </p>
              )}

              {/* Wrapper (IMPORTANT) */}
              <div className="relative w-full">

                {/* Track */}
                <div className="w-full h-2 bg-gray-200 rounded-full" />

                {/* Progress fill */}
                <div
                  className="absolute top-0 left-0 h-2 bg-black rounded-full transition-all duration-500 z-10"
                  style={{ width: `${progress}%` }}
                />

                {/* Truck */}
                <motion.div
                  className="absolute -top-3 z-30"
                  initial={{ left: 0 }}
                  animate={{ left: `calc(${progress}% - 14px)` }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                >
                  <div className="bg-white border-2 border-black p-1 shadow-md">
                    <Truck
                      size={16}
                      className={progress >= 100 ? "text-green-600" : "text-black"}
                    />
                  </div>
                </motion.div>

              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="text-lg">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
                        <p className="text-black font-semibold mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-full px-2 py-1 gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-black text-gray-400 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-black text-gray-400 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t bg-gray-50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Shipping, taxes, and discounts calculated at checkout.
                </p>
                <div className=" flex gap-2">
                  <Link 
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2 border border-black font-bold flex items-center justify-center hover:bg-black hover:text-white transition-all transform active:scale-95"
                  >
                    VIEW CART
                  </Link>
                  <Link 
                    to="/order-success"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-2 bg-black text-white font-bold flex items-center justify-center hover:bg-gray-800 transition-all transform active:scale-95"
                  >
                    CHECKOUT
                  </Link>

                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
