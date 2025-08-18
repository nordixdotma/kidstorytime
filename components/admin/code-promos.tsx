"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Percent, Calendar, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PromoCode {
  id: number
  code: string
  percentage: number
  isActive: boolean
  createdAt: string
  usageCount: number
  maxUsage?: number
}

export function CodePromos() {
  const { toast } = useToast()
  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">("list")
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null)
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      id: 1,
      code: "WELCOME10",
      percentage: 10,
      isActive: true,
      createdAt: "2024-01-15",
      usageCount: 25,
      maxUsage: 100,
    },
    {
      id: 2,
      code: "SUMMER20",
      percentage: 20,
      isActive: false,
      createdAt: "2024-02-01",
      usageCount: 8,
      maxUsage: 50,
    },
  ])
  const [formData, setFormData] = useState({
    code: "",
    percentage: "",
    maxUsage: "",
  })

  const resetForm = () => {
    setFormData({
      code: "",
      percentage: "",
      maxUsage: "",
    })
  }

  const validateForm = () => {
    if (!formData.code.trim()) {
      toast({
        title: "Erreur",
        description: "Le code promo est requis.",
        variant: "destructive",
      })
      return false
    }

    if (
      !formData.percentage ||
      Number.parseFloat(formData.percentage) <= 0 ||
      Number.parseFloat(formData.percentage) > 100
    ) {
      toast({
        title: "Erreur",
        description: "Le pourcentage doit être entre 1 et 100.",
        variant: "destructive",
      })
      return false
    }

    // Check if code already exists (excluding current editing item)
    const codeExists = promoCodes.some(
      (promo) =>
        promo.code.toLowerCase() === formData.code.toLowerCase() && (!editingPromo || promo.id !== editingPromo.id),
    )

    if (codeExists) {
      toast({
        title: "Erreur",
        description: "Ce code promo existe déjà.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleAdd = () => {
    if (!validateForm()) return

    const newPromo: PromoCode = {
      id: Date.now(),
      code: formData.code.trim().toUpperCase(),
      percentage: Number.parseFloat(formData.percentage),
      isActive: true,
      createdAt: new Date().toISOString().split("T")[0],
      usageCount: 0,
      maxUsage: formData.maxUsage ? Number.parseFloat(formData.maxUsage) : undefined,
    }

    setPromoCodes([...promoCodes, newPromo])
    resetForm()
    setCurrentView("list")
    toast({
      title: "Succès",
      description: "Code promo ajouté avec succès.",
    })
  }

  const handleEdit = (promo: PromoCode) => {
    setEditingPromo(promo)
    setFormData({
      code: promo.code,
      percentage: promo.percentage.toString(),
      maxUsage: promo.maxUsage?.toString() || "",
    })
    setCurrentView("edit")
  }

  const handleUpdate = () => {
    if (!editingPromo || !validateForm()) return

    const updatedPromoCodes = promoCodes.map((promo) =>
      promo.id === editingPromo.id
        ? {
            ...promo,
            code: formData.code.trim().toUpperCase(),
            percentage: Number.parseFloat(formData.percentage),
            maxUsage: formData.maxUsage ? Number.parseFloat(formData.maxUsage) : undefined,
          }
        : promo,
    )

    setPromoCodes(updatedPromoCodes)
    resetForm()
    setEditingPromo(null)
    setCurrentView("list")
    toast({
      title: "Succès",
      description: "Code promo mis à jour avec succès.",
    })
  }

  const handleDelete = (id: number) => {
    setPromoCodes(promoCodes.filter((promo) => promo.id !== id))
    toast({
      title: "Succès",
      description: "Code promo supprimé avec succès.",
    })
  }

  const toggleActive = (id: number) => {
    const updatedPromoCodes = promoCodes.map((promo) =>
      promo.id === id ? { ...promo, isActive: !promo.isActive } : promo,
    )
    setPromoCodes(updatedPromoCodes)
    toast({
      title: "Succès",
      description: "Statut du code promo mis à jour.",
    })
  }

  if (currentView === "add" || currentView === "edit") {
    return (
      <div className="p-6">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => {
              resetForm()
              setEditingPromo(null)
              setCurrentView("list")
            }}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {currentView === "add" ? "Ajouter un code promo" : "Modifier le code promo"}
          </h2>
          <p className="text-slate-600">
            {currentView === "add"
              ? "Créez un nouveau code promo pour vos clients"
              : "Modifiez les informations de ce code promo"}
          </p>
        </div>

        <Card className="border border-slate-200 shadow-sm max-w-2xl">
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="code">Code promo</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="Ex: WELCOME10"
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="percentage">Pourcentage de réduction (%)</Label>
                <Input
                  id="percentage"
                  type="number"
                  min="1"
                  max="100"
                  value={formData.percentage}
                  onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                  placeholder="10"
                />
              </div>

              <div>
                <Label htmlFor="maxUsage">Limite d'utilisation (optionnel)</Label>
                <Input
                  id="maxUsage"
                  type="number"
                  min="1"
                  value={formData.maxUsage}
                  onChange={(e) => setFormData({ ...formData, maxUsage: e.target.value })}
                  placeholder="100"
                />
                <p className="text-sm text-slate-500 mt-1">Laissez vide pour une utilisation illimitée</p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setEditingPromo(null)
                    setCurrentView("list")
                  }}
                >
                  Annuler
                </Button>
                <Button
                  onClick={currentView === "add" ? handleAdd : handleUpdate}
                  className="bg-primary hover:bg-primary/90"
                >
                  {currentView === "add" ? "Ajouter" : "Mettre à jour"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Codes Promos</h2>
          <p className="text-slate-600">Gérez les codes de réduction pour vos clients</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => {
            resetForm()
            setCurrentView("add")
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un code promo
        </Button>
      </div>

      <div className="space-y-4">
        {promoCodes.length > 0 ? (
          promoCodes.map((promo) => (
            <Card key={promo.id} className="border border-slate-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-mono">{promo.code}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center">
                        <Percent className="h-4 w-4 mr-1" />
                        {promo.percentage}% de réduction
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Créé le {new Date(promo.createdAt).toLocaleDateString("fr-FR")}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={promo.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {promo.isActive ? "Actif" : "Inactif"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-slate-600">
                    <span>
                      Utilisations: {promo.usageCount}
                      {promo.maxUsage && ` / ${promo.maxUsage}`}
                    </span>
                    {promo.maxUsage && (
                      <div className="w-32 bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{
                            width: `${Math.min((promo.usageCount / promo.maxUsage) * 100, 100)}%`,
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(promo.id)}
                      className={
                        promo.isActive ? "text-red-600 hover:text-red-700" : "text-green-600 hover:text-green-700"
                      }
                    >
                      {promo.isActive ? "Désactiver" : "Activer"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(promo)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => handleDelete(promo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <Percent className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun code promo</h3>
            <p className="text-slate-500">Commencez par créer votre premier code promo.</p>
          </div>
        )}
      </div>
    </div>
  )
}
