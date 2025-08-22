"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, ShoppingBag, Tag } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface CheckoutFormData {
  nom: string
  email: string
  numero: string
  adresse: string
  paye: string
  ville: string
  note: string
  codeReduction: string
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    nom: "",
    email: "",
    numero: "",
    adresse: "",
    paye: "",
    ville: "",
    note: "",
    codeReduction: "",
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

    if (!formData.nom.trim()) newErrors.nom = "Le nom est obligatoire"
    if (!formData.email.trim()) newErrors.email = "L'email est obligatoire"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide"
    if (!formData.numero.trim()) newErrors.numero = "Le numéro de téléphone est obligatoire"
    if (!formData.adresse.trim()) newErrors.adresse = "L'adresse est obligatoire"
    if (!formData.paye.trim()) newErrors.paye = "Le pays est obligatoire"
    if (!formData.ville.trim()) newErrors.ville = "La ville est obligatoire"

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
        nom: "",
        email: "",
        numero: "",
        adresse: "",
        paye: "",
        ville: "",
        note: "",
        codeReduction: "",
      })
    } catch (error) {
      console.error("Error submitting order:", error)
      alert("Erreur lors de l'envoi de la commande. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <h1 className="text-2xl md:text-3xl font-black text-[#d88200]">Finaliser la commande</h1>
            </div>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Remplissez vos informations pour recevoir votre histoire personnalisée
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-lg p-6 md:p-8 border border-gray-200"
        >
          <div className="flex items-center mb-6">
            <CreditCard className="text-[#d88200] mr-3" size={20} />
            <h2 className="text-xl font-bold text-gray-900">Informations de livraison</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => handleInputChange("nom", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.nom
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                }`}
                placeholder="Entrez votre nom complet"
              />
              {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom}</p>}
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

            {/* Numéro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Numéro de téléphone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.numero}
                onChange={(e) => handleInputChange("numero", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                  errors.numero
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                }`}
                placeholder="+212 6XX XXX XXX"
              />
              {errors.numero && <p className="text-red-500 text-sm mt-1">{errors.numero}</p>}
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.adresse}
                onChange={(e) => handleInputChange("adresse", e.target.value)}
                rows={2}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                  errors.adresse
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                }`}
                placeholder="Entrez votre adresse complète"
              />
              {errors.adresse && <p className="text-red-500 text-sm mt-1">{errors.adresse}</p>}
            </div>

            {/* Pays et Ville */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pays */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pays <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.paye}
                  onChange={(e) => handleInputChange("paye", e.target.value)}
                  aria-label="Sélectionnez votre pays"
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.paye
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                  }`}
                >
                  <option value="">Sélectionnez un pays</option>
                  <option value="Maroc">Maroc</option>
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Canada">Canada</option>
                  <option value="Autre">Autre</option>
                </select>
                {errors.paye && <p className="text-red-500 text-sm mt-1">{errors.paye}</p>}
              </div>

              {/* Ville */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.ville}
                  onChange={(e) => handleInputChange("ville", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                    errors.ville
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[#d88200] focus:border-[#d88200]"
                  }`}
                  placeholder="Entrez votre ville"
                />
                {errors.ville && <p className="text-red-500 text-sm mt-1">{errors.ville}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Tag size={16} className="inline mr-1" />
                Ajouter un code de réduction
              </label>
              <input
                type="text"
                value={formData.codeReduction}
                onChange={(e) => handleInputChange("codeReduction", e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-[#d88200] transition-colors"
                placeholder="Entrez votre code de réduction"
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note (optionnel)</label>
              <textarea
                value={formData.note}
                onChange={(e) => handleInputChange("note", e.target.value)}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d88200] focus:border-[#d88200] transition-colors resize-none"
                placeholder="Instructions spéciales ou commentaires..."
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
        </motion.div>
      </div>
    </main>
  )
}
