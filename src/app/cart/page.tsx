'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/store/useCart'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart()

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
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Tu Carrito</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="relative w-24 h-24">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(item.id)}
            >
              Eliminar
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <div className="text-xl font-bold">
          Total: ${getTotal().toFixed(2)}
        </div>
        <Link href="/checkout">
          <Button size="lg">
            Proceder al Checkout
          </Button>
        </Link>
      </div>
    </div>
  )
}
