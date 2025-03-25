'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './button';
import { Glow } from './glow';

interface TargetAudienceSectionProps {
  title: string;
  subtitle: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  benefits: string[];
  ctaText?: string;
  ctaUrl?: string;
  reversed?: boolean;
  theme?: 'light' | 'dark';
}

export function TargetAudienceSection({
  title,
  subtitle,
  description,
  image,
  benefits,
  ctaText = 'Learn More',
  ctaUrl = '#contact',
  reversed = false,
  theme = 'light'
}: TargetAudienceSectionProps) {
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

  const bgColor = theme === 'light' 
    ? "linear-gradient(to right, #EEE7E1, #F4F4F4)" 
    : "linear-gradient(to right, #58463B, #4A3C33)";
  
  const textColor = theme === 'light' ? 'text-[#58463B]' : 'text-[#F4F4F4]';
  const subtitleColor = theme === 'light' ? 'text-[#85614B]' : 'text-[#D0B8A8]';
  const descriptionColor = theme === 'light' ? 'text-neutral-700' : 'text-neutral-200';
  const borderColor = theme === 'light' ? 'border-[#85614B]' : 'border-[#D0B8A8]';
  const buttonVariant = theme === 'light' ? 'default' : 'outline';

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-20 lg:py-32 overflow-hidden" 
      style={{ 
        background: bgColor,
        fontFamily: "DM Sans, sans-serif"
      }}
    >
      <Glow 
        color={theme === 'light' ? '#85614B' : '#D0B8A8'} 
        size={600} 
        opacity={0.07} 
        className={reversed ? 'right-0 top-0' : 'left-0 top-0'} 
      />
      
      <div className="container mx-auto px-6 lg:px-8">
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-16`}>
          {/* Image Column */}
          <div className="w-full lg:w-1/2 reveal-item opacity-0">
            <div className={`relative rounded-lg overflow-hidden ${borderColor} border-2 shadow-lg`}>
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-auto object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
          
          {/* Content Column */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="space-y-3">
              <h3 className={`reveal-item opacity-0 ${subtitleColor} text-lg font-medium`} style={{ fontFamily: "DM Sans, sans-serif" }}>
                {subtitle}
              </h3>
              <h2 className={`reveal-item opacity-0 ${textColor} text-3xl md:text-4xl lg:text-5xl font-bold leading-tight`} style={{ fontFamily: "SVN-BonVoyage, serif" }}>
                {title}
              </h2>
            </div>
            
            <div className={`reveal-item opacity-0 w-16 h-1 ${borderColor} bg-current`}></div>
            
            <p className={`reveal-item opacity-0 ${descriptionColor} text-base md:text-lg leading-relaxed`}>
              {description}
            </p>
            
            <div className="reveal-item opacity-0 space-y-4 pt-4">
              <h4 className={`${textColor} text-xl font-semibold`} style={{ fontFamily: "SVN-BonVoyage, serif" }}>
                What You'll Gain:
              </h4>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className={`flex items-start gap-2 ${descriptionColor}`}>
                    <ArrowRight className={`${subtitleColor} mt-1 h-4 w-4 flex-shrink-0`} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="reveal-item opacity-0 pt-6">
              <Button variant={buttonVariant} className={`${theme === 'dark' ? 'bg-transparent text-[#F4F4F4] border-[#D0B8A8] hover:bg-[#D0B8A8]/10' : ''}`}>
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
