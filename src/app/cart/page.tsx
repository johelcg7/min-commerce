'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useCart } from '@/store/useCart'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
        <Link href="/catalog">
          <Button>Ir al Catálogo</Button>
        </Link>
      </div>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-muted to-background transition-colors py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-primary mb-8 text-center uppercase">Carrito</h1>
        <div className="space-y-4 max-w-3xl mx-auto">
          {items.map((item) => (
            <Card key={item.id} className="flex items-center gap-4 p-4 border border-border bg-gradient-to-br from-card via-muted to-card shadow-2xl text-card-foreground">
              <div className="relative w-24 h-24">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover rounded shadow-md border border-border"
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-card-foreground">{item.name}</h3>
                <p className="text-muted-foreground" style={{ color: "var(--price)" }}>
                  ${item.price.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="border-border text-muted-foreground hover:bg-muted/40"
                >
                  -
                </Button>
                <span className="w-8 text-center text-card-foreground">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="border-border text-muted-foreground hover:bg-muted/40"
                >
                  +
                </Button>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeItem(item.id)}
                className="bg-gradient-to-r from-destructive to-accent text-destructive-foreground shadow-xl hover:scale-105 hover:from-destructive/90 hover:to-accent/90 transition-transform"
              >
                Eliminar
              </Button>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center max-w-3xl mx-auto gap-4">
          <div className="text-2xl font-bold" style={{ color: "var(--price)" }}>
            Total: ${getTotal().toFixed(2)}
          </div>
          <Link href="/checkout">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-xl hover:scale-105 hover:from-primary/90 hover:to-accent/90 transition-transform">
              Proceder al Checkout
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
