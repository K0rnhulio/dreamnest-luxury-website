"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { theme } from "../../styles/theme";
import { cn } from "../../utils/cn";
import { ScrollIntroContent, AnimationConfig } from "../../types";

// Default values
const DEFAULT_HEADING = "Awaken your authentic expression";
const DEFAULT_SUBTITLE = "Discover the transformative power of breathwork and coaching to unlock your full potential.";
const DEFAULT_SECONDARY_SUBTITLE = "Embrace the journey to your authentic self";

interface AnimatedScrollSectionProps {
  content?: ScrollIntroContent;
  heading?: string;
  subtitle?: string;
  buzzwords?: string[];
  className?: string;
  config?: AnimationConfig;
  id?: string;
}

/**
 * AnimatedScrollSection Component
 * 
 * A luxury scroll-based animation section that reveals content as the user scrolls,
 * featuring an elegant vertical line animation with a secondary subtitle.
 * All elements animate when they enter the viewport for a more engaging experience.
 */
export function AnimatedScrollSection({
  content,
  heading,
  subtitle,
  buzzwords,
  className = "",
  config = {},
  id = "scroll-intro"
}: AnimatedScrollSectionProps) {
  // References for animation elements
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineContainerRef = useRef<HTMLDivElement>(null);
  const secondarySubtitleRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Check if elements are in view
  const isHeadingInView = useInView(headingRef, { 
    once: true,
    margin: "-10% 0px -10% 0px" 
  });
  
  const isSubtitleInView = useInView(subtitleRef, { 
    once: true,
    margin: "-10% 0px -10% 0px" 
  });
  
  const isLineInView = useInView(lineContainerRef, { 
    once: true,
    margin: "-20% 0px -20% 0px" 
  });
  
  const isSecondarySubtitleInView = useInView(secondarySubtitleRef, { 
    once: true,
    margin: "-20% 0px -20% 0px" 
  });
  
  const isScrollIndicatorInView = useInView(scrollIndicatorRef, { 
    once: true,
    margin: "0px 0px 0px 0px" 
  });
  
  // Animation config
  const animationConfig = {
    lineDelay: config?.lineDelay || 0.5,
    lineSpeed: config?.lineSpeed || 3,
    buzzwordDelay: config?.buzzwordDelay || 0.1,
    buzzwordSpeed: config?.buzzwordSpeed || 0.5,
    ...config
  };
  
  // Content values
  const headingValue = heading || content?.heading || DEFAULT_HEADING;
  const subtitleValue = subtitle || content?.subtitle || DEFAULT_SUBTITLE;
  const secondarySubtitle = content?.secondarySubtitle || content?.flowerSubtitle || DEFAULT_SECONDARY_SUBTITLE;
  const buzzwordsValue = buzzwords || content?.buzzwords || [];
  
  return (
    <section 
      id={id}
      ref={containerRef}
      className={cn("relative overflow-hidden min-h-screen py-16 md:py-24 lg:h-screen flex items-center justify-center", className)}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2 
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-7xl text-center mb-8"
          style={{ 
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {headingValue}
        </motion.h2>
        
        <motion.p 
          ref={subtitleRef}
          className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl mx-auto mb-8"
          style={{ 
            fontFamily: theme.fonts.body,
            color: theme.colors.primary
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isSubtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {subtitleValue}
        </motion.p>
        
        <div className="relative flex justify-center items-center mt-12 h-[50vh]">
          {/* Vertical Line Animation */}
          <div ref={lineContainerRef} className="relative h-[300px] flex justify-center">
            <div className="absolute w-[2px] h-full bg-[#EEE7E1]">
              <motion.div
                className="w-full origin-top"
                style={{ 
                  height: "100%",
                  backgroundColor: theme.colors.secondary
                }}
                initial={{ scaleY: 0 }}
                animate={isLineInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ 
                  duration: animationConfig.lineSpeed, 
                  ease: "easeOut", 
                  delay: animationConfig.lineDelay 
                }}
              />
            </div>
            
            {/* Buzzwords that appear as the line grows */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between items-start py-4">
              {buzzwordsValue.map((word, index) => (
                <motion.div
                  key={`buzzword-${index}`}
                  className="text-[#58463B]/80 text-sm font-medium pl-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isLineInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ 
                    duration: animationConfig.buzzwordSpeed, 
                    delay: animationConfig.lineDelay + (index * animationConfig.buzzwordDelay) 
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Secondary Subtitle - Positioned below the line */}
          <motion.div
            ref={secondarySubtitleRef}
            className="absolute left-1/2 transform -translate-x-1/2 text-center"
            style={{ 
              top: "calc(50% + 180px)",
              width: "100%",
              maxWidth: "90vw"
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isSecondarySubtitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut", 
              delay: 0.8 
            }}
          >
            <p 
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl italic leading-relaxed px-8 py-4"
              style={{ 
                fontFamily: theme.fonts.heading,
                color: theme.colors.primary
              }}
            >
              {secondarySubtitle}
            </p>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 1, y: 0 }}
        animate={isScrollIndicatorInView ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ChevronDown 
          size={32} 
          className="animate-bounce text-[#85614B]" 
        />
        <div className="text-xs text-center mt-2 text-[#85614B] uppercase tracking-widest">
          Scroll
        </div>
      </motion.div>
    </section>
  );
}
