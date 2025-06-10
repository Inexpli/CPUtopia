import { Navbar } from "@/components/layout/Navbar"
import { MainCarousel } from "@/components/home/Carousel"
import { useNavigate } from "react-router-dom"
import { useProducts } from "@/hooks/useProducts"
import { useCategories } from "@/hooks/useCategories"
import { Category } from "@/types/category"
import { Spinner } from "@/components/common/Spinner"
import { useCart } from "@/contexts/CartContext"

export const HomePage = () => {
  const navigate = useNavigate()
  const { products, isLoading: productsLoading } = useProducts()
  const { categories: apiCategories, isLoading: categoriesLoading } = useCategories()
  const { addToCart } = useCart()

  const desiredCategoryIds = [14, 31, 33, 35, 32, 21]
  const categories = apiCategories
    ? desiredCategoryIds
        .map(id => apiCategories.find(cat => cat.id === id))
        .filter((cat): cat is Category => cat !== undefined)
    : []

  const handleCategoryClick = (categoryId: number) => {
    if (categoryId === 1) {
      navigate("/pc-parts")
    } else {
      navigate(`/pc-parts?category=${categoryId}`)
    }
  }

  const handleAddToCart = async (productId: number) => {
    try {
      await addToCart(productId)
    } catch (error: unknown) {
      console.error("Failed to add product to cart:", error)
    }
  }

  const featuredProducts = products
    ? products
        .sort((a, b) => b.stock - a.stock)
        .slice(0, 4)
        .map(product => ({
          id: product.id,
          name: product.name,
          price: `${product.price} zł`,
          image: `http://localhost:8080/uploads/products/${product.image}`
        }))
    : []

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <MainCarousel />

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          🔥Najgorętsze produkty🔥
        </h2>
        {categoriesLoading ? (
          <div className="py-8">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category: Category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex cursor-pointer flex-col items-center rounded-lg bg-neutral-50 p-6 shadow-sm transition-shadow hover:shadow-md dark:bg-neutral-800"
              >
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
          🔍Polecane produkty🔍
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {productsLoading ? (
            <div className="col-span-4 py-8">
              <Spinner />
            </div>
          ) : (
            featuredProducts.map(product => (
              <div
                key={product.id}
                className="overflow-hidden rounded-lg bg-neutral-50 shadow-sm transition-shadow hover:shadow-md dark:bg-neutral-800"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-xl font-bold text-blue-600 dark:text-blue-400">
                    {product.price}
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
      </section>

      {/* Newsletter Section */}
      <section className="bg-blue-600 py-16 text-white dark:bg-blue-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="mb-4 text-3xl font-bold">Zapisz się do newslettera</h2>
            <p className="mb-8 text-lg">Bądź na bieżąco z najnowszymi promocjami i produktami</p>
            <div className="mx-auto flex max-w-md gap-4">
              <input
                type="email"
                placeholder="Twój adres email"
                className="flex-1 rounded-lg bg-neutral-200 px-4 py-2 text-gray-900 dark:bg-neutral-700 dark:text-white dark:placeholder-gray-400"
              />
              <button className="rounded-lg bg-white px-6 py-2 font-semibold text-blue-600 transition-colors hover:bg-gray-100 dark:bg-neutral-200 dark:text-blue-800 dark:hover:bg-neutral-300">
                Zapisz się
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 py-12 text-white dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 text-xl font-bold">O nas</h3>
              <p className="text-gray-400 dark:text-gray-300">
                CPUtopia to Twoje źródło najlepszych komponentów komputerowych w najlepszych cenach.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold">Kontakt</h3>
              <p className="text-gray-400 dark:text-gray-300">Email: kontakt@cputopia.pl</p>
              <p className="text-gray-400 dark:text-gray-300">Tel: +48 123 456 789</p>
            </div>
            <div>
              <h3 className="mb-4 text-xl font-bold">Śledź nas</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white dark:text-gray-300"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white dark:text-gray-300"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white dark:text-gray-300"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-800 pt-8 text-center text-gray-400 dark:text-gray-300">
            <p>&copy; 2024 CPUtopia. Wszelkie prawa zastrzeżone.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
