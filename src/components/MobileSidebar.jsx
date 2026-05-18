import React, { useState, useEffect } from "react";
import {
    Menu,
    X,
    Plus,
    Minus,
    Home,
    ShoppingBag,
    Package,
    Layers,
    Phone,
    Search,
    User,
    Heart,
    ChevronRight,
    ChevronDown,
    Globe,
    DollarSign
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useModal } from "../context/ModalContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const menuItems = [
    { 
        name: "Home", 
        path: "/",
        dropdown: [
            { name: "Home Fashion 01", path: "/" },
            { name: "Home Multi Brand", path: "/" },
            { name: "Home Fashion 03", path: "/" },
            { name: "Home Fashion 04", path: "/" },
            { name: "Home Ceramic", path: "/" },
        ]
    },
    {
        name: "Shop",
        path: "/shop",
        dropdown: [
            { name: "All Collections", path: "/shop" },
            { name: "Shop Layouts", path: "/shop" },
            { name: "Filter Sidebar", path: "/shop" },
            { name: "Collections List", path: "/shop" },
            { name: "New Arrivals", path: "/shop" },
            { name: "Trending Now", path: "/shop" }
        ]
    },
    {
        name: "Products",
        path: "/product",
        dropdown: [
            { name: "Simple Product", path: "/product" },
            { name: "Variable Product", path: "/product" },
            { name: "Product Layouts", path: "/product" },
            { name: "Product Elements", path: "/product" },
            { name: "Product Reviews", path: "/product" }
        ]
    },
    {
        name: "Pages",
        dropdown: [
            { name: "About us", path: "/about-us" },
            { name: "Brands", path: "/product" },
            { name: "Contact", path: "/contact" },
            { name: "FAQ", path: "/product" },
            { name: "Our store", path: "/product" },
            { name: "View cart", path: "/cart" },
            { name: "Check out", path: "/order-success" }
        ]
    },
    {
        name: "Blog",
        path: "/blog",
        dropdown: [
            { name: "Grid layout", path: "/blog" },
            { name: "Left sidebar", path: "/blog" },
            { name: "Right sidebar", path: "/blog" },
            { name: "Blog list", path: "/blog" },
            { name: "Single Post", path: "/blog" }
        ]
    },
    { name: "Buy Now", path: "/contact" },
];

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const location = useLocation();
    const { openSearch, openAuth } = useModal();
    const { setIsCartOpen, cartCount } = useCart();
    const { wishlistCount } = useWishlist();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const toggleDropdown = (name) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 900) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close sidebar on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    return (
        <div className="relative">
            {/* 📱 MOBILE HEADER BAR */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 z-[100] min-[900px]:hidden">
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-all active:scale-90"
                    aria-label="Open Menu"
                >
                    <Menu size={24} />
                </button>

                <div className="absolute left-1/2 -translate-x-1/2">
                    <Link to="/">
                        <img src={logo} alt="Ecomus Logo" className="h-5 w-auto" />
                    </Link>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={openSearch}
                        className="p-2 text-gray-700 hover:text-black transition-colors"
                    >
                        <Search size={22} />
                    </button>
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="p-2 text-gray-700 hover:text-black transition-colors relative"
                    >
                        <ShoppingBag size={22} />
                        {cartCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* 🍔 SIDEBAR OVERLAY & CONTENT */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleSidebar}
                            className="fixed inset-0 bg-black/60 z-[200] backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-0 left-0 h-full w-[300px] sm:w-[360px] bg-white z-[201] shadow-2xl flex flex-col"
                        >
                            {/* Sidebar Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-50">
                                <img src={logo} alt="Ecomus Logo" className="h-5 w-auto" />
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 -mr-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Menu Content */}
                            <div className="flex-1 overflow-y-auto no-scrollbar py-6">
                                <nav className="px-4">
                                    <ul className="space-y-1">
                                        {menuItems.map((item) => (
                                            <li key={item.name} className="border-b border-gray-50 last:border-0">
                                                <div className="flex items-center justify-between py-1">
                                                    <Link
                                                        to={item.path || "#"}
                                                        className={`flex-1 text-[15px] font-semibold py-3 transition-colors ${
                                                            location.pathname === item.path ? "text-red-600" : "text-gray-900"
                                                        }`}
                                                    >
                                                        {item.name}
                                                    </Link>

                                                    {item.dropdown && (
                                                        <button
                                                            onClick={() => toggleDropdown(item.name)}
                                                            className={`p-3 transition-transform duration-300 ${
                                                                openDropdowns[item.name] ? "rotate-180" : ""
                                                            }`}
                                                        >
                                                            <ChevronDown size={18} className="text-gray-400" />
                                                        </button>
                                                    )}
                                                </div>

                                                <AnimatePresence>
                                                    {item.dropdown && openDropdowns[item.name] && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                                            className="overflow-hidden bg-gray-50/50 rounded-lg mb-2"
                                                        >
                                                            <ul className="py-2">
                                                                {item.dropdown.map((subItem, idx) => (
                                                                    <li key={subItem.name}>
                                                                        <Link
                                                                            to={subItem.path}
                                                                            className="block px-6 py-2.5 text-[14px] text-gray-600 hover:text-black hover:translate-x-1 transition-all"
                                                                        >
                                                                            {subItem.name}
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Action Buttons */}
                                    <div className="mt-8 grid grid-cols-2 gap-3">
                                        <Link 
                                            to="/wishlist"
                                            className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all relative"
                                        >
                                            <Heart size={18} />
                                            <span>Wishlist</span>
                                            {wishlistCount > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                                    {wishlistCount}
                                                </span>
                                            )}
                                        </Link>
                                        <button 
                                            onClick={openSearch}
                                            className="flex items-center justify-center gap-2 py-3 bg-gray-50 text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-all"
                                        >
                                            <Search size={18} />
                                            <span>Search</span>
                                        </button>
                                    </div>
                                </nav>
                            </div>

                            {/* Sidebar Footer */}
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <div className="space-y-6">
                                    <button
                                        onClick={openAuth}
                                        className="flex items-center justify-center gap-3 w-full py-3.5 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg shadow-black/10"
                                    >
                                        <User size={18} />
                                        Login / Register
                                    </button>

                                    {/* Selectors */}
                                    <div className="flex items-center justify-between px-2">
                                        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black">
                                            <Globe size={16} />
                                            <span>English</span>
                                            <ChevronDown size={14} />
                                        </button>
                                        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black">
                                            <DollarSign size={16} />
                                            <span>USD</span>
                                            <ChevronDown size={14} />
                                        </button>
                                    </div>

                                    {/* Socials */}
                                    <div className="flex items-center justify-center gap-6 pt-2">
                                        {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                                            <a key={i} href="#" className="text-gray-400 hover:text-black transition-colors">
                                                <Icon size={20} />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MobileSidebar;
