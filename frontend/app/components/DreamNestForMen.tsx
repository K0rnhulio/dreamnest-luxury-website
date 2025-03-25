'use client';

import { useEffect, useState } from 'react';
import { fetchSingleType } from '../services/api';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';

interface ForMenData {
  title: string;
  subtitle?: string;
  description: string;
  image?: {
    url: string;
    alternativeText?: string;
  };
  benefits?: string[];
  buttonText?: string;
  buttonUrl?: string;
}

export default function DreamNestForMen() {
  const [forMenData, setForMenData] = useState<ForMenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForMen = async () => {
      try {
        setIsLoading(true);
        // Use fetchSingleType instead of fetchContentType
        const response = await fetchSingleType('forMen', { populate: '*' });
        console.log('For Men response:', response);
        
        if (response && response.data) {
          // Handle different response structures
          const data = response.data.attributes || response.data;
          
          setForMenData({
            title: data.title || data.Title || 'For Men',
            subtitle: data.subtitle || data.Subtitle,
            description: data.description || data.Description || 'Discover how to develop authentic masculine presence and create deeper connections.',
            image: data.image?.data ? {
              url: data.image.data.attributes?.url || '',
              alternativeText: data.image.data.attributes?.alternativeText || ''
            } : undefined,
            benefits: data.benefits || data.Benefits || [],
            buttonText: data.buttonText || data.ButtonText || 'Learn More',
            buttonUrl: data.buttonUrl || data.ButtonUrl || '#contact'
          });
          setError(null);
        } else {
          console.error('Unexpected for men response structure:', response);
          // Fallback to default data
          setForMenData({
            title: 'For Men',
            subtitle: 'Authentic Masculine Presence',
            description: 'Discover how to develop authentic masculine presence, overcome performance anxiety, and create deeper connections with yourself and your partner.',
            benefits: [
              'Develop unshakeable confidence in your masculinity',
              'Overcome performance anxiety and sexual issues',
              'Learn to communicate your desires effectively',
              'Create deeper emotional connections'
            ],
            buttonText: 'Start Your Journey',
            buttonUrl: '#contact'
          });
        }
      } catch (err) {
        console.error('Error fetching for men data:', err);
        setError(`${err instanceof Error ? err.message : 'Failed to load for men data'}`);
        // Fallback to default data
        setForMenData({
          title: 'For Men',
          subtitle: 'Authentic Masculine Presence',
          description: 'Discover how to develop authentic masculine presence, overcome performance anxiety, and create deeper connections with yourself and your partner.',
          benefits: [
            'Develop unshakeable confidence in your masculinity',
            'Overcome performance anxiety and sexual issues',
            'Learn to communicate your desires effectively',
            'Create deeper emotional connections'
          ],
          buttonText: 'Start Your Journey',
          buttonUrl: '#contact'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchForMen();
  }, []);

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#85614B]"></div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className="relative min-h-screen py-16 md:py-24 lg:h-screen flex items-center overflow-hidden bg-gradient-to-r from-[#EEE7E1] to-[#F4F4F4]">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 h-[1px] w-full bg-[#58463B]/10" />
      <div className="absolute left-1/4 top-0 h-full w-[1px] bg-[#58463B]/5" />
      <div className="absolute right-1/4 top-0 h-full w-[1px] bg-[#58463B]/5" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Column */}
          <motion.div 
            className="flex flex-col"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-3">
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wider uppercase bg-[#85614B]/10 text-[#85614B] border-[#85614B]/30">
                For Men
              </span>
            </motion.div>
            
            <motion.h3 
              variants={itemVariants}
              className="text-[#85614B] text-lg font-medium mb-2"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {forMenData?.subtitle || 'Authentic Masculine Presence'}
            </motion.h3>
            
            <motion.h2 
              variants={itemVariants}
              className="text-[#58463B] text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight mb-6"
              style={{ fontFamily: "SVN-BonVoyage, serif" }}
            >
              {forMenData?.title || 'For Men'}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-[#58463B]/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              {forMenData?.description || ''}
            </motion.p>
            
            {forMenData?.benefits && forMenData.benefits.length > 0 && (
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
              >
                {forMenData.benefits.map((benefit, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex-shrink-0 rounded-full p-1 bg-[#85614B]/10">
                      <Check className="h-4 w-4 text-[#85614B]" />
                    </div>
                    <span className="text-[#58463B]/80" style={{ fontFamily: "DM Sans, sans-serif" }}>
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            
            <motion.div variants={itemVariants}>
              <Button 
                className="bg-[#85614B] hover:bg-[#58463B] text-white flex items-center gap-2 px-6 py-3 rounded-md transition-colors duration-300"
                onClick={() => window.location.href = forMenData?.buttonUrl || '#contact'}
              >
                {forMenData?.buttonText || 'Start Your Journey'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[500px] lg:h-[70vh] rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
            <div className="relative w-full h-full">
              <img
                src={forMenData?.image?.url || '/images/placeholder-men.jpg'}
                alt={forMenData?.image?.alternativeText || 'For Men'}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
