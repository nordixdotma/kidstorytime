"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface OpeningAnimationProps {
  onComplete: () => void
}

export default function OpeningAnimation({ onComplete }: OpeningAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
      setTimeout(onComplete, 500)
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isAnimating) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Left half */}
      <motion.div
        className="w-1/2 h-full bg-[#d88200]"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
      />

      {/* Right half */}
      <motion.div
        className="w-1/2 h-full bg-[#d88200]"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
      />
    </div>
  )
}
