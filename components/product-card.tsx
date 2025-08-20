"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import type { Product } from "@/lib/mock-products"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

const getCategoryLabel = (category: string) => {
  if (category === "aventure") return "AVENTURE"
  if (category === "sommeil") return "SOMMEIL"
  return category.toUpperCase()
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative bg-white transition-all duration-300 h-full flex flex-col overflow-hidden rounded-sm"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute top-2 left-0 z-10">
        <span className="bg-[#f97316] text-white text-xs font-normal px-2 py-1 uppercase tracking-wide rounded-r-sm">
          {getCategoryLabel(product.category)}
        </span>
      </div>

      <div className="relative aspect-square overflow-hidden">
        {/* Main image */}
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isHovered && product.images.length > 1 ? 0 : 1 }}
        />
        {/* Secondary image for hover effect */}
        {product.images.length > 1 && (
          <img
            src={product.images[1] || "/placeholder.svg"}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        )}
      </div>

      {/* Content container */}
      <div className="py-3 flex-grow flex flex-col bg-white">
        {/* Product name */}
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-tight">{product.name}</h3>

        {/* Price section */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-400 line-through font-normal">DH{product.oldPrice}.00</span>
            <span className="text-sm text-gray-600 font-bold">DH{product.price}.00</span>
          </div>
        </div>

        <div className="mt-auto flex justify-start">
          <Link href={`/products/${product.id}`}>
            <button className="relative bg-[#f97316] text-white py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group/btn border-2 border-[#f97316] hover:bg-white hover:text-[#f97316]">
              <span className="relative z-10 transition-colors duration-300">Personnaliser</span>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
