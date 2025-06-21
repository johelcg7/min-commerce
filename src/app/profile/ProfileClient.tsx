"use client"
import { useSession } from "next-auth/react"
import { Card } from "@/components/ui/card"

export default function ProfileClient() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <main className="flex items-center justify-center h-[80vh] bg-background">
        <p className="text-lg text-muted-foreground">Cargando...</p>
      </main>
    )
  }

  if (!session) {
    return (
      <main className="flex items-center justify-center h-[80vh] bg-background">
        <Card className="p-8 text-center">
          <p className="text-xl text-destructive">No autorizado</p>
        </Card>
      </main>
    )
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-muted to-background transition-colors py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-primary mb-8 text-center uppercase">Perfil</h1>
        <Card className="p-8 w-full max-w-md mx-auto text-center bg-gradient-to-br from-card via-muted to-card border border-border shadow-2xl text-card-foreground">
          <h2 className="text-2xl mb-4 font-bold text-primary drop-shadow-2xl uppercase">Perfil del Usuario</h2>
          <p className="font-bold text-card-foreground">{session.user?.name}</p>
          <p className="text-muted-foreground">{session.user?.email}</p>
        </Card>
      </div>
    </section>
  )
}