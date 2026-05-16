import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, Truck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const FREE_SHIPPING_THRESHOLD = 500;
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <div className="pt-[100px] bg-white min-h-screen">
      {/* Page Title & Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 text-center">
        <h1 className="text-4xl font-normal tracking-tight text-gray-900 uppercase">Shopping Cart</h1>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <span className="text-black">Shopping Cart</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={48} className="text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 max-w-md">
              Looks like you hasn't added anything to your cart yet. Go ahead and explore our top categories.
            </p>
            <Link 
              to="/shop" 
              className="px-10 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Bar (Free Shipping) */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  {cartTotal < FREE_SHIPPING_THRESHOLD ? (
                    <p className="text-sm text-gray-600">
                      Add <span className="font-bold text-black">${remaining.toFixed(2)}</span> more to unlock <span className="text-green-600 font-bold">FREE shipping</span>
                    </p>
                  ) : (
                    <p className="text-sm text-green-600 font-bold">
                      🎉 Congrats! You've unlocked FREE shipping!
                    </p>
                  )}
                  <Truck size={20} className={progress >= 100 ? "text-green-600" : "text-gray-400"} />
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className={`absolute top-0 left-0 h-full transition-all duration-500 ${progress >= 100 ? 'bg-green-500' : 'bg-black'}`}
                  />
                </div>
              </div>

              {/* Items Table-like layout */}
              <div className="hidden md:grid grid-cols-12 pb-4 border-b text-xs font-bold uppercase tracking-widest text-gray-400">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Product Info */}
                    <div className="col-span-1 md:col-span-6 flex gap-6">
                      <div className="w-24 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col justify-center space-y-1">
                        <h3 className="text-lg font-medium text-gray-900 hover:text-red-500 transition-colors cursor-pointer">
                          {item.name}
                        </h3>
                        {item.color && <p className="text-sm text-gray-500">Color: <span className="text-black font-medium">{item.color}</span></p>}
                        {item.size && <p className="text-sm text-gray-500">Size: <span className="text-black font-medium">{item.size}</span></p>}
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 transition-colors pt-2"
                        >
                          <Trash2 size={14} />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Price (Mobile hidden, shown in total block or below name) */}
                    <div className="hidden md:block col-span-2 text-center text-lg font-medium">
                      ${item.price.toFixed(2)}
                    </div>

                    {/* Quantity */}
                    <div className="col-span-1 md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200 rounded-full px-4 py-2 gap-6">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="col-span-1 md:col-span-2 text-right">
                      <p className="text-lg font-bold text-black">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
                <Link to="/shop" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
                  <ArrowLeft size={18} />
                  Continue Shopping
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                >
                  Clear Shopping Cart
                </button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 sticky top-[120px]">
                <h2 className="text-xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200 uppercase tracking-tight">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-black text-lg">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-bold uppercase text-xs tracking-widest">
                      {cartTotal >= FREE_SHIPPING_THRESHOLD ? 'Free' : 'Calculated at checkout'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Taxes</span>
                    <span className="text-gray-400 text-xs tracking-widest uppercase">Calculated at checkout</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold uppercase tracking-tighter">Total</span>
                    <span className="text-2xl font-bold text-black">${cartTotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">Inclusive of all taxes and shipping</p>
                </div>

                <Link 
                  to="/order-success"
                  className="w-full py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all transform active:scale-[0.98] mb-4 flex items-center justify-center"
                >
                  Proceed to Checkout
                </Link>

                <div className="space-y-4">
                   <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                        <Truck size={20} />
                      </div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-tight">
                        Free delivery on orders <br/><span className="text-black">over $500</span>
                      </p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
