import { prisma } from '@/lib/db/prisma'
import ProductCard from '@/components/ProductCard'

export default async function CatalogPage() {
  const products = await prisma.product.findMany()

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
