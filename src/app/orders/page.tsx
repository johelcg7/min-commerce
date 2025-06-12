'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    name: string
    imageUrl: string
  }
}

interface Order {
  id: string
  total: number
  createdAt: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const [email, setEmail] = useState('')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)

  const fetchOrders = async () => {
    if (!email) return

    setLoading(true)
    try {
      const response = await fetch(`/api/orders?clientId=${encodeURIComponent(email)}`)
      if (!response.ok) throw new Error('Error al obtener órdenes')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error:', error)
      alert('Error al obtener las órdenes')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Historial de Órdenes</h1>
      
      <div className="mb-6 flex gap-4">
        <Input
          type="email"
          placeholder="Ingresa tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={fetchOrders} disabled={!email || loading}>
          {loading ? 'Cargando...' : 'Buscar Órdenes'}
        </Button>
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-600">
          {email ? 'No se encontraron órdenes para este email' : 'Ingresa tu email para ver tus órdenes'}
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-semibold">Orden #{order.id.slice(-6)}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-bold">${order.total.toFixed(2)}</p>
              </div>
              <div className="grid gap-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 relative">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="object-cover rounded"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        Cantidad: {item.quantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-6">
        <Link href="/catalog">
          <Button variant="outline">Volver al Catálogo</Button>
        </Link>
      </div>
    </div>
  )
}
