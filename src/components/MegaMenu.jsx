import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import images
import home01 from '../assets/home-01.jpg';
import home02 from '../assets/home-02.jpg';
import home03 from '../assets/home-03.jpg';
import home04 from '../assets/home-04.jpg';
import home05 from '../assets/home-05.jpg';
import home06 from '../assets/home-06.jpg';
import home07 from '../assets/home-07.jpg';
import home08 from '../assets/home-08.png';
import home09 from '../assets/home-09.png';
import home10 from '../assets/home-10.jpg';

import shopMenu1 from '../assets/shop-menu-1.jpg';
import shopMenu2 from '../assets/shop-menu-2.jpg';

import productMenu1 from '../assets/products-menu-1.jpg';
import productMenu2 from '../assets/products-menu-2.jpg';

const HomeMegaMenu = () => {
    const images = [
        { src: home01, label: 'Home Fashion 01' },
        { src: home02, label: 'Home multi brand' },
        { src: home03, label: 'Home fashion 03' },
        { src: home04, label: 'Home fashion 04' },
        { src: home05, label: 'Home fashion 05' },
        { src: home06, label: 'Home fashion 06' },
        { src: home07, label: 'Home drink water' },
        { src: home08, label: 'Home supplement' },
        { src: home09, label: 'Home pickleball' },
        { src: home10, label: 'Home ceramic' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-8 max-w-[1400px] mx-auto">
            {images.map((item, index) => (
                <motion.div 
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center gap-4 group cursor-pointer"
                >
                    <div className="overflow-hidden rounded-sm shadow-sm group-hover:shadow-md transition-shadow duration-300">
                        <img 
                            src={item.src} 
                            alt={item.label} 
                            className="w-full h-[200px] object-cover transition-transform duration-500"
                        />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-black">{item.label}</span>
                </motion.div>
            ))}
        </div>
    );
};

const ShopMegaMenu = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg border-b pb-2">Shop Layouts</h3>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="hover:text-black cursor-pointer transition-colors">Default</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Left sidebar</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Right sidebar</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Fullwidth</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Sub collection</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Collections list</li>
                </ul>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg border-b pb-2">Features</h3>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="hover:text-black cursor-pointer transition-colors">Pagination links</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Pagination loadmore</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Pagination infinite scrolling</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Filter sidebar</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Filter hidden</li>
                </ul>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg border-b pb-2">Product Styles</h3>
                <ul className="flex flex-col gap-2 text-gray-600">
                    {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <li key={num} className="hover:text-black cursor-pointer transition-colors">Product style 0{num}</li>
                    ))}
                </ul>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-lg cursor-pointer">
                    <img src={shopMenu1} alt="Shop Menu 1" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-lg cursor-pointer">
                    <img src={shopMenu2} alt="Shop Menu 2" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </div>
    );
};

const ProductMegaMenu = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg border-b pb-2">Product Pages</h3>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="hover:text-black cursor-pointer transition-colors">Simple Product</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Variable Product</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Grouped Product</li>
                    <li className="hover:text-black cursor-pointer transition-colors">External Product</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product grid 1 </li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product grid 2 </li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product stacked </li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product right thumbnails </li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product drawer sidebar</li>
                </ul>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg border-b pb-2">Product Layouts</h3>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="hover:text-black cursor-pointer transition-colors">Vertical Thumbnails</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Horizontal Thumbnails</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Grid Layout</li>
                    <li className="hover:text-black cursor-pointer transition-colors"> Product inner zoom</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product zoom magnifier</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product no zoom</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product photoswipe popup</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product external zoom </li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product video</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product 3D, AR models</li> 
                </ul>
            </div>
            <div className="flex flex-col gap-4">
                <h3 className="font-bold text-lg border-b pb-2">Product Elements</h3>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="hover:text-black cursor-pointer transition-colors">Product Tabs</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product Accordion</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product Reviews</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product color swatch</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product rectangle</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product rectangle color</li>
                    <li className="hover:text-black cursor-pointer transition-colors"> Product swatch image</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product swatch image rounded</li>
                    <li className="hover:text-black cursor-pointer transition-colors">Product  swatch dropdown</li>

                </ul>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-lg cursor-pointer">
                    <img src={productMenu1} alt="Product 1" className="w-full h-full object-cover" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} className="overflow-hidden rounded-lg cursor-pointer">
                    <img src={productMenu2} alt="Product 2" className="w-full h-full object-cover" />
                </motion.div>
            </div>
        </div>
    );
};

const MegaMenu = ({ type, isOpen, onClose, top }) => {
    if (!isOpen) return null;

    const renderContent = () => {
        switch (type) {
            case 'Home':
                return <HomeMegaMenu />;
            case 'Shop':
                return <ShopMegaMenu />;
            case 'Products':
                return <ProductMegaMenu />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-0 w-screen h-screen bg-white z-[90] overflow-y-auto shadow-2xl flex flex-col"
            style={{ top: top || '80px' }}
            onMouseLeave={onClose}
        >
            <div className="flex-grow w-full bg-white flex items-start justify-center pt-10 pb-20">
                {renderContent()}
            </div>
        </motion.div>
    );
};

export default MegaMenu;
