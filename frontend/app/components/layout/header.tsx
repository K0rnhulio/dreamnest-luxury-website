"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { theme } from "../../styles/theme";
import { Button } from "../ui/button";

interface NavItem {
  label: string;
  href: string;
  isButton?: boolean;
}

interface HeaderProps {
  transparent?: boolean;
  className?: string;
  logoText?: string;
  logoImage?: string;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "For Her", href: "/#for-her" },
  { label: "For Him", href: "/#for-him" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact", isButton: true },
];

/**
 * Header Component
 * 
 * A luxury styled header with responsive navigation and smooth scroll behavior.
 * Supports transparent mode for hero sections and solid mode for regular pages.
 */
export function Header({
  transparent = false,
  className = "",
  logoText = "DreamNest",
  logoImage,
  navItems = defaultNavItems,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to change header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Determine header background based on scroll position and transparent prop
  const headerBg = scrolled || !transparent
    ? `bg-white shadow-sm`
    : "bg-transparent";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        headerBg,
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => 
              item.isButton ? (
                <Button 
                  key={item.label} 
                  href={item.href}
                  variant="primary"
                  size="sm"
                >
                  {item.label}
                </Button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-[#85614B]"
                  style={{ color: theme.colors.primary }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={24} style={{ color: theme.colors.primary }} />
            ) : (
              <Menu size={24} style={{ color: theme.colors.primary }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navItems.map((item) => 
                item.isButton ? (
                  <Button 
                    key={item.label} 
                    href={item.href}
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-base py-2 font-medium transition-colors hover:text-[#85614B]"
                    style={{ color: theme.colors.primary }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
