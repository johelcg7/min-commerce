import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import NewProductsCarousel from "@/components/NewProductsCarousel";


export default async function Home() {
  // Obtener los 8 productos más nuevos (musicales)
  const newProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 7,
  });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted to-background transition-colors py-12 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        {/* Fondo animado existente */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute right-0 bottom-0 w-72 h-72 bg-accent/30 rounded-full blur-2xl animate-spin-slow" />
        {/* Imagen de fondo detrás del Card */}
        <Image
          src="/fondo.png"
          alt="Fondo Bienvenida"
          fill
          className="object-cover opacity-20 z-0"
          style={{ objectPosition: "center" }}
          priority={false}
        />
      </div>
      <Card className="relative z-10 mx-auto max-w-2xl text-center px-6 py-16 rounded-2xl shadow-2xl bg-card border border-border transition-all duration-500 hover:scale-[1.02] hover:shadow-primary/40">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 transition-colors duration-300 hover:text-yellow-300 uppercase text-center">
          Bienvenido a
        </h1>
        <div className="flex justify-center mb-6">
          <Image
            src="/principalLogo.png"
            alt="Logo principal"
            width={300}
            height={300}
            className="h-80 w-auto inline-block align-middle drop-shadow-xl"
            priority
          />
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 transition-colors duration-300 hover:text-primary">
          Tu tienda online musical. Descubre instrumentos, audio y más para
          músicos y creadores.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/catalog">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-white shadow-xl hover:scale-105 hover:from-primary/80 hover:to-accent/80 transition-transform"
            >
              Ver Catálogo
            </Button>
          </Link>
        </div>
      </Card>
     <NewProductsCarousel products={newProducts} />
    </section>
  );
}
