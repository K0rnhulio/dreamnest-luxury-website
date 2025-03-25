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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMobileMenuOpen && 
          !target.closest('.mobile-menu-container') && 
          !target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300",
        scrolled 
          ? "bg-[#F4F4F4]/98 backdrop-blur-sm shadow-sm" 
          : "bg-[#F4F4F4]/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none",
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
            className="md:hidden text-[#58463B] focus:outline-none mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu - Slide from right */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#F4F4F4]/98 backdrop-blur-md shadow-xl z-50 mobile-menu-container"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#EEE7E1]">
                  <Link href="/" className="text-[#58463B] text-2xl" onClick={() => setIsMobileMenuOpen(false)}>
                    <span style={{ fontFamily: "SVN-BonVoyage, serif" }}>DreamNest</span>
                  </Link>
                  <button 
                    className="text-[#58463B] focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Menu Items */}
                <nav className="flex-1 overflow-y-auto py-6 px-6">
                  <div className="flex flex-col space-y-6">
                    {items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.url}
                        className="text-[#58463B] text-lg font-medium hover:text-[#85614B] transition-colors border-b border-[#EEE7E1]/50 pb-4"
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ fontFamily: "DM Sans, sans-serif" }}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>
                
                {/* Menu Footer */}
                <div className="p-6 border-t border-[#EEE7E1]">
                  <Link
                    href="#contact"
                    className="flex items-center justify-center rounded-none w-full px-6 py-3 text-sm font-medium text-white bg-[#85614B] hover:bg-[#85614B]/90 transition-colors border border-[#85614B]"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Overlay when mobile menu is open */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
