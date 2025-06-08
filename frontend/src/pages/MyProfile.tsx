import { Navbar } from "@/components/layout/Navbar"
import { useUserProfile } from "@/hooks/auth/useUserProfile"

export const MyProfile = () => {
  const { data: user, isLoading, error } = useUserProfile()

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[200px] items-center justify-center p-4">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600" />
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="p-4 text-center text-red-600">Nie udało się załadować profilu</div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-2xl p-4">
        <h2 className="mb-6 text-2xl font-semibold">Mój Profil</h2>
        <div className="space-y-4 rounded-lg bg-white p-6 shadow dark:bg-neutral-800">
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600 dark:text-gray-400">Nazwa</p>
            <p className="font-medium">{user?.name}</p>
          </div>
        </div>
      </div>
    </>
  )
}
