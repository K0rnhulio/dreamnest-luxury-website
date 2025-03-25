'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchCollection } from '../../services/api';
import { Button } from '../../components/ui/button';
import { theme } from '../../styles/theme';

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  icon?: {
    url: string;
    alternativeText?: string;
  };
  order?: number;
}

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetchCollection('services', { populate: '*' });
        console.log('Services response:', response);
        
        // Sort services by order if available
        const sortedServices = [...response].sort((a, b) => {
          if (a.order !== undefined && b.order !== undefined) {
            return a.order - b.order;
          }
          return 0;
        });
        
        setServices(sortedServices);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
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

  if (error || services.length === 0) {
    return (
      <div className="py-16 px-4 bg-[#F4F4F4]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-6" style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}>
            Our Services
          </h2>
          <p className="text-lg mb-8" style={{ fontFamily: theme.fonts.body, color: theme.colors.text.primary }}>
            {error || "Our services are being prepared. Please check back soon."}
          </p>
          <Button href="/#contact" variant="primary">
            Contact Us
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-[#F4F4F4]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-heading mb-4"
            style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
          >
            Our Services
          </h2>
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ fontFamily: theme.fonts.body, color: theme.colors.text.secondary }}
          >
            Discover the transformative experiences we offer to help you reconnect with your authentic self.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {service.icon?.url && (
                <div className="mb-4 flex justify-center">
                  <Image
                    src={service.icon.url}
                    alt={service.icon.alternativeText || service.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              )}
              
              <h3 
                className="text-xl font-heading mb-3 text-center"
                style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary }}
              >
                {service.title}
              </h3>
              
              <p 
                className="text-center mb-4"
                style={{ fontFamily: theme.fonts.body, color: theme.colors.text.primary }}
              >
                {service.description}
              </p>
              
              <div className="text-center">
                <Button 
                  href={`/services/${service.id}`} 
                  variant="secondary"
                  size="sm"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button href="/services" variant="primary">
            View All Services
          </Button>
        </div>
      </div>
    </div>
  );
}
