import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { useProducts } from "@/hooks/products/useProducts"
import { useCategories } from "@/hooks/categories/useCategories"
import { useSearchParams } from "react-router-dom"

export const PcParts = () => {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get("category")
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    categoryParam ? [parseInt(categoryParam)] : []
  )
  const { products, isLoading: productsLoading } = useProducts()
  const { categories, isLoading: categoriesLoading } = useCategories()

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(id => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([parseInt(categoryParam)])
    }
  }, [categoryParam])

  const filteredProducts = products?.filter(
    product => selectedCategories.length === 0 || selectedCategories.includes(product.category.id)
  )

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          Części komputerowe
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-neutral-50 p-6 dark:bg-neutral-800">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                Kategorie
              </h2>
              {categoriesLoading ? (
                <div>Ładowanie kategorii...</div>
              ) : (
                <div className="space-y-3">
                  {categories?.map(category => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-3 text-gray-700 dark:text-gray-200"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => handleCategoryToggle(category.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-neutral-600"
                      />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {productsLoading ? (
              <div>Ładowanie produktów...</div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts?.map(product => (
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
                      <button className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                        Dodaj do koszyka
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
