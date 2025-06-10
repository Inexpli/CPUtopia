import { useState, useEffect } from "react"
import { useProducts } from "./useProducts"
import { Product } from "@/types/product"

export const useProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const { products } = useProducts()

  useEffect(() => {
    if (!searchQuery.trim() || !products) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results = products
      .filter(
        product =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      )
      .slice(0, 5) // Limit to 5 results for better UX

    setSearchResults(results)
  }, [searchQuery, products])

  return {
    searchQuery,
    setSearchQuery,
    searchResults
  }
}
