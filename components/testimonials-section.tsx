"use client"

import { useRef, useState } from "react"
import { Star } from "lucide-react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperType } from "swiper"

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  const testimonials = [
    {
      quote:
        "Ma fille Lina adore ses histoires personnalisées ! Elle est tellement excitée quand elle est la princesse courageuse. Kids Story Time a rendu le coucher magique !",
      image: "/t1.avif",
      name: "Aicha Benali",
      position: "Maman de 2 enfants",
      rating: 5,
    },
    {
      quote: "Excellent service ! Mon fils Youssef demande ses histoires d'aventure chaque soir.",
      image: "/t2.avif",
      name: "Omar Alami",
      position: "Papa de 3 enfants",
      rating: 5,
    },
    {
      quote:
        "Ces histoires personnalisées ont complètement transformé notre routine du coucher. Mes jumeaux Salma et Karim adorent entendre leurs aventures ensemble comme explorateurs de l'espace et détectives sous-marines ! C'est vraiment magique de voir leurs visages s'illuminer.",
      image:
        "https://i.pinimg.com/736x/18/b1/1c/18b11c18f698cf8b280a0d3a0b56a795.jpg",
      name: "Fatima Zahra",
      position: "Maman de jumeaux",
      rating: 5,
    },
    {
      quote:
        "Service incroyable ! Les histoires sont magnifiquement écrites et ma fille Amina se voit comme le personnage principal. Cela a énormément renforcé sa confiance.",
      image: "https://i.pinimg.com/1200x/84/52/f0/8452f0a534deac85bc57caaedc9aa6b0.jpg",
      name: "Rachid Tazi",
      position: "Papa fier",
      rating: 5,
    },
    {
      quote:
        "Kids Story Time crée de la magie pure ! Le visage de mon fils Mehdi s'illumine quand il entend son nom dans les histoires.",
      image:
        "https://i.pinimg.com/736x/3e/56/31/3e563116393b0b0d30cacbe9b2b7ebd1.jpg",
      name: "Khadija Idrissi",
      position: "Cliente satisfaite",
      rating: 5,
    },
    {
      quote:
        "Service professionnel avec des résultats touchants. L'équipe prend le temps de comprendre les intérêts de chaque enfant. Les histoires d'aventure de dinosaures de ma fille Yasmine sont ses préférées ! Je recommande vivement ce service unique.",
      image:
        "https://i.pinimg.com/736x/7f/f6/35/7ff63599c11d08b3ce2f4c96f6353141.jpg",
      name: "Hassan Benjelloun",
      position: "Client régulier",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-12 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-4 relative z-10 overflow-hidden">
        <div className="text-left mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl mb-4">
            Ce que disent les <span className="text-primary">parents</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Découvrez pourquoi les familles adorent nos histoires personnalisées
          </p>
        </div>

        <div className="relative overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            centeredSlides={true}
            spaceBetween={8}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            loop={true}
            speed={800}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex)
            }}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} isActive={index === activeIndex} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-swiper {
          overflow: hidden;
          width: 100%;
        }
        
        .testimonial-swiper .swiper-wrapper {
          align-items: stretch;
        }
        
        .testimonial-swiper .swiper-slide {
          transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform: scale(0.95);
          height: auto;
          padding: 20px 0;
          max-width: 100%;
          box-sizing: border-box;
        }
        
        .testimonial-swiper .swiper-slide-active {
          transform: scale(1);
          z-index: 2;
        }
        
        @media (max-width: 767px) {
          .testimonial-swiper .swiper-slide {
            opacity: 1 !important;
            transform: scale(1) !important;
          }
          
          .testimonial-swiper .swiper-slide-active {
            transform: scale(1) !important;
          }
        }
        
        @media (min-width: 768px) {
          .testimonial-swiper .swiper-slide {
            opacity: 0.4;
            transform: scale(0.85);
          }
          
          .testimonial-swiper .swiper-slide-active {
            opacity: 1;
            transform: scale(1);
          }
          
          .testimonial-swiper .swiper-slide-prev,
          .testimonial-swiper .swiper-slide-next {
            opacity: 0.7;
            transform: scale(0.9);
          }
          
          .testimonial-swiper .swiper-slide:hover {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}

const TestimonialCard = ({ testimonial, isActive }: { testimonial: any; isActive: boolean }) => {
  const { quote, image, name, position, rating } = testimonial

  return (
    <div className="relative px-1 sm:px-2 py-1 flex flex-col h-full box-border">
      <div className="rounded-md bg-[#ffebcc] text-gray-900 p-4 sm:p-6 shadow-lg relative w-full border border-gray-200 h-full flex flex-col hover:shadow-xl transition-shadow duration-300 box-border">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden mr-3">
            <img
              src={image || "/placeholder.svg"}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=150&width=150"
              }}
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
            <p className="text-gray-600 text-xs">{position}</p>
          </div>
          <div className="text-right">
            <div className="flex mb-1">
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </div>
          </div>
        </div>

        <div className="relative flex-grow">
          <p className="text-sm leading-relaxed text-gray-600">{quote}</p>
        </div>
      </div>
    </div>
  )
}
