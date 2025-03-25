"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { cn } from "../../lib/utils"
import { Glow } from "./glow"
import { ArrowRight } from "lucide-react"

interface AboutSectionProps {
  title: string
  subtitle: string
  description: string
  image: {
    src: string
    alt: string
  }
  specialties: string[]
  className?: string
}

export function AboutSection({
  title,
  subtitle,
  description,
  image,
  specialties,
  className,
}: AboutSectionProps) {
  const textRefs = {
    title: useRef<HTMLHeadingElement>(null),
    subtitle: useRef<HTMLParagraphElement>(null),
    description: useRef<HTMLParagraphElement>(null),
    specialties: useRef<HTMLUListElement>(null),
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    Object.values(textRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      Object.values(textRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  return (
    <section
      className={cn(
        "relative overflow-hidden min-h-screen py-16 md:py-24 lg:h-screen flex items-center justify-center",
        "bg-gradient-to-r from-[#EEE7E1] to-[#F4F4F4]",
        className
      )}
    >
      <div className="mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-md shadow-xl">
              <div className="animate-appear opacity-0 delay-300">
                {image.src.startsWith('http') || image.src.startsWith('/') ? (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={800}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${image.src}`}
                    alt={image.alt}
                    width={600}
                    height={800}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 h-24 w-24 border border-[#85614B]/20 animate-appear opacity-0 delay-1000" />
              <div className="absolute -top-4 -right-4 h-24 w-24 border border-[#85614B]/20 animate-appear opacity-0 delay-1200" />
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 flex flex-col justify-center space-y-8 lg:order-2">
            <div>
              <h3 
                ref={textRefs.title}
                className="mb-2 text-sm uppercase tracking-widest text-[#85614B] opacity-0"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {title}
              </h3>
              <h2 
                ref={textRefs.subtitle}
                className="text-3xl font-medium leading-tight tracking-tight sm:text-4xl md:text-5xl opacity-0"
                style={{ 
                  fontFamily: "SVN-BonVoyage, serif",
                  color: "#58463B" 
                }}
              >
                {subtitle}
              </h2>
            </div>

            <div 
              ref={textRefs.description}
              className="prose prose-lg text-[#58463B]/80 opacity-0"
              style={{ fontFamily: "DM Sans, sans-serif" }}
            >
              <p>{description}</p>
            </div>

            <ul 
              ref={textRefs.specialties}
              className="space-y-3 opacity-0"
            >
              {specialties.map((specialty, index) => (
                <li 
                  key={index} 
                  className="flex items-center text-[#58463B]"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                >
                  <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#58463B]/10">
                    <ArrowRight className="h-4 w-4 text-[#58463B]" />
                  </span>
                  {specialty}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow
          variant="center"
          className="animate-appear-zoom opacity-0 delay-1000"
        />
      </div>
    </section>
  )
}
