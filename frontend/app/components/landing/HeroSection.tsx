'use client';

import { useEffect, useState } from 'react';
import { fetchSingleType } from '../../services/api';
import { NormalizedPost } from '../../utils/strapiAdapter';

interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage?: {
    url: string;
    alternativeText?: string;
  };
  buttonText: string;
  buttonLink: string;
}

export default function HeroSection() {
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
            title: data.title || data.Title || 'Welcome to Our Website',
            subtitle: data.subtitle || data.Subtitle || 'Discover our amazing services',
            backgroundImage: data.backgroundImage?.data ? {
              url: data.backgroundImage.data.attributes?.url || '',
              alternativeText: data.backgroundImage.data.attributes?.alternativeText || ''
            } : undefined,
            buttonText: data.buttonText || data.ButtonText || 'Learn More',
            buttonLink: data.buttonLink || data.ButtonLink || '#services'
          });
          setError(null);
        } else {
          console.error('Unexpected hero response structure:', response);
          // Fallback to default data
          setHeroData({
            title: 'Welcome to Our Website',
            subtitle: 'Discover our amazing services',
            buttonText: 'Learn More',
            buttonLink: '#services'
          });
        }
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError(`${err instanceof Error ? err.message : 'Failed to load hero data'}`);
        // Fallback to default data
        setHeroData({
          title: 'Welcome to Our Website',
          subtitle: 'Discover our amazing services',
          buttonText: 'Learn More',
          buttonLink: '#services'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (isLoading) {
    return (
      <div className="h-96 flex justify-center items-center bg-gray-100">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="relative h-[600px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {heroData?.backgroundImage?.url ? (
          <img 
            src={`${heroData.backgroundImage.url.startsWith('http') ? '' : 'http://localhost:1337'}${heroData.backgroundImage.url}`} 
            alt={heroData.backgroundImage.alternativeText || 'Hero background'} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        )}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{heroData?.title}</h1>
          <p className="text-xl md:text-2xl mb-8">{heroData?.subtitle}</p>
          <a 
            href={heroData?.buttonLink} 
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            {heroData?.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
