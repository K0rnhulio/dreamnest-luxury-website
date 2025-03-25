"use client"

import React from "react"
import { cn } from "../../lib/utils"

interface GlowProps {
  variant?: "center" | "top" | "bottom" | "left" | "right"
  color?: string
  size?: number
  opacity?: number
  className?: string
}

export function Glow({ 
  variant = "center", 
  color = "#85614B", 
  size = 400, 
  opacity = 0.3, 
  className 
}: GlowProps) {
  // If using variant, use predefined styles
  if (variant !== "center") {
    return (
      <div
        className={cn(
          "absolute inset-0 z-0",
          {
            "bg-gradient-to-b from-[#85614B]/20 to-transparent": variant === "top",
            "bg-gradient-to-t from-[#85614B]/20 to-transparent": variant === "bottom",
            "bg-gradient-to-r from-[#85614B]/20 to-transparent": variant === "left",
            "bg-gradient-to-l from-[#85614B]/20 to-transparent": variant === "right",
          },
          className
        )}
      />
    )
  }
  
  // If using custom props, create a custom radial gradient
  return (
    <div
      className={cn(
        "absolute z-0",
        className
      )}
      style={{
        background: `radial-gradient(circle at center, ${color}${Math.round(opacity * 100)}%, transparent 70%)`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        pointerEvents: 'none'
      }}
    />
  )
}
