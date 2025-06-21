import { prisma } from '@/lib/db/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  })

  if (!product) {
    notFound()
  }

  return (
    <section className="min-h-screen py-12 bg-gradient-to-br from-background via-muted to-background transition-colors duration-300">
      <div className="container mx-auto flex flex-col md:flex-row gap-10 items-stretch justify-center">
        <div className="relative flex-1 min-h-[400px] max-w-[400px] bg-gradient-to-br from-card via-muted to-card rounded-lg shadow-2xl flex items-center justify-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg shadow-2xl border border-border"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-1 min-h-[400px] flex flex-col justify-center p-8 bg-card/80 rounded-lg shadow-2xl">
          <h1 className="text-4xl font-bold mb-4 text-primary drop-shadow-2xl uppercase">{product.name}</h1>
          <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
          <p className="text-3xl font-bold mb-4 text-yellow-300">${product.price.toFixed(2)}</p>
          <p className="text-base text-muted-foreground mb-4">Stock disponible: {product.stock}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </section>
  )
}
