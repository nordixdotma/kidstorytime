"use client"

import { useState, useMemo, useCallback } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import CartModal from "@/components/cart-modal"
import ProductGrid from "@/components/product-grid"
import ProductFilterWithAge from "@/components/product-filter-with-age"
import ServicesSection from "@/components/vos-avantage"
import EmptyProductState from "@/components/empty-product-state"
import { allProducts } from "@/lib/mock-products"

interface FilterOptions {
  brands: string[]
  priceRange: {
    min: number
    max: number
  }
  ageRange: string
  sortBy: string
}

export default function BoutiquePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    priceRange: { min: 0, max: 10000 },
    ageRange: "Tous les âges",
    sortBy: "newest",
  })

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = allProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())

      // Price filter
      const matchesPrice = product.price >= filters.priceRange.min && product.price <= filters.priceRange.max

      // Age filter
      const matchesAge = filters.ageRange === "Tous les âges" || product.ageRange === filters.ageRange

      return matchesSearch && matchesPrice && matchesAge
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
        case "brand":
          return a.category.localeCompare(b.category)
        default: // newest
          return b.id - a.id
      }
    })

    return filtered
  }, [searchTerm, filters])

  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters)
  }, [])

  const handleSearchChange = useCallback((search: string) => {
    setSearchTerm(search)
  }, [])

  // Get unique brands for filter
  const brands = Array.from(new Set(allProducts.map((product) => product.category)))

  return (
    <div className="min-h-screen bg-white">
      <Header forceWhite={true} />
      <div className="pt-28 md:pt-32">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Boutique</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez toute notre collection d'histoires personnalisées pour enfants
            </p>
          </div>

          <ProductFilterWithAge
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            brands={brands}
            totalProducts={allProducts.length}
            filteredCount={filteredAndSortedProducts.length}
          />

          {/* Products Grid or Empty State */}
          <div className="mb-16">
            {filteredAndSortedProducts.length === 0 ? (
              <EmptyProductState
                title="Aucune Histoire Trouvée"
                message="Nous n'avons pas pu trouver d'histoires correspondant à vos critères de recherche. Essayez de modifier vos filtres ou votre recherche."
              />
            ) : (
              <ProductGrid products={filteredAndSortedProducts} showAnimation={true} />
            )}
          </div>
        </div>

        {/* Vos Avantage Section */}
        <ServicesSection />
      </div>

      <Footer />
      <WhatsAppButton />
      <CartModal />
    </div>
  )
}
