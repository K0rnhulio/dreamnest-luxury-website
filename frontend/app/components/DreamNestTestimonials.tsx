'use client';

import { useEffect, useState } from 'react';
import { fetchSingleType, fetchCollection } from '../services/api';
import { LuxuryTestimonialCarousel, Testimonial } from './ui/luxury-testimonial-carousel';

interface TestimonialsData {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

interface TestimonialItem {
  id: number;
  name: string;
  role?: string;
  quote: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  rating?: number;
}

interface TestimonialsSection {
  title: string;
  subtitle?: string;
}

// Default testimonials as fallback
const defaultTestimonials: Testimonial[] = [
  {
    quote: "Working with Lena completely transformed my relationship with intimacy. Her coaching helped me overcome years of shame and discover a whole new level of connection with my partner.",
    name: "Sarah M.",
    role: "Executive Coach",
    rating: 5
  },
  {
    quote: "The breathwork sessions with Lena were life-changing. I've struggled with anxiety for years, and her techniques have given me tools I use daily to stay centered and calm.",
    name: "Michael T.",
    role: "Entrepreneur",
    rating: 5
  },
  {
    quote: "Lena creates such a safe space for exploration. I never thought I could be so open about my desires and needs, but her approach made it feel natural and empowering.",
    name: "Emma R.",
    role: "Therapist",
    rating: 5
  }
];

export default function DreamNestTestimonials() {
  const [sectionData, setSectionData] = useState<TestimonialsSection | null>(null);
  const [testimonialItems, setTestimonialItems] = useState<TestimonialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        // Fetch section data (title, subtitle)
        const response = await fetchSingleType('testimonials', { populate: '*' });
        console.log('Testimonials section response:', response);
        setSectionData(response);
        
        // Fetch testimonial items
        const testimonialItemsResponse = await fetchCollection('testimonial', { 
          populate: '*',
          sort: 'order:asc'
        });
        console.log('Testimonial items response:', testimonialItemsResponse);
        
        if (Array.isArray(testimonialItemsResponse)) {
          setTestimonialItems(testimonialItemsResponse);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(`${err instanceof Error ? err.message : 'Failed to load testimonials'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (isLoading) {
    return (
      <div className="h-96 flex justify-center items-center bg-[#F4F4F4]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#85614B]"></div>
      </div>
    );
  }

  // Fallback content if no data is available
  const title = sectionData?.title || "What Our Clients Say";
  const subtitle = sectionData?.subtitle || "Real Transformations from Real People";

  // Use fetched testimonials or fall back to defaults if none are available
  const testimonials: Testimonial[] = testimonialItems.length > 0 
    ? testimonialItems.map((item) => {
        return {
          quote: item.quote || '',
          name: item.name || '',
          role: item.role || '',
          image: item.image?.url || '',
          rating: item.rating || 5
        };
      })
    : defaultTestimonials;

  return (
    <section className="bg-[#F4F4F4] min-h-screen h-screen flex items-center justify-center" id="testimonials">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-light text-[#58463B] mb-4" 
            style={{ fontFamily: "SVN-BonVoyage, serif" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-[#85614B] max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Always render the carousel with either fetched or default testimonials */}
        <LuxuryTestimonialCarousel testimonials={testimonials} autoplay={true} autoplaySpeed={6000} />
        
        {error && (
          <div className="mt-8 text-center text-red-500">
            <p>Note: Using default testimonials. {error}</p>
          </div>
        )}
      </div>
    </section>
  );
}
