import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { useProducts } from "@/hooks/useProducts"
import { useSearchParams } from "react-router-dom"
import { Spinner } from "@/components/common/Spinner"
import { useCart } from "@/contexts/CartContext"
import { ProductFilters } from "@/components/admin/ProductFilters"
import { Product } from "@/types/product"

export const PcParts = () => {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const { products, isLoading: productsLoading } = useProducts()
  const { addToCart } = useCart()

  // Sorting and filtering state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(
    categoryParam ? parseInt(categoryParam) : null
  )
  const [sortField, setSortField] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId)
    } catch (error: unknown) {
      console.error("Failed to add product to cart:", error)
    }
  }

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(parseInt(categoryParam))
    }
  }, [categoryParam])

  const filteredAndSortedProducts = products
    ?.filter((product: Product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || product.category.id === selectedCategory
      return matchesSearch && matchesCategory
    })
    .sort((a: Product, b: Product) => {
      let comparison = 0
      if (sortField === "name") {
        comparison = a.name.localeCompare(b.name)
      } else if (sortField === "price") {
        comparison = a.price - b.price
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Części komputerowe
        </h1>

        <div className="mb-8">
          <ProductFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={setSortField}
            onSortOrderChange={() => setSortOrder(order => (order === "asc" ? "desc" : "asc"))}
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsLoading ? (
            <div className="py-8">
              <Spinner />
            </div>
          ) : (
            filteredAndSortedProducts?.map(product => (
              <div
                key={product.id}
                className="overflow-hidden rounded-lg bg-neutral-50 shadow-sm transition-shadow hover:shadow-md dark:bg-neutral-800"
              >
                <img
                  src={`http://localhost:8080/uploads/products/${product.image}`}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {product.description}
                  </p>
                  <p className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                    {product.price} zł
                  </p>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                  >
                    Dodaj do koszyka
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
