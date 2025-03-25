import { MoveRight } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../utils/cn";

interface LuxuryHeroProps {
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
  imageSrc: string;
  imageAlt: string;
}

function LuxuryHero({
  title = "DreamNest - Where Your Dreams Find a Home",
  description = "Awaken your wildest dreams, ignite your sensual power, and reclaim your authentic expression. I guide visionaries like you to break free from societal conditioning and live with unapologetic passion.",
  ctaText = "Begin Your Journey",
  ctaUrl = "#services",
  imageSrc = "/images/hero-image.jpg",
  imageAlt = "Lena from DreamNest",
}: LuxuryHeroProps) {
  return (
    <section 
      className="w-full h-screen flex items-center" 
      style={{ 
        background: "linear-gradient(to right, #EEE7E1, #F4F4F4)",
        fontFamily: "DM Sans, sans-serif"
      }}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-12 items-center md:grid-cols-2">
          <div className="flex gap-6 flex-col">
            <div className="flex gap-5 flex-col">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium mb-4 md:mb-6"
                style={{ 
                  fontFamily: "SVN-BonVoyage, serif",
                  color: "#58463B" 
                }}
              >
                {title}
              </h1>
              <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
                {description}
              </p>
            </div>
            <div className="mt-4">
              <Button 
                size="lg" 
                className={cn(
                  "gap-2 rounded-none px-8 bg-[#85614B] border-[#85614B] hover:bg-[#6D4F3D] hover:border-[#6D4F3D]"
                )}
                href={ctaUrl}
              >
                {ctaText} <MoveRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="relative h-[500px] md:h-[600px] lg:h-[80vh] overflow-hidden">
            {imageSrc.startsWith('http') || imageSrc.startsWith('/') ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${imageSrc}`}
                alt={imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export { LuxuryHero };
