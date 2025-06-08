import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@/config/api"
import { UserProfile } from "@/types/user"

export const useUserProfile = () => {
  return useQuery<UserProfile, Error>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      try {
        const response = await fetch(API_ENDPOINTS.auth.profile, {
          credentials: "include"
        })
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania profilu")
        }
        return response.json()
      } catch (error) {
        if (error instanceof Error) {
          throw error
        }
        throw new Error("Wystąpił błąd podczas pobierania profilu")
      }
    }
  })
}
