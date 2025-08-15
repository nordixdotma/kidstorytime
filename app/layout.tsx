import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"

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
    <html lang="fr" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
