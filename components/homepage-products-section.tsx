"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import ProductCard from "./product-card"
import { specialProducts } from "@/lib/mock-products"
import Link from "next/link"

export default function HomepageProductsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

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

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre histoires</h2>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
        >
          {specialProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-8">
          <Link href="/boutique">
            <button className="relative bg-[#d88200] text-white px-8 py-3 rounded-sm font-medium transition-colors duration-300 overflow-hidden group">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">Voir tous</span>
              <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
