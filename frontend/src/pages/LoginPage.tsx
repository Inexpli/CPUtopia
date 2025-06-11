import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "../schemas/auth"
import { useLogin } from "@/hooks/auth/useLogin"
import { useUser } from "@/contexts/UserContext"
import { FormInput } from "@/components/ui/form-input"
import { AuthFormLayout } from "@/components/auth/auth-form-layout"
import { useState } from "react"

export const LoginPage = () => {
  const navigate = useNavigate()
  const { setUser } = useUser()
  const [backendError, setBackendError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const { mutateAsync: login, isPending } = useLogin()

  const onSubmit = async (data: LoginFormData) => {
    try {
      setBackendError(null)
      const response = await login(data)
      setUser({
        id: response.id,
        email: response.user,
        name: response.user.split("@")[0]
      })
      navigate("/")
    } catch (error) {
      if (error instanceof Error) {
        setBackendError(error.message)
      } else {
        setBackendError("Wystąpił nieoczekiwany błąd podczas logowania")
      }
    }
  }

  return (
    <AuthFormLayout title="Logowanie">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {backendError && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-500 dark:bg-red-900/50 dark:text-red-200">
            {backendError}
          </div>
        )}
        <FormInput
          label="Email"
          type="email"
          id="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FormInput
          label="Hasło"
          type="password"
          id="password"
          error={errors.password?.message}
          {...register("password")}
        />
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isPending ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
    </AuthFormLayout>
  )
}
