import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import payment1 from "../assets/payment1.png";
import payment2 from "../assets/payment2.png";
import payment3 from "../assets/payment3.png";
import payment4 from "../assets/payment4.png";
import payment5 from "../assets/payment5.png";
import logo from "../assets/logo.svg";

const AccordionSection = ({ title, children, isLast }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Set correctly on mount
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isExpanded = !isMobile || isOpen;

    return (
        <div className={`py-4 md:py-0 ${!isLast ? "border-b border-gray-200 md:border-none" : ""}`}>
            <div 
                className={`flex justify-between items-center ${isMobile ? "cursor-pointer" : "cursor-default"}`}
                onClick={() => isMobile && setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-semibold md:mb-4">{title}</h3>
                {isMobile && (
                    <div className="text-gray-600">
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                    </div>
                )}
            </div>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        key="content"
                        initial={isMobile ? { height: 0, opacity: 0 } : false}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={isMobile ? { height: 0, opacity: 0 } : undefined}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 md:pt-0">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Footer = () => {
    return (
        <footer className="bg-white mt-16">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-0 md:gap-10">

                    {/* Column 1 - Logo + Address */}
                    <div className="py-6 md:py-0 border-b border-gray-200 md:border-none">
                        <img src={logo} alt="Ecomus" className="mb-10" />
                        <p className="text-gray-600 text-sm mb-4 leading-6">
                            123 Fashion Street,<br />
                            Ahmedabad, Gujarat, India <br />
                            Email: support@ecomus.com <br />
                            Phone: +91 98765 43210
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition">
                                <FaFacebookF size={16} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition">
                                <FaInstagram size={16} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition">
                                <FaTwitter size={16} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition">
                                <FaLinkedinIn size={16} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full shadow hover:bg-black hover:text-white transition">
                                <FaYoutube size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - HELP CENTER */}
                    <AccordionSection title="Help">
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-black cursor-pointer">Returns + Exchanges</li>
                            <li className="hover:text-black cursor-pointer">Shipping</li>
                            <li className="hover:text-black cursor-pointer">Terms & Conditions</li>
                            <li className="hover:text-black cursor-pointer">FAQ’s</li>
                            <li className="hover:text-black cursor-pointer">Compare</li>
                            <li className="hover:text-black cursor-pointer">My Wishlist</li>
                        </ul>
                    </AccordionSection>

                    {/* Column 3 - About Us */}
                    <AccordionSection title="About Us">
                        <ul className="space-y-2 text-gray-600 text-sm">
                            <li className="hover:text-black cursor-pointer">Our Story</li>
                            <li className="hover:text-black cursor-pointer">Visit Our Store</li>
                            <li className="hover:text-black cursor-pointer">Contact Us</li>
                            <li className="hover:text-black cursor-pointer">Account</li>
                        </ul>
                    </AccordionSection>

                    {/* Column 4 - mail */}
                    <AccordionSection title="Sign Up for Email" isLast>
                        <p className="text-gray-600 text-md mb-4">Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!</p>
                        <div className="flex">
                            <input type="email" placeholder="Enter your email" className="border border-gray-300 rounded-l-md px-4 py-2 w-full focus:outline-none focus:border-black" />
                            <button className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800 transition">Subscribe</button>
                        </div>
                    </AccordionSection>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

                    {/* Left - Copyright */}
                    <p>
                        © {new Date().getFullYear()} Ecomus. All rights reserved.
                    </p>

                    {/* Right - Payment Options */}
                    <div className="flex items-center gap-3">
                        <img src={payment1} alt="Visa" className="h-6 object-contain" />
                        <img src={payment2} alt="Mastercard" className="h-6 object-contain" />
                        <img src={payment3} alt="Amex" className="h-6 object-contain" />
                        <img src={payment4} alt="PayPal" className="h-6 object-contain" />
                        <img src={payment5} alt="Diners Club" className="h-6 object-contain" />
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;