import { notFound } from "next/navigation"
import { getProductById } from "@/lib/mock-products"
import Header from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppButton from "@/components/whatsapp-button"
import ApercuContent from "@/components/apercu-content"
import CartModal from "@/components/cart-modal"

interface ApercuPageProps {
  params: {
    id: string
  }
}

export default function ApercuPage({ params }: ApercuPageProps) {
  const productId = Number.parseInt(params.id)
  const product = getProductById(productId)

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-white">
      <Header forceWhite={true} />
      <div className="pt-28 md:pt-32">
        <ApercuContent product={product} />
      </div>
      <Footer />
      <WhatsAppButton />
      <CartModal />
    </main>
  )
}
