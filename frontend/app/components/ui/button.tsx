"use client";

import React from "react";
import Link from "next/link";
import { cn } from "../../utils/cn";
import { theme } from "../../styles/theme";
import { ButtonProps } from "../../types";

/**
 * Luxury styled button component that matches DreamNest's brand aesthetic
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  disabled = false,
  type = "button",
  ...props
}) => {
  // Base styles
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out focus:outline-none";
  
  // Size variations
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };
  
  // Variant styles
  const variantStyles = {
    primary: `bg-[${theme.colors.secondary}] text-white hover:bg-opacity-90 shadow-sm`,
    secondary: `bg-[${theme.colors.background.warm}] text-[${theme.colors.primary}] hover:bg-opacity-90 shadow-sm`,
    outline: `border border-[${theme.colors.secondary}] text-[${theme.colors.secondary}] hover:bg-[${theme.colors.secondary}] hover:text-white bg-transparent`,
    ghost: `text-[${theme.colors.primary}] hover:bg-[${theme.colors.background.warm}] bg-transparent`,
  };
  
  // Disabled styles
  const disabledStyles = "opacity-60 cursor-not-allowed";
  
  // Combined styles
  const buttonStyles = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    disabled && disabledStyles,
    className
  );
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={buttonStyles}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Render as button
  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
