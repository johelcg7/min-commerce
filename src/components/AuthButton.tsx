"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-3 bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-1.5 rounded-lg shadow-md border border-primary/30">
        <Link 
          href="/profile" 
          className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-200 px-2 py-1 rounded focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:outline-none"
        >
          <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="truncate max-w-[100px]">{session.user?.name}</span>
        </Link>
        <Button 
          variant="destructive" 
          size="sm"
          className="px-3 py-1 text-xs font-semibold rounded-md shadow hover:scale-105 transition-transform"
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
      className="border-primary/60 text-primary font-semibold px-4 py-1.5 rounded-md shadow hover:bg-primary/10 hover:scale-105 transition-transform"
    >
      <svg className="inline-block mr-2 w-5 h-5 align-middle" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.13 2.7 30.45 0 24 0 14.82 0 6.73 5.82 2.69 14.09l7.98 6.19C12.36 13.13 17.74 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6C43.98 37.13 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.28a14.5 14.5 0 0 1 0-8.56l-7.98-6.19A23.94 23.94 0 0 0 0 24c0 3.77.9 7.34 2.69 10.47l7.98-6.19z"/><path fill="#EA4335" d="M24 48c6.45 0 12.13-2.13 16.19-5.82l-7.19-5.6c-2.01 1.35-4.59 2.15-9 2.15-6.26 0-11.64-3.63-13.33-8.64l-7.98 6.19C6.73 42.18 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
      Iniciar con Google
    </Button>
  )
}