import { notFound } from "next/navigation"
import { getProductById } from "@/lib/mock-products"
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
      <ApercuContent product={product} />
      <CartModal />
    </main>
  )
}
