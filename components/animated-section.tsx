"use client"

import type { ReactNode } from "react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animationType?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale"
  delay?: number
  duration?: number
}

export default function AnimatedSection({
  children,
  className = "",
  animationType = "fadeUp",
  delay = 0,
  duration = 800,
}: AnimatedSectionProps) {
  const { isVisible, elementRef } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  })

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`
    const durationClass = `duration-${duration}`
    const delayClass = delay > 0 ? `delay-${delay}` : ""

    switch (animationType) {
      case "fadeUp":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`
      case "fadeIn":
        return `${baseClasses} ${durationClass} ${delayClass} ${isVisible ? "opacity-100" : "opacity-0"}`
      case "slideLeft":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`
      case "slideRight":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`
      case "scale":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`
      default:
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`
    }
  }

  return (
    <section ref={elementRef} className={`overflow-hidden ${getAnimationClasses()} ${className}`}>
      {children}
    </section>
  )
}
