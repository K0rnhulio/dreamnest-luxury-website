'use client';

import { useEffect, useState } from 'react';
import { fetchSingleType } from '../services/api';
import { EnhancedLuxuryHero } from './ui/enhanced-luxury-hero';

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  heroImage: {
    url: string;
    alternativeText?: string;
  };
}

export default function DreamNestHero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setIsLoading(true);
        const response = await fetchSingleType('hero', { populate: '*' });
        console.log('Hero response:', response);
        
        if (response && response.data) {
          // Handle different response structures
          const data = response.data.attributes || response.data;
          
          setHeroData({
            title: data.title || data.Title || 'DreamNest',
            subtitle: data.subtitle || data.Subtitle || 'Where Your Dreams Find a Home',
            description: data.description || data.Description || 'Awaken your wildest dreams, ignite your sensual power, and reclaim your authentic expression. I guide visionaries like you to break free from societal conditioning and live with unapologetic passion.',
            ctaText: data.ctaText || data.CtaText || 'Begin Your Journey',
            ctaUrl: data.ctaUrl || data.CtaUrl || '#services',
            heroImage: data.heroImage?.data ? {
              url: data.heroImage.data.attributes?.url || '',
              alternativeText: data.heroImage.data.attributes?.alternativeText || 'Lena from DreamNest'
            } : {
              url: '/images/hero-image.jpg',
              alternativeText: 'Lena from DreamNest'
            }
          });
          setError(null);
        } else {
          console.error('Unexpected hero response structure:', response);
          // Fallback to default data
          setHeroData({
            title: 'DreamNest',
            subtitle: 'Where Your Dreams Find a Home',
            description: 'Awaken your wildest dreams, ignite your sensual power, and reclaim your authentic expression. I guide visionaries like you to break free from societal conditioning and live with unapologetic passion.',
            ctaText: 'Begin Your Journey',
            ctaUrl: '#services',
            heroImage: {
              url: '/images/hero-image.jpg',
              alternativeText: 'Lena from DreamNest'
            }
          });
        }
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError(`${err instanceof Error ? err.message : 'Failed to load hero data'}`);
        // Fallback to default data
        setHeroData({
          title: 'DreamNest',
          subtitle: 'Where Your Dreams Find a Home',
          description: 'Awaken your wildest dreams, ignite your sensual power, and reclaim your authentic expression. I guide visionaries like you to break free from societal conditioning and live with unapologetic passion.',
          ctaText: 'Begin Your Journey',
          ctaUrl: '#services',
          heroImage: {
            url: '/images/hero-image.jpg',
            alternativeText: 'Lena from DreamNest'
          }
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center" style={{ background: "linear-gradient(to right, #EEE7E1, #F4F4F4)" }}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#85614B]"></div>
      </div>
    );
  }

  return (
    <EnhancedLuxuryHero
      title={heroData?.title || 'DreamNest'}
      subtitle={heroData?.subtitle || 'Where Your Dreams Find a Home'}
      description={heroData?.description || 'Awaken your wildest dreams, ignite your sensual power, and reclaim your authentic expression.'}
      ctaText={heroData?.ctaText || 'Begin Your Journey'}
      ctaHref={heroData?.ctaUrl || '#services'}
      imageSrc={heroData?.heroImage?.url || '/images/hero-image.jpg'}
      imageAlt={heroData?.heroImage?.alternativeText || 'Lena from DreamNest'}
    />
  );
}
