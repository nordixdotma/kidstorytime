"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react"
import type { Product } from "@/lib/mock-products"
import Link from "next/link"

interface ApercuContentProps {
  product: Product
}

interface ProductPreview {
  product: Product
  quantity: number
  selectedCategory: string
  childName: string
  selectedDedication: string
  dedicationText: string
}

export default function ApercuContent({ product }: ApercuContentProps) {
  const [productPreview, setProductPreview] = useState<ProductPreview | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get product info from localStorage
    const storedPreview = localStorage.getItem("product-preview")
    if (storedPreview) {
      try {
        const parsedPreview = JSON.parse(storedPreview)
        setProductPreview(parsedPreview)
      } catch (error) {
        console.error("Error parsing product preview:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const handleAddToCart = () => {
    if (!productPreview) return

    console.log("[v0] Adding to cart:", productPreview)

    // Get existing cart items
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    console.log("[v0] Existing cart:", existingCart)

    // Create cart item
    const cartItem = {
      id: Date.now(), // unique id for this cart item
      productId: productPreview.product.id,
      name: productPreview.product.name,
      price: productPreview.product.price,
      image: productPreview.product.image,
      quantity: productPreview.quantity,
      customization: {
        category: productPreview.selectedCategory,
        childName: productPreview.childName,
        dedication: productPreview.selectedDedication,
        dedicationText: productPreview.dedicationText,
      },
    }

    console.log("[v0] Cart item to add:", cartItem)

    // Add to cart
    const updatedCart = [...existingCart, cartItem]
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    console.log("[v0] Updated cart saved:", updatedCart)

    // Trigger cart update event
    window.dispatchEvent(new Event("cartUpdated"))
    console.log("[v0] Cart update event dispatched")

    // Show success message or redirect
    alert("Produit ajouté au panier avec succès!")
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d88200]"></div>
        </div>
      </div>
    )
  }

  if (!productPreview) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Aperçu non disponible</h1>
            <p className="text-gray-600">
              Aucune information de prévisualisation trouvée. Veuillez retourner à la page du produit.
            </p>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center text-[#d88200] hover:text-[#c07600] font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour au produit
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back Button */}
      <Link
        href={`/products/${product.id}`}
        className="inline-flex items-center text-[#d88200] hover:text-[#c07600] mb-8 font-medium"
      >
        <ArrowLeft size={20} className="mr-2" />
        Retour au produit
      </Link>

      {/* Header */}
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-[#d88200] mr-3" size={32} />
            <h1 className="text-3xl md:text-4xl font-black text-[#d88200]">Aperçu de votre histoire</h1>
            <Sparkles className="text-[#d88200] ml-3" size={32} />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez comment votre histoire personnalisée prendra vie
          </p>
        </motion.div>
      </div>

      {/* Preview Content - Empty State for now */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 md:p-12 border border-orange-100"
      >
        <div className="text-center">
          <div className="w-24 h-24 bg-[#d88200]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={48} className="text-[#d88200]" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Aperçu en cours de développement</h2>

          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Cette fonctionnalité sera bientôt disponible. Vous pourrez voir un aperçu complet de votre histoire
            personnalisée.
          </p>

          {/* Product Info Summary */}
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Résumé de votre commande</h3>
            <div className="space-y-2 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Histoire:</span>
                <span className="font-medium">{productPreview.product.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Genre:</span>
                <span className="font-medium capitalize">{productPreview.selectedCategory}</span>
              </div>
              {productPreview.childName && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Prénom:</span>
                  <span className="font-medium">{productPreview.childName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Dédicace:</span>
                <span className="font-medium">Dédicace {productPreview.selectedDedication}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Prix:</span>
                <span className="font-bold text-[#d88200]">{productPreview.product.price} DH</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              className="bg-[#d88200] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#c07600] transition-colors"
            >
              Ajouter au panier
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
