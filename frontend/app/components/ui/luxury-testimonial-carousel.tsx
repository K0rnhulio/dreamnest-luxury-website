"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/app/utils/cn";

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  image?: string;
  rating: number;
};

interface LuxuryTestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  className?: string;
}

export function LuxuryTestimonialCarousel({
  testimonials,
  autoplay = true,
  autoplaySpeed = 5000,
  className,
}: LuxuryTestimonialCarouselProps) {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, autoplaySpeed);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplaySpeed]);

  return (
    <div className={cn("max-w-6xl mx-auto px-4 py-8", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        {/* Image Column */}
        <div className="md:col-span-5 order-2 md:order-1">
          <div className="relative h-[400px] w-full">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => (
                index === active && (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-lg">
                      {testimonial.image ? (
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#85614B]/20 to-[#85614B]/40 flex items-center justify-center">
                          <Quote size={64} className="text-[#85614B]/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Column */}
        <div className="md:col-span-7 order-1 md:order-2">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              index === active && (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={cn(
                          "mr-1",
                          i < testimonial.rating
                            ? "text-[#85614B] fill-[#85614B]"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>

                  <blockquote className="mb-6">
                    <p className="text-xl md:text-2xl font-light leading-relaxed text-[#58463B]" style={{ fontFamily: "SVN-BonVoyage, serif" }}>
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  <div className="mt-auto">
                    <p className="font-medium text-lg text-[#58463B]">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-[#85614B]">{testimonial.role}</p>
                    )}
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between mt-8">
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === active
                      ? "w-8 bg-[#85614B]"
                      : "w-2 bg-[#85614B]/30 hover:bg-[#85614B]/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="h-10 w-10 rounded-full border border-[#EEE7E1] flex items-center justify-center text-[#58463B] hover:bg-[#EEE7E1] transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="h-10 w-10 rounded-full border border-[#EEE7E1] flex items-center justify-center text-[#58463B] hover:bg-[#EEE7E1] transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
