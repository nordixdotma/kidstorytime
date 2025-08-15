"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/lib/cart-context"

interface HeaderProps {
  forceWhite?: boolean
}

export default function Header({ forceWhite = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(forceWhite)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)
  const [showBanner, setShowBanner] = useState(true)
  const headerRef = useRef<HTMLElement>(null)
  const { totalItems, openCart } = useCart()

  // Update window height on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      setWindowHeight(window.innerHeight)
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Scroll locking for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = "100%"
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0", 10) * -1)
      }
    }

    return () => {
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [isMenuOpen])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(forceWhite || scrollY > 10)
      setShowBanner(scrollY < 50) // Hide banner when scrolling down
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [forceWhite])

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const menuVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: { ease: "easeInOut" as const, duration: 0.3 },
    },
  }

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
  }

  const bannerVariants = {
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
    hidden: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.5, ease: "easeInOut" as const },
    },
  }

  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "Boutique", href: "/boutique" },
    { name: "Personnalisation", href: "/personnalisation" },
    { name: "Contact", href: "/contact" },
  ]

  const bannerText = "Livraison Gratuite au Maroc dans 24H/48H.🔥"

  return (
    <>
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-40">
        {/* Banner Section */}
        <motion.div
          variants={bannerVariants}
          animate={showBanner ? "visible" : "hidden"}
          className="bg-black text-white overflow-hidden"
        >
          <div className="relative h-8 flex items-center">
            <motion.div
              className="flex whitespace-nowrap"
              animate={{
                x: [0, -1000],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 15,
                  ease: "linear",
                },
              }}
            >
              {/* Create enough repetitions to ensure seamless loop */}
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="flex items-center px-8">
                  <span className="text-sm font-medium">{bannerText}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Main Header Section */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isScrolled ? "bg-white backdrop-blur-md shadow-sm py-2" : "bg-transparent py-5 md:py-6",
          )}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              {/* Left Side - Menu + Logo */}
              <div className="flex items-center space-x-4">
                {/* Mobile Menu Button - Left */}
                <div className="md:hidden">
                  <button
                    className={cn(
                      "p-2 transition-colors",
                      isScrolled ? "text-[#d88200] hover:bg-[#d88200]/10" : "text-white hover:bg-white/10",
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Menu"
                  >
                    <Menu size={24} />
                  </button>
                </div>

                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <img
                    src={isScrolled ? "/logo.png" : "/logo.png"}
                    alt="Kids Story Time Logo"
                    className="h-10 md:h-14 w-auto transition-opacity duration-300"
                  />
                </Link>
              </div>

              {/* Desktop Navigation - Centered */}
              <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-base relative group transition-colors font-medium hover:text-[#d88200]",
                      isScrolled ? "text-black" : "text-white",
                    )}
                  >
                    {item.name}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-[#d88200]",
                      )}
                    />
                  </Link>
                ))}
              </nav>

              {/* Right Side Icons */}
              <div className="flex items-center space-x-4">
                {/* Desktop Action Icons - Shopping Bag */}
                <div className="hidden md:flex items-center space-x-4">
                  <button
                    onClick={openCart}
                    className={cn(
                      "transition-colors relative hover:text-[#d88200]",
                      isScrolled ? "text-black" : "text-white",
                    )}
                    aria-label="Panier"
                  >
                    <ShoppingBag size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#d88200] text-white text-xs flex items-center justify-center cart-counter">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>

                {/* Mobile Icons */}
                <div className="flex items-center space-x-3 md:hidden">
                  <button
                    onClick={openCart}
                    className={cn(
                      "relative transition-colors hover:text-[#d88200]",
                      isScrolled ? "text-black" : "text-white",
                    )}
                    aria-label="Panier"
                  >
                    <ShoppingBag size={20} />
                    {totalItems > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#d88200] text-white text-xs flex items-center justify-center cart-counter">
                        {totalItems}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-50 md:hidden"
                onClick={() => setIsMenuOpen(false)}
                style={{ height: windowHeight }}
              />

              {/* Menu */}
              <motion.div
                initial="closed"
                animate="open"
                exit="exit"
                variants={menuVariants}
                className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl z-50 md:hidden"
                style={{ height: windowHeight }}
              >
                <div className="flex flex-col h-full">
                  {/* Menu Header */}
                  <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <img src="/logo.png" alt="Kids Story Time Logo" className="h-12 w-auto" />
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 hover:bg-[#d88200]/10 transition-colors"
                      aria-label="Fermer le menu"
                    >
                      <X size={24} className="text-[#d88200]" />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="flex-1 overflow-y-auto py-6 px-5">
                    <nav className="space-y-6">
                      {menuItems.map((item, i) => (
                        <motion.div
                          key={item.name}
                          custom={i}
                          variants={menuItemVariants}
                          initial="closed"
                          animate="open"
                        >
                          <Link
                            href={item.href}
                            className="block text-[#d88200] hover:text-[#c07600] hover:bg-[#d88200]/5 transition-colors font-medium py-3 px-0 text-lg"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      ))}
                    </nav>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
