import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import slide01 from "../assets/slideshow-01.jpg";
import slide02 from "../assets/slideshow-02.jpg";
import slide03 from "../assets/slideshow-03.jpg";

const slides = [
    {
        id: 1,
        image: slide01,
        title: (<>Glamourous <br />Glam</>),
        description: "Discover our curated selection of high-quality essentials designed for modern living.",
        buttonText: "Shop Collection",
    },
    {
        id: 2,
        image: slide02,
        title: (<>Simple<br />Style</>),
        description: "Experience the perfect blend of style and comfort with our latest arrivals.",
        buttonText: "Explore Now",
    },
    {
        id: 3,
        image: slide03,
        title: (<>Luxury<br />Defined</>),
        description: "Elevate your wardrobe with our exclusive limited edition pieces.",
        buttonText: "View Catalog",
    },
];

const Herosection = ({ currentSlide = 0, setCurrentSlide }) => {
    const current = currentSlide;
    const setCurrent = setCurrentSlide || (() => { });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <>
            <section className="relative w-full h-[calc(100vh)] min-h-[600px] overflow-hidden bg-gray-100 mt-11">

                {/* Slides Container */}
                <div className="absolute inset-0 w-full h-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <img
                                src={slides[current].image}
                                alt={slides[current].title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-12 flex items-center">
                    <div className="max-w-[700px] text-black">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <span className="inline-block text-sm md:text-base font-semibold tracking-widest uppercase mb-4 text-white/90">
                                    {slides[current].subtitle}
                                </span>
                                <h1 className="text-3xl md:text-6xl lg:text-7xl leading-tight mb-6">
                                    {slides[current].title}
                                </h1>
                                <p className="hidden min-[780px]:block text-lg md:text-xl text-black/80 mb-10 max-w-lg leading-relaxed">
                                    {slides[current].description}
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group flex items-center gap-3 bg-black text-white px-8 py-4 font-bold text-sm md:text-base transition-all hover:bg-white hover:text-black"
                                >
                                    {slides[current].buttonText}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Controls: Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`transition-all duration-500 rounded-full ${current === index ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
                                } h-1.5`}
                        />
                    ))}
                </div>

                {/* Controls: Arrows (Optional but professional) */}
                <div className="absolute inset-y-0 left-4 md:left-8 flex items-center z-20">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-black/10 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>
                <div className="absolute inset-y-0 right-4 md:right-8 flex items-center z-20">
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-black/10 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

            </section>

            {/* MOVING ANNOUNCEMENT BAR */}
            <div className="w-full bg-[#FCFFB2] overflow-hidden">
                <div className="marquee-wrapper">
                    <div className="marquee-track">
                        <span>Spring Clearance Event: Save Up to 70%</span>
                        <span>Spring Clearance Event: Save Up to 70%</span>
                        <span>Spring Clearance Event: Save Up to 70%</span>

                        {/* Duplicate (IMPORTANT for seamless loop) */}
                        <span>Spring Clearance Event: Save Up to 70%</span>
                        <span>Spring Clearance Event: Save Up to 70%</span>
                        <span>Spring Clearance Event: Save Up to 70%</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Herosection;