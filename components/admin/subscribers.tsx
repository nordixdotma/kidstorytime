"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Download, Users, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock subscriber data for kidstorytime
const mockSubscribers = [
  { id: 1, email: "parent1@example.com", subscribedAt: "2024-01-15" },
  { id: 2, email: "parent2@example.com", subscribedAt: "2024-01-20" },
  { id: 3, email: "parent3@example.com", subscribedAt: "2024-02-01" },
  { id: 4, email: "parent4@example.com", subscribedAt: "2024-02-10" },
  { id: 5, email: "parent5@example.com", subscribedAt: "2024-02-15" },
]

export function Subscribers() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [subscribers] = useState(mockSubscribers)

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const exportToCSV = () => {
    const csvContent = [
      ["Email", "Date d'inscription"],
      ...filteredSubscribers.map((sub) => [sub.email, new Date(sub.subscribedAt).toLocaleDateString("fr-FR")]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `abonnes_kidstorytime_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Succès",
      description: "Liste des abonnés exportée avec succès.",
    })
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Abonnés</h2>
          <p className="text-slate-600">Gérez la liste des abonnés à votre newsletter</p>
        </div>
        <Button onClick={exportToCSV} className="bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4 mr-2" />
          Exporter CSV
        </Button>
      </div>

      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Liste des Abonnés</CardTitle>
              <CardDescription>{filteredSubscribers.length} abonné(s) au total</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher par email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-3 font-medium text-slate-600">Email</th>
                  <th className="text-left p-3 font-medium text-slate-600">Date d'inscription</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.length > 0 ? (
                  filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium text-slate-900">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="text-slate-600">
                          {new Date(subscriber.subscribedAt).toLocaleDateString("fr-FR")}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="text-center py-8">
                      <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 mb-2">
                        {searchTerm ? "Aucun résultat" : "Aucun abonné"}
                      </h3>
                      <p className="text-slate-500">
                        {searchTerm
                          ? "Aucun abonné ne correspond à votre recherche."
                          : "Les abonnés à votre newsletter apparaîtront ici."}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
