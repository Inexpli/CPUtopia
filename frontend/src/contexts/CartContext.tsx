import { createContext, useContext, ReactNode } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@/config/api"
import { CartContextType, CartItem } from "@/types/cart"

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()

  const {
    data: items = [],
    isLoading,
    error
  } = useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.cart.get, {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Failed to fetch cart")
      }
      return response.json()
    }
  })

  const addToCart = useMutation({
    mutationFn: async (productId: number) => {
      const response = await fetch(API_ENDPOINTS.cart.add.replace("{id}", productId.toString()), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ quantity: 1 })
      })
      if (!response.ok) {
        throw new Error("Failed to add item to cart")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })

  const removeFromCart = useMutation({
    mutationFn: async (productId: number) => {
      const response = await fetch(
        API_ENDPOINTS.cart.remove.replace("{id}", productId.toString()),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include"
        }
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to remove item from cart")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })

  const clearCart = useMutation({
    mutationFn: async () => {
      const response = await fetch(API_ENDPOINTS.cart.clear, {
        method: "POST",
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error("Failed to clear cart")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
    }
  })

  const refreshCart = async () => {
    await queryClient.invalidateQueries({ queryKey: ["cart"] })
  }

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        error: error as Error | null,
        addToCart: (productId: number) => addToCart.mutateAsync(productId),
        removeFromCart: (productId: number) => removeFromCart.mutateAsync(productId),
        clearCart: () => clearCart.mutateAsync(),
        refreshCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
