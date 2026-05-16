import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const OrderSuccess = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart when landing on success page
    clearCart();
    window.scrollTo(0, 0);
  }, []);

  const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="pt-[120px] pb-20 min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[600px] w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Animated Header Background */}
        <div className="bg-black py-12 px-6 text-center relative overflow-hidden">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10"
          >
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              >
                <CheckCircle size={48} className="text-white" />
              </motion.div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2 uppercase tracking-tight">Order Confirmed!</h1>
            <p className="text-gray-400">Thank you for shopping with Ecomus</p>
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
             <div className="absolute top-[-10%] left-[-10%] w-40 h-40 border border-white rounded-full" />
             <div className="absolute bottom-[-20%] right-[-10%] w-60 h-60 border border-white rounded-full" />
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Order Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Order ID</p>
              <p className="text-sm font-bold text-black">{orderId}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Delivery By</p>
              <p className="text-sm font-bold text-black">{deliveryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>

          {/* Status Tracker (Dummy) */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
               <Package size={20} className="text-black" />
               <h3 className="font-bold text-black">What's next?</h3>
            </div>
            <div className="relative pl-8 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
               <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-4 h-4 bg-black rounded-full border-4 border-white shadow-sm" />
                  <p className="text-sm font-bold">Order Confirmed</p>
                  <p className="text-xs text-gray-500">We've received your order and are starting to process it.</p>
               </div>
               <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-4 h-4 bg-gray-100 rounded-full border-4 border-white shadow-sm" />
                  <p className="text-sm font-bold text-gray-400">Packaging</p>
                  <p className="text-xs text-gray-400">Items are being picked and packed for shipment.</p>
               </div>
               <div className="relative">
                  <div className="absolute -left-[27px] top-1 w-4 h-4 bg-gray-100 rounded-full border-4 border-white shadow-sm" />
                  <p className="text-sm font-bold text-gray-400">Shipped</p>
                  <p className="text-xs text-gray-400">Your order is on its way to your delivery address.</p>
               </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Link 
              to="/shop" 
              className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest text-center hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
            >
              Continue Shopping
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full py-4 border border-gray-200 text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
              Download Invoice
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
