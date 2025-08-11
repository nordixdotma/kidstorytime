interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage?: string
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
          {/* Fallback to background image if video doesn't load */}
          <img
            src={backgroundImage || "/placeholder.svg?height=600&width=1200&query=kids story background"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 h-full flex items-end pb-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-4xl text-left">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">{title}</h1>
            {subtitle && <p className="text-base md:text-lg text-white/90 font-medium">{subtitle}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
