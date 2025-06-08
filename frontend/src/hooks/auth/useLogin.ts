import { useMutation } from "@tanstack/react-query"
import type { LoginFormData } from "@/schemas/auth"
import { API_ENDPOINTS } from "@/config/api"
import { LoginResponse } from "@/types/user"

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      try {
        const response = await fetch(API_ENDPOINTS.auth.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include",
          body: JSON.stringify(data)
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || "Nieprawidłowe dane logowania")
        }
        return response.json()
      } catch (error) {
        if (error instanceof Error) {
          throw error
        }
        throw new Error("Wystąpił błąd podczas logowania")
      }
    }
  })
}
