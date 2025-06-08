import { Product } from "./product"

export interface CartItem {
  product: Product
  quantity: number
  total: number
}

export interface CartContextType {
  items: CartItem[]
  isLoading: boolean
  error: Error | null
  addToCart: (productId: number) => Promise<void>
  removeFromCart: (productId: number) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}
