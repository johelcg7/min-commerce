'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from "@/components/ui/card"
import Link from 'next/link'
import Image from "next/image"

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
    <section className="min-h-screen bg-gradient-to-br from-background via-muted to-background transition-colors py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-primary mb-8 text-center uppercase">Órdenes</h1>
        <div className="mb-8 flex gap-4 justify-center">
          <Input
            type="email"
            placeholder="Ingresa tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="max-w-xs bg-card text-card-foreground border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-background/80 transition-colors"
          />
          <Button onClick={fetchOrders} disabled={!email || loading} className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-xl hover:scale-105 hover:from-primary/90 hover:to-accent/90 transition-transform">
            {loading ? 'Cargando...' : 'Buscar Órdenes'}
          </Button>
        </div>
        {orders.length === 0 ? (
          <p className="text-muted-foreground text-center text-lg">
            {email ? 'No se encontraron órdenes para este email' : 'Ingresa tu email para ver tus órdenes'}
          </p>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            {orders.map((order) => (
              <Card key={order.id} className="p-6 bg-gradient-to-br from-card via-muted to-card border border-border shadow-2xl text-card-foreground">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold text-blue-200">Orden #{order.id.slice(-6)}</p>
                    <p className="text-sm text-blue-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-bold text-2xl" style={{ color: "var(--price)" }}>
                    ${order.total.toFixed(2)}
                  </p>
                </div>
                <div className="grid gap-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="w-16 h-16 relative">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover rounded shadow-md border border-border"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{item.product.name}</p>
                        <p className="text-sm" style={{ color: "var(--price)" }}>
                          Cantidad: {item.quantity} x ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center">
          <Link href="/catalog">
            <Button variant="outline" className="border-border text-muted-foreground hover:bg-muted/40 transition-colors">Volver al Catálogo</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
