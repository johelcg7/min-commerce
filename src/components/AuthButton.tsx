"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex gap-4 items-center">
        <Link href="/profile" className="text-xs border rounded-lg px-6 h-8 flex items-center">
          {session.user?.name}
        </Link>
        <button 
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>
    )
  }

  return (
    <button 
      onClick={() => signIn("google")}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Iniciar con Google
    </button>
  )
}