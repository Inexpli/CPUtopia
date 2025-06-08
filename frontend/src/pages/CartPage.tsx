import { Navbar } from "@/components/layout/Navbar"
import { useCart } from "@/contexts/CartContext"
import { Spinner } from "@/components/common/Spinner"
import { QuantityInput } from "@/components/common/QuantityInput"
import { Trash } from "lucide-react"

export const CartPage = () => {
  const { items, isLoading, removeFromCart, clearCart, updateQuantity } = useCart()

  console.log("Cart items:", items)

  const totalAmount = items.reduce((sum, item) => sum + item.total, 0)

  const handleRemoveFromCart = async (productId: number) => {
    try {
      if (typeof productId !== "number" || !Number.isFinite(productId)) {
        console.error("Invalid product ID:", productId)
        return
      }
      console.log("Cart items:", items)
      console.log("Removing product with ID:", productId)
      await removeFromCart(productId)
    } catch (error: unknown) {
      console.error("Failed to remove product from cart:", error)
    }
  }

  const handleUpdateQuantity = async (productId: number, quantity: number) => {
    try {
      if (quantity < 1) {
        await removeFromCart(productId)
        return
      }
      await updateQuantity(productId, quantity)
    } catch (error: unknown) {
      console.error("Failed to update quantity:", error)
    }
  }

  const handleClearCart = async () => {
    try {
      await clearCart()
    } catch (error: unknown) {
      console.error("Failed to clear cart:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900">
        <Navbar />
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">Koszyk</h1>

        {items.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">Twój koszyk jest pusty</p>
        ) : (
          <>
            <div className="mb-8 overflow-hidden rounded-lg bg-neutral-50 shadow dark:bg-neutral-800">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                <thead className="bg-neutral-100 dark:bg-neutral-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Produkt
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Ilość
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Cena
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                    >
                      Suma
                    </th>
                    <th
                      scope="col"
                      className="relative px-6 py-3"
                    >
                      <span className="sr-only">Akcje</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-800">
                  {items.map(item => (
                    <tr key={item.product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={`http://localhost:8080/uploads/products/${item.product.image}`}
                            alt={item.product.name}
                            className="h-16 w-16 rounded-md object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.product.name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                        <QuantityInput
                          value={item.quantity}
                          onChange={quantity => handleUpdateQuantity(item.product.id, quantity)}
                          min={1}
                          max={item.product.stock}
                        />
                      </td>

                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                        {item.product.price} zł
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                        {item.total} zł
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                        <button
                          onClick={() => {
                            console.log("Product ID from item:", item.product.id)
                            handleRemoveFromCart(item.product.id)
                          }}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between">
              <button
                onClick={handleClearCart}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Wyczyść koszyk
              </button>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  Suma: {totalAmount} zł
                </p>
                <button className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                  Przejdź do kasy
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
