# Min-Commerce

Una tienda en línea moderna construida con Next.js, TypeScript y PostgreSQL.

## Características

- 🛍️ Catálogo de productos
- 🛒 Carrito de compras
- 🔐 Autenticación con Google
- 💳 Proceso de checkout
- 📦 Gestión de órdenes
- 📱 Diseño responsive

## Tecnologías

- Next.js 15
- TypeScript
- PostgreSQL con Prisma
- NextAuth.js para autenticación
- Zustand para estado global
- Tailwind CSS y shadcn/ui para UI
- Zod para validación

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/<tu-usuario>/min-commerce.git
cd min-commerce
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
- Copia `.env.example` a `.env.local`
- Actualiza las variables con tus credenciales

4. Configura la base de datos:
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
min-commerce/
├── src/
│   ├── app/              # Rutas y páginas
│   ├── components/       # Componentes reutilizables
│   ├── lib/             # Utilidades y configuración
│   └── store/           # Estado global con Zustand
├── prisma/              # Esquema y migraciones
└── public/             # Archivos estáticos
```

## Licencia

MIT
