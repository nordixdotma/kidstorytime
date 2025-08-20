"use client"

import Link from "next/link"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const menuItems = [
    { name: "Accueil", href: "/" },
    { name: "Boutique", href: "/boutique" },
    { name: "Personnalisation", href: "/personnalisation" },
    { name: "Contact", href: "/contact" },
    { name: "Politique de confidentialité", href: "/privacy" },
    { name: "FAQ", href: "/faq" },
  ]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="inline-block">
              <img src="/logo.png" alt="Kids Story Time Logo" className="h-14 w-auto mb-4" />
            </Link>
            <p className="text-sm text-white/70">Créez des histoires personnalisées uniques pour vos enfants.</p>
          </div>

          {/* Liens Rapides Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <nav>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-white/70 hover:text-white relative group transition-colors">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-white/70" />
                <span className="text-sm text-white/70">contact@kidstorytime.shop</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-white/70" />
                <span className="text-sm text-white/70">+212 600-986488</span>
              </div>
              <div className="flex space-x-3 mt-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61568595925651"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={16} className="text-white" />
                </a>
                <a
                  href="https://www.instagram.com/kids_storytime_24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} className="text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-white/70 mb-4">Restez informé de nos dernières offres et nouveautés.</p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Votre email"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button className="w-full bg-primary hover:bg-white text-white hover:text-primary">S'abonner</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 text-center">
          <p className="text-sm text-white/60">© {currentYear} Kids Story Time. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
