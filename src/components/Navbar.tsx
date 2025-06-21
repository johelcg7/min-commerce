'use client'

import Link from 'next/link'
import { useCart } from '@/store/useCart'
import { ShoppingCart, Music, Moon, Sun,  } from 'lucide-react'
import AuthButton from "@/components/AuthButton"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const getTotalItems = useCart((state) => state.getTotalItems)
  const [dark, setDark] = useState(false)

  // Sync dark mode with localStorage and across tabs/routes
  useEffect(() => {
    // On mount, set dark mode from localStorage if exists
    const stored = localStorage.getItem("mincommerce-darkmode")
    if (stored === "true") setDark(true)
    if (stored === "false") setDark(false)

    // Listen for changes from other tabs/components
    const onDarkModeChange = (e: StorageEvent) => {
      if (e.key === "mincommerce-darkmode") {
        setDark(e.newValue === "true")
      }
    }
    window.addEventListener("storage", onDarkModeChange)
    return () => window.removeEventListener("storage", onDarkModeChange)
  }, [])

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("mincommerce-darkmode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("mincommerce-darkmode", "false")
    }
  }, [dark])

  return (
    <nav className="sticky top-0 z-30 bg-background/80 dark:bg-background/90 backdrop-blur-lg border-b border-border shadow-lg transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-2xl transition-colors duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
          >
            <Music className="h-7 w-7 drop-shadow-md transition-transform duration-300 group-hover:rotate-6 text-primary" />
            <span className="bg-gradient-to-r from-primary via-accent to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-wider">
              <span className="uppercase text-1xl font-black text-red-700 drop-shadow-md">Vibras</span>
              <span className="mx-1 font-bold text-primary">Music</span>
              <span className="font-light text-accent">Shop</span>
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/catalog"
              className="hover:text-primary text-foreground transition-colors font-medium duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
            >
              Catálogo
            </Link>
            <Link
              href="/orders"
              className="hover:text-primary text-foreground transition-colors font-medium duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
            >
              Historial
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 hover:text-primary text-foreground transition-colors font-medium duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
            >
              <span className="relative">
                <ShoppingCart className="h-6 w-6 text-foreground drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                {getTotalItems() > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center border-2 border-background animate-bounce shadow-lg">
                    {getTotalItems()}
                  </span>
                ) : null}
              </span>
              Carrito
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
              className="ml-2 transition-colors duration-200 hover:bg-accent/40 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
            >
              {dark ? (
                <Sun className="h-5 w-5 text-yellow-400 animate-spin-slow" />
              ) : (
                <Moon className="h-5 w-5 text-yellow-400 animate-pulse" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  )
}
