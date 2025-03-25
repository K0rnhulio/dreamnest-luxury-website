"use client";

import React from "react";
import { cn } from "../../utils/cn";
import { SectionProps } from "../../types";
import { theme } from "../../styles/theme";

/**
 * Section Component
 * 
 * A consistent layout component for page sections with various styling options.
 * Provides consistent spacing, background options, and container behavior.
 */
export function Section({
  children,
  className = "",
  id,
  background = "light",
  fullWidth = false,
  paddingY = "default",
  paddingX = "default",
  maxWidth = "default",
  ...props
}: SectionProps & {
  background?: "light" | "warm" | "primary" | "secondary" | "transparent";
  fullWidth?: boolean;
  paddingY?: "none" | "sm" | "default" | "lg" | "xl";
  paddingX?: "none" | "sm" | "default" | "lg";
  maxWidth?: "sm" | "default" | "lg" | "xl" | "full" | "none";
}) {
  // Background styles
  const backgroundStyles = {
    light: `bg-[${theme.colors.background.light}]`,
    warm: `bg-[${theme.colors.background.warm}]`,
    primary: `bg-[${theme.colors.primary}] text-white`,
    secondary: `bg-[${theme.colors.secondary}] text-white`,
    transparent: "bg-transparent",
  };

  // Padding Y styles
  const paddingYStyles = {
    none: "py-0",
    sm: "py-8",
    default: "py-16 md:py-24",
    lg: "py-24 md:py-32",
    xl: "py-32 md:py-40",
  };

  // Padding X styles
  const paddingXStyles = {
    none: "px-0",
    sm: "px-4",
    default: "px-4 md:px-8",
    lg: "px-6 md:px-12",
  };

  // Max width styles
  const maxWidthStyles = {
    sm: "max-w-4xl",
    default: "max-w-6xl",
    lg: "max-w-7xl",
    xl: "max-w-screen-2xl",
    full: "max-w-full",
    none: "",
  };

  return (
    <section
      id={id}
      className={cn(
        backgroundStyles[background],
        paddingYStyles[paddingY],
        !fullWidth && paddingXStyles[paddingX],
        "w-full",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "mx-auto",
          !fullWidth && maxWidthStyles[maxWidth],
          fullWidth && "w-full",
          fullWidth && paddingXStyles[paddingX]
        )}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * SectionHeading Component
 * 
 * A consistent heading component for section titles with optional subtitle.
 */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}: {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  // Alignment styles
  const alignStyles = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={cn("mb-12", alignStyles[align], className)}>
      <h2
        className={cn(
          "font-heading text-4xl md:text-5xl lg:text-6xl mb-4",
          titleClassName
        )}
        style={{ 
          fontFamily: theme.fonts.heading,
          color: theme.colors.primary
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg md:text-xl max-w-3xl mx-auto",
            alignStyles[align] === "center" && "mx-auto",
            subtitleClassName
          )}
          style={{ 
            fontFamily: theme.fonts.body,
            color: theme.colors.text.secondary
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * SectionDivider Component
 * 
 * A decorative divider to separate sections.
 */
export function SectionDivider({
  variant = "line",
  color = "primary",
  className = "",
}: {
  variant?: "line" | "dots" | "wave";
  color?: "primary" | "secondary" | "light";
  className?: string;
}) {
  // Color styles
  const colorStyles = {
    primary: theme.colors.primary,
    secondary: theme.colors.secondary,
    light: theme.colors.background.light,
  };

  // Render different divider variants
  const renderDivider = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colorStyles[color] }}
              />
            ))}
          </div>
        );
      case "wave":
        return (
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-6"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              style={{ fill: colorStyles[color] }}
            />
          </svg>
        );
      case "line":
      default:
        return (
          <div
            className="h-px w-24 mx-auto"
            style={{ backgroundColor: colorStyles[color] }}
          />
        );
    }
  };

  return (
    <div className={cn("my-16", className)}>
      {renderDivider()}
    </div>
  );
}
