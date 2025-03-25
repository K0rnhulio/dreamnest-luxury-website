"use client";

import { useEffect, useState } from 'react';
import { fetchSingleType } from '../services/api';
import { AnimatedScrollSection } from './ui/animated-scroll-section';

// Default content as fallback
const defaultHeading = "Awaken your authentic expression";
const defaultSubtitle = "Discover transformative experiences designed to deepen your connection with yourself and others, guided by expert coaching that honors your unique journey.";
const defaultBuzzwords = ["Authentic", "Empowered", "Connected", "Awakened", "Transformed", "Liberated"];

interface DreamNestScrollIntroProps {
  className?: string;
}

export default function DreamNestScrollIntro({ className = "" }: DreamNestScrollIntroProps) {
  const [heading, setHeading] = useState(defaultHeading);
  const [subtitle, setSubtitle] = useState(defaultSubtitle);
  const [buzzwords, setBuzzwords] = useState(defaultBuzzwords);

  useEffect(() => {
    // Fetch content from Strapi
    const fetchData = async () => {
      try {
        const data = await fetchSingleType('scrollIntro');
        if (data && data.length > 0) {
          const content = data[0];
          if (content.heading) setHeading(content.heading);
          if (content.subtitle) setSubtitle(content.subtitle);
          if (content.buzzwords) setBuzzwords(content.buzzwords);
        }
      } catch (error) {
        console.error('Error fetching scroll intro content:', error);
        // Use default content on error
      }
    };

    fetchData();
  }, []);

  return (
    <AnimatedScrollSection
      heading={heading}
      subtitle={subtitle}
      buzzwords={buzzwords}
      className={`bg-gradient-to-b from-[#F4F4F4] to-[#EEE7E1] ${className}`}
    />
  );
}
