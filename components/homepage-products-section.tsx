"use client"

import { useState, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import { mockProducts } from "@/lib/mock-products"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function HomepageProductsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [sortBy, setSortBy] = useState("default")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Apply sorting to products
  const sortedProducts = useMemo(() => {
    const products = [...mockProducts]

    switch (sortBy) {
      case "price-low":
        products.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        products.sort((a, b) => b.price - a.price)
        break
      case "newest":
        products.sort((a, b) => b.id - a.id)
        break
      case "name":
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order
        break
    }

    return products.slice(0, 8) // Show first 8 products
  }, [sortBy])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const sortOptions = [
    { value: "default", label: "Trier par défaut" },
    { value: "price-low", label: "Prix: du plus bas au plus haut" },
    { value: "price-high", label: "Prix: du plus haut au plus bas" },
    { value: "name", label: "Nom: A-Z" },
    { value: "newest", label: "Plus récent" },
  ]

  const selectedOption = sortOptions.find((option) => option.value === sortBy)

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Price Filter */}
        <div className="flex justify-end mb-8">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between min-w-[200px] bg-white border-2 border-gray-200 hover:border-[#d88200] focus:border-[#d88200] focus:outline-none px-4 py-3 text-gray-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <span className="text-sm">{selectedOption?.label}</span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-full bg-white border border-gray-200 shadow-lg z-10">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors duration-150 ${
                      sortBy === option.value ? "bg-[#d88200]/10 text-[#d88200] font-medium" : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8"
        >
          {sortedProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/boutique"
            className="inline-block bg-[#d88200] hover:bg-[#c07600] text-white font-black px-8 py-3 text-lg transition-colors duration-300"
          >
            Voir Tous
          </Link>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && <div className="fixed inset-0 z-5" onClick={() => setIsDropdownOpen(false)} />}
    </section>
  )
}
