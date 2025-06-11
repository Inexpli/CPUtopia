import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormData } from "../schemas/auth"
import { useRegister } from "@/hooks/auth/useRegister"
import { FormInput } from "@/components/ui/form-input"
import { AuthFormLayout } from "@/components/auth/auth-form-layout"
import { useState } from "react"

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [backendError, setBackendError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const { mutateAsync: registerUser, isPending } = useRegister()

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setBackendError(null)
      await registerUser(data)
      navigate("/login")
    } catch (error) {
      if (error instanceof Error) {
        setBackendError(error.message)
      } else {
        setBackendError("Wystąpił nieoczekiwany błąd podczas rejestracji")
      }
    }
  }

  return (
    <AuthFormLayout title="Rejestracja">
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
        <FormInput
          label="Powtórz hasło"
          type="password"
          id="confirmPassword"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <button
          type="submit"
          disabled={isPending}
          className="mt-4 w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isPending ? "Rejestracja..." : "Zarejestruj się"}
        </button>
      </form>
    </AuthFormLayout>
  )
}
