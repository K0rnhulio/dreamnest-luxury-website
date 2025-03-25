"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface NavbarContextType {
  navbarHeight: number
}

const NavbarContext = createContext<NavbarContextType>({ navbarHeight: 0 })

export const useNavbar = () => useContext(NavbarContext)

export function NavbarProvider({ children }: { children: React.ReactNode }) {
  const [navbarHeight, setNavbarHeight] = useState(0)

  useEffect(() => {
    const updateNavbarHeight = () => {
      const navbar = document.getElementById('luxury-navbar')
      if (navbar) {
        const height = navbar.offsetHeight
        setNavbarHeight(height)
        
        // Update CSS variable
        document.documentElement.style.setProperty('--navbar-height', `${height}px`)
      }
    }

    // Initial measurement
    updateNavbarHeight()

    // Update on resize
    window.addEventListener('resize', updateNavbarHeight)

    // Measure again after a short delay to account for any layout shifts
    const timeoutId = setTimeout(updateNavbarHeight, 500)

    return () => {
      window.removeEventListener('resize', updateNavbarHeight)
      clearTimeout(timeoutId)
    }
  }, [])

  return (
    <NavbarContext.Provider value={{ navbarHeight }}>
      {children}
    </NavbarContext.Provider>
  )
}
