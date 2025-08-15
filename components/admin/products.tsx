"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ImageIcon, X } from "lucide-react"
import { useAdmin } from "@/lib/admin-context"
import type { AdminProduct } from "@/lib/admin-context"
import { useToast } from "@/hooks/use-toast"

export function Products() {
  const { state, addProduct, updateProduct, deleteProduct } = useAdmin()
  const { toast } = useToast()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
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
  })
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const additionalImagesInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)
  const editAdditionalImagesInputRef = useRef<HTMLInputElement>(null)

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
    })
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (additionalImagesInputRef.current) additionalImagesInputRef.current.value = ""
    if (editFileInputRef.current) editFileInputRef.current.value = ""
    if (editAdditionalImagesInputRef.current) editAdditionalImagesInputRef.current.value = ""
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
    })
    resetForm()
    setIsAddDialogOpen(false)
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
    })
    setIsEditDialogOpen(true)
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
    })
    resetForm()
    setEditingProduct(null)
    setIsEditDialogOpen(false)
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Histoires</h2>
          <p className="text-slate-600">Gérez votre catalogue d'histoires personnalisées</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une histoire
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle histoire</DialogTitle>
              <DialogDescription>Créez une nouvelle histoire personnalisée pour votre catalogue.</DialogDescription>
            </DialogHeader>
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
              <div className="grid grid-cols-2 gap-4">
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
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                  />
                  <Label htmlFor="inStock">En stock</Label>
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleAdd} disabled={isUploading} className="bg-primary hover:bg-primary/90">
                {isUploading ? "Téléchargement..." : "Ajouter"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.products.map((product) => (
          <Card key={product.id} className="border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="relative w-full h-48 bg-slate-100 rounded-lg overflow-hidden mb-3">
                {product.image ? (
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="h-8 w-8 text-slate-400" />
                  </div>
                )}
              </div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <CardDescription className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{product.age}</Badge>
                  <Badge variant="outline">{product.category}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-semibold text-slate-900">{product.price} DH</span>
                    {product.oldPrice > product.price && (
                      <span className="text-sm text-slate-500 line-through ml-2">{product.oldPrice} DH</span>
                    )}
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleEdit(product)} className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Supprimer l'histoire</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer cette histoire ? Cette action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {state.products.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Aucune histoire</h3>
          <p className="text-slate-500">Commencez par ajouter votre première histoire.</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier l'histoire</DialogTitle>
            <DialogDescription>Modifiez les informations de cette histoire.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Nom de l'histoire</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: L'Aventure de Luna"
                />
              </div>
              <div>
                <Label htmlFor="edit-price">Prix (DH)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="45"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-oldPrice">Ancien prix (DH)</Label>
                <Input
                  id="edit-oldPrice"
                  type="number"
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                  placeholder="55"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
                />
                <Label htmlFor="edit-inStock">En stock</Label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-age">Âge recommandé</Label>
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
                <Label htmlFor="edit-category">Catégorie</Label>
                <Input
                  id="edit-category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Ex: Aventure, Amitié, Exploration"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-image">Image principale</Label>
              <div className="space-y-2">
                <Input
                  ref={editFileInputRef}
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
              <Label htmlFor="edit-additional-images">Images supplémentaires</Label>
              <div className="space-y-2">
                <Input
                  ref={editAdditionalImagesInputRef}
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
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Description de l'histoire..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdate} disabled={isUploading} className="bg-primary hover:bg-primary/90">
              {isUploading ? "Téléchargement..." : "Mettre à jour"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
