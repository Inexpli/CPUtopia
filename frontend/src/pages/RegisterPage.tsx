import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormData } from "../schemas/auth"
import { useRegister } from "@/hooks/auth/useRegister"
import { FormInput } from "@/components/ui/form-input"
import { AuthFormLayout } from "@/components/auth/auth-form-layout"

export const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })

  const { mutateAsync: registerUser, isPending } = useRegister()

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data)
    navigate("/login")
  }

  return (
    <AuthFormLayout title="Rejestracja">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
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
