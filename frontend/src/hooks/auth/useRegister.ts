import { useMutation } from "@tanstack/react-query"
import type { RegisterFormData } from "../schemas/auth"
import { API_ENDPOINTS } from "@/config/api"
import { RegisterResponse } from "@/types/user"

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterFormData>({
    mutationFn: async (data: RegisterFormData) => {
      try {
        const response = await fetch(API_ENDPOINTS.auth.register, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || "Wystąpił błąd podczas rejestracji")
        }
        return response.json()
      } catch (error) {
        if (error instanceof Error) {
          throw error
        }
        throw new Error("Wystąpił błąd podczas rejestracji")
      }
    }
  })
}
