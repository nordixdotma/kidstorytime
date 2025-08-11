"use client"
import { motion } from "framer-motion"
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
  return (
    <Link href={`/products/${product.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="group relative bg-white shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden"
      >
        {/* Category Label */}
        <div className="absolute top-2 left-2 z-10">
          <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase tracking-wide">
            {getCategoryLabel(product.category)}
          </span>
        </div>

        {/* Image container */}
        <div className="relative h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content container */}
        <div className="p-3 flex-grow flex flex-col bg-white">
          {/* Product name */}
          <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-tight">{product.name}</h3>

          {/* Price section */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-400 line-through font-normal">DH{product.oldPrice}.00</span>
              <span className="text-sm text-gray-600 font-medium">Dès DH{product.price}.00</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
