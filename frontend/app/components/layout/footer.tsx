"use client";

import React from "react";
import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Heart } from "lucide-react";
import { cn } from "../../utils/cn";
import { theme } from "../../styles/theme";
import { Button } from "../ui/button";

interface FooterProps {
  className?: string;
  logoText?: string;
  logoImage?: string;
}

/**
 * Footer Component
 * 
 * A luxury styled footer with navigation, social links, and newsletter signup.
 * Maintains the DreamNest brand aesthetic with proper spacing and typography.
 */
export function Footer({
  className = "",
  logoText = "DreamNest",
  logoImage,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-[#F4F4F4] pt-16 pb-8",
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="mb-4">
              {logoImage ? (
                <img src={logoImage} alt={logoText} className="h-10" />
              ) : (
                <span 
                  className="text-2xl font-heading"
                  style={{ 
                    fontFamily: theme.fonts.heading,
                    color: theme.colors.primary
                  }}
                >
                  {logoText}
                </span>
              )}
            </div>
            <p 
              className="text-sm mb-4 max-w-xs"
              style={{ color: theme.colors.text.primary }}
            >
              Empowering authentic expression through breathwork and transformative coaching.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} label="Facebook" />
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
              <SocialLink href="mailto:hello@dreamnest.com" icon={<Mail size={18} />} label="Email" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 
              className="text-lg font-medium mb-4"
              style={{ color: theme.colors.primary }}
            >
              Quick Links
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/" label="Home" />
              <FooterLink href="/#about" label="About" />
              <FooterLink href="/#services" label="Services" />
              <FooterLink href="/blog" label="Blog" />
              <FooterLink href="/#contact" label="Contact" />
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 
              className="text-lg font-medium mb-4"
              style={{ color: theme.colors.primary }}
            >
              Services
            </h3>
            <ul className="space-y-2">
              <FooterLink href="/services/breathwork" label="Breathwork" />
              <FooterLink href="/services/coaching" label="Coaching" />
              <FooterLink href="/services/for-her" label="For Her" />
              <FooterLink href="/services/for-him" label="For Him" />
              <FooterLink href="/services/workshops" label="Workshops" />
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 
              className="text-lg font-medium mb-4"
              style={{ color: theme.colors.primary }}
            >
              Stay Connected
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: theme.colors.text.primary }}
            >
              Subscribe to receive updates, articles, and special offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#85614B]"
                style={{ borderColor: theme.colors.secondary }}
                required
              />
              <Button variant="primary" size="sm" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#EEE7E1] flex flex-col md:flex-row justify-between items-center">
          <div 
            className="text-sm mb-4 md:mb-0"
            style={{ color: theme.colors.text.primary }}
          >
            © {currentYear} DreamNest. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <FooterLink href="/privacy" label="Privacy Policy" />
            <FooterLink href="/terms" label="Terms of Service" />
            <FooterLink href="/cookies" label="Cookie Policy" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper components
function SocialLink({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
}) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[#EEE7E1]"
      style={{ color: theme.colors.secondary }}
    >
      {icon}
    </a>
  );
}

function FooterLink({ 
  href, 
  label 
}: { 
  href: string; 
  label: string;
}) {
  return (
    <li>
      <Link 
        href={href}
        className="text-sm hover:underline transition-colors"
        style={{ color: theme.colors.text.primary }}
      >
        {label}
      </Link>
    </li>
  );
}
