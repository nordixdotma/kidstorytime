"use client"
import { FileText } from "lucide-react"

export function Apercu() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Aperçu</h2>
        <p className="text-slate-600">Vue d'ensemble de votre plateforme Kids Story Time</p>
      </div>

      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Aperçu en cours de développement</h3>
          <p className="text-slate-500 max-w-md">
            Cette section affichera bientôt des statistiques et des informations importantes sur votre plateforme.
          </p>
        </div>
      </div>
    </div>
  )
}
