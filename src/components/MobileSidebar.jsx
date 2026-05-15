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
    ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useModal } from "../context/ModalContext";
import { useCart } from "../context/CartContext";

const menuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/" },
    {
        name: "Shop",
        icon: <ShoppingBag size={20} />,
        dropdown: [
            { name: "All Collections", path: "/shop" },
            { name: "Best Sellers", path: "/shop" },
            { name: "New Arrivals", path: "/shop" },
            { name: "Trending", path: "/shop" }
        ]
    },
    {
        name: "Products",
        icon: <Package size={20} />,
        dropdown: [
            { name: "Electronics", path: "/product" },
            { name: "Fashion", path: "/product" },
            { name: "Accessories", path: "/product" },
            { name: "Home Decor", path: "/product" }
        ]
    },
    {
        name: "Pages",
        icon: <Package size={20} />,
        dropdown: [
            { name: "About us", path: "/product" },
            { name: "Brands", path: "/product" },
            { name: "Contact 1", path: "/product" },
            { name: "FAQ 01", path: "/product" },
            { name: "Our store", path: "/product" },
            { name: "Store locator", path: "/product" },
            { name: "View cart", path: "/product" },
            { name: "Check out", path: "/product" }
        ]
    },
    {
        name: "Blog",
        icon: <Package size={20} />,
        dropdown: [
            { name: "Grid layout", path: "/product" },
            { name: "Left sidebar", path: "/product" },
            { name: "Right sidebar", path: "/product" },
            { name: "Blog list", path: "/product" }
        ]
    },
    { name: "Buy Now", icon: <Phone size={20} />, path: "/contact" },
];

/**
 * MobileSidebar Component
 * Handles the mobile-specific header behavior (< 900px) and the slide-in sidebar.
 */
