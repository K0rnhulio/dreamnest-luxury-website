"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { theme } from "../../styles/theme";
import { FlowerAnimationConfig } from "../../types";

export interface FlowerAnimationProps {
  subtitle?: string;
  className?: string;
  config?: FlowerAnimationConfig;
  scrollYProgress?: MotionValue<number>;
}

// Petal angles for the flower (in degrees)
const PETAL_ANGLES = [0, 60, 120, 180, 240, 300];

/**
 * FlowerAnimation Component
 * 
 * A decorative flower animation that grows and reveals a subtitle as the user scrolls.
 * Can be used independently or as part of the AnimatedScrollSection.
 */
export function FlowerAnimation({ 
  subtitle = "Embrace the journey to your authentic self", 
  className = "",
  config,
  scrollYProgress: externalScrollProgress
}: FlowerAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use external scroll progress if provided, otherwise create our own
  const { scrollYProgress } = externalScrollProgress 
    ? { scrollYProgress: externalScrollProgress } 
    : useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
      });

  // Animation ranges with defaults from theme
  const animationConfig = {
    stemRange: config?.stemRange || theme.animations.scroll.flowerConfig.stemRange,
    petalRange: config?.petalRange || theme.animations.scroll.flowerConfig.petalRange,
    textRange: config?.textRange || theme.animations.scroll.flowerConfig.textRange
  };

  // Animation values
  const stemHeight = useTransform(scrollYProgress, animationConfig.stemRange, ["0%", "100%"]);
  const petalScale = useTransform(scrollYProgress, animationConfig.petalRange, [0, 1]);
  const petalRotate = useTransform(scrollYProgress, animationConfig.petalRange, [0, 360]);
  const subtitleOpacity = useTransform(scrollYProgress, animationConfig.textRange, [0, 1]);
  const subtitleY = useTransform(scrollYProgress, animationConfig.textRange, [20, 0]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full flex flex-col items-center justify-center ${className}`}
    >
      <div className="relative w-full max-w-md h-[300px] flex flex-col items-center justify-end">
        {/* Stem */}
        <FlowerStem height={stemHeight} />
        
        {/* Flower */}
        <FlowerBloom 
          scale={petalScale} 
          rotate={petalRotate}
          className="absolute bottom-[150px]" 
        />
        
        {/* Subtitle */}
        <AnimatedSubtitle 
          text={subtitle} 
          opacity={subtitleOpacity} 
          y={subtitleY} 
        />
      </div>
    </div>
  );
}

// Flower stem component
interface FlowerStemProps {
  height: MotionValue<string>;
}

function FlowerStem({ height }: FlowerStemProps) {
  return (
    <motion.div 
      className="absolute bottom-0 w-[3px]"
      style={{ 
        height, 
        bottom: 0,
        backgroundColor: theme.colors.secondary
      }}
    />
  );
}

// Flower bloom component
interface FlowerBloomProps {
  scale: MotionValue<number>;
  rotate: MotionValue<number>;
  className?: string;
}

function FlowerBloom({ scale, rotate, className = "" }: FlowerBloomProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Center of flower */}
      <motion.div
        className="absolute w-6 h-6 rounded-full z-10"
        style={{ 
          scale,
          backgroundColor: theme.colors.secondary,
          left: "-12px", // Center the element (half of width)
          top: "-12px",  // Center the element (half of height)
        }}
      />
      
      {/* Petals */}
      {PETAL_ANGLES.map((angle, index) => (
        <motion.div
          key={`petal-${index}`}
          className="absolute w-16 h-8"
          style={{
            scale,
            rotate: `${angle}deg`,
            transformOrigin: "center left",
            left: 0,
            top: "-4px", // Half of height to center
          }}
        >
          <motion.div
            className="w-full h-full rounded-full"
            style={{
              backgroundColor: theme.colors.primary,
              opacity: 0.8,
            }}
            animate={{ rotate: rotate.get() }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      ))}
    </div>
  );
}

// Animated subtitle component
interface AnimatedSubtitleProps {
  text: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

function AnimatedSubtitle({ text, opacity, y }: AnimatedSubtitleProps) {
  return (
    <motion.div
      className="absolute text-center mt-20 pt-10 max-w-md"
      style={{ 
        opacity, 
        y,
        fontFamily: theme.fonts.heading,
        color: theme.colors.primary,
      }}
    >
      <p className="text-xl md:text-2xl lg:text-3xl italic">{text}</p>
    </motion.div>
  );
}
