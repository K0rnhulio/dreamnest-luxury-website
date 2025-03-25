"use client";

import Link from 'next/link';
import { cn } from '../../lib/utils';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LuxuryNavbar({ items }: { items: { name: string; url: string }[] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Hardcoded navigation items as fallback
  const navItems = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '#about' },
    { name: 'Services', url: '#services' },
    { name: 'For Women', url: '#for-women' },
    { name: 'For Men', url: '#for-men' },
    { name: 'Testimonials', url: '#testimonials' },
    { name: 'Blog', url: '/blog' }
  ];

  // Use provided items or fallback to hardcoded items
  const navigationItems = items && items.length > 0 ? items : navItems;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] shadow-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="text-[#EEE7E1] text-xl md:text-2xl">
            <span style={{ fontFamily: "SVN-BonVoyage, serif" }}>DreamNest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className="text-[#EEE7E1] text-sm font-medium hover:text-[#85614B] transition-colors"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              className="text-[#EEE7E1] focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/50 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu panel */}
            <motion.div 
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0a0a0a] shadow-xl z-[70] flex flex-col overflow-hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between p-5 border-b border-[#EEE7E1]/10 bg-[#0a0a0a] sticky top-0 z-10">
                <Link href="/" className="text-[#EEE7E1] text-xl" onClick={() => setIsMobileMenuOpen(false)}>
                  <span style={{ fontFamily: "SVN-BonVoyage, serif" }}>DreamNest</span>
                </Link>
                <button 
                  className="text-[#EEE7E1] focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto py-8">
                <nav className="py-4 px-8">
                  <ul className="space-y-8">
                    {navigationItems.map((item) => (
                      <li key={item.name}>
                        <Link 
                          href={item.url} 
                          className="block text-[#EEE7E1] text-xl font-medium hover:text-[#85614B] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                          style={{ fontFamily: "DM Sans, sans-serif" }}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
