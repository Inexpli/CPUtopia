import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@/config/api"
import { Navbar } from "@/components/layout/Navbar"
import { useCart } from "@/contexts/CartContext"
import { ShoppingCart } from "lucide-react"

interface Category {
  id: number
  name: string
}

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: Category
  stock: number
}

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()

  const {
    data: product,
    isLoading,
    error
  } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(API_ENDPOINTS.product.getDetails.replace("{id}", id!), {
        credentials: "include"
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return response.json()
    },
    enabled: !!id
  })

  const handleAddToCart = async () => {
    if (product) {
      try {
        await addToCart(product.id)
      } catch (error) {
        console.error("Failed to add to cart:", error)
      }
    }
  }

  if (isLoading)
    return (
      <>
        <Navbar />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </>
    )

  if (error)
    return (
      <>
        <Navbar />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/10">
            <p className="text-lg font-medium text-red-600 dark:text-red-400">
              Nie udało się załadować produktu: {(error as Error)?.message || "Nieznany błąd"}
            </p>
          </div>
        </div>
      </>
    )

  if (!product)
    return (
      <>
        <Navbar />
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <div className="rounded-lg bg-red-50 p-6 text-center dark:bg-red-900/10">
            <p className="text-lg font-medium text-red-600 dark:text-red-400">
              Nie znaleziono produktu
            </p>
          </div>
        </div>
      </>
    )

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-neutral-800">
            <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
              {/* Image Section */}
              <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-700">
                <img
                  src={`http://localhost:8080/uploads/products/${product.image}`}
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              {/* Product Info Section */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Header */}
                  <div className="border-b border-gray-200 pb-6 dark:border-neutral-700">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {product.name}
                    </h1>
                    <p className="mt-4 text-3xl font-semibold tracking-tight text-blue-600 dark:text-blue-400">
                      {product.price.toLocaleString("pl-PL")} zł
                    </p>
                  </div>

                  {/* Description */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Opis</h2>
                    <p className="mt-4 text-lg leading-relaxed whitespace-pre-line text-gray-600 dark:text-gray-300">
                      {product.description}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Szczegóły
                    </h2>
                    <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-gray-50 p-4 dark:bg-neutral-700">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Kategoria
                        </dt>
                        <dd className="mt-1 text-lg font-medium text-gray-900 dark:text-white">
                          {product.category.name}
                        </dd>
                      </div>
                      <div className="flex flex-col gap-4 rounded-lg bg-gray-50 p-4 dark:bg-neutral-700">
                        <button
                          onClick={handleAddToCart}
                          disabled={product.stock === 0}
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 p-4 text-lg font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-neutral-800"
                        >
                          <ShoppingCart className="h-5 w-5" />
                          {product.stock === 0 ? "Brak w magazynie" : "Dodaj do koszyka"}
                        </button>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
