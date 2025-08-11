"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function HeroSection() {
  const [viewportHeight, setViewportHeight] = useState("100vh")

  // Fix mobile viewport height
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
      setViewportHeight(`${window.innerHeight}px`)
    }

    setVH()
    window.addEventListener("resize", setVH)
    window.addEventListener("orientationchange", setVH)

    return () => {
      window.removeEventListener("resize", setVH)
      window.removeEventListener("orientationchange", setVH)
    }
  }, [])

  return (
    <section
      className="relative overflow-hidden"
      style={{
        height: viewportHeight,
        minHeight: "100dvh", // For browsers that support dynamic viewport units
      }}
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
          {/* Fallback image if video doesn't load */}
          <img
            src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=1200&h=800&fit=crop&crop=center"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Hero Content - Left Aligned and Lower */}
      <div className="relative z-10 h-full flex items-end pb-32 md:pb-40 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6">
              Histoires Personnalisées pour Enfant
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              Créez des souvenirs inoubliables avec des histoires uniques pour vos enfants.
            </p>
            <Link
              href="/boutique"
              className="inline-block bg-[#d88200] hover:bg-[#c07600] text-white font-bold px-8 py-4 text-lg transition-colors duration-300"
            >
              Explorer
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
