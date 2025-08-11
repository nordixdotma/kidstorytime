"use client"

import { useState, useMemo } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import ProductGrid from "./product-grid"
import ProductFilter from "./product-filter"
import EmptyProductState from "./empty-product-state"
import { mockProducts } from "@/lib/mock-products"
import Link from "next/link"

interface ProductsSectionProps {
  category: string
  type: string
}

export default function ProductsSection({ category, type }: ProductsSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    brands: [] as string[],
    priceRange: { min: 0, max: 5000 },
    sortBy: "newest",
  })

  // Filter products by category and type
  const categoryProducts = mockProducts.filter((product) => product.category === category && product.type === type)

  // Apply additional filters
  const filteredProducts = useMemo(() => {
    const filtered = categoryProducts.filter((product) => {
      // Search filter
      if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false
      }

      // Price filter
      const price = product.price
      if (price < filters.priceRange.min || price > filters.priceRange.max) {
        return false
      }

      return true
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "newest":
        default:
          return b.id - a.id
      }
    })

    return filtered.slice(0, 8) // Limit to 8 products
  }, [categoryProducts, filters, searchTerm])

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProductFilter
          onFilterChange={setFilters}
          onSearchChange={setSearchTerm}
          brands={[]} // No brands anymore
          totalProducts={categoryProducts.length}
          filteredCount={filteredProducts.length}
        />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <ProductGrid products={filteredProducts} />
            <div className="col-span-full flex justify-center mt-4">
              <Link href="/boutique">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Voir Tous</button>
              </Link>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <EmptyProductState
              title="Aucun produit trouvé"
              message="Aucun produit ne correspond à vos critères de recherche. Essayez de modifier les filtres."
              compact={true}
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
