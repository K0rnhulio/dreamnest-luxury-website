'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from './button';

interface BenefitItem {
  text: string;
}

interface LuxurySplitContentProps {
  badge?: string;
  heading: string;
  subheading: string;
  description: string;
  benefits: BenefitItem[] | string[];
  imageSrc: string;
  imageAlt: string;
  ctaText?: string;
  ctaUrl?: string;
  reversed?: boolean;
  theme?: 'light' | 'dark' | 'navy' | 'charcoal' | 'sage' | 'hero';
  fullHeight?: boolean;
}

export function LuxurySplitContent({
  badge,
  heading,
  subheading,
  description,
  benefits = [],
  imageSrc,
  imageAlt,
  ctaText = 'Learn More',
  ctaUrl = '#contact',
  reversed = false,
  theme = 'light',
  fullHeight = false,
}: LuxurySplitContentProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal-item');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Theme colors
  let bgColor, textColor, subtitleColor, descriptionColor, badgeColor;
  let buttonVariant: 'primary' | 'secondary' | 'outline' | 'ghost';
  let buttonStyle;
  
  if (theme === 'charcoal') {
    bgColor = "bg-gradient-to-r from-[#2D3436] to-[#3B4045]";
    textColor = 'text-[#F4F4F4]';
    subtitleColor = 'text-[#ADB5BD]';
    descriptionColor = 'text-neutral-200';
    badgeColor = 'bg-[#ADB5BD]/10 text-[#ADB5BD] border-[#ADB5BD]/30';
    buttonVariant = 'outline';
    buttonStyle = 'bg-transparent text-[#F4F4F4] border-[#ADB5BD] hover:bg-[#ADB5BD]/10';
  } else if (theme === 'navy') {
    bgColor = "bg-gradient-to-r from-[#1A2A3A] to-[#2C3E50]";
    textColor = 'text-[#F4F4F4]';
    subtitleColor = 'text-[#A3B8CC]';
    descriptionColor = 'text-neutral-200';
    badgeColor = 'bg-[#A3B8CC]/10 text-[#A3B8CC] border-[#A3B8CC]/30';
    buttonVariant = 'outline';
    buttonStyle = 'bg-transparent text-[#F4F4F4] border-[#A3B8CC] hover:bg-[#A3B8CC]/10';
  } else if (theme === 'dark') {
    bgColor = "bg-gradient-to-r from-[#58463B] to-[#4A3C33]";
    textColor = 'text-[#F4F4F4]';
    subtitleColor = 'text-[#D0B8A8]';
    descriptionColor = 'text-neutral-200';
    badgeColor = 'bg-[#D0B8A8]/10 text-[#D0B8A8] border-[#D0B8A8]/30';
    buttonVariant = 'outline';
    buttonStyle = 'bg-transparent text-[#F4F4F4] border-[#D0B8A8] hover:bg-[#D0B8A8]/10';
  } else if (theme === 'sage') {
    bgColor = "bg-gradient-to-r from-[#8B9467] to-[#788F4C]";
    textColor = 'text-[#F4F4F4]';
    subtitleColor = 'text-[#C9E4CA]';
    descriptionColor = 'text-neutral-200';
    badgeColor = 'bg-[#C9E4CA]/10 text-[#C9E4CA] border-[#C9E4CA]/30';
    buttonVariant = 'outline';
    buttonStyle = 'bg-transparent text-[#F4F4F4] border-[#C9E4CA] hover:bg-[#C9E4CA]/10';
  } else if (theme === 'hero') {
    bgColor = "bg-gradient-to-r from-[#EEE7E1] to-[#F4F4F4]";
    textColor = 'text-[#58463B]';
    subtitleColor = 'text-[#85614B]';
    descriptionColor = 'text-[#58463B]/80';
    badgeColor = 'bg-[#85614B]/10 text-[#85614B] border-[#85614B]/30';
    buttonVariant = 'primary';
    buttonStyle = '';
  } else {
    // Light theme (default)
    bgColor = "bg-gradient-to-r from-[#F4F4F4] to-[#EEE7E1]";
    textColor = 'text-[#58463B]';
    subtitleColor = 'text-[#85614B]';
    descriptionColor = 'text-neutral-700';
    badgeColor = 'bg-[#85614B]/10 text-[#85614B] border-[#85614B]/30';
    buttonVariant = 'primary';
    buttonStyle = '';
  }

  return (
    <section 
      ref={sectionRef}
      className={`w-full ${fullHeight ? 'min-h-screen h-screen' : ''} flex items-center justify-center ${bgColor} overflow-hidden`}
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center`}>
          {/* Image Column */}
          <div className="w-full lg:w-1/2 reveal-item opacity-0">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img 
                src={imageSrc} 
                alt={imageAlt} 
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-6">
            {badge && (
              <div className="reveal-item opacity-0">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase ${badgeColor}`}>
                  {badge}
                </span>
              </div>
            )}
            
            <div className="space-y-3">
              <h3 className={`reveal-item opacity-0 ${subtitleColor} text-lg font-medium`}>
                {subheading}
              </h3>
              <h2 className={`reveal-item opacity-0 ${textColor} text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight`} style={{ fontFamily: "SVN-BonVoyage, serif" }}>
                {heading}
              </h2>
            </div>
            
            <p className={`reveal-item opacity-0 ${descriptionColor} text-base md:text-lg leading-relaxed`}>
              {description}
            </p>
            
            {benefits.length > 0 && (
              <div className="reveal-item opacity-0 space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => {
                    const benefitText = typeof benefit === 'string' ? benefit : benefit.text;
                    return (
                      <div key={index} className={`flex items-start gap-3 ${descriptionColor}`}>
                        <div className={`mt-1 flex-shrink-0 rounded-full p-1 ${
                          theme === 'light' ? 'bg-[#85614B]/10' : 
                          theme === 'navy' ? 'bg-[#A3B8CC]/10' : 
                          theme === 'charcoal' ? 'bg-[#ADB5BD]/10' : 
                          theme === 'sage' ? 'bg-[#C9E4CA]/10' : 
                          theme === 'hero' ? 'bg-[#FFC107]/10' : 
                          'bg-[#D0B8A8]/10'
                        }`}>
                          <Check className={`h-4 w-4 ${subtitleColor}`} />
                        </div>
                        <span>{benefitText}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="reveal-item opacity-0 pt-6">
              <Button variant={buttonVariant} className={buttonStyle}>
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
