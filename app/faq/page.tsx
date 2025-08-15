"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { ChevronDown, ChevronUp } from "lucide-react"
import CartModal from "@/components/cart-modal"

const faqData = [
  {
    question: "Quels types d'histoires proposez-vous ?",
    answer:
      "Nous proposons une variété d'histoires personnalisées pour les enfants de tous âges, allant des contes de fées aux aventures fantastiques et aux histoires éducatives. Chaque histoire peut être personnalisée avec le prénom de l'enfant et une dédicace spéciale.",
  },
  {
    question: "Comment puis-je personnaliser une histoire pour mon enfant ?",
    answer:
      "Pour personnaliser une histoire, choisissez simplement l'histoire que vous souhaitez acheter, puis entrez le prénom de l'enfant et la dédicace spéciale sur la page de personnalisation.",
  },
  {
    question: "Quels sont les formats disponibles pour les histoires ?",
    answer: "Nous proposons uniquement des versions imprimables de nos histoires.",
  },
  {
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons le paiement à la livraison.",
  },
  {
    question: "Délai de livraison ?",
    answer:
      "Veuillez noter que le délai de livraison est de 5 à 7 jours en raison du caractère personnalisé des produits.",
  },
  {
    question: "Prix de livraison ?",
    answer: "La livraison est gratuite au Maroc",
  },
  {
    question: "Puis-je commander plusieurs histoires en une seule fois ?",
    answer:
      "Oui, vous pouvez ajouter plusieurs histoires à votre panier et les personnaliser individuellement avant de finaliser votre commande.",
  },
  {
    question: "Offrez-vous des réductions pour les achats groupés ?",
    answer:
      "Nous offrons la livraison gratuite à partir de 300 dh et des bons de réduction publiés sur notre page Instagram.",
  },
  {
    question: "Puis-je modifier ou annuler ma commande ?",
    answer:
      "Si vous devez modifier ou annuler votre commande, veuillez nous contacter immédiatement à kidstorytime24@gmail.com. Les modifications ne peuvent être apportées que si l'histoire n'a pas encore été imprimée. Veuillez noter que le délai de livraison est de 5 à 7 jours en raison du caractère personnalisé des produits.",
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer:
      "En raison de la nature personnalisée de nos produits, nous n'acceptons pas les retours. Cependant, si vous rencontrez un problème avec votre commande, veuillez nous contacter pour que nous puissions le résoudre.",
  },
  {
    question: "Comment puis-je vous contacter pour des questions supplémentaires ?",
    answer:
      "Pour toute question supplémentaire, vous pouvez nous envoyer un email à contact@kidstorytime.shop. Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 heures.",
  },
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="min-h-screen bg-white">
      <Header forceWhite={true} />
      <div className="pt-28 md:pt-32">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Questions Fréquentes</h1>
            <p className="text-lg text-gray-600">
              Trouvez les réponses aux questions les plus courantes sur nos histoires personnalisées
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{item.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-[#d88200] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#d88200] flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-4 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vous ne trouvez pas la réponse à votre question ?</h2>
            <p className="text-gray-600 mb-6">N'hésitez pas à nous contacter directement pour obtenir de l'aide</p>
            <a
              href="mailto:contact@kidstorytime.shop"
              className="inline-block bg-[#d88200] hover:bg-[#c07600] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300"
            >
              Nous contacter
            </a>
          </div>
        </main>
      </div>

      <Footer />
      <WhatsAppButton />
      <CartModal />
    </div>
  )
}
