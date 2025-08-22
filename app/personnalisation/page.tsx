"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import CartModal from "@/components/cart-modal"

export default function PersonnalisationPage() {
  const router = useRouter()
  const [childName, setChildName] = useState("")
  const [dedication, setDedication] = useState("")
  const [selectedCharacter, setSelectedCharacter] = useState("")

  const characters = [
    { id: "boy", name: "Héros", image: "/placeholder.svg?height=200&width=200" },
    { id: "girl", name: "Héroïne", image: "/placeholder.svg?height=200&width=200" },
  ]

  const dedicationExamples = [
    "Pour mon petit trésor, que cette histoire t'apporte joie et rêves merveilleux.",
    "À mon enfant adoré, puisse cette aventure nourrir ton imagination.",
    "Pour toi mon cœur, que chaque page soit une nouvelle découverte.",
    "Mon petit ange, cette histoire est créée spécialement pour toi avec tout mon amour.",
  ]

  const steps = [
    {
      number: "1",
      title: "Choix de l'histoire",
      description:
        "Choisissez l'histoire que vous souhaitez offrir à votre enfant depuis la Boutique des histoires personnalisables.",
    },
    {
      number: "2",
      title: 'Personnalisation via le "Prénom de votre Enfant"',
      description:
        "Saisissez le prénom de votre enfant dans le champ de personnalisation, et il apparaîtra tout au long de l'histoire.",
    },
    {
      number: "3",
      title: 'Personnalisation via une "Dédicace Spéciale"',
      description:
        "Ajoutez une dédicace spéciale pour rendre l'histoire unique. Vous pouvez aussi vous inspirer des dédicaces proposées pour personnaliser votre message.",
    },
    {
      number: "4",
      title: "Appréciez la lecture de l'histoire personnalisée avec votre enfant",
      description: "Recevez vos histoires imprimées directement chez vous avec paiement à la livraison.",
    },
    {
      number: "5",
      title: "Personnalisation sur mesure",
      description:
        "Adaptez l'histoire selon les loisirs et passions de votre enfant pour une expérience encore plus personnalisée et engageante.",
    },
  ]

  const handleNavigateToBoutique = () => {
    router.push("/boutique")
  }

  return (
    <div className="min-h-screen">
      <Header forceWhite={true} />

      <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 pt-16 md:pt-20">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">Histoire personnalisée et unique</h1>
            <p className="text-lg md:text-xl text-gray-700">
              Créez des souvenirs inoubliables avec des histoires uniques pour vos enfants
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Image */}
            <div className="order-2 md:order-1">
              <img
                src="/persona.avif"
                alt="Histoire personnalisée et unique"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>

            {/* Right side - 4 steps */}
            <div className="order-1 md:order-2 grid grid-cols-1 gap-3">
              {steps.map((step, index) => (
                <Card key={index} className="border-2 border-orange-200 hover:border-orange-400 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-xs leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Histoires Personnalisées</h2>
            <p className="text-lg text-gray-600">Créez une expérience de lecture unique pour votre enfant</p>
          </div>

          {/* Dédicace Spéciale Section */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img src="/per1.avif" alt="Livres d'enfants avec camion jouet" className="w-full h-64 object-cover" />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/per2.avif"
                  alt="Page de livre personnalisé avec dédicace"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Dédicace Spéciale</h3>
                <p className="text-gray-600 mb-6 md:mb-0">Personnalisez votre histoire avec un message touchant</p>
              </div>
              <button
                onClick={handleNavigateToBoutique}
                className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-orange-400 hover:text-orange-600 transition-colors md:ml-8 flex-shrink-0"
              >
                Commencer
              </button>
            </div>
          </div>

          {/* Personnage Unique Section */}
          <div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/per3.avif"
                  alt="Couverture de livre magique avec aventure au royaume animal"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src="/per4.avif"
                  alt="Coin histoire livre personnalisé pour enfants"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-center md:text-left">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Personnaliser sur loisir</h3>
                <p className="text-gray-600 mb-6 md:mb-0">Choisissez le héros ou l'héroïne de votre histoire</p>
              </div>
              <button
                onClick={handleNavigateToBoutique}
                className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-orange-400 hover:text-orange-600 transition-colors md:ml-8 flex-shrink-0"
              >
                Choisir
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <CartModal />
    </div>
  )
}
