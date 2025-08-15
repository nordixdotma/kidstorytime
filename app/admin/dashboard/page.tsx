"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Package, LogOut, BarChart3, Users, ClipboardList } from "lucide-react"
import { isAuthenticated, logout } from "@/lib/auth"
import { AdminProvider } from "@/lib/admin-context"
import { Overview } from "@/components/admin/overview"
import { Apercu } from "@/components/admin/apercu"
import { Subscribers } from "@/components/admin/subscribers"
import { Products } from "@/components/admin/products"
import { Orders } from "@/components/admin/orders"
import Image from "next/image"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("apercu")

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  if (!isAuthenticated()) {
    return null
  }

  return (
    <AdminProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="Kids Story Time" width={120} height={40} className="h-10 w-auto" />
              <div className="h-6 w-px bg-slate-300" />
              <h1 className="text-xl font-semibold text-slate-900">Administration Kids Story Time</h1>
            </div>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-slate-600 hover:text-slate-900 bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-73px)]">
            <nav className="p-4">
              <div className="space-y-2">
                <Button
                  variant={activeTab === "apercu" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "apercu" ? "bg-primary hover:bg-primary/90" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveTab("apercu")}
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Aperçu
                </Button>
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "overview" ? "bg-primary hover:bg-primary/90" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart3 className="h-4 w-4 mr-3" />
                  Vue d'ensemble
                </Button>
                <Button
                  variant={activeTab === "subscribers" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "subscribers" ? "bg-primary hover:bg-primary/90" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveTab("subscribers")}
                >
                  <Users className="h-4 w-4 mr-3" />
                  Abonnés
                </Button>
                <Button
                  variant={activeTab === "products" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "products" ? "bg-primary hover:bg-primary/90" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveTab("products")}
                >
                  <Package className="h-4 w-4 mr-3" />
                  Histoires
                </Button>
                <Button
                  variant={activeTab === "orders" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "orders" ? "bg-primary hover:bg-primary/90" : "hover:bg-slate-100"
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  <ClipboardList className="h-4 w-4 mr-3" />
                  Commandes
                </Button>
              </div>
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1">
            {activeTab === "apercu" && <Apercu />}
            {activeTab === "overview" && <Overview />}
            {activeTab === "subscribers" && <Subscribers />}
            {activeTab === "products" && <Products />}
            {activeTab === "orders" && <Orders />}
          </main>
        </div>
      </div>
    </AdminProvider>
  )
}
