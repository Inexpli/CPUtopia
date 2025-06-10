import {
  Headphones,
  Heart,
  Menu,
  Moon,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
  LogOut
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainLogo } from "@/components/layout/MainLogo"
import clsx from "clsx"
import { useDarkMode } from "@/hooks/useDarkMode"
import { useUser } from "@/contexts/UserContext"
import { useLogout } from "@/hooks/auth/useLogout"
import { useCart } from "@/contexts/CartContext"
import { useProductSearch } from "@/hooks/useProductSearch"
import { useQueryClient } from "@tanstack/react-query"

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const { enabled: darkMode, setEnabled: setDarkMode } = useDarkMode()
  const { user, isLoggedIn } = useUser()
  const { items } = useCart()
  const logout = useLogout()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { searchQuery, setSearchQuery, searchResults } = useProductSearch()

  const handleLogout = async () => {
    try {
      await logout.mutateAsync()
      setAccountMenuOpen(false)
      // Invalidate all queries to force a fresh state
      await queryClient.invalidateQueries()
      // Reset the query client to clear all cache
      queryClient.resetQueries()
      // Navigate to home page
      navigate("/", { replace: true })
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleSearchSelect = (productId: number) => {
    setSearchQuery("")
    navigate(`/product/${productId}`)
  }

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="mr-2 rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:hidden dark:text-gray-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
            >
              <Menu className="h-6 w-6" />
            </button>
            <MainLogo />
          </div>

          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="relative w-full max-w-lg">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Szukaj produktów..."
              />
              {searchResults.length > 0 && (
                <div className="absolute mt-2 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                  {searchResults.map(product => (
                    <button
                      key={product.id}
                      onClick={() => handleSearchSelect(product.id)}
                      className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                      <img
                        src={`http://localhost:8080/uploads/products/${product.image}`}
                        alt={product.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {product.price} zł
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={() => navigate("/pomoc")}
              className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:block dark:text-gray-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
            >
              <Headphones className="h-5 w-5" />
            </button>

            <button
              onClick={() => navigate("/ulubione")}
              className="hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:block dark:text-gray-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
            >
              <Heart className="h-5 w-5" />
            </button>

            <button
              onClick={() => navigate("/basket")}
              className="relative hidden rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none lg:block dark:text-gray-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
              >
                <User className="h-5 w-5" />
                {isLoggedIn && (
                  <span className="ml-2 hidden text-sm font-medium text-gray-900 lg:block dark:text-white">
                    {user?.name}
                  </span>
                )}
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white py-2 shadow-xl dark:bg-neutral-800">
                  {isLoggedIn ? (
                    <>
                      <a
                        href="/profil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Mój profil
                      </a>
                      <a
                        href="/zamowienia"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Zamówienia
                      </a>
                      {user?.email === "admin@cputopia.pl" && (
                        <a
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                          onClick={() => setAccountMenuOpen(false)}
                        >
                          Panel admina
                        </a>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-neutral-700"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Wyloguj się
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Zaloguj się
                      </a>
                      <a
                        href="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Zarejestruj się
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={clsx(
            "bg-opacity-50 fixed inset-0 z-50 transform bg-gray-900 transition-opacity lg:hidden",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={clsx(
            "fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto bg-white px-6 py-4 transition duration-200 ease-in-out lg:hidden dark:bg-neutral-900",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <MainLogo />
            <button
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative mb-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Szukaj produktów..."
            />
            {searchResults.length > 0 && (
              <div className="absolute mt-2 w-full rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
                {searchResults.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleSearchSelect(product.id)}
                    className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    <img
                      src={`http://localhost:8080/uploads/products/${product.image}`}
                      alt={product.name}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {product.price} zł
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <nav className="flex flex-col space-y-4">
            <a
              href="/pomoc"
              className="flex items-center gap-2 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              <Headphones size={16} /> Pomoc
            </a>
            <a
              href="/ulubione"
              className="flex items-center gap-2 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              <Heart size={16} /> Ulubione
            </a>
            <a
              href="/basket"
              className="flex items-center gap-2 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              <div className="relative">
                <ShoppingCart size={16} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              Koszyk
            </a>
          </nav>
        </div>
      </div>
    </nav>
  )
}
