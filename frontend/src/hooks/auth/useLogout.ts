import { useMutation, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@/config/api"
import { useUser } from "@/contexts/UserContext"

export const useLogout = () => {
  const { setUser } = useUser()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(API_ENDPOINTS.auth.logout, {
        method: "POST",
        credentials: "include"
      })
      if (!response.ok) {
        throw (new Error("Logout failed"), window.location.reload())
      }
      return response.json()
    },
    onSuccess: () => {
      setUser(null)
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ["user"] })
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    },
    onError: error => {
      console.error("Logout failed:", error)
    }
  })

  return mutation
}
