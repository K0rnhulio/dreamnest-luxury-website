'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchCollection } from '../services/api';
import { LuxuryServiceCard } from './ui/luxury-service-card';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  price?: string;
  duration?: string;
  featured?: boolean;
  buttonText?: string;
  buttonUrl?: string;
}

interface ServicesData {
  title: string;
  subtitle: string;
  description: string;
  services: ServiceItem[];
  ctaText?: string;
  ctaUrl?: string;
}

export default function DreamNestServices() {
  const [servicesData, setServicesData] = useState<ServicesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
  }, [servicesData]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCollection('services', { populate: '*' });
        console.log('Services response:', response);
        
        if (Array.isArray(response)) {
          // Sort services by featured status (featured first)
          const sortedServices = [...response].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
          });
          
          setServicesData({
            title: 'My Services',
            subtitle: 'Transformative Coaching Programs',
            description: 'Explore my range of personalized coaching programs designed to help you unlock your full potential and transform your relationships.',
            services: sortedServices.map((service) => ({
              id: service.id,
              title: service.title,
              description: service.description,
              price: service.price,
              duration: service.duration,
              featured: service.featured,
              buttonText: service.buttonText,
              buttonUrl: service.buttonUrl
            })),
            ctaText: 'Not sure which program is right for you? Let\'s talk',
            ctaUrl: '#contact'
          });
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching services data:', err);
        setError(`${err instanceof Error ? err.message : 'Failed to load services data'}`);
        // Fallback to default data
        setServicesData({
          title: 'My Services',
          subtitle: 'Transformative Coaching Programs',
          description: 'Explore my range of personalized coaching programs designed to help you unlock your full potential and transform your relationships.',
          services: [
            {
              id: 1,
              title: 'Relationship Breakthrough',
              description: 'A transformative 1:1 coaching program to help you overcome relationship challenges and create deeper, more fulfilling connections.',
              price: 'From $997',
              duration: '8 weeks',
              featured: true,
              buttonText: 'Learn More',
              buttonUrl: '#contact'
            },
            {
              id: 2,
              title: 'Intimacy Mastery',
              description: 'Develop the skills and confidence to create profound intimacy, pleasure, and connection in your relationships.',
              price: 'From $797',
              duration: '6 weeks',
              featured: false,
              buttonText: 'Learn More',
              buttonUrl: '#contact'
            },
            {
              id: 3,
              title: 'Sexual Confidence',
              description: 'Overcome blocks, heal past wounds, and step into your full sexual expression with confidence and authenticity.',
              price: 'From $597',
              duration: '4 weeks',
              featured: false,
              buttonText: 'Learn More',
              buttonUrl: '#contact'
            },
            {
              id: 4,
              title: 'Single Session',
              description: 'A focused coaching session to address a specific challenge or question in your relationships or sexual wellbeing.',
              price: '$297',
              duration: '90 minutes',
              featured: false,
              buttonText: 'Book Now',
              buttonUrl: '#contact'
            }
          ],
          ctaText: 'Not sure which program is right for you? Let\'s talk',
          ctaUrl: '#contact'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (isLoading) {
    return (
      <div className="h-96 flex justify-center items-center bg-gradient-to-r from-[#F4F4F4] to-[#EEE7E1]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#85614B]"></div>
      </div>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full min-h-screen py-20 md:py-28 lg:h-screen flex items-center justify-center bg-gradient-to-r from-[#F4F4F4] to-[#EEE7E1] overflow-hidden"
      style={{ fontFamily: "DM Sans, sans-serif" }}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h3 className="reveal-item opacity-0 text-[#85614B] text-lg font-medium">
            {servicesData?.subtitle || 'Transformative Coaching Programs'}
          </h3>
          <h2 
            className="reveal-item opacity-0 text-[#58463B] text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight" 
            style={{ fontFamily: "SVN-BonVoyage, serif" }}
          >
            {servicesData?.title || 'My Services'}
          </h2>
          <p className="reveal-item opacity-0 text-[#58463B]/80 text-base md:text-lg leading-relaxed mt-4">
            {servicesData?.description || 'Explore my range of personalized coaching programs designed to help you unlock your full potential and transform your relationships.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {servicesData?.services.map((service, index) => (
            <div key={service.id} className="reveal-item opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <LuxuryServiceCard
                title={service.title}
                description={service.description}
                price={service.price}
                duration={service.duration}
                featured={service.featured}
                buttonText={service.buttonText || 'Learn More'}
                onButtonClick={() => window.location.href = service.buttonUrl || '#contact'}
              />
            </div>
          ))}
        </div>

        {servicesData?.ctaText && (
          <div className="reveal-item opacity-0 mt-16 text-center">
            <Button 
              className="bg-[#58463B] text-[#F4F4F4] hover:bg-[#85614B] gap-2 px-6 py-6 text-base"
              onClick={() => window.location.href = servicesData.ctaUrl || '#contact'}
            >
              {servicesData.ctaText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
