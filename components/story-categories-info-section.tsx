"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function StoryCategoriesInfoSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-8 md:py-12 bg-[#ffebcc]">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8"
      >
        <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-0 items-stretch min-h-[400px]">
          {/* Left column - Image */}
          <div className="relative overflow-hidden h-full min-h-[300px] lg:min-h-[400px] lg:col-span-1">
            <div className="w-3/5 h-full mx-auto">
              <img
                src="/storyinfo.avif"
                alt="Famille avec livre personnalisé"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Right column - Text content */}
          <div className="p-8 text-gray-900 flex flex-col justify-center">
            <h3 className="text-3xl font-bold mb-6">Nos Catégories d'Histoires</h3>
            <p className="mb-8 text-lg leading-relaxed">
              Histoires de Fêtes et Traditions pour célébrer les moments sacrés et transmettre leurs belles valeurs.
              Contes magiques et aventures des histoires fantastiques où l'imagination n'a pas de limite. Moments de vie
              en famille des histoires douces pour accompagner les grands moments de la vie.
            </p>
            <button className="px-8 py-4 bg-[#d88200] hover:bg-[#c07600] text-white font-semibold rounded-full transition-all duration-300 text-lg self-start relative overflow-hidden group hover:text-white">
              <span className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              <span className="relative z-10">Explorez les histoires</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
