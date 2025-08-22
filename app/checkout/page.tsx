"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, ShoppingBag, Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface CheckoutFormData {
  fullName: string
  email: string
  phone: string
  city: string
  country: string
  address: string
  comment: string
  promoCode: string
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    address: "",
    comment: "",
    promoCode: "",
  })

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<CheckoutFormData> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Le nom est obligatoire"
    if (!formData.email.trim()) newErrors.email = "L'email est obligatoire"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide"
    if (!formData.phone.trim()) newErrors.phone = "Le numéro de téléphone est obligatoire"
    if (!formData.address.trim()) newErrors.address = "L'adresse est obligatoire"
    if (!formData.country.trim()) newErrors.country = "Le pays est obligatoire"
    if (!formData.city.trim()) newErrors.city = "La ville est obligatoire"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Here you would normally send the data to your backend
      console.log("Order data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For now, we'll just show an alert
      alert("Commande envoyée avec succès! Nous vous contacterons bientôt.")

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        address: "",
        comment: "",
        promoCode: "",
      })
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Erreur lors de l'envoi de la commande. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/boutique"
          className="inline-flex items-center text-[#d88200] hover:text-[#c07600] mb-8 font-medium"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour à la boutique
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center mb-4">
              <ShoppingBag className="text-[#d88200] mr-3" size={32} />
              <h1 className="text-xl md:text-2xl font-black text-[#d88200]">Finaliser la commande</h1>
            </div>
            <p className="text-sm text-gray-600 max-w-xl mx-auto">
              Remplissez vos informations pour recevoir votre histoire personnalisée
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left Column - Order Information (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="p-4 md:p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-4">
                <ShoppingBag className="text-[#d88200] mr-3" size={18} />
                <h2 className="text-lg font-bold text-gray-900">Résumé de commande</h2>
              </div>

              {/* Order summary content would go here */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sous-total:</span>
                  <span className="font-medium">150 DH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Livraison:</span>
                  <span className="font-medium">Gratuite</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-[#d88200]">150 DH</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form Inputs (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="p-4 md:p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-4">
                <CreditCard className="text-[#d88200] mr-3" size={18} />
                <h2 className="text-lg font-bold text-gray-900">Informations de livraison</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.fullName
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                    }`}
                    placeholder="Votre nom complet"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                    }`}
                    placeholder="votre@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                    }`}
                    placeholder="+212 XXXXXXXXX"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* City and Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ville <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.city
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                      }`}
                      placeholder="Votre ville"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pays <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                        errors.country
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                      }`}
                      placeholder="Votre pays"
                    />
                    {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse de livraison <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    rows={2}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                      errors.address
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                    }`}
                    placeholder="Votre adresse complète"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>

                {/* Promo Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Tag size={16} className="inline mr-1" />
                    Code promo
                  </label>
                  <input
                    type="text"
                    value={formData.promoCode}
                    onChange={(e) => handleInputChange("promoCode", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-[#d88200] transition-colors"
                    placeholder="Entrez votre code promo"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Commentaire</label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => handleInputChange("comment", e.target.value)}
                    rows={2}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-[#d88200] transition-colors resize-none"
                    placeholder="Commentaire ou instructions spéciales (optionnel)"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors ${
                      isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-[#d88200] hover:bg-[#c07600]"
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </div>
                    ) : (
                      "Finaliser la commande"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
