import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@/config/api"
import { Product, ProductCreateData, ProductUpdateData } from "@/types/product"

export const useProducts = () => {
  const queryClient = useQueryClient()

  // Fetch products
  const {
    data: products,
    isLoading,
    error
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.product.get, {
        credentials: "include"
      })
      return response.json()
    }
  })

  // Fetch single product
  const getProduct = async (id: number) => {
    const response = await fetch(API_ENDPOINTS.product.getDetails.replace("{id}", id.toString()), {
      credentials: "include"
    })
    return response.json()
  }

  // Add product
  const addProduct = useMutation({
    mutationFn: async (data: ProductCreateData) => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value)
        }
      })

      const response = await fetch(API_ENDPOINTS.product.add, {
        method: "POST",
        credentials: "include",
        body: formData
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })

  // Update product
  const updateProduct = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: ProductUpdateData }) => {
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value)
        }
      })

      const response = await fetch(API_ENDPOINTS.product.update.replace("{id}", id.toString()), {
        method: "PUT",
        credentials: "include",
        body: formData
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })

  // Delete product
  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(API_ENDPOINTS.product.delete.replace("{id}", id.toString()), {
        method: "DELETE",
        credentials: "include"
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    }
  })

  return {
    products,
    isLoading,
    error,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
  }
}
