import Image from "next/image";
import Link from "next/link";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-4xl font-bold mb-8">Min-Commerce</h1>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/catalog"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/cart"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Ver Carrito
            </Link>
            <AuthButton />
          </div>
        </div>
      </main>
    </div>
  );
}
