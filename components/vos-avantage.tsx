export default function ServicesSection() {
  const images = [
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=341,fit=crop/mv0DVQqVGjSLDlE0/1-AGB6Zrg8XRsRLazb.png",
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=341,fit=crop/mv0DVQqVGjSLDlE0/2-AE0oDqgRnJTKkv12.png",
    "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,h=341,fit=crop/mv0DVQqVGjSLDlE0/3-m2WpvbXRa3sxn3nZ.png",
  ]

  const phrases = ["Personnalisation", "Livraison à domicile", "Paiement à la livraison"]

  return (
    <section id="services" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 w-full">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center box-border min-w-0">
              <img
                src={image || "/placeholder.svg"}
                alt={`Service ${index + 1}`}
                className="w-full max-w-full h-20 md:h-44 object-contain"
              />
              <div className="mt-2 text-center text-xs md:text-base font-bold text-gray-700 break-words px-1">
                {phrases[index]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
