"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Truck, ArrowLeft, ArrowRight } from "lucide-react"
import type { Product } from "@/lib/mock-products"
import Link from "next/link"
import ProductGrid from "./product-grid"
import { mockProducts } from "@/lib/mock-products"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("fille")
  const [childName, setChildName] = useState("")
  const [selectedDedication, setSelectedDedication] = useState("1")
  const [nameError, setNameError] = useState("")

  // Get related products (exclude current product)
  const relatedProducts = mockProducts.filter((p) => p.id !== product.id).slice(0, 4)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  // Handle keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextImage()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleThumbnailClick = (index: number) => {
    setSelectedImage(index)
  }

  const dedicationOptions = [
    { value: "1", label: "Dédicace 1" },
    { value: "2", label: "Dédicace 2" },
    { value: "3", label: "Dédicace 3" },
    { value: "4", label: "Dédicace 4" },
    { value: "5", label: "Dédicace 5" },
  ]

  const getSelectedDedicText = () => {
    const displayName = childName || "[Prénom de l'enfant]"

    const dedications = {
      "1": `À mon cher ${displayName}, chaque page de cette histoire est une nouvelle aventure et un rappel que tu peux conquérir le monde. Avec amour, Maman.`,
      "2": `À mon merveilleux ${displayName}, que cette histoire illumine tes rêves comme tu illumines ma vie. Je suis si fier(e) de toi !`,
      "3": `À ${displayName}, qui apporte toujours des couleurs vives dans ma vie. Que chaque mot de cette histoire t'inspire à réaliser tes plus grands rêves.`,
      "4": `À mon intrépide ${displayName}, que chaque page te pousse à découvrir encore plus de merveilles dans ce monde. Avec tout mon amour.`,
      "5": `À ${displayName}, qui transforme chaque nuit en rêve magique. Que cette histoire t'emmène vers des lieux fantastiques et inexplorés !`,
    }

    return dedications[selectedDedication as keyof typeof dedications]
  }

  const handleViewPreview = () => {
    // Validate required fields
    if (!childName.trim()) {
      setNameError("Le prénom de l'enfant est obligatoire")
      return
    }

    // Store product info in localStorage
    const productInfo = {
      product,
      quantity,
      selectedCategory,
      childName: childName.trim(),
      selectedDedication,
      dedicationText: getSelectedDedicText(),
    }

    localStorage.setItem("product-preview", JSON.stringify(productInfo))

    // Navigate to preview page
    window.location.href = `/apercu/${product.id}`
  }

  const handleWhatsAppInquiry = () => {
    // Validate required fields
    if (!childName.trim()) {
      setNameError("Le prénom de l'enfant est obligatoire")
      return
    }

    const phoneNumber = "+212696570164"
    let message = `Bonjour, je suis intéressé(e) par cette histoire:\n\n`
    message += `*${product.name}*\n`
    message += `Prix: ${product.price} DH\n`
    message += `Catégorie: ${selectedCategory}\n`
    message += `Âge: ${product.age}\n`
    message += `Prénom: ${childName.trim()}\n`
    message += `Dédicace: ${selectedDedication}\n`
    message += `\nPouvez-vous me donner plus d'informations?`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-16 md:pb-24">
        {/* Back Button */}
        <Link
          href="/boutique"
          className="inline-flex items-center text-[#d88200] hover:text-[#c07600] mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour aux histoires
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Product Images */}
          <div className="space-y-4">
            {/* Main Image Container */}
            <div className="relative aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50 shadow-sm w-full">
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                    aria-label="Image précédente"
                  >
                    <ArrowLeft size={18} className="text-[#d88200]" />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-200"
                    aria-label="Image suivante"
                  >
                    <ArrowRight size={18} className="text-[#d88200]" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full w-full"
                >
                  <img
                    src={product.images[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Image Counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-medium text-[#d88200]">
                  {selectedImage + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleThumbnailClick(index)}
                    className={`relative overflow-hidden rounded-lg ${
                      selectedImage === index
                        ? "ring-2 ring-[#d88200] ring-offset-2"
                        : "ring-1 ring-gray-200 hover:ring-[#d88200]/50"
                    } w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 transition-all duration-200 flex-shrink-0`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - Vue ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="flex flex-col space-y-4">
            {/* Product Name and Pricing */}
            <div className="border-b border-gray-100 pb-4">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#d88200] mb-2">{product.name}</h1>

                <div className="mb-3 flex gap-4">
                  <p className="text-gray-600 text-base">Catégorie: {product.category}</p>
                  <p className="text-gray-600 text-base">Âge: {product.age}</p>
                </div>

                {/* Pricing */}
                <div className="mb-2">
                  <p className="text-lg text-gray-400 line-through font-normal">{product.oldPrice} DH</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#d88200]">{product.price} DH</p>
                  <p className="text-sm text-green-600 font-normal">Économisez {product.oldPrice - product.price} DH</p>
                </div>
              </motion.div>
            </div>

            {/* Genre Selection */}
            <div>
              <h3 className="text-lg font-black text-[#d88200] mb-3">Genre</h3>
              <div className="flex gap-3">
                <div
                  onClick={() => setSelectedCategory("fille")}
                  className={`cursor-pointer px-4 py-2 border-2 rounded-md transition-all duration-200 ${
                    selectedCategory === "fille"
                      ? "border-[#d88200] bg-[#d88200]/10 text-[#d88200]"
                      : "border-gray-300 hover:border-[#d88200]/50 text-gray-700"
                  }`}
                >
                  <span className="font-medium">Fille</span>
                </div>

                <div
                  onClick={() => setSelectedCategory("garcon")}
                  className={`cursor-pointer px-4 py-2 border-2 rounded-md transition-all duration-200 ${
                    selectedCategory === "garcon"
                      ? "border-[#d88200] bg-[#d88200]/10 text-[#d88200]"
                      : "border-gray-300 hover:border-[#d88200]/50 text-gray-700"
                  }`}
                >
                  <span className="font-medium">Garçon</span>
                </div>
              </div>
            </div>

            {/* Child Name Input */}
            <div>
              <h3 className="text-lg font-black text-[#d88200] mb-3">
                Prénom de l'enfant <span className="text-red-500">*</span>
              </h3>
              <input
                type="text"
                value={childName}
                onChange={(e) => {
                  setChildName(e.target.value)
                  if (nameError) setNameError("") // Clear error when user starts typing
                }}
                placeholder="Entrez le prénom de l'enfant"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-1 font-normal transition-colors ${
                  nameError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                }`}
                required
              />
              {nameError && <p className="text-red-500 text-sm mt-1 font-medium">{nameError}</p>}
            </div>

            {/* Dedication Selection - Checkbox Style */}
            <div>
              <h3 className="text-lg font-black text-[#d88200] mb-3">Dédicace personnalisée</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                {dedicationOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => setSelectedDedication(option.value)}
                    className={`cursor-pointer px-3 py-2 border-2 rounded-md transition-all duration-200 text-center ${
                      selectedDedication === option.value
                        ? "border-[#d88200] bg-[#d88200]/10 text-[#d88200]"
                        : "border-gray-300 hover:border-[#d88200]/50 text-gray-700"
                    }`}
                  >
                    <span className="font-medium text-sm">{option.label}</span>
                  </div>
                ))}
              </div>

              {/* Display selected dedication */}
              <div className="p-4 bg-gray-50 rounded-sm">
                <p className="text-md text-gray-700 italic">
                  {getSelectedDedicText().replace(/\[Prénom de l'enfant\]/g, "**[Prénom de l'enfant]**")}
                </p>
              </div>
            </div>

            {/* Product Description */}
            <div>
              <h3 className="text-lg font-black text-[#d88200] mb-3">Description</h3>
              <p className="text-gray-600 font-normal leading-relaxed">
                {product.description ||
                  `Découvrez **${product.name}**, une histoire personnalisée qui captivera votre enfant. 
                  Chaque histoire est unique et adaptée spécialement pour créer des souvenirs inoubliables.`}
              </p>
            </div>

            {/* Shipping Information */}
            <div className="flex items-center border-l-4 border-green-500 pl-4 py-2 bg-green-50 rounded-r-md">
              <Truck size={18} className="text-green-500 mr-3" />
              <div>
                <p className="font-medium text-green-700">Livraison disponible</p>
                <p className="text-xs text-gray-600">Livraison dans tout le Maroc</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleViewPreview}
                  className="flex-1 py-3 px-4 bg-[#d88200] text-white rounded-md flex items-center justify-center hover:bg-[#c07600] transition-colors font-black"
                >
                  Voir l'aperçu
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppInquiry}
                  className="py-3 px-4 bg-green-500 text-white rounded-md flex items-center justify-center hover:bg-green-600 transition-colors font-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor"
                    className="md:mr-2"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span className="hidden md:inline">WhatsApp</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You Might Also Like Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-normal text-black text-left">Vous pourriez aussi aimer</h2>
          </div>

          <ProductGrid products={relatedProducts} showAnimation={false} />
        </div>
      </section>
    </>
  )
}