const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({});
    const [activeItem, setActiveItem] = useState("Home");
    const { openSearch, openAuth } = useModal();
    const { setIsCartOpen } = useCart();

    // Toggle Sidebar
    const toggleSidebar = () => setIsOpen(!isOpen);

    // Toggle Individual Dropdowns
    const toggleDropdown = (name) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    // Prevent body scroll when sidebar is open
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

    // Handle screen resize to close sidebar if width > 900px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 900) {
                setIsOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="relative">
            {/* 📱 MOBILE HEADER BAR - Visible only below 900px */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-5 z-[100] transition-all duration-300 min-[900px]:hidden">
                {/* Hamburger Menu Icon (Left) */}
                <button
                    onClick={toggleSidebar}
                    className="p-2 -ml-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors active:scale-90"
                    aria-label="Open Menu"
                    id="mobile-hamburger"
                >
                    <Menu size={26} />
                </button>

                {/* Logo (Center) */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <img src={logo} alt="Ecomus Logo" className="h-6 w-auto" />
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-1">
                    <button 
                        onClick={() => {
                            toggleSidebar();
                            openSearch();
                        }}
                        className="p-2 text-gray-700 hover:text-black transition-colors"
                    >
                        <Search size={22} />
                    </button>
                    <button 
                        onClick={() => setIsCartOpen(true)}
                        className="p-2 text-gray-700 hover:text-black transition-colors relative"
                    >
                        <ShoppingBag size={22} />
                        <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">0</span>
                    </button>
                </div>
            </div>

            {/* 🍔 SIDEBAR OVERLAY & CONTENT */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Dark Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleSidebar}
                            className="fixed inset-0 bg-black/60 z-[200]"
                        />

                        {/* Slide-in Sidebar */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-white z-[201] shadow-2xl flex flex-col"
                        >
                            {/* Sidebar Header with Close Icon */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-50">
                                <img src={logo} alt="Ecomus Logo" className="h-5 w-auto" />
                                <button
                                    onClick={toggleSidebar}
                                    className="p-2 -mr-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-all"
                                    aria-label="Close Sidebar"
                                    id="close-sidebar"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Menu Items List */}
                            <div className="flex-1 overflow-y-auto no-scrollbar py-6">
                                <nav className="px-3">
                                    <ul className="space-y-1">
                                        {menuItems.map((item) => (
                                            <li key={item.name} className="group">
                                                <div className="flex items-center justify-between">
                                                    <Link
                                                        to={item.path || "#"}
                                                        onClick={(e) => {
                                                            if (!item.path) e.preventDefault();
                                                            setActiveItem(item.name);
                                                            if (item.path) toggleSidebar();
                                                        }}
                                                        className={`flex-1 flex items-center gap-4 px-4 py-3.5 transition-all duration-200 ${activeItem === item.name
                                                                ? "bg-white text-black shadow-black/10"
                                                                : "text-gray-700 hover:bg-gray-100"
                                                            }`}
                                                    >

                                                        <span className="text-[15px] font-semibold">{item.name}</span>
                                                    </Link>

                                                    {item.dropdown && (
                                                        <button
                                                            onClick={() => toggleDropdown(item.name)}
                                                            className={`p-3 mr-1 rounded-lg transition-all ${openDropdowns[item.name]
                                                                    ? "bg-white-100 text-black rotate-0"
                                                                    : "text-gray-400 hover:text-black"
                                                                }`}
                                                        >
                                                            {openDropdowns[item.name] ? <Minus size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                                                        </button>
                                                    )}
                                                </div>

                                                {/* 🔽 Dropdown Content (Accordion style) */}
                                                <AnimatePresence>
                                                    {item.dropdown && openDropdowns[item.name] && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: "circOut" }}
                                                            className="overflow-hidden"
                                                        >
                                                            <ul className="mt-1 ml-10 border-l-2 border-gray-100">
                                                                {item.dropdown.map((subItem, idx) => (
                                                                    <li key={subItem.name}>
                                                                        <motion.Link
                                                                            initial={{ x: -10, opacity: 0 }}
                                                                            animate={{ x: 0, opacity: 1 }}
                                                                            transition={{ delay: idx * 0.05 }}
                                                                            to={subItem.path}
                                                                            onClick={toggleSidebar}
                                                                            className="block px-6 py-2.5 text-[14px] text-gray-500 hover:text-black hover:translate-x-1 transition-all"
                                                                        >
                                                                            {subItem.name}
                                                                        </motion.Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                            </li>
                                        ))}
                                    </ul>
                                    <div className="sidebar-buttons flex gap-3">
                                        <button className="flex items-center justify-center gap-3 w-[100px] py-2 px-1 bg-gray-200 text-black hover:bg-gray-800 hover:text-white transition-all active:scale-95">
                                            <Heart size={18} />
                                            Whishlist
                                        </button>
                                        <button 
                                            onClick={() => {
                                                toggleSidebar();
                                                openAuth();
                                            }}
                                            className="flex items-center justify-center gap-3 w-full py-2 bg-gray-200 text-black hover:bg-gray-800 hover:text-white transition-all active:scale-95"
                                        >
                                            <User size={18} />
                                            Login
                                        </button>
                                    </div>
                                    {/* <p>
                                            Need help ?
                                            Address: 1234 Fashion Street, Suite 567,
                                            New York, NY 10001
                                            Email: info@fashionshop.com
                                            Phone: (212) 555-1234
                                        </p> */}

                                </nav>
                            </div>

                            {/* Sidebar Bottom Actions */}
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <div className="space-y-4">
                                    <button 
                                        onClick={() => {
                                            toggleSidebar();
                                            openAuth();
                                        }}
                                        className="flex items-center justify-center gap-3 w-full py-2 bg-black text-white font-bold hover:bg-gray-800 transition-all active:scale-95"
                                    >
                                        <User size={18} />
                                        Login
                                    </button>

                                    <div className="flex items-center justify-center gap-8 py-2 text-gray-400">
                                        <button className="hover:text-red-500 transition-colors">
                                            <Heart size={22} />
                                        </button>
                                        <button className="hover:text-black transition-colors">
                                            <Phone size={22} />
                                        </button>
                                        <div className="w-px h-6 bg-gray-200"></div>
                                        <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                            Follow Us
                                        </div>
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
