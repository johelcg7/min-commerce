"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/profile" 
          className="text-sm font-medium text-gray-700 hover:text-gray-800"
        >
          {session.user?.name}
        </Link>
        <Button 
          variant="destructive" 
          onClick={() => signOut()}
        >
          Cerrar sesión
        </Button>
      </div>
    )
  }

  return (
    <Button 
      onClick={() => signIn("google")}
      variant="outline"
    >
      Iniciar con Google
    </Button>
  )
}