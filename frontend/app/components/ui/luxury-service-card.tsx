'use client';

import * as React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { Button } from "@/app/components/ui/button";

export interface ServiceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  price?: number | string;
  duration?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  featured?: boolean;
}

const LuxuryServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ 
    className, 
    title, 
    description, 
    price, 
    duration, 
    buttonText = "Book Now", 
    onButtonClick,
    featured = false,
    ...props 
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-[#EEE7E1]/60 bg-[#F4F4F4] text-[#58463B] shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px] overflow-hidden",
          featured && "ring-2 ring-[#85614B] ring-offset-2 ring-offset-[#F4F4F4]",
          className
        )}
        {...props}
      >
        {featured && (
          <div className="bg-[#85614B] text-[#F4F4F4] py-1.5 px-4 text-xs font-medium tracking-wide text-center uppercase">
            Most Popular
          </div>
        )}
        
        <div className="p-6 flex flex-col gap-6">
          <div className="space-y-3">
            <h3 className="text-2xl font-medium tracking-tight text-[#58463B]" style={{ fontFamily: "SVN-BonVoyage, serif" }}>
              {title}
            </h3>
            <p className="text-sm text-[#58463B]/80" style={{ fontFamily: "DM Sans, sans-serif" }}>
              {description}
            </p>
          </div>
          
          <div className="flex items-center justify-between border-t border-[#EEE7E1] pt-4 mt-auto">
            {(price || duration) && (
              <div className="flex flex-col">
                {price && (
                  <span className="text-2xl font-semibold text-[#58463B]">
                    {typeof price === 'number' ? `$${price}` : price}
                  </span>
                )}
                {duration && (
                  <div className="flex items-center text-[#85614B] text-sm">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{duration}</span>
                  </div>
                )}
              </div>
            )}
            
            <Button 
              onClick={onButtonClick}
              className="bg-[#58463B] text-[#F4F4F4] hover:bg-[#85614B] gap-2"
            >
              {buttonText}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

LuxuryServiceCard.displayName = "LuxuryServiceCard";

export { LuxuryServiceCard };
