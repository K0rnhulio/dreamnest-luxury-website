"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

interface ServicesGridProps {
  heading: string;
  tagline: string;
  items: ServiceItem[];
  className?: string;
}

export function ServicesGrid({
  heading,
  tagline,
  items,
  className,
}: ServicesGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section 
      className={`relative bg-gradient-to-r from-[#EEE7E1] to-[#F4F4F4] py-16 md:py-24 ${className}`}
      id="featured-services"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Section heading */}
        <div className="max-w-3xl mb-12 md:mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{ 
              fontFamily: "SVN-BonVoyage, serif",
              color: "#58463B" 
            }}
          >
            {heading}
          </h2>
          <p 
            className="text-lg md:text-xl text-[#58463B]/80"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {tagline}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Image container */}
              <div className="relative h-64 w-full overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
              
              {/* Content */}
              <div className="relative p-6 flex flex-col flex-grow">
                <h3 
                  className="text-2xl mb-2"
                  style={{ 
                    fontFamily: "SVN-BonVoyage, serif",
                    color: "#58463B" 
                  }}
                >
                  {item.title}
                </h3>
                <p 
                  className="text-[#58463B]/90 font-medium mb-3"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {item.subtitle}
                </p>
                
                <p 
                  className="text-[#58463B]/70 mb-6 text-sm flex-grow"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  {item.description}
                </p>
                
                <Link
                  href={item.link}
                  className="group inline-flex items-center border-b-2 border-[#85614B] bg-transparent px-0 py-2 text-base font-medium text-[#85614B] transition-all duration-300 hover:border-[#58463B] hover:text-[#58463B]"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Find out more
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* Hover effect */}
              <motion.div 
                className="absolute inset-0 border-2 border-transparent rounded-lg pointer-events-none"
                animate={{ 
                  borderColor: activeIndex === index ? "#85614B" : "transparent",
                  scale: activeIndex === index ? 1 : 0.98
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
