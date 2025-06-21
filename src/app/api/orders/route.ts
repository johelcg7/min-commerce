import { prisma } from '@/lib/db/prisma'
import { NextResponse } from 'next/server'
import { checkoutFormSchema } from '@/lib/validations/schema'

interface OrderItem {
  quantity: number;
  price: number;
  productId: string;
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Validar los datos del formulario
    const validatedData = checkoutFormSchema.parse(data)
    
    // Crear la orden
    const order = await prisma.order.create({
      data: {
        clientId: validatedData.email, // Usamos el email como identificador del cliente
        total: data.total,

       items: {
  create: (data.items as OrderItem[]).map((item) => ({
    quantity: item.quantity,
    price: item.price,
    productId: item.productId,
  })),
},
      },
      include: {
        items: true,
      },
    })

    // Actualizar el stock de los productos
    for (const item of data.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error al crear orden:', error)
    return NextResponse.json(
      { error: 'Error al procesar la orden' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const clientId = searchParams.get('clientId')

  if (!clientId) {
    return NextResponse.json(
      { error: 'Se requiere el clientId' },
      { status: 400 }
    )
  }

  try {
    const orders = await prisma.order.findMany({
      where: { clientId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error al obtener órdenes:', error)
    return NextResponse.json(
      { error: 'Error al obtener órdenes' },
      { status: 500 }
    )
  }
}
