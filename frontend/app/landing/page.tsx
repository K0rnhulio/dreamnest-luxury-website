import HeroSection from '../components/landing/HeroSection';
import ServicesSection from '../components/landing/ServicesSection';
import FeaturesSection from '../components/landing/FeaturesSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
    </div>
  );
}
