import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Search,
    User,
    Heart,
    ShoppingBag,
    ChevronDown,
    Menu,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.svg";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube
} from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import MegaMenu from "./MegaMenu";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useModal } from "../context/ModalContext";

const menuItems = [
    { name: "Home", hasDropdown: true, path: "/" },
    { name: "Shop", hasDropdown: true, path: "/shop" },
    { name: "Products", hasDropdown: true, path: "/product" },
    { name: "Pages", hasDropdown: true },
    { name: "Blog", hasDropdown: true, path: "/blog" },
    { name: "Buy Now", hasDropdown: false },
];

const dropdownData = {
    Pages: [
        { name: "About us", path: "/about-us" },
        {
            name: "Brands",
            children: ["Brand 1", "Brand 2"]
        },
        {
            name: "Contact",
            path: "/contact"
        },
        {
            name: "FAQ",
            children: ["FAQ 1", "FAQ 2"]
        },
        {
            name: "Store",
            children: ["Store 1", "Store 2"]
        },
        { name: "Timeline" },
        { name: "New" },
        { name: "View cart", path: "/cart" },
        { name: "Check out", path: "/order-success" },
        { name: "Payment" },
        { name: "My account" },
        { name: "Invoice" }
    ],

    Blog: [
        { name: "Grid layout" },
        { name: "Left sidebar" },
        { name: "Right sidebar" },
        { name: "Blog list" },
        { name: "Single Post" }
    ]
};

const Header = ({ currentSlide }) => {
    const { cartCount, setIsCartOpen } = useCart();
    const { wishlistCount } = useWishlist();
    const { openSearch, openAuth } = useModal();
    const [showHeader, setShowHeader] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [hoveredItem, setHoveredItem] = useState(null);
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [languageOpen, setLanguageOpen] = useState(false);

    const [subMenu, setSubMenu] = useState(null);
    const timeoutRef = useRef(null);

    const location = useLocation();
    const isHomepage = location.pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Detect top
            if (currentScrollY === 0) {
                setIsScrolled(false);
                setShowHeader(true);
            } else {
                setIsScrolled(true);
                if (currentScrollY > lastScrollY && currentScrollY > 50) {
                    setShowHeader(false);
                } else if (currentScrollY < lastScrollY) {
                    setShowHeader(true);
                }
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const headerBgClass = (isHomepage && !isScrolled)
        ? "bg-transparent"
        : "bg-white shadow-sm";

    const headerVisibilityClass = showHeader
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0 pointer-events-none";

    const isMegaMenu = (name) => ["Home", "Shop", "Products"].includes(name);

    return (
        <div className="fixed top-0 left-0 w-full z-[100]">
            {/* TOPBAR */}
            <div className={`w-full bg-gray-100 text-sm transition-all duration-300 overflow-hidden ${!isScrolled ? "max-h-20 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
                <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center min-[800px]:justify-between">
                    <div className="hidden min-[800px]:flex items-center gap-3">
                        {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                            <div key={i} className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-200 hover:bg-black hover:text-white transition cursor-pointer">
                                <Icon size={14} />
                            </div>
                        ))}
                    </div>
                    <div className="text-gray-700 font-medium text-center">Time to refresh your wardrobe</div>
                    <div className="hidden min-[800px]:flex items-center gap-6 relative">
                        <div className="relative">
                            <button onClick={() => setCurrencyOpen(!currencyOpen)} className="flex items-center gap-1 hover:text-gray-600">
                                USD <FiChevronDown size={14} />
                            </button>
                            {currencyOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-50">
                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2">🇺🇸 USD</div>
                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2">🇩🇪 Germany</div>
                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-2">🇫🇷 France</div>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button onClick={() => setLanguageOpen(!languageOpen)} className="flex items-center gap-1 hover:text-gray-600">
                                English <FiChevronDown size={14} />
                            </button>
                            {languageOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md py-2 z-50">
                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">English</div>
                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">German</div>
                                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">French</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <header className={`py-4 transition-all duration-300 transform ${headerBgClass} ${headerVisibilityClass} relative z-[100] hidden min-[900px]:block`}>
                <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img src={logo} alt="Ecomus Logo" className="h-6 w-auto cursor-pointer" />
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-8">
                        {menuItems.map((item) => (
                            <div
                                key={item.name}
                                className="relative group"
                                onMouseEnter={() => {
                                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                    setHoveredItem(item.name);
                                }}
                                onMouseLeave={() => {
                                    timeoutRef.current = setTimeout(() => {
                                        setHoveredItem(null);
                                    }, 200);
                                }}
                            >
                                <Link
                                    to={item.path || "#"}
                                    className="flex items-center gap-1 text-[15px] font-semibold text-gray-800 hover:text-black transition-colors py-2 uppercase tracking-wider"
                                >
                                    {item.name}
                                    {item.hasDropdown && (
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${hoveredItem === item.name ? "rotate-180" : ""}`} />
                                    )}
                                </Link>

                                <AnimatePresence>
                                    {item.hasDropdown && hoveredItem === item.name && !isMegaMenu(item.name) && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className={`absolute top-full left-0 pt-2 ${item.name === "Pages" ? "w-64" : "w-48"
                                                } z-50 overflow-visible`}
                                        >
                                            <div className="bg-white border border-gray-100 shadow-xl rounded-lg py-3">
                                            <div className="flex flex-col relative">
                                                {dropdownData[item.name]?.map((menu, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative"
                                                        onMouseEnter={() => setSubMenu(menu.name)}
                                                        onMouseLeave={() => setSubMenu(null)}
                                                    >
                                                        {menu.path ? (
                                                            <Link to={menu.path} className="flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer">
                                                                {menu.name}
                                                            </Link>
                                                        ) : (
                                                            <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer">
                                                                {menu.name}
                                                                {menu.children && <span>›</span>}
                                                            </div>
                                                        )}

                                                        {/* Submenu */}
                                                        {menu.children && subMenu === menu.name && (
                                                            <div className="absolute top-0 left-full w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 z-50">
                                                                {menu.children.map((child, i) => (
                                                                    <div
                                                                        key={i}
                                                                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black cursor-pointer"
                                                                    >
                                                                        {child}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    <div className="flex items-center gap-5">
                        <button 
                            onClick={openSearch}
                            className="text-gray-800 hover:text-black hover:scale-110 transition-all duration-200"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={openAuth}
                            className="text-gray-800 hover:text-black hover:scale-110 transition-all duration-200 hidden md:block"
                        >
                            <User className="w-5 h-5" />
                        </button>
                        <Link to="/wishlist" className="text-gray-800 hover:text-black hover:scale-110 transition-all duration-200 relative">
                            <Heart className={`w-5 h-5 ${wishlistCount > 0 ? "fill-black" : ""}`} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="text-gray-800 hover:text-black hover:scale-110 transition-all duration-200 relative"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button className="lg:hidden text-gray-800"><Menu className="w-6 h-6" /></button>
                    </div>
                </div>
            </header>
            {/* Mega Menu Overlay */}
            <AnimatePresence>
                {hoveredItem && isMegaMenu(hoveredItem) && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0"
                            onMouseEnter={() => setHoveredItem(null)}
                        />
                        <MegaMenu
                            type={hoveredItem}
                            isOpen={true}
                            onMouseEnter={() => {
                                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                            }}
                            onMouseLeave={() => {
                                timeoutRef.current = setTimeout(() => {
                                    setHoveredItem(null);
                                }, 200);
                            }}
                            onClose={() => setHoveredItem(null)}
                            top={isScrolled ? "64px" : "104px"}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;