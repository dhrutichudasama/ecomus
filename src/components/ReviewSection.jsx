import React, { useRef } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import brand1 from "../assets/brand-01.png";
import brand2 from "../assets/brand-02.png";
import brand3 from "../assets/brand-03.png";
import brand4 from "../assets/brand-04.png";
import brand5 from "../assets/brand-05.png";
import brand6 from "../assets/brand-06.png";

const reviews = [
    {
        id: 1,
        title: "Best Online Fashion Site",
        text: "I always find something stylish and affordable on this web fashion site.",
        name: "Robert Smith",
        location: "Customer from USA",
        product: "Jersey thong body",
        price: "$105.95",
        image: product1,
    },
    {
        id: 2,
        title: "Great Selection and Quality",
        text: "I love the variety of styles and the high-quality clothing on this web fashion site.",
        name: "Allen Lyn",
        location: "Customer from France",
        product: "Cotton jersey top",
        price: "$7.95",
        image: product2,
    },
    {
        id: 3,
        title: "Best Customer Service",
        text: "I finally found a web fashion site with stylish and flattering options in my size.",
        name: "Peter Rope",
        location: "Customer from USA",
        product: "Ribbed modal T-shirt",
        price: "From $18.95",
        image: product3,
    },
    {
        id: 4,
        title: "Amazing Experience",
        text: "The shopping experience was smooth and delivery was super fast!",
        name: "Emily Clark",
        location: "Customer from UK",
        product: "Classic white shirt",
        price: "$29.99",
        image: product4,
    },
];

export default function ReviewSection() {
    const scrollRef = useRef();

    const scroll = (direction) => {
        const { current } = scrollRef;
        const scrollAmount = current.offsetWidth / 3; // 1 card scroll
        current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <section className="px-6 lg:px-12 py-12 bg-white">
            <h2 className="text-4xl font-semibold text-center mb-2">
                Happy Clients
            </h2>
            <p className='text-center text-gray-500 mb-10'>Hear what they say about us</p>

            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-transparent border rounded-full p-2 shadow"
                >
                    <FiArrowLeft />
                </button>

                {/* Slider */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar"
                >
                    {reviews.map((item) => (
                        <div
                            key={item.id}
                            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[33.33%] border rounded-xl p-6 bg-white min-h-[420px] flex flex-col justify-between"
                        >
                            {/* Stars */}
                            <div className="flex text-orange-500 mb-3">
                                {"★★★★★".split("").map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>

                            {/* Text */}
                            <p className="text-gray-600 mb-4">"{item.text}"</p>

                            {/* Name */}
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-400 mb-4">
                                {item.location}
                            </p>

                            <hr className="mb-4" />

                            {/* Product */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image}
                                        alt=""
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                    <div>
                                        <p className="text-sm">{item.product}</p>
                                        <p className="font-medium">{item.price}</p>
                                    </div>
                                </div>

                                <button className="border rounded-full p-2 hover:bg-black hover:text-white">
                                    <FiArrowUpRight />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-transparent border rounded-full p-2 shadow"
                >
                    <FiArrowRight />
                </button>
            </div>
            {/* BRAND LOGOS SECTION */}
<div className="mt-16">
  <div className="border border-gray-300 overflow-hidden">
    
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
      
      <div className="flex items-center justify-center h-[100px] border-r border-b lg:border-b-0">
        <img src={brand1} alt="brand" className="h-14 object-contain" />
      </div>

      <div className="flex items-center justify-center h-[100px] border-r border-b lg:border-b-0">
        <img src={brand2} alt="brand" className="h-14 object-contain" />
      </div>

      <div className="flex items-center justify-center h-[100px] border-r border-b sm:border-b-0">
        <img src={brand3} alt="brand" className="h-14 object-contain" />
      </div>

      <div className="flex items-center justify-center h-[100px] border-r">
        <img src={brand4} alt="brand" className="h-14 object-contain" />
      </div>

      <div className="flex items-center justify-center h-[100px]">
        <img src={brand5} alt="brand" className="h-14 object-contain" />
      </div>

      <div className="flex items-center justify-center h-[100px]">
        <img src={brand6} alt="brand" className="h-14 object-contain" />
      </div>
    </div>

  </div>
</div>
        </section>

    );
}