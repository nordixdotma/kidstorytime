"use client"

import type { Product } from "@/lib/mock-products"
import { extraProducts } from "@/lib/mock-products"
import { ArrowLeft, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useCart } from "@/lib/cart-context"
import { useRouter } from "next/navigation"

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
  const [selectedExtras, setSelectedExtras] = useState<number[]>([])
  const [selectedMainImage, setSelectedMainImage] = useState(0)
  const { addItem, openCart } = useCart()
  const router = useRouter()

  const apercuImages = ["/apercu/cover.png", "/apercu/1st-page.png", "/apercu/3rd-page.png"]

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

  const toggleExtra = (extraId: number) => {
    setSelectedExtras((prev) => (prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]))
  }

  const calculateTotalPrice = () => {
    if (!productPreview) return 0
    const basePrice = productPreview.product.price
    const extrasPrice = selectedExtras.reduce((total, extraId) => {
      const extra = extraProducts.find((e) => e.id === extraId)
      return total + (extra?.price || 0)
    }, 0)
    return basePrice + extrasPrice
  }

  const handleAddToCart = () => {
    if (!productPreview) return

    // Add main product to cart
    addItem(productPreview.product, productPreview.quantity)

    // Add selected extra products to cart
    selectedExtras.forEach((extraId) => {
      const extra = extraProducts.find((e) => e.id === extraId)
      if (extra) {
        addItem(extra as Product, 1)
      }
    })

    // Open cart modal to show added items
    openCart()
  }

  const handleOrder = () => {
    if (!productPreview) return

    const selectedExtraProducts = extraProducts.filter((extra) => selectedExtras.includes(extra.id))

    // Store order info in localStorage for checkout
    const orderInfo = {
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
      extraProducts: selectedExtraProducts,
      totalPrice: calculateTotalPrice(),
    }

    localStorage.setItem("checkout-order", JSON.stringify(orderInfo))

    router.push("/checkout")
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!productPreview) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Aperçu non disponible</h1>
            <p className="text-gray-600">
              Aucune information de prévisualisation trouvée. Veuillez retourner à la page du produit.
            </p>
          </div>
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            <ArrowLeft size={20} className="mr-2" />
            Retour au produit
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour au produit
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[calc(100vh-200px)]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Aperçu de votre histoire</h2>

            {/* Main Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm w-full">
              {/* Navigation Arrows */}
              {apercuImages.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedMainImage((prev) => (prev === 0 ? apercuImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                    aria-label="Image précédente"
                  >
                    <ArrowLeft size={18} className="text-primary" />
                  </button>

                  <button
                    onClick={() => setSelectedMainImage((prev) => (prev + 1) % apercuImages.length)}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                    aria-label="Image suivante"
                  >
                    <ArrowRight size={18} className="text-primary" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <img
                src={apercuImages[selectedMainImage] || "/placeholder.svg"}
                alt={`Aperçu ${selectedMainImage + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Image Counter */}
              {apercuImages.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-primary">
                  {selectedMainImage + 1} / {apercuImages.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {apercuImages.length > 1 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                {apercuImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedMainImage(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      selectedMainImage === index
                        ? "ring-2 ring-primary ring-offset-2"
                        : "ring-1 ring-gray-200 hover:ring-primary/50"
                    } w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-all duration-200 flex-shrink-0`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Aperçu ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Extra Products and Order */}
          <div className="space-y-6">
            {/* Product Info Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-4">Résumé de votre commande</h3>
              <div className="space-y-2 text-sm">
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
                  <span className="font-medium">
                    {productPreview.dedicationText || `Dédicace ${productPreview.selectedDedication}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">Prix de base:</span>
                  <span className="font-medium">{productPreview.product.price} DH</span>
                </div>
                {selectedExtras.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Produits supplémentaires:</span>
                    <span className="font-medium">
                      {selectedExtras.reduce((total, extraId) => {
                        const extra = extraProducts.find((e) => e.id === extraId)
                        return total + (extra?.price || 0)
                      }, 0)}{" "}
                      DH
                    </span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-primary">{calculateTotalPrice()} DH</span>
                </div>
              </div>
            </div>

            {/* Extra Products Grid */}
            <div>
              <h3 className="font-bold text-gray-900 mb-4">Produits supplémentaires</h3>
              <div className="grid grid-cols-4 gap-3">
                {extraProducts.map((extra) => (
                  <div
                    key={extra.id}
                    onClick={() => toggleExtra(extra.id)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      selectedExtras.includes(extra.id)
                        ? "border-primary shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="aspect-square">
                      <img
                        src={extra.image || "/placeholder.svg"}
                        alt={extra.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {selectedExtras.includes(extra.id) && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                    )}
                    <div className="p-2 bg-white">
                      <p className="text-xs font-medium text-gray-900 truncate">{extra.name}</p>
                      <p className="text-xs text-primary font-bold">{extra.price} DH</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gray-100 text-primary border-2 border-primary px-8 py-4 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors text-lg"
              >
                Ajouter au panier
              </button>

              <button
                onClick={handleOrder}
                className="w-full bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors text-lg"
              >
                Commander maintenant - {calculateTotalPrice()} DH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
