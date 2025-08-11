"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

interface CounterProps {
  end: number
  duration?: number
  suffix?: string
}

function Counter({ end, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)

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

  const startAnimation = () => {
    setHasStarted(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      startAnimation()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <span className="text-2xl md:text-3xl font-black text-[#d88200]">
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

  const stats = [
    {
      number: 600,
      suffix: "+",
      label: "Clients Satisfaits",
    },
    {
      number: 12,
      suffix: "",
      label: "Histoires personnalisées",
    },
    {
      number: 24,
      suffix: "H",
      label: "Livraison rapide",
    },
  ]

  return (
    <section ref={sectionRef} id="about" className="pt-12 pb-0 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3">
            <h2
              className={`text-2xl md:text-3xl lg:text-4xl font-black text-[#d88200] mb-8 transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            >
              Des histoires magiques pour des enfants uniques
            </h2>
            <div className="text-gray-600">
              <p
                className={`mb-6 text-sm md:text-base leading-relaxed text-justify font-normal transition-all duration-1000 ease-out delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Kidstorytime, votre destination pour des histoires personnalisées qui captivent et enchantent les
                enfants au Maroc.
              </p>
            </div>

            {/* Stats Section */}
            <div
              className={`mb-8 transition-all duration-1000 ease-out delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2">
                      <Counter end={stat.number} suffix={stat.suffix} duration={2000} />
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-600 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`mt-8 transition-all duration-1000 ease-out delay-800 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href="/boutique"
                className="inline-block bg-[#d88200] hover:bg-[#c07600] text-white font-black px-8 py-3 text-lg transition-colors duration-300"
              >
                Découvrez
              </Link>
            </div>
          </div>

          <div
            className={`md:col-span-2 aspect-square bg-gray-100 overflow-hidden relative transition-all duration-1200 ease-out delay-300 ${
              isVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-8 scale-95"
            }`}
          >
            <img
              src="/about.avif"
              alt="Kidstorytime"
              className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
            />

            <div
              className={`absolute -top-4 -left-4 w-16 h-16 border-2 border-[#d88200]/40 transition-all duration-1000 ease-out delay-1000 ${
                isVisible ? "opacity-30 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"
              }`}
            />
            <div
              className={`absolute -bottom-4 -right-4 w-12 h-12 border-2 border-[#d88200]/40 transition-all duration-1000 ease-out delay-1200 ${
                isVisible ? "opacity-30 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"
              }`}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
