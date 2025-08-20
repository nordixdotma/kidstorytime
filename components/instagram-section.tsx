"use client"

import { useState, useEffect } from "react"

export default function InstagramSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  // Mock Instagram posts - in a real app, you'd fetch these from Instagram API
  const instagramPosts = [
    {
      id: 1,
      image: "/in1.jpg",
      alt: "Enfant lisant une histoire personnalisée",
      link: "https://www.instagram.com/p/DNfzUtUMLMn/?img_index=1",
    },
    {
      id: 2,
      image: "/in2.jpg",
      alt: "Livre personnalisé avec prénom d'enfant",
      link: "https://www.instagram.com/p/DNcpUW8M4oy/",
    },
    {
      id: 3,
      image: "/in3.jpg",
      alt: "Famille heureuse lisant ensemble",
      link: "https://www.instagram.com/p/DNbJFDws1bV/",
    },
    {
      id: 4,
      image: "/in4.jpg",
      alt: "Collection de livres d'histoires colorés",
      link: "https://www.instagram.com/p/DNOFbQMso3j/",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className={`text-left mb-12 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl text-gray-900 mb-4">Our Instagram</h2>
        </div>

        {/* Instagram Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 transition-all duration-1200 ease-out delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {instagramPosts.map((post, index) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 block ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100 + 500}ms` }}
            >
              <div className="aspect-square relative">
                <img
                  src={post.image || "/placeholder.svg"}
                  alt={post.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
