import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@/config/api"
import { Category, CategoryCreateData, CategoryUpdateData } from "@/types/category"

export const useCategories = () => {
  const queryClient = useQueryClient()

  // Fetch categories
  const {
    data: categories,
    isLoading,
    error
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.category.get, {
        credentials: "include"
      })
      return response.json()
    }
  })

  // Add category
  const addCategory = useMutation({
    mutationFn: async (data: CategoryCreateData) => {
      const response = await fetch(API_ENDPOINTS.category.add, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
  })

  // Update category
  const updateCategory = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: CategoryUpdateData }) => {
      const response = await fetch(API_ENDPOINTS.category.update.replace("{id}", id.toString()), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
  })

  // Delete category
  const deleteCategory = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(API_ENDPOINTS.category.delete.replace("{id}", id.toString()), {
        method: "DELETE",
        credentials: "include"
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    }
  })

  return {
    categories,
    isLoading,
    error,
    addCategory,
    updateCategory,
    deleteCategory
  }
}
