"use client";

import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { cn } from "../../utils/cn";

export interface BentoServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  featured?: boolean;
}

interface BentoGridProps {
  heading: string;
  tagline: string;
  items: BentoServiceItem[];
  className?: string;
}

export function BentoGrid({
  heading,
  tagline,
  items,
  className,
}: BentoGridProps) {
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

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 auto-rows-[minmax(240px,auto)]">
          {items.map((item, index) => (
            <BentoCard 
              key={item.id} 
              item={item} 
              index={index}
              // First item is featured and spans 2 rows and 4 columns
              featured={index === 0}
              // Alternate layout for visual interest
              className={
                index === 0 ? "md:col-span-4 md:row-span-2" :
                index === 1 ? "md:col-span-2 md:row-span-1" :
                index === 2 ? "md:col-span-2 md:row-span-1" :
                index === 3 ? "md:col-span-3 md:row-span-1" :
                index === 4 ? "md:col-span-3 md:row-span-1" :
                "md:col-span-2 md:row-span-1"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface BentoCardProps {
  item: BentoServiceItem;
  index: number;
  featured?: boolean;
  className?: string;
}

function BentoCard({ item, index, featured = false, className }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300",
        className
      )}
    >
      {/* Image with gradient overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6 justify-end">
        <div className="transform-gpu transition-all duration-300 group-hover:translate-y-[-8px]">
          <h3 
            className={cn(
              "mb-2 text-white",
              featured ? "text-3xl md:text-4xl" : "text-2xl"
            )}
            style={{ 
              fontFamily: "SVN-BonVoyage, serif",
            }}
          >
            {item.title}
          </h3>
          
          <p 
            className="text-white/90 font-medium mb-3"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            {item.subtitle}
          </p>
          
          {featured && (
            <p 
              className="text-white/80 mb-6 max-w-md hidden md:block"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {item.description}
            </p>
          )}
          
          <Link
            href={item.link}
            className="group inline-flex items-center border-b-2 border-[#85614B] bg-transparent px-0 py-2 text-base font-medium text-white transition-all duration-300 hover:border-white"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Find out more
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none group-hover:border-[#85614B]/50 transition-all duration-300" />
    </motion.div>
  );
}
