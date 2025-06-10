import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { API_ENDPOINTS } from "@/config/api"

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

  if (isLoading) return <div className="flex justify-center p-8">Ładowanie...</div>
  if (error)
    return (
      <div className="p-8 text-center text-red-600">
        Nie udało się załadować produktu: {(error as Error)?.message || "Nieznany błąd"}
      </div>
    )
  if (!product) return <div className="p-8 text-center text-red-600">Nie znaleziono produktu</div>

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-lg">
          <img
            src={`http://localhost:8080/uploads/products/${product.image}`}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product.name}</h1>
          <p className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            {product.price} zł
          </p>
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Opis</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{product.description}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Szczegóły</h2>
            <dl className="mt-2 space-y-2">
              <div>
                <dt className="inline font-medium text-gray-700 dark:text-gray-300">Kategoria:</dt>
                <dd className="ml-2 inline text-gray-700 dark:text-gray-300">
                  {product.category.name}
                </dd>
              </div>
              <div>
                <dt className="inline font-medium text-gray-700 dark:text-gray-300">
                  Stan magazynowy:
                </dt>
                <dd className="ml-2 inline text-gray-700 dark:text-gray-300">{product.stock}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
