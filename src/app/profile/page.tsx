import { auth } from "@/auth"

export default async function ProfilePage() {
  const session = await auth()

  if (!session) {
    return (
      <main className="flex items-center justify-center h-[80vh]">
        <p className="text-xl text-red-500">No autorizado</p>
      </main>
    )
  }

  return (
    <main className="h-[80vh] flex flex-col items-center justify-center">
      <h2 className="text-xl mb-4">Perfil del Usuario</h2>
      <p className="font-bold">{session.user?.name}</p>
      <p className="text-gray-600">{session.user?.email}</p>
    </main>
  )
}