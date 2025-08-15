"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import InstagramSection from "@/components/instagram-section"
import ServicesSection from "@/components/vos-avantage"
import CartModal from "@/components/cart-modal"
import TestimonialsSection from "@/components/testimonials-section"
import HomepageProductsSection from "@/components/homepage-products-section"
import StoryCategoriesSection from "@/components/story-categories-section"
import StoryCategoriesInfoSection from "@/components/story-categories-info-section"
import OpeningAnimation from "@/components/opening-animation"
import AnimatedSection from "@/components/animated-section"

export default function HomePage() {
  const [showAnimation, setShowAnimation] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if animation has been shown in this session
    const hasSeenAnimation = sessionStorage.getItem("hasSeenOpeningAnimation")
    if (hasSeenAnimation) {
      setShowAnimation(false)
      setShowContent(true)
    }
  }, [])

  const handleAnimationComplete = () => {
    sessionStorage.setItem("hasSeenOpeningAnimation", "true")
    setShowContent(true)
  }

  return (
    <div className="min-h-screen">
      {showAnimation && <OpeningAnimation onComplete={handleAnimationComplete} />}

      <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
        <Header />

        <AnimatedSection animationType="fadeIn">
          <HeroSection />
        </AnimatedSection>

        <AnimatedSection animationType="fadeUp" delay={100}>
          <HomepageProductsSection />
        </AnimatedSection>

        <AnimatedSection animationType="slideLeft" delay={150}>
          <StoryCategoriesSection />
        </AnimatedSection>

        <AnimatedSection animationType="slideRight" delay={200}>
          <StoryCategoriesInfoSection />
        </AnimatedSection>

        {/* About section keeps its own animation since it has the counter */}
        <AboutSection />

        <AnimatedSection animationType="scale" delay={100}>
          <InstagramSection />
        </AnimatedSection>

        <AnimatedSection animationType="fadeUp" delay={150}>
          <TestimonialsSection />
        </AnimatedSection>

        <AnimatedSection animationType="slideLeft" delay={200}>
          <ServicesSection />
        </AnimatedSection>

        <Footer />
        <WhatsAppButton />
        <CartModal />
      </div>
    </div>
  )
}
