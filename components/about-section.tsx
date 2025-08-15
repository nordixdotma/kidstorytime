"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
  isVisible: boolean
}

function Counter({ end, duration = 2000, suffix = "", isVisible }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (isVisible && !hasStarted) {
      setHasStarted(true)
    }
  }, [isVisible, hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * end)

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [end, duration, hasStarted])

  return (
    <span className="text-4xl md:text-5xl font-black text-white">
      {count}
      {suffix}
    </span>
  )
}

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div
              className={`transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                Des histoires magiques pour des enfants uniques
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Kidstorytime, votre destination pour des histoires personnalisées qui captivent et enchantent les
                enfants au Maroc.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`transition-all duration-1000 ease-out delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href="/boutique"
                className="inline-flex items-center border-2 border-gray-900 text-gray-900 font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-900 hover:text-white transform hover:scale-105"
              >
                Découvrez
              </Link>
            </div>
          </div>

          {/* Right Image with Stats Overlay */}
          <div
            className={`relative transition-all duration-1200 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <img
                src="/about.avif"
                alt="Histoires personnalisées Kidstorytime"
                className="w-full h-[500px] object-cover rounded-2xl shadow-2xl"
              />

              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-[#d88200] p-6 rounded-b-2xl">
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <div className="mb-2">
                      <Counter end={600} suffix="+" duration={2500} isVisible={isVisible} />
                    </div>
                    <p className="text-white font-medium">Livraison rapide</p>
                  </div>
                  <div>
                    <div className="mb-2">
                      <Counter end={12} suffix="" duration={2000} isVisible={isVisible} />
                    </div>
                    <p className="text-white font-medium">Histoires personnalisées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
