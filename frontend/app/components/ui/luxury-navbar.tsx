"use client"

import React, { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "../../lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface NavItem {
  name: string
  url: string
}

interface LuxuryNavbarProps {
  logo?: React.ReactNode
  items: NavItem[]
  className?: string
}

export function LuxuryNavbar({ 
  logo, 
  items = [
    { name: 'Home', url: '/' },
    { name: 'About', url: '#about' },
    { name: 'Services', url: '#services' },
    { name: 'For Women', url: '#for-women' },
    { name: 'For Men', url: '#for-men' },
    { name: 'Testimonials', url: '#testimonials' },
    { name: 'Blog', url: '/blog' }
  ], 
  className 
}: LuxuryNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300",
        scrolled 
          ? "bg-[#F4F4F4]/95 backdrop-blur-sm shadow-sm" 
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {logo || (
              <Link href="/" className="text-[#58463B] text-2xl">
                <span style={{ fontFamily: "SVN-BonVoyage, serif" }}>DreamNest</span>
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {items.map((item) => (
              <Link
                key={item.name}
                href={item.url}
                className="text-[#58463B] text-sm tracking-wide hover:text-[#85614B] transition-colors"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-none px-6 py-2 text-sm font-medium text-white bg-[#85614B] hover:bg-[#85614B]/90 transition-colors border border-[#85614B]"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#58463B] focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 py-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.url}
                    className="text-[#58463B] text-sm font-medium hover:text-[#85614B] transition-colors py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-none px-6 py-3 text-sm font-medium text-white bg-[#85614B] hover:bg-[#85614B]/90 transition-colors border border-[#85614B] mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
