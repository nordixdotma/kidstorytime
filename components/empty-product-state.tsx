interface EmptyProductStateProps {
  title?: string
  message?: string
  showLink?: boolean
  compact?: boolean
}

export default function EmptyProductState({
  title = "Aucun Produit Trouvé",
  message = "Nous n'avons pas pu trouver de produits correspondant à vos critères.",
  showLink = false,
  compact = false,
}: EmptyProductStateProps) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center bg-gray-50 border border-gray-200 ${
        compact ? "py-8" : "py-16"
      }`}
    >
      <div className="bg-[#415b58]/10 p-4 mb-4">
        <span className="text-4xl">📚</span>
      </div>
      <h3 className="text-xl font-black text-black mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6 px-4 font-normal">{message}</p>
    </div>
  )
}
