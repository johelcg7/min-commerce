import { ProductCard } from '@/components/ProductCard'
import { prisma } from '@/lib/db/prisma'


export default async function CatalogPage() {
  const products = await prisma.product.findMany()

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted to-background transition-colors py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-primary mb-8 text-center uppercase">
          Catálogo
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="...">
              <ProductCard {...product} />
              
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
