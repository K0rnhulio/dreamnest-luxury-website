import DreamNestHero from '../components/DreamNestHero';
import DreamNestAbout from '../components/DreamNestAbout';
import DreamNestForMen from '../components/DreamNestForMen';
import DreamNestForWomen from '../components/DreamNestForWomen';
import DreamNestServices from '../components/DreamNestServices';
import DreamNestTestimonials from '../components/DreamNestTestimonials';
import DreamNestFeaturedServices from '../components/DreamNestFeaturedServices';
import DreamNestScrollIntro from '../components/DreamNestScrollIntro';
import Link from 'next/link';

export default function DreamNestHome() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <DreamNestHero />
      
      {/* Animated Scroll Intro Section */}
      <DreamNestScrollIntro />
      
      {/* About Section */}
      <DreamNestAbout />
      
      {/* Featured Services Scroll Section */}
      <DreamNestFeaturedServices />
      
      {/* For Men Section */}
      <DreamNestForMen />
      
      {/* For Women Section */}
      <DreamNestForWomen />
      
      {/* Services Section */}
      <DreamNestServices />
      
      {/* Testimonials Section */}
      <DreamNestTestimonials />
      
      {/* Temporary Navigation */}
      <div className="bg-[#F4F4F4] py-6">
        <div className="container mx-auto">
          <div className="flex justify-center space-x-8">
            <Link 
              href="/" 
              className="text-[#85614B] hover:underline"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Back to Demo Home
            </Link>
            <a 
              href="http://localhost:1337/admin" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#85614B] hover:underline"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Strapi Admin
            </a>
          </div>
        </div>
      </div>
      
      {/* Placeholder for other sections */}
      <div className="container mx-auto py-20 px-4">
        <h2 
          className="text-3xl md:text-4xl mb-6 text-center"
          style={{ 
            fontFamily: 'Playfair Display, serif',
            color: '#58463B' 
          }}
        >
          Coming Soon
        </h2>
        <p 
          className="text-center max-w-2xl mx-auto"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          We’re currently building the rest of the DreamNest website. The hero, about, audience-specific sections, and services above are fully
          manageable through Strapi. Create the corresponding content types in Strapi to customize them.
        </p>
      </div>
    </div>
  );
}
