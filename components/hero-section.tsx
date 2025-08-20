"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import SplitText from "./split-text"

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

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-5xl text-center mx-auto">
            <SplitText
              text="Histoires Personnalisées pour Enfant"
              className="text-3xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-1"
              splitType="words"
              delay={150}
              duration={0.8}
            />
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-4xl mx-auto">
              Créez des souvenirs inoubliables avec des histoires uniques pour vos enfants.
            </p>
            <Link
              href="/boutique"
              className="relative inline-block bg-primary text-white font-medium px-8 py-4 text-lg transition-all duration-300 rounded-full transform hover:scale-105 overflow-hidden group border-2 border-primary hover:bg-transparent hover:text-primary"
            >
              <span className="relative z-10 transition-colors duration-300">Voir nos histoires</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
