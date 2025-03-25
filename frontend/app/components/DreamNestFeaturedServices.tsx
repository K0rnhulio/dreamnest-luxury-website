'use client';

import { useEffect, useState } from 'react';
import { fetchCollection } from '../services/api';
import { BentoGrid, BentoServiceItem } from './ui/bento-grid';

// Define default services to use as fallback
const defaultServices: BentoServiceItem[] = [
  {
    id: '1',
    title: 'Relationship Breakthrough',
    subtitle: 'Transform Your Connections',
    description: 'A transformative coaching program to help you overcome relationship challenges and create deeper connections.',
    image: '/images/relationship-breakthrough.jpg',
    link: '#contact',
    featured: true
  },
  {
    id: '2',
    title: 'Intimacy Mastery',
    subtitle: 'Deepen Your Connection',
    description: 'Develop the skills and confidence to create profound intimacy and connection in your relationships.',
    image: '/images/intimacy-mastery.jpg',
    link: '#contact',
    featured: false
  },
  {
    id: '3',
    title: 'Sexual Confidence',
    subtitle: 'Embrace Your Desires',
    description: 'Overcome blocks, heal past wounds, and step into your full sexual expression with confidence.',
    image: '/images/sexual-confidence.jpg',
    link: '#contact',
    featured: false
  },
  {
    id: '4',
    title: 'Breathwork Sessions',
    subtitle: 'Heal Through Breath',
    description: 'Guided breathwork to release trauma, reduce anxiety, and connect with your authentic self.',
    image: '/images/breathwork.jpg',
    link: '#contact',
    featured: false
  },
  {
    id: '5',
    title: 'Couples Coaching',
    subtitle: 'Reignite Your Passion',
    description: 'Rebuild trust, improve communication, and reignite passion in your relationship.',
    image: '/images/couples-coaching.jpg',
    link: '#contact',
    featured: false
  }
];

export default function DreamNestFeaturedServices() {
  const [services, setServices] = useState<BentoServiceItem[]>(defaultServices);
  const [heading, setHeading] = useState('ready to bring your a-game, baby?');
  const [tagline, setTagline] = useState('Explore transformative experiences designed to awaken your authentic expression and deepen your connection with yourself and others.');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        // Use fetchCollection instead of fetchContentType
        const response = await fetchCollection('featuredServices', { populate: '*' });
        console.log('Featured services response:', response);
        
        if (Array.isArray(response) && response.length > 0) {
          // Map the response to match BentoServiceItem structure
          const servicesData = response.map((item: any) => ({
            id: item.id.toString(),
            title: item.title || 'Service',
            subtitle: item.subtitle || 'Transformative Experience',
            description: item.description || '',
            image: item.image?.url || '/images/placeholder.jpg',
            link: item.link || '#contact',
            featured: item.featured || false
          }));
          
          setServices(servicesData);
          
          // Check if we have heading and tagline in the response
          if (response[0]?.section_heading) {
            setHeading(response[0].section_heading);
          }
          
          if (response[0]?.section_tagline) {
            setTagline(response[0].section_tagline);
          }
          
          setError(null);
        } else {
          console.log('Using default services as fallback');
          // Keep using the default services
        }
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(`${err instanceof Error ? err.message : 'Failed to load services'}`);
        // Keep using the default services
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#85614B]"></div>
      </div>
    );
  }

  return (
    <BentoGrid
      heading={heading}
      tagline={tagline}
      items={services}
      className=""
    />
  );
}
