import { Navbar } from "@/components/layout/Navbar"
import { Plus, Pencil, Trash } from "lucide-react"
import { useState, useMemo } from "react"
import { useCategories } from "@/hooks/categories/useCategories"
import { CategoryModal } from "@/components/admin/CategoryModal"
import { useProducts } from "@/hooks/products/useProducts"
import { Product, ProductCreateData, ProductUpdateData } from "@/types/product"
import { ProductModal } from "@/components/admin/ProductModal"
import { ProductFilters } from "@/components/admin/ProductFilters"

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<"categories" | "products">("categories")
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<{ id: number; name: string } | null>(null)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  // Filtering and sorting state
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [sortField, setSortField] = useState<string>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const {
    categories,
    isLoading: categoriesLoading,
    addCategory,
    updateCategory,
    deleteCategory
  } = useCategories()

  const {
    products,
    isLoading: productsLoading,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts()

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return []

    return products
      .filter(product => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = !selectedCategory || product.category.id === selectedCategory
        return matchesSearch && matchesCategory
      })
      .sort((a, b) => {
        let comparison = 0
        if (sortField === "name") {
          comparison = a.name.localeCompare(b.name)
        } else if (sortField === "price") {
          comparison = a.price - b.price
        } else if (sortField === "stock") {
          comparison = a.stock - b.stock
        }
        return sortOrder === "asc" ? comparison : -comparison
      })
  }, [products, searchQuery, selectedCategory, sortField, sortOrder])

  const handleAddCategory = async (data: { name: string }) => {
    try {
      await addCategory.mutateAsync(data)
      setIsCategoryModalOpen(false)
    } catch (error) {
      console.error("Failed to add category:", error)
    }
  }

  const handleUpdateCategory = async (data: { name: string }) => {
    if (!editingCategory) return
    try {
      await updateCategory.mutateAsync({
        id: editingCategory.id,
        data: data
      })
      setEditingCategory(null)
    } catch (error) {
      console.error("Failed to update category:", error)
    }
  }

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Czy na pewno chcesz usunąć tę kategorię?")) {
      try {
        await deleteCategory.mutateAsync(id)
      } catch (error) {
        console.error("Failed to delete category:", error)
      }
    }
  }

  const handleAddProduct = async (data: ProductCreateData) => {
    try {
      await addProduct.mutateAsync(data)
      setIsProductModalOpen(false)
    } catch (error) {
      console.error("Failed to add product:", error)
    }
    console.log(data)
  }

  const handleUpdateProduct = async (data: ProductUpdateData) => {
    if (!editingProduct) return
    try {
      await updateProduct.mutateAsync({
        id: editingProduct.id,
        data: data
      })
      setEditingProduct(null)
    } catch (error) {
      console.error("Failed to update product:", error)
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten produkt?")) {
      try {
        await deleteProduct.mutateAsync(id)
      } catch (error) {
        console.error("Failed to delete product:", error)
      }
    }
  }
  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Panel Administracyjny
          </h1>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={() => setActiveTab("categories")}
            className={`rounded-lg px-4 py-2 ${
              activeTab === "categories"
                ? "bg-blue-600 text-white"
                : "bg-neutral-100 text-gray-900 dark:bg-neutral-800 dark:text-white"
            }`}
          >
            Kategorie
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`rounded-lg px-4 py-2 ${
              activeTab === "products"
                ? "bg-blue-600 text-white"
                : "bg-neutral-100 text-gray-900 dark:bg-neutral-800 dark:text-white"
            }`}
          >
            Produkty
          </button>
        </div>

        {/* Categories Section */}
        {activeTab === "categories" && (
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Zarządzanie Kategoriami
              </h2>
              <button
                onClick={() => setIsCategoryModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Dodaj Kategorię
              </button>
            </div>

            {categoriesLoading ? (
              <div>Ładowanie...</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {categories?.map(category => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-lg bg-neutral-50 p-4 dark:bg-neutral-700"
                  >
                    <span className="text-gray-900 dark:text-white">{category.name}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-neutral-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-neutral-600"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Products Section */}
        {activeTab === "products" && (
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-neutral-800">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Zarządzanie Produktami
              </h2>
              <button
                onClick={() => setIsProductModalOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
                Dodaj Produkt
              </button>
            </div>

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

            {productsLoading ? (
              <div>Ładowanie...</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg bg-neutral-50 p-4 dark:bg-neutral-700"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`http://localhost:5173/public/uploads/products/${product.image}`}
                        alt={product.name}
                        className="h-16 w-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {product.price} zł | Stan: {product.stock}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-neutral-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-neutral-600"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        <CategoryModal
          isOpen={isCategoryModalOpen || editingCategory !== null}
          onClose={() => {
            setIsCategoryModalOpen(false)
            setEditingCategory(null)
          }}
          onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
          initialData={editingCategory || undefined}
          title={editingCategory ? "Edytuj kategorię" : "Dodaj nową kategorię"}
          isLoading={addCategory.isPending || updateCategory.isPending}
        />

        <ProductModal
          isOpen={isProductModalOpen || editingProduct !== null}
          onClose={() => {
            setIsProductModalOpen(false)
            setEditingProduct(null)
          }}
          onSubmit={data => {
            if (editingProduct) {
              handleUpdateProduct(data as ProductUpdateData)
            } else {
              handleAddProduct(data as ProductCreateData)
            }
          }}
          initialData={
            editingProduct
              ? {
                  name: editingProduct.name,
                  description: editingProduct.description,
                  price: editingProduct.price,
                  stock: editingProduct.stock,
                  category_id: editingProduct.category.id,
                  image: editingProduct.image
                }
              : undefined
          }
          title={editingProduct ? "Edytuj produkt" : "Dodaj nowy produkt"}
          isLoading={addProduct.isPending || updateProduct.isPending}
        />
      </div>
    </div>
  )
}
