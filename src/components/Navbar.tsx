'use client'

import Link from 'next/link'
import { useCart } from '@/store/useCart'
import { ShoppingCart, Store } from 'lucide-react'

export default function Navbar() {
  const getTotalItems = useCart((state) => state.getTotalItems)

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="font-bold text-xl flex items-center gap-2">
            <Store className="h-6 w-6" />
            Min-Commerce
          </Link>
          
          <div className="flex items-center gap-6">
            <Link href="/catalog" className="hover:text-blue-600">
              Catálogo
            </Link>
            <Link href="/cart" className="flex items-center gap-2 hover:text-blue-600">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
              Carrito
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
