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
    <section className="py-16 md:py-24 bg-gray-50">
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
          <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-blue-400 to-purple-600">
            <div className="absolute inset-0">
              <img src="/section.avif" alt="Histoires Uniques" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative z-10 h-96 flex flex-col justify-end p-0">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg mx-auto mb-4 p-4 w-11/12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-white">Personnaliser sur loisir</h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Offrez à vos enfants une expérience de lecture inoubliable et personnalisée !
                    </p>
                  </div>
                  <Link href="/boutique">
                    <button className="w-full sm:w-auto px-4 py-2 bg-[#d88200] text-white font-semibold rounded-lg text-sm whitespace-nowrap relative overflow-hidden group transition-all duration-300 hover:text-white">
                      <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      <span className="relative z-10">Découvrir</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Personnalisation Facile */}
          <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-orange-400 to-red-500">
            <div className="absolute inset-0">
              <img
                src="/section.avif"
                alt="Personnalisation Facile"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            <div className="relative z-10 h-96 flex flex-col justify-end p-0">
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-lg mx-auto mb-4 p-4 w-11/12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-white">Personnalisation Facile</h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Choisissez une histoire et écrivez le prénom de votre enfant pour une expérience unique !
                    </p>
                  </div>
                  <Link href="/personnalisation">
                    <button className="w-full sm:w-auto px-4 py-2 bg-[#d88200] text-white font-semibold rounded-lg text-sm whitespace-nowrap relative overflow-hidden group transition-all duration-300 hover:text-white">
                      <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                      <span className="relative z-10">Commencer</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
