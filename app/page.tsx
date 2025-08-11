"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/vos-avantage"
import CartModal from "@/components/cart-modal"
import TestimonialsSection from "@/components/testimonials-section"
import HomepageProductsSection from "@/components/homepage-products-section"
import StoryCategoriesSection from "@/components/story-categories-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <HeroSection />
      <HomepageProductsSection />
      <StoryCategoriesSection />
      <AboutSection />
      <TestimonialsSection />
      <ServicesSection />

      <Footer />
      <WhatsAppButton />
      <CartModal />
    </div>
  )
}
