"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Link from "next/link"
import SplitText from "./split-text"

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
    <section className="py-4">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8"
      >
        <motion.div variants={itemVariants} className="bg-[#ffdd83] rounded-2xl overflow-hidden shadow-lg">
          <div className="relative grid lg:grid-cols-2 gap-0 items-stretch min-h-[400px] lg:h-[500px]">
            {/* Left column - Full height image */}
            <div className="relative overflow-hidden h-full">
              <img src="/section.avif" alt="Famille avec livre personnalisé" className="w-full h-full object-cover" />
              {/* Gradient overlay for better text contrast on mobile */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
            </div>

            {/* Wavy SVG Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 z-10 hidden lg:block">
              <svg
  viewBox="0 0 32 500"
  className="w-full h-full"
  preserveAspectRatio="none"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M0 0 Q8 12.5 16 25 Q24 37.5 32 50 Q24 62.5 16 75 Q8 87.5 0 100 Q8 112.5 16 125 Q24 137.5 32 150 Q24 162.5 16 175 Q8 187.5 0 200 Q8 212.5 16 225 Q24 237.5 32 250 Q24 262.5 16 275 Q8 287.5 0 300 Q8 312.5 16 325 Q24 337.5 32 350 Q24 362.5 16 375 Q8 387.5 0 400 Q8 412.5 16 425 Q24 437.5 32 450 Q24 462.5 16 475 Q8 487.5 0 500 L32 500 Q24 487.5 16 475 Q8 462.5 0 450 Q8 437.5 16 425 Q24 412.5 32 400 Q24 387.5 16 375 Q8 362.5 0 350 Q8 337.5 16 325 Q24 312.5 32 300 Q24 287.5 16 275 Q8 262.5 0 250 Q8 237.5 16 225 Q24 212.5 32 200 Q24 187.5 16 175 Q8 162.5 0 150 Q8 137.5 16 125 Q24 112.5 32 100 Q24 87.5 16 75 Q8 62.5 0 50 Q8 37.5 16 25 Q24 12.5 32 0 Z"
    fill="#ffdd83"
    className="drop-shadow-sm"
  />
</svg>
            </div>

            {/* Right column - Content with improved spacing */}
            <div className="relative p-8 lg:p-8 text-gray-900 flex flex-col justify-center bg-[#ffdd83]">
              <div className="space-y-6">
                <SplitText
                  text="Nos Catégories d'Histoires"
                  className="text-2xl lg:text-3xl font-bold text-gray-800"
                  textAlign="left"
                />

                <div className="w-16 h-1 bg-primary rounded-full"></div>

                <p className="text-base lg:text-lg leading-relaxed text-gray-600">
                  Histoires de Fêtes et Traditions pour célébrer les moments sacrés et transmettre leurs belles valeurs.
                  Contes magiques et aventures des histoires fantastiques où l'imagination n'a pas de limite. Moments de
                  vie en famille des histoires douces pour accompagner les grands moments de la vie.
                </p>

                <div className="pt-4">
                  <Link href="/boutique">
                    <button className="group px-8 py-4 bg-primary text-white font-semibold rounded-full transition-all duration-300 text-base lg:text-lg border-2 border-primary hover:bg-transparent hover:text-primary hover:shadow-lg transform hover:-translate-y-1">
                      <span className="flex items-center gap-2">
                        Explorez les histoires
                        <svg
                          className="w-5 h-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </span>
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
