import { z } from 'zod'

export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  stock: z.number().min(0, 'El stock debe ser mayor o igual a 0'),
  imageUrl: z.string().url('Debe ser una URL válida'),
})

export const OrderItemSchema = z.object({
  id: z.string().optional(),
  quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
  price: z.number().min(0, 'El precio debe ser mayor a 0'),
  productId: z.string(),
})

export const OrderSchema = z.object({
  id: z.string().optional(),
  clientId: z.string(),
  total: z.number().min(0, 'El total debe ser mayor a 0'),
  items: z.array(OrderItemSchema),
  status: z.enum(['PENDING', 'COMPLETED', 'CANCELLED']).default('PENDING'),
})

export const checkoutFormSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingrese un email válido'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  phone: z.string().min(8, 'El teléfono debe tener al menos 8 dígitos'),
})

export type Product = z.infer<typeof ProductSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type CheckoutFormData = z.infer<typeof checkoutFormSchema>
