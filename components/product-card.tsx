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
        <span className="bg-[#d88200] text-white text-xs font-normal px-2 py-1 uppercase tracking-wide rounded-r-sm">
          {getCategoryLabel(product.category)}
        </span>
      </div>

      <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
        <img
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0] || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
        />
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
            <button className="relative bg-[#d88200] text-white py-2 px-4 rounded-sm text-sm font-medium transition-colors duration-300 overflow-hidden group/btn">
              <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                Personnaliser
              </span>
              <div className="absolute inset-0 bg-black scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-center"></div>
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
