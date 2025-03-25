/**
 * DreamNest Theme Configuration
 * 
 * This file contains the central theme configuration for the DreamNest website,
 * ensuring consistent styling across all components.
 */

export const theme = {
  colors: {
    primary: "#58463B",     // Primary text color for headings
    secondary: "#85614B",   // Accent color for buttons, borders, etc.
    background: {
      light: "#F4F4F4",     // Light background color
      warm: "#EEE7E1",      // Warm background color
    },
    text: {
      primary: "#58463B",   // Primary text color
      secondary: "#85614B", // Secondary text color
      light: "#FFFFFF",     // Light text color
    },
    overlay: {
      dark: "rgba(0, 0, 0, 0.4)",
      light: "rgba(255, 255, 255, 0.8)",
    }
  },
  
  fonts: {
    heading: "SVN-BonVoyage, serif",
    body: "DM Sans, sans-serif",
  },
  
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
    xxxl: "5rem",
  },
  
  borderRadius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
  
  shadows: {
    sm: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
    md: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)",
    lg: "0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)",
  },
  
  transitions: {
    fast: "150ms ease",
    medium: "300ms ease",
    slow: "500ms ease",
  },
  
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    xxl: "1536px",
  },
  
  // Animation timing configurations
  animations: {
    scroll: {
      headingRange: [0, 0.1] as [number, number],
      subtitleRange: [0.1, 0.2] as [number, number],
      chevronRange: [0, 0.15] as [number, number],
      lineRange: [0.2, 0.35] as [number, number],
      secondarySubtitleRange: [0.35, 0.5] as [number, number],
      flowerConfig: {
        stemRange: [0, 0.2] as [number, number],
        petalRange: [0.2, 0.4] as [number, number],
        textRange: [0.25, 0.45] as [number, number]
      }
    }
  }
};
