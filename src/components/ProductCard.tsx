"use client"

import Image from "next/image"
import Link from "next/link"
import AddToCartButton from "@/components/AddToCartButton"
import { StarIcon } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  stock: number
}

export function ProductCard(props: ProductCardProps) {
  const { id, name, description, price, imageUrl, stock } = props

  return (
    <div className="group relative bg-gradient-to-br from-card via-muted to-card rounded-xl shadow-2xl hover:shadow-primary/40 transition-all duration-300 border border-border flex flex-col justify-between text-card-foreground">
      <div className="aspect-square overflow-hidden rounded-t-xl relative">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 500px) 500px"
          className="h-full w-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110 border-b border-border"
        />
        {stock <= 5 && stock > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-300 text-primary-foreground text-xs font-bold px-2.5 py-0.5 rounded-full shadow border border-yellow-400 animate-pulse">
            ¡Últimas {stock} unidades!
          </div>
        )}
        {stock === 0 && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2.5 py-0.5 rounded-full shadow border border-destructive animate-bounce">
            Agotado
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-bold text-primary hover:text-accent transition-colors mb-1 line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="mt-2 flex items-center">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className="h-4 w-4 text-yellow-300"
              fill="currentColor"
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold" style={{ color: "var(--price)" }}>
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">
            {stock > 0 ? `Stock: ${stock}` : 'Agotado'}
          </span>
        </div>
        <div className="mt-4">
          {/* Adaptar el botón al ancho del card */}
          <AddToCartButton
            product={props}
            className="w-full py-2 text-base"
          />
        </div>
      </div>
    </div>
  )
}
