'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from "@/components/ui/card"
import { useCart } from '@/store/useCart'
import { checkoutFormSchema } from '@/lib/validations/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { CheckoutFormData } from '@/lib/validations/schema'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Modal } from '@/components/ui/modal'
import { useState, useEffect } from 'react'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
  })

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          total: getTotal(),
        }),
      })

      if (!response.ok) {
        throw new Error('Error al procesar la orden')
      }

      clearCart()
      setShowModal(true)
      // router.push('/orders') // Ahora el usuario decide
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error al procesar tu orden')
    }
  }

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])
  if (items.length === 0) return null

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-muted to-background transition-colors py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-primary mb-8 text-center uppercase">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 bg-card border border-border shadow-2xl text-card-foreground transition-colors duration-300">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-1 text-foreground">Nombre Completo</label>
                <Input
                  id="name"
                  {...register('name')}
                  className={`bg-input text-foreground border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-card ${errors.name ? 'border-destructive' : ''}`}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-1 text-foreground">Email</label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={`bg-input text-foreground border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-card ${errors.email ? 'border-destructive' : ''}`}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-semibold mb-1 text-foreground">Dirección</label>
                <Input
                  id="address"
                  {...register('address')}
                  className={`bg-input text-foreground border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-card ${errors.address ? 'border-destructive' : ''}`}
                />
                {errors.address && (
                  <p className="text-destructive text-sm mt-1">{errors.address.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold mb-1 text-foreground">Teléfono</label>
                <Input
                  id="phone"
                  {...register('phone')}
                  className={`bg-input text-foreground border-border placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-card ${errors.phone ? 'border-destructive' : ''}`}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-xl hover:scale-105 hover:from-primary/90 hover:to-accent/90 transition-transform" disabled={isSubmitting}>
                {isSubmitting ? 'Procesando...' : 'Confirmar Orden'}
              </Button>
            </form>
          </Card>
          <Card className="p-8 bg-card border border-border shadow-2xl text-card-foreground transition-colors duration-300">
            <h2 className="text-xl font-bold mb-6 text-primary">Resumen de la Orden</h2>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b border-muted py-2">
                  <span className="text-foreground">{item.name} x {item.quantity}</span>
                  <span className="text-primary font-semibold" style={{ color: "var(--price)" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4 mt-4 border-muted">
                <div className="flex justify-between font-bold text-xl" style={{ color: "var(--price)" }}>
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/catalog">
            <Button variant="outline" className="border-blue-700/60 text-blue-200 hover:bg-blue-900/30">Volver al Catálogo</Button>
          </Link>
        </div>
      </div>
      <Modal
        open={showModal}
        title="¡Orden procesada!"
        onClose={() => { setShowModal(false); }}
        actionLabel="Volver al Catálogo"
        onAction={() => { setShowModal(false); router.push('/catalog') }}
      >
        <div className="text-center text-lg text-primary-foreground">
          Tu orden ha sido procesada exitosamente.
        </div>
      </Modal>
    </section>
  )
}
