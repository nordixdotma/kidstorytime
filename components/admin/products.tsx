"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ImageIcon, X, ArrowLeft, Star } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"
import type { AdminProduct } from "@/lib/admin-context"
import { useToast } from "@/hooks/use-toast"

export function Products() {
  const { state, addProduct, updateProduct, deleteProduct } = useAdmin()
  const { toast } = useToast()
  const [currentView, setCurrentView] = useState<"list" | "add" | "edit">("list")
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    oldPrice: "",
    image: "",
    images: [] as string[],
    age: "",
    category: "",
    inStock: true,
    description: "",
    isSpecial: false,
  })
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const additionalImagesInputRef = useRef<HTMLInputElement>(null)

  const ageOptions = [
    { value: "0-2 ans", label: "0-2 ans" },
    { value: "3-5 ans", label: "3-5 ans" },
    { value: "6-8 ans", label: "6-8 ans" },
    { value: "9-12 ans", label: "9-12 ans" },
    { value: "13+ ans", label: "13+ ans" },
  ]

  // ... existing code for image upload functions ...

  const handleImageUpload = async (file: File, isMainImage = true) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier image valide.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: "L'image ne doit pas dépasser 5MB.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        if (isMainImage) {
          setFormData({ ...formData, image: base64 })
        } else {
          setFormData({ ...formData, images: [...formData.images, base64] })
        }
        setIsUploading(false)
        toast({
          title: "Succès",
          description: "Image téléchargée avec succès.",
        })
      }
      reader.readAsDataURL(file)
    } catch (error) {
      setIsUploading(false)
      toast({
        title: "Erreur",
        description: "Erreur lors du téléchargement de l'image.",
        variant: "destructive",
      })
    }
  }

  const handleMultipleImagesUpload = async (files: FileList) => {
    const validFiles = Array.from(files).filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Erreur",
          description: `${file.name} n'est pas un fichier image valide.`,
          variant: "destructive",
        })
        return false
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: `${file.name} dépasse la taille limite de 5MB.`,
          variant: "destructive",
        })
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    setIsUploading(true)

    try {
      const base64Images = await Promise.all(
        validFiles.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = (e) => resolve(e.target?.result as string)
            reader.readAsDataURL(file)
          })
        }),
      )

      setFormData({ ...formData, images: [...formData.images, ...base64Images] })
      setIsUploading(false)
      toast({
        title: "Succès",
        description: `${validFiles.length} image(s) téléchargée(s) avec succès.`,
      })
    } catch (error) {
      setIsUploading(false)
      toast({
        title: "Erreur",
        description: "Erreur lors du téléchargement des images.",
        variant: "destructive",
      })
    }
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      oldPrice: "",
      image: "",
      images: [],
      age: "",
      category: "",
      inStock: true,
      description: "",
      isSpecial: false,
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (additionalImagesInputRef.current) additionalImagesInputRef.current.value = ""
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de l'histoire est requis.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      toast({
        title: "Erreur",
        description: "Le prix doit être supérieur à 0.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.image) {
      toast({
        title: "Erreur",
        description: "Une image principale est requise.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.age) {
      toast({
        title: "Erreur",
        description: "L'âge est requis.",
        variant: "destructive",
      })
      return false
    }

    if (!formData.category.trim()) {
      toast({
        title: "Erreur",
        description: "La catégorie est requise.",
        variant: "destructive",
      })
      return false
    }

    // Check special stories limit
    const currentSpecialCount = state.products.filter(
      (p) => p.isSpecial && (!editingProduct || p.id !== editingProduct.id),
    ).length
    if (formData.isSpecial && currentSpecialCount >= 4) {
      toast({
        title: "Erreur",
        description: "Vous ne pouvez avoir que 4 histoires spéciales maximum.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleAdd = () => {
    if (!validateForm()) return

    const allImages = [formData.image, ...formData.images]
    addProduct({
      name: formData.name.trim(),
      price: Number.parseFloat(formData.price),
      oldPrice: Number.parseFloat(formData.oldPrice) || Number.parseFloat(formData.price),
      image: formData.image,
      images: allImages,
      age: formData.age,
      category: formData.category.trim(),
      inStock: formData.inStock,
      description: formData.description.trim(),
      isSpecial: formData.isSpecial,
    })
    resetForm()
    setCurrentView("list")
    toast({
      title: "Succès",
      description: "Histoire ajoutée avec succès.",
    })
  }

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product)
    const additionalImages = product.images.filter((img) => img !== product.image)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      oldPrice: product.oldPrice.toString(),
      image: product.image,
      images: additionalImages,
      age: product.age.toString(),
      category: product.category,
      inStock: product.inStock,
      description: product.description || "",
      isSpecial: product.isSpecial || false,
    })
    setCurrentView("edit")
  }

  const handleUpdate = () => {
    if (!editingProduct || !validateForm()) return

    const allImages = [formData.image, ...formData.images]
    updateProduct({
      ...editingProduct,
      name: formData.name.trim(),
      price: Number.parseFloat(formData.price),
      oldPrice: Number.parseFloat(formData.oldPrice) || Number.parseFloat(formData.price),
      image: formData.image,
      images: allImages,
      age: formData.age,
      category: formData.category.trim(),
      inStock: formData.inStock,
      description: formData.description.trim(),
      isSpecial: formData.isSpecial,
    })
    resetForm()
    setEditingProduct(null)
    setCurrentView("list")
    toast({
      title: "Succès",
      description: "Histoire mise à jour avec succès.",
    })
  }

  const handleDelete = (id: number) => {
    deleteProduct(id)
    toast({
      title: "Succès",
      description: "Histoire supprimée avec succès.",
    })
  }

  const specialStoriesCount = state.products.filter((p) => p.isSpecial).length

  if (currentView === "add" || currentView === "edit") {
    return (
      <div className="p-4">
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => {
              resetForm()
              setEditingProduct(null)
              setCurrentView("list")
            }}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {currentView === "add" ? "Ajouter une histoire" : "Modifier l'histoire"}
          </h2>
          <p className="text-slate-600">
            {currentView === "add"
              ? "Créez une nouvelle histoire personnalisée"
              : "Modifiez les informations de cette histoire"}
          </p>
        </div>

        <Card className="border border-slate-200 shadow-sm">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom de l'histoire</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: L'Aventure de Luna"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Prix (DH)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="45"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="oldPrice">Ancien prix (DH)</Label>
                  <Input
                    id="oldPrice"
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    placeholder="55"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isSpecial"
                    checked={formData.isSpecial}
                    onCheckedChange={(checked) => setFormData({ ...formData, isSpecial: checked })}
                    disabled={!formData.isSpecial && specialStoriesCount >= 4}
                  />
                  <Label htmlFor="isSpecial">Histoire spéciale ({specialStoriesCount}/4)</Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Âge recommandé</Label>
                  <Select value={formData.age} onValueChange={(value) => setFormData({ ...formData, age: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner l'âge" />
                    </SelectTrigger>
                    <SelectContent>
                      {ageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Ex: Aventure, Amitié, Exploration"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="image">Image principale</Label>
                <div className="space-y-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleImageUpload(file, true)
                    }}
                    disabled={isUploading}
                  />
                  {formData.image && (
                    <div className="relative w-32 h-32 bg-slate-100 rounded-lg overflow-hidden">
                      <img
                        src={formData.image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="additional-images">Images supplémentaires</Label>
                <div className="space-y-2">
                  <Input
                    ref={additionalImagesInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files
                      if (files && files.length > 0) handleMultipleImagesUpload(files)
                    }}
                    disabled={isUploading}
                  />
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative w-20 h-20 bg-slate-100 rounded-lg overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de l'histoire..."
                  rows={3}
                />
              </div>
              <div className="flex space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setEditingProduct(null)
                    setCurrentView("list")
                  }}
                >
                  Annuler
                </Button>
                <Button
                  onClick={currentView === "add" ? handleAdd : handleUpdate}
                  disabled={isUploading}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isUploading ? "Téléchargement..." : currentView === "add" ? "Ajouter" : "Mettre à jour"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Histoires</h2>
          <p className="text-slate-600">Gérez votre catalogue d'histoires personnalisées</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90"
          onClick={() => {
            resetForm()
            setCurrentView("add")
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une histoire
        </Button>
      </div>

      {/* Special Stories Info */}
      <Card className="border border-slate-200 shadow-sm mb-4">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Histoires spéciales: {specialStoriesCount}/4</span>
            </div>
            <p className="text-xs text-slate-500">Les histoires spéciales apparaissent en vedette sur le site</p>
          </div>
        </CardContent>
      </Card>

      {/* Table Layout */}
      <Card className="border border-slate-200 shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-600">Histoire</th>
                  <th className="text-left p-3 font-medium text-slate-600">Détails</th>
                  <th className="text-right p-3 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-16 h-16 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                          {product.image ? (
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-slate-400" />
                            </div>
                          )}
                          {product.isSpecial && (
                            <div className="absolute top-1 right-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-slate-900">{product.name}</h3>
                          <p className="text-sm text-slate-500">{product.description?.substring(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{product.age}</Badge>
                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-slate-900">{product.price} DH</span>
                          {product.oldPrice > product.price && (
                            <span className="text-sm text-slate-500 line-through">{product.oldPrice} DH</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {state.products.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Aucune histoire</h3>
          <p className="text-slate-500">Commencez par ajouter votre première histoire.</p>
        </div>
      )}
    </div>
  )
}
