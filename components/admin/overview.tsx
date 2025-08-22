"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Clock, CheckCircle } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"

export function Overview() {
  const { state } = useAdmin()

  const totalProducts = state.products.length
  const totalOrders = state.orders.length
  const pendingOrders = state.orders.filter((order) => order.status === "pending").length
  const completedOrders = state.orders.filter((order) => order.status === "completed").length

  const recentOrders = state.orders
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const latestProducts = state.products
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .slice(0, 3)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Vue d'ensemble</h2>
        <p className="text-slate-600">Tableau de bord de votre boutique Kids Story Time</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Histoires</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalProducts}</div>
            <p className="text-xs text-slate-500 mt-1">{state.products.filter((p) => p.inStock).length} disponibles</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Total Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{totalOrders}</div>
            <p className="text-xs text-slate-500 mt-1">Toutes les commandes</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">En Attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pendingOrders}</div>
            <p className="text-xs text-slate-500 mt-1">Commandes à traiter</p>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Terminées</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{completedOrders}</div>
            <p className="text-xs text-slate-500 mt-1">Commandes livrées</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Commandes Récentes</CardTitle>
            <CardDescription>Les dernières commandes reçues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{order.customerName}</p>
                      <p className="text-sm text-slate-500">
                        {order.items.length} article(s) • {order.totalPrice} DH
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status === "pending" && "En attente"}
                      {order.status === "processing" && "En cours"}
                      {order.status === "completed" && "Terminée"}
                      {order.status === "cancelled" && "Annulée"}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">Aucune commande récente</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Dernières Histoires Ajoutées</CardTitle>
            <CardDescription>Les histoires récemment ajoutées à votre catalogue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestProducts.length > 0 ? (
                latestProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{product.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-slate-500">
                        <Badge variant="secondary">{product.ageRange}</Badge>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{product.price} DH</p>
                      {product.oldPrice > product.price && (
                        <p className="text-xs text-slate-500 line-through">{product.oldPrice} DH</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">Aucune histoire disponible</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
