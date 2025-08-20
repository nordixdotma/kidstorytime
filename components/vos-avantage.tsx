export default function ServicesSection() {
  const images = [
    "/ser.png",
    "/ser1.png",
    "/ser3.png",
  ]

  const phrases = ["Personnalisation", "Livraison à domicile", "Paiement à la livraison"]

  return (
    <section id="services" className="py-6 md:py-12 bg-[#ffdd83] m-3 md:m-20 rounded-md overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 overflow-hidden">
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8 w-full">
          {images.map((image, index) => (
            <div key={index} className="flex flex-col items-center box-border min-w-0">
              <img
                src={image || "/placeholder.svg"}
                alt={`Service ${index + 1}`}
                className="w-full max-w-full h-20 md:h-44 object-contain [filter:brightness(0)_saturate(100%)_invert(56%)_sepia(82%)_saturate(4192%)_hue-rotate(360deg)_brightness(100%)_contrast(102%)]"
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
