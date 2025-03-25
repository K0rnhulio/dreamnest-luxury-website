"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface EnhancedLuxuryHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
}

export function EnhancedLuxuryHero({
  title = "DreamNest",
  subtitle = "Where Your Dreams Find a Home",
  description = "Awaken your wildest dreams, ignite your sensual power, and reclaim your authentic expression. I guide visionaries like you to break free from societal conditioning and live with unapologetic passion.",
  ctaText = "Begin Your Journey",
  ctaHref = "#services",
  imageSrc,
  imageAlt,
}: EnhancedLuxuryHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.3 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center overflow-hidden bg-gradient-to-r from-[#EEE7E1] to-[#F4F4F4] pt-24 md:pt-16 lg:pt-0"
    >
      {/* Decorative line element */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-[#58463B]/10" />
      <div className="absolute left-1/4 top-0 h-full w-[1px] bg-[#58463B]/5" />
      <div className="absolute right-1/4 top-0 h-full w-[1px] bg-[#58463B]/5" />

      <div className="relative mx-auto grid max-w-7xl w-full grid-cols-1 px-4 md:grid-cols-2 md:px-6">
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center md:pr-8 lg:pr-16">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-2 inline-flex"
          >
            <span 
              className="text-sm uppercase tracking-widest text-[#85614B]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {title}
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-6 text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ 
              fontFamily: "SVN-BonVoyage, serif",
              color: "#58463B" 
            }}
          >
            {subtitle}
          </motion.h1>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="max-w-md"
          >
            <p 
              className="text-base leading-relaxed text-[#58463B]/80 md:text-lg"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {description}
            </p>
          </motion.div>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mt-8"
          >
            <Link
              href={ctaHref}
              className="group inline-flex items-center border-b-2 border-[#85614B] bg-transparent px-0 py-2 text-base font-medium text-[#85614B] transition-all duration-300 hover:border-[#85614B]/70 hover:text-[#85614B]/90"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Image */}
        <div className="relative mt-12 md:mt-0 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            className="relative h-[450px] w-full overflow-hidden md:h-[550px] lg:h-[80vh]"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#85614B]/20 to-transparent" />
            {imageSrc.startsWith('http') || imageSrc.startsWith('/') ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageSrc}`}
                alt={imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute -bottom-4 -left-4 h-24 w-24 border border-[#85614B]/20"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute -right-4 top-4 h-24 w-24 border border-[#85614B]/20"
          />
        </div>
      </div>
    </section>
  );
}
