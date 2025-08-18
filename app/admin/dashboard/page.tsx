"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Package, LogOut, BarChart3, Users, ClipboardList, Percent } from "lucide-react"
import { isAuthenticated, logout } from "@/lib/auth"
import { AdminProvider } from "@/lib/admin-context"
import { Overview } from "@/components/admin/overview"
import { CodePromos } from "@/components/admin/code-promos"
import { Subscribers } from "@/components/admin/subscribers"
import { Products } from "@/components/admin/products"
import { Orders } from "@/components/admin/orders"
import Image from "next/image"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

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
      <div className="h-screen bg-slate-50 flex">
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full">
          <div className="p-4 border-b border-slate-200">
            <Image src="/logo.png" alt="Kids Story Time" width={120} height={40} className="h-10 w-auto" />
          </div>

          <nav className="p-4 flex-1">
            <div className="space-y-2">
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
              <Button
                variant={activeTab === "code-promos" ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === "code-promos" ? "bg-primary hover:bg-primary/90" : "hover:bg-slate-100"
                }`}
                onClick={() => setActiveTab("code-promos")}
              >
                <Percent className="h-4 w-4 mr-3" />
                Code Promos
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
            </div>
          </nav>
          <div className="p-4 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full justify-start bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Déconnexion
            </Button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-end">
              <h1 className="text-xl font-semibold text-slate-900">Administration</h1>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto">
            {activeTab === "code-promos" && <CodePromos />}
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
