"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import SplitText from "./split-text"

export default function StoryCategoriesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="text-left mb-12">
          <SplitText
            text="Découvre nos catégories d'histoires où ton enfant est le héros !"
            className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-900 mb-4"
            textAlign="left"
          />
          <p className="text-sm text-gray-600 max-w-3xl">
            Parce que chaque enfant mérite une histoire rien que pour lui !
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
          {/* Histoires Uniques */}
          <div className="relative overflow-hidden rounded-md aspect-[3/2]">
            <div className="absolute inset-0">
              <img src="/story.avif" alt="Histoires Uniques" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="text-xl font-bold mb-2 text-white">Personnaliser sur loisir</h3>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                Offrez à vos enfants une expérience de lecture inoubliable et personnalisée !
              </p>
              <Link href="/boutique">
                <button className="px-6 py-2 border border-primary bg-primary text-white font-semibold rounded-full text-sm transition-all duration-300 hover:bg-transparent hover:text-primary">
                  Découvrir
                </button>
              </Link>
            </div>
          </div>

          {/* Personnalisation Facile */}
          <div className="relative overflow-hidden rounded-md aspect-[3/2]">
            <div className="absolute inset-0">
              <img src="/story1.avif" alt="Personnalisation Facile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="text-xl font-bold mb-2 text-white">Personnalisation Facile</h3>
              <p className="text-sm text-white/90 leading-relaxed mb-4">
                Choisissez une histoire et écrivez le prénom de votre enfant pour une expérience unique !
              </p>
              <Link href="/personnalisation">
                <button className="px-6 py-2 border border-primary bg-primary text-white font-semibold rounded-full text-sm transition-all duration-300 hover:bg-transparent hover:border hover:text-primary">
                  Commencer
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
