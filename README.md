# Min Commerce

Min Commerce es una tienda de música construida con Next.js, React y Zustand. Este proyecto incluye funcionalidades modernas como modo oscuro sincronizado, gestión de carrito de compras, autenticación y una interfaz responsiva.

## Cambios y características implementadas

### Navbar con modo oscuro sincronizado

- El componente `Navbar` implementa un botón para alternar entre modo claro y oscuro.
- El estado del modo oscuro se sincroniza con `localStorage` y entre pestañas usando el evento `storage`.
- El modo oscuro se aplica agregando o quitando la clase `dark` al elemento raíz (`document.documentElement`).
- El valor de modo oscuro se guarda bajo la clave `mincommerce-darkmode` en `localStorage`.

### Carrito de compras con Zustand

- Se utiliza el store `useCart` (Zustand) para manejar el estado global del carrito.
- El Navbar muestra el número total de ítems en el carrito, con animación si hay productos.

### Componentes y UI

- `Navbar` incluye enlaces a inicio, catálogo y carrito.
- El logo utiliza iconos de Lucide y gradientes de color.
- El botón de autenticación (`AuthButton`) está presente en la barra de navegación.
- Se utiliza el componente `Button` para el botón de modo oscuro, con animaciones visuales para los iconos de sol y luna.

### Accesibilidad y UX

- Todos los botones y enlaces incluyen estilos de foco (`focus-visible:ring`).
- El Navbar es sticky y tiene fondo difuminado (`backdrop-blur-lg`).

## Estructura del proyecto

- `src/components/Navbar.tsx`: Barra de navegación principal con modo oscuro y carrito.
- `src/store/useCart.ts`: Store Zustand para el carrito.
- `src/components/AuthButton.tsx`: Botón de autenticación.
- `src/components/ui/button.tsx`: Componente de botón reutilizable.

## Instalación

1. Clona el repositorio.
2. Instala dependencias:
   ```bash
   npm install
   ```
3. Ejecuta el proyecto:
   ```bash
   npm run dev
   ```

## Notas

- El modo oscuro se mantiene entre sesiones y se sincroniza entre pestañas.
- El número de productos en el carrito se actualiza en tiempo real.
- El proyecto utiliza iconos de [Lucide](https://lucide.dev/) y estilos de Tailwind CSS.

## Próximos pasos

- Implementar más páginas y funcionalidades (checkout, perfil de usuario, etc).
- Mejorar la cobertura de tests y documentación.

---
