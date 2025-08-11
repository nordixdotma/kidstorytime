"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

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
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 mb-4">
            Découvre nos catégories d'histoires où ton enfant est le héros !
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Parce que chaque enfant mérite une histoire rien que pour lui !
          </p>
        </motion.div>

        {/* Two-section layout */}
        <div className="space-y-16">
          {/* First section with two cards - increased height from h-80 to h-96 */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
            {/* Histoires Uniques */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400 to-purple-600 text-white">
              <div className="absolute inset-0">
                <img
                  src="/section.avif"
                  alt="Histoires Uniques"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="relative z-10 p-8 h-96 flex flex-col justify-end">
                <h3 className="text-2xl font-bold mb-3">Histoires Uniques</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Offrez à vos enfants une expérience de lecture inoubliable et personnalisée !
                </p>
                <button className="self-start px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300">
                  Découvrir
                </button>
              </div>
            </div>

            {/* Personnalisation Facile */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 text-white">
              <div className="absolute inset-0">
                <img
                  src="/section.avif"
                  alt="Personnalisation Facile"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="relative z-10 p-8 h-96 flex flex-col justify-end">
                <h3 className="text-2xl font-bold mb-3">Personnalisation Facile</h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Choisissez une histoire et écrivez le prénom de votre enfant pour une expérience unique !
                </p>
                <button className="self-start px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300">
                  Commencer
                </button>
              </div>
            </div>
          </motion.div>

          <div className="bg-[#007d64] rounded-2xl">
            <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 items-center h-fit md:h-[400px]">
              {/* Left column - Image */}
              <div className="relative overflow-hidden rounded-2xl h-full flex items-center justify-center">
                <img
                  src="/section.avif"
                  alt="Famille avec livre personnalisé"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right column - Text, no background, left aligned */}
              <div className="rounded-2xl p-8 lg:p-12 text-white flex flex-col justify-center">
                <div className="text-left">
                  <h3 className="text-3xl font-bold mb-6">Nos Catégories d'Histoires</h3>
                  <p className="mb-8 text-lg leading-relaxed">
                    Histoires de Fêtes et Traditions pour célébrer les moments sacrés et transmettre leurs belles valeurs.
                    Contes magiques et aventures des histoires fantastiques où l'imagination n'a pas de limite. Moments de
                    vie en famille des histoires douces pour accompagner les grands moments de la vie.
                  </p>
                  <button className="px-8 py-4 bg-white/20 text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300 text-lg self-start">
                    Explorez les histoires
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
