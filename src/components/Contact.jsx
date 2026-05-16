import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[100px] bg-white min-h-screen">
      {/* Page Title & Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-6 py-10 text-center">
        <h1 className="text-4xl font-normal tracking-tight text-gray-900 uppercase">Contact Us</h1>
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-black">Contact</span>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-[500px] bg-gray-100 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
        <iframe 
          title="Store Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093747!2d-122.41941548468252!3d37.77492947975922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050c58!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1652700000000!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Contact Details */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-normal text-gray-900 mb-6 uppercase tracking-tight">Visit Our Store</h2>
              <p className="text-gray-500 max-w-md leading-relaxed">
                Come visit us at our flagship store in San Francisco. Our stylists are ready to help you find your perfect look.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-[10px] tracking-widest text-gray-400 mb-1">Address</h4>
                    <p className="text-sm text-black">123 Fashion Ave, Suite 100<br/>San Francisco, CA 94103</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-[10px] tracking-widest text-gray-400 mb-1">Phone</h4>
                    <p className="text-sm text-black">+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-[10px] tracking-widest text-gray-400 mb-1">Email</h4>
                    <p className="text-sm text-black">info@ecomus.com<br/>support@ecomus.com</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock size={20} className="text-black" />
                  </div>
                  <div>
                    <h4 className="font-bold uppercase text-[10px] tracking-widest text-gray-400 mb-1">Open Hours</h4>
                    <p className="text-sm text-black">Mon - Fri: 9am - 9pm<br/>Sat - Sun: 10am - 6pm</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-10 rounded-2xl border border-gray-100"
          >
             <h2 className="text-3xl font-normal text-gray-900 mb-8 uppercase tracking-tight">Drop Us a Line</h2>
             <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Your Name</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-white border border-transparent focus:border-black outline-none transition-all rounded-lg"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 bg-white border border-transparent focus:border-black outline-none transition-all rounded-lg"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
                   <input 
                     type="text" 
                     placeholder="How can we help?"
                     className="w-full px-6 py-4 bg-white border border-transparent focus:border-black outline-none transition-all rounded-lg"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                   <textarea 
                     rows="5"
                     placeholder="Write your message here..."
                     className="w-full px-6 py-4 bg-white border border-transparent focus:border-black outline-none transition-all rounded-lg resize-none"
                   ></textarea>
                </div>
                <button className="w-full py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group">
                   Send Message
                   <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
             </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
