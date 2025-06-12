const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const productos = [
  {
    name: 'Laptop Pro X',
    description: 'Laptop de última generación con procesador de alta velocidad',
    price: 1299.99,
    stock: 10,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?w=500',
  },
  {
    name: 'Smartphone Galaxy Plus',
    description: 'Smartphone con cámara de alta resolución y batería duradera',
    price: 799.99,
    stock: 15,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500',
  },
  {
    name: 'Tablet Air',
    description: 'Tablet ligera y potente para trabajo y entretenimiento',
    price: 499.99,
    stock: 20,
    imageUrl: 'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500',
  },
  {
    name: 'Smartwatch Series 5',
    description: 'Reloj inteligente con monitoreo de salud y notificaciones',
    price: 299.99,
    stock: 25,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
  },
]

async function main() {
  console.log('Iniciando seed de la base de datos...')

  for (const producto of productos) {
    await prisma.product.create({
      data: producto,
    })
  }

  console.log('Seed completado exitosamente.')
}

main()
  .catch((e) => {
    console.error('Error durante el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
