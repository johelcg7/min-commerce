import { prisma } from '@/lib/db/prisma'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  })

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-500 mb-4">Stock disponible: {product.stock}</p>
          <Button 
            size="lg"
            disabled={product.stock === 0}
            className="w-full md:w-auto"
          >
            Agregar al Carrito
          </Button>
        </div>
      </div>
    </div>
  )
}
