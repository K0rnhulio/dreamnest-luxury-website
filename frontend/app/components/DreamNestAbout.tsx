'use client';

import { useEffect, useState } from 'react';
import { fetchSingleType } from '../services/api';
import { AboutSection } from './ui/about-section';

interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  image: {
    url: string;
    alternativeText?: string;
  };
  specialties: string[];
}

export default function DreamNestAbout() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setIsLoading(true);
        const response = await fetchSingleType('about', { populate: '*' });
        console.log('About response:', response);
        
        if (response && response.data) {
          const data = response.data.attributes || response.data;
          
          setAboutData({
            title: data.title || data.Title || 'About Me',
            subtitle: data.subtitle || data.Subtitle || 'Guiding You to Sensual Freedom',
            description: data.description || data.Description || 'Lena Weisinger is a Sex, Love & Relationship Coach trained under Layla Martin\'s renowned VITA method. Her journey into this work was deeply personal - she spent years unraveling societal conditioning around sexuality, power, and intimacy, learning firsthand what it means to reclaim desire as a source of strength rather than shame. She now guides others on that same path, helping them break free from limiting patterns and step into a fully embodied, confident, and connected way of loving.',
            image: data.image?.data ? {
              url: data.image.data.attributes?.url || '',
              alternativeText: data.image.data.attributes?.alternativeText || 'Lena from DreamNest'
            } : {
              url: '/images/about-image.jpg',
              alternativeText: 'Lena from DreamNest'
            },
            specialties: data.specialties?.data ? 
              data.specialties.data.map((specialty: any) => specialty.attributes.name || specialty.name) : 
              [
                'Sex, Love & Relationship Coaching',
                'VITA Method Certified',
                'Emotional Intelligence Development',
                'Sexual Confidence Building',
                'Trauma-Informed Practices'
              ]
          });
          setError(null);
        } else {
          console.error('Unexpected about response structure:', response);
          setAboutData({
            title: 'About Me',
            subtitle: 'Guiding You to Sensual Freedom',
            description: 'Lena Weisinger is a Sex, Love & Relationship Coach trained under Layla Martin\'s renowned VITA method. Her journey into this work was deeply personal - she spent years unraveling societal conditioning around sexuality, power, and intimacy, learning firsthand what it means to reclaim desire as a source of strength rather than shame. She now guides others on that same path, helping them break free from limiting patterns and step into a fully embodied, confident, and connected way of loving.',
            image: {
              url: '/images/about-image.jpg',
              alternativeText: 'Lena from DreamNest'
            },
            specialties: [
              'Sex, Love & Relationship Coaching',
              'VITA Method Certified',
              'Emotional Intelligence Development',
              'Sexual Confidence Building',
              'Trauma-Informed Practices'
            ]
          });
        }
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError(`${err instanceof Error ? err.message : 'Failed to load about data'}`);
        setAboutData({
          title: 'About Me',
          subtitle: 'Guiding You to Sensual Freedom',
          description: 'Lena Weisinger is a Sex, Love & Relationship Coach trained under Layla Martin\'s renowned VITA method. Her journey into this work was deeply personal - she spent years unraveling societal conditioning around sexuality, power, and intimacy, learning firsthand what it means to reclaim desire as a source of strength rather than shame. She now guides others on that same path, helping them break free from limiting patterns and step into a fully embodied, confident, and connected way of loving.',
          image: {
            url: '/images/about-image.jpg',
            alternativeText: 'Lena from DreamNest'
          },
          specialties: [
            'Sex, Love & Relationship Coaching',
            'VITA Method Certified',
            'Emotional Intelligence Development',
            'Sexual Confidence Building',
            'Trauma-Informed Practices'
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (isLoading) {
    return (
      <div className="h-96 flex justify-center items-center" style={{ background: "linear-gradient(to right, #EEE7E1, #F4F4F4)" }}>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#85614B]"></div>
      </div>
    );
  }

  return (
    <AboutSection
      title={aboutData?.title || 'About Me'}
      subtitle={aboutData?.subtitle || 'Guiding You to Sensual Freedom'}
      description={aboutData?.description || 'Lena Weisinger is a Sex, Love & Relationship Coach trained under Layla Martin\'s renowned VITA method.'}
      image={{
        src: aboutData?.image?.url || '/images/about-image.jpg',
        alt: aboutData?.image?.alternativeText || 'Lena from DreamNest'
      }}
      specialties={aboutData?.specialties || [
        'Sex, Love & Relationship Coaching',
        'VITA Method Certified',
        'Emotional Intelligence Development',
        'Sexual Confidence Building',
        'Trauma-Informed Practices'
      ]}
    />
  );
}
