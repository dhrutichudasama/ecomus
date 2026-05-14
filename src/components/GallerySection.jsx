import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package, CreditCard, RotateCcw, Headphones } from 'lucide-react';
import QuickViewModal from './QuickViewModal';

// Importing images
import gallery1 from '../assets/gallery-1.jpg';
import gallery2 from '../assets/gallery-2.jpg';
import gallery3 from '../assets/gallery-3.jpg';
import gallery4 from '../assets/gallery-4.jpg';
import gallery5 from '../assets/gallery-5.jpg';

const galleryData = [
  { id: 1, image: gallery1, name: 'Cotton Sun Hat', colors: ['Beige', 'White', 'Black'] },
  { id: 2, image: gallery2, name: 'Leather Tote Bag', colors: ['Cream', 'Tan', 'Black'] },
  { id: 3, image: gallery3, name: 'Classic Sunglasses', colors: ['Tortoise', 'Black', 'Green'] },
  { id: 4, image: gallery4, name: 'Suede Ankle Boots', colors: ['Sand', 'Grey', 'Brown'] },
  { id: 5, image: gallery5, name: 'Canvas Sneakers', colors: ['White', 'Navy', 'Olive'] },
];

const GallerySection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>

      <section className="py-10 px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop Gram</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Inspire and let yourself be inspired, from one unique fashion to another.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {galleryData.map((item) => (
            <div key={item.id} className="relative group cursor-pointer overflow-hidden rounded-lg">
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Cart Icon - Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 bg-white text-black p-2.5 rounded-full shadow-xl flex items-center justify-center z-10 hover:bg-black hover:text-white hover:scale-110 active:scale-95"
                  onClick={() => handleOpenModal(item)}
                >
                  <ShoppingCart size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <QuickViewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      </section>

      {/* Feature Section */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Box 1 */}
          <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center h-[200px] justify-center">
            <div className="mb-4">
              <Package size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mb-1">Free Shipping</h3>
            <p className="text-gray-500 text-sm">
              Free shipping over order $120
            </p>
          </div>

          {/* Box 2 */}
          <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center h-[200px] justify-center">
            <div className="mb-4">
              <CreditCard size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mb-1">Flexible Payment</h3>
            <p className="text-gray-500 text-sm">
              Pay with Multiple Credit Cards
            </p>
          </div>

          {/* Box 3 */}
          <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center h-[200px] justify-center">
            <div className="mb-4">
              <RotateCcw size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mb-1">14 Day Returns</h3>
            <p className="text-gray-500 text-sm">
              Within 30 days for an exchange
            </p>
          </div>

          {/* Box 4 */}
          <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center h-[200px] justify-center">
            <div className="mb-4">
              <Headphones size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-semibold mb-1">Premium Support</h3>
            <p className="text-gray-500 text-sm">
              Outstanding premium support
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default GallerySection;
