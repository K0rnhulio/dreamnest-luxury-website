'use client';

import { useState, useEffect } from 'react';
import { fetchSingleType } from '../../services/api';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon?: {
    url: string;
    alternativeText?: string;
  };
}

interface FeaturesContent {
  sectionTitle: string;
  sectionDescription: string;
  featureItems: FeatureItem[];
}

export default function FeaturesSection() {
  const [featuresContent, setFeaturesContent] = useState<FeaturesContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setIsLoading(true);
        const response = await fetchSingleType('features', { populate: '*' });
        console.log('Features response:', response);
        setFeaturesContent(response);
        setError(null);
      } catch (err) {
        console.error('Error fetching features content:', err);
        setError('Failed to load features content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  if (isLoading) {
    return (
      <div className="py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#85614B]"></div>
      </div>
    );
  }

  if (error || !featuresContent) {
    return (
      <div className="py-16 px-4 bg-[#EEE7E1]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading mb-6" style={{ fontFamily: 'heading', color: 'primary' }}>
            Why Choose Us
          </h2>
          <p className="text-lg mb-8" style={{ fontFamily: 'body', color: 'text.primary' }}>
            {error || "Our features are being prepared. Please check back soon."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-[#EEE7E1]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 
            className="text-3xl md:text-4xl font-heading mb-4"
            style={{ fontFamily: 'heading', color: 'primary' }}
          >
            {featuresContent.sectionTitle || "Why Choose Us"}
          </h2>
          <p 
            className="text-lg max-w-3xl mx-auto"
            style={{ fontFamily: 'body', color: 'text.secondary' }}
          >
            {featuresContent.sectionDescription || "Discover what makes our approach unique and effective."}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresContent.featureItems && featuresContent.featureItems.map((feature) => (
            <div 
              key={feature.id} 
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
            >
              {feature.icon?.url && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={feature.icon.url}
                    alt={feature.icon.alternativeText || feature.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
              )}
              
              <h3 
                className="text-xl font-heading mb-3 text-center"
                style={{ fontFamily: 'heading', color: 'primary' }}
              >
                {feature.title}
              </h3>
              
              <p 
                className="text-center"
                style={{ fontFamily: 'body', color: 'text.primary' }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
