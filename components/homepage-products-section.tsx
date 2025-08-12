"use client"

import { useState, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import { mockProducts } from "@/lib/mock-products"
import { ChevronDown } from "lucide-react"

export default function HomepageProductsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [sortBy, setSortBy] = useState("default")

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

    return products // Show all products
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
    { value: "default", label: "Défaut" },
    { value: "price-low", label: "Prix: du plus bas au plus haut" },
    { value: "price-high", label: "Prix: du plus haut au plus bas" },
    { value: "name", label: "Nom: A-Z" },
    { value: "newest", label: "Plus récent" },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Improved Sort Filter */}
        <div className="flex justify-end mb-8">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Trier par:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-[#d88200] cursor-pointer font-medium hover:border-[#d88200] transition-colors shadow-sm min-w-[200px]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-white text-gray-700 py-2">
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
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
      </div>
    </section>
  )
}
