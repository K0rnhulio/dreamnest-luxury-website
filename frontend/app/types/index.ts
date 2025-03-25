/**
 * DreamNest Type Definitions
 * 
 * Centralized type definitions for the DreamNest website
 */

// Animation configuration types
export interface AnimationConfig {
  headingRange?: [number, number];
  subtitleRange?: [number, number];
  chevronRange?: [number, number];
  lineRange?: [number, number];
  secondarySubtitleRange?: [number, number];
  flowerConfig?: FlowerAnimationConfig;
  lineDelay?: number;
  lineSpeed?: number;
  buzzwordDelay?: number;
  buzzwordSpeed?: number;
}

export interface FlowerAnimationConfig {
  stemRange?: [number, number];
  petalRange?: [number, number];
  textRange?: [number, number];
}

// Content types for Strapi integration
export interface HeroContent {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface ScrollIntroContent {
  heading: string;
  subtitle: string;
  secondarySubtitle?: string;
  flowerSubtitle?: string; // Keeping for backward compatibility
  buzzwords?: string[]; // Keeping for backward compatibility
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  link?: string;
  featured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  quote: string;
  image?: string;
  rating?: number;
}

export interface AboutContent {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  highlights?: string[];
}

export interface TargetAudienceContent {
  title: string;
  description: string;
  image?: string;
  benefits?: string[];
  ctaText?: string;
  ctaLink?: string;
}

// UI Component Props
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface SectionProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
}
