import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Award, ArrowRight } from 'lucide-react';
import aboutBg from '../assets/about-us-bg.jpg';
import about2 from '../assets/about-us-2.jpg';
import about3 from '../assets/about-us-3.jpg';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[100px] bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img 
          src={aboutBg} 
          alt="About Us Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-normal text-white uppercase tracking-tighter mb-6"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-sm text-gray-200 uppercase tracking-widest"
          >
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About Us</span>
          </motion.div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-normal text-gray-900 mb-8 uppercase tracking-tight">Our Philosophy</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              We believe that fashion is more than just clothing; it's a form of self-expression. Since our inception, we've dedicated ourselves to providing high-quality, sustainable, and stylish pieces that empower individuals to look and feel their best.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                   <Target size={24} className="text-black" />
                </div>
                <h4 className="font-bold uppercase text-xs tracking-widest">Our Mission</h4>
                <p className="text-sm text-gray-500">To inspire confidence through timeless and ethical fashion.</p>
              </div>
              <div className="space-y-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                   <Award size={24} className="text-black" />
                </div>
                <h4 className="font-bold uppercase text-xs tracking-widest">Our Quality</h4>
                <p className="text-sm text-gray-500">Every piece is crafted with meticulous attention to detail.</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img src={about2} alt="About Us 2" className="w-full rounded-2xl shadow-2xl" />
            <div className="absolute -bottom-10 -left-10 w-64 hidden md:block">
               <img src={about3} alt="About Us 3" className="w-full rounded-2xl border-8 border-white shadow-xl" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: 'Founded', value: '2015' },
              { label: 'Worldwide Stores', value: '50+' },
              { label: 'Happy Customers', value: '1M+' },
              { label: 'Team Members', value: '200+' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-4xl font-bold text-black mb-2">{stat.value}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section Placeholder */}
      {/* <div className="max-w-[1400px] mx-auto px-6 py-24 text-center">
         <h2 className="text-4xl font-normal text-gray-900 mb-16 uppercase tracking-tight">Meet Our Team</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="group">
                 <div className="aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden mb-6 relative">
                 <img src="https://images.unsplash.com/photo-1507206130118-b5907f817163?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29tZW4lMjB3b3JraW5nfGVufDB8fDB8fHww" alt="" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                 </div>
                 <h4 className="text-lg font-bold">Member {i+1}</h4>
                 <p className="text-sm text-gray-500 uppercase tracking-widest">Position</p>
              </div>
            ))}
         </div>
      </div> */}

      {/* CTA Section */}
      <div className="bg-black py-20 text-center">
         <h2 className="text-3xl font-normal text-white mb-8 uppercase tracking-tight">Join Our Journey</h2>
         <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 px-10 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
         >
           Shop the Collection
           <ArrowRight size={16} />
         </Link>
      </div>
    </div>
  );
};

export default AboutUs;
