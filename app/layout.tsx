import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Kids Story Time | Histoires Personnalisées pour Enfants",
  description:
    "Créez des histoires personnalisées uniques pour vos enfants. Livres personnalisés avec le prénom de votre enfant pour des moments magiques.",
  keywords:
    "histoires personnalisées, livres enfants, contes personnalisés, histoires sur mesure, livres personnalisés",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={poppins.variable} translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
