'use client'

import { Button } from '@/components/ui/button'
import { useCart } from '@/store/useCart'
import { ShoppingCartIcon, CheckIcon } from 'lucide-react'
import { useState } from 'react'
// Si tienes un sistema de notificaciones, descomenta la siguiente línea
// import { toast } from 'react-hot-toast'

// Define la interfaz Product
interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
}

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export default function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const { items, addItem } = useCart()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  // Verifica si ya está en el carrito con el máximo de stock
  const cartItem = items.find((i) => i.id === product.id)
  const isMax = cartItem && cartItem.quantity >= product.stock

  const handleAdd = async () => {
    if (isMax) return
    setLoading(true)
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      stock: product.stock,
    })
    setAdded(true)
    // toast.success('Producto agregado al carrito') // Si tienes notificaciones
    setTimeout(() => setAdded(false), 1200)
    setLoading(false)
  }

  return (
    <Button
      size="lg"
      disabled={product.stock === 0 || loading || isMax}
      onClick={handleAdd}
      className={className}
    >
      {added ? (
        <>
          <CheckIcon className="mr-3 h-6 w-6" />
          ¡Agregado!
        </>
      ) : (
        <>
          <ShoppingCartIcon className="mr-3 h-6 w-6" />
          {loading
            ? 'Agregando...'
            : isMax
            ? 'Stock máximo en carrito'
            : product.stock === 0
            ? 'Sin stock'
            : 'Agregar al Carrito'}
        </>
      )}
    </Button>
  )
}
