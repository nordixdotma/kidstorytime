"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Phone, Mail, MapPin, Package, Download, ArrowLeft } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"
import type { Order } from "@/lib/admin-context"
import { useToast } from "@/hooks/use-toast"

export function Orders() {
  const { state, updateOrderStatus } = useAdmin()
  const { toast } = useToast()
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [currentView, setCurrentView] = useState<"list" | "details">("list")

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusLabel = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "En attente"
      case "processing":
        return "En cours"
      case "completed":
        return "Terminée"
      case "cancelled":
        return "Annulée"
      default:
        return status
    }
  }

  const handleStatusChange = (orderId: number, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus)
    toast({
      title: "Succès",
      description: `Statut de la commande mis à jour vers "${getStatusLabel(newStatus)}".`,
    })
  }

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setCurrentView("details")
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedOrder(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const sortedOrders = [...state.orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const exportToCSV = () => {
    const csvContent = [
      [
        "ID",
        "Client",
        "Email",
        "Téléphone",
        "Statut",
        "Total",
        "Date",
        "Commentaire",
        "Code Promo",
        "Dédicace",
        "Prénom Enfant",
        "Genre Enfant",
      ],
      ...sortedOrders.map((order) => [
        order.id.toString(),
        order.customerName,
        order.customerEmail,
        order.customerPhone || "",
        getStatusLabel(order.status),
        `${order.totalPrice} DH`,
        formatDate(order.createdAt),
        order.commentaire || "",
        order.codePromo || "",
        order.dedicaceNumber?.toString() || "",
        order.enfantPrenom || "",
        order.enfantGenre || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `commandes_kidstorytime_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Succès",
      description: "Liste des commandes exportée avec succès.",
    })
  }

  if (currentView === "details" && selectedOrder) {
    return (
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Button variant="outline" onClick={handleBackToList} className="mr-4 bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Détails de la commande #{selectedOrder.id}</h2>
            <p className="text-slate-600">Commande passée le {formatDate(selectedOrder.createdAt)}</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Customer Information */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Informations client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Nom:</span>
                  <span>{selectedOrder.customerName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Email:</span>
                  <span>{selectedOrder.customerEmail}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">Téléphone:</span>
                  <span>{selectedOrder.customerPhone}</span>
                </div>
                {selectedOrder.address && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Adresse:</span>
                    <span>{selectedOrder.address}</span>
                  </div>
                )}
                {selectedOrder.ville && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Ville:</span>
                    <span>{selectedOrder.ville}</span>
                  </div>
                )}
                {selectedOrder.pays && (
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Pays:</span>
                    <span>{selectedOrder.pays}</span>
                  </div>
                )}
                {selectedOrder.commentaire && (
                  <div className="col-span-2 flex items-start space-x-2">
                    <Mail className="h-4 w-4 text-slate-500 mt-0.5" />
                    <span className="font-medium">Commentaire:</span>
                    <span>{selectedOrder.commentaire}</span>
                  </div>
                )}
                {selectedOrder.codePromo && (
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Code promo:</span>
                    <span>{selectedOrder.codePromo}</span>
                  </div>
                )}
                {selectedOrder.dedicaceNumber && (
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Dédicace:</span>
                    <span>#{selectedOrder.dedicaceNumber}</span>
                  </div>
                )}
                {selectedOrder.enfantPrenom && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Prénom enfant:</span>
                    <span>{selectedOrder.enfantPrenom}</span>
                  </div>
                )}
                {selectedOrder.enfantGenre && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">Genre:</span>
                    <span>{selectedOrder.enfantGenre}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Status */}
          <Card className="border border-slate-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">Statut de la commande</h3>
                  <Badge className={`${getStatusColor(selectedOrder.status)} mt-1`}>
                    {getStatusLabel(selectedOrder.status)}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Total</p>
                  <p className="text-2xl font-bold text-slate-900">{selectedOrder.totalPrice} DH</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Articles commandés</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedOrder.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{item.name}</h4>
                      <div className="flex items-center space-x-2 text-sm text-slate-600">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant="outline">{item.type}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900">{item.price} DH</p>
                      <p className="text-sm text-slate-600">Qté: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Commandes</h2>
          <p className="text-slate-600">Gérez les commandes de vos clients</p>
        </div>
        <Button onClick={exportToCSV} className="bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4 mr-2" />
          Exporter CSV
        </Button>
      </div>

      <div className="space-y-4">
        {sortedOrders.length > 0 ? (
          sortedOrders.map((order, index) => (
            <Card key={order.id} className="border border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Commande #{sortedOrders.length - index}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-1" />
                        {order.customerName}
                      </span>
                      <span>{formatDate(order.createdAt)}</span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
                    <span className="text-lg font-semibold text-slate-900">{order.totalPrice} DH</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span className="flex items-center">
                      <Package className="h-4 w-4 mr-1" />
                      {order.items.length} article(s)
                    </span>
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {order.customerEmail}
                    </span>
                    {(order.address || order.ville || order.pays) && (
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {[order.address, order.ville, order.pays].filter(Boolean).join(", ")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={order.status}
                      onValueChange={(value: Order["status"]) => handleStatusChange(order.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="processing">En cours</SelectItem>
                        <SelectItem value="completed">Terminée</SelectItem>
                        <SelectItem value="cancelled">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Voir détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Aucune commande</h3>
            <p className="text-slate-500">Les commandes de vos clients apparaîtront ici.</p>
          </div>
        )}
      </div>
    </div>
  )
}
