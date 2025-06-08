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
  LogOut,
  Cpu
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MainLogo } from "@/components/layout/MainLogo"
import clsx from "clsx"
import { useDarkMode } from "@/hooks/theme/useDarkMode"
import { useUser } from "@/contexts/UserContext"
import { useLogout } from "@/hooks/auth/useLogout"

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [accountMenuOpen, setAccountMenuOpen] = useState(false)
  const { enabled: darkMode, setEnabled: setDarkMode } = useDarkMode()
  const { user, isLoggedIn } = useUser()
  const logout = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout.mutateAsync()
    setAccountMenuOpen(false)
    window.location.reload()
    navigate("/")
  }

  return (
    <nav className="relative z-10 border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <MainLogo />
          <a
            href="/pc-parts"
            className="hidden items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 md:flex dark:text-gray-200 dark:hover:text-blue-400"
          >
            <Cpu className="h-5 w-5" />
            Części komputerowe
          </a>
        </div>

        {/* Center: Searchbar (desktop only) */}
        <div className="hidden flex-1 px-4 md:flex">
          <div className="relative mx-auto w-full max-w-md">
            <input
              type="text"
              placeholder="Szukaj produktów..."
              className="w-full rounded-md border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm text-neutral-800 placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400"
            />
            <Search className="absolute top-2.5 right-3 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          </div>
        </div>

        {/* Right: Icons (desktop) or burger */}
        <div className="flex items-center gap-4 text-neutral-800 dark:text-neutral-200">
          <div className="hidden items-center *:rounded *:p-2 *:hover:bg-neutral-200 md:flex dark:*:hover:bg-neutral-700">
            {/* Moje konto z rozwijanym menu */}
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="flex items-center gap-2"
              >
                <User className="h-5 text-green-500" />
                {isLoggedIn ? user?.name : "Moje konto"}
              </button>

              {accountMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-md dark:bg-neutral-900">
                  {isLoggedIn ? (
                    <>
                      <div className="border-b border-gray-200 px-4 py-2 text-sm text-gray-500 dark:border-gray-700">
                        {user?.email}
                      </div>
                      <a
                        href="/profil"
                        className="block px-4 py-2 text-black hover:bg-blue-100 dark:text-neutral-200"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Mój profil
                      </a>
                      <a
                        href="/zamowienia"
                        className="block px-4 py-2 text-black hover:bg-blue-100 dark:text-neutral-200"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Zamówienia
                      </a>
                      <button
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-red-600 hover:rounded-b-lg hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Wyloguj się
                      </button>
                    </>
                  ) : (
                    <>
                      <a
                        href="/logowanie"
                        className="block px-4 py-2 text-black hover:bg-blue-100 dark:text-neutral-200"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Logowanie
                      </a>
                      <a
                        href="/rejestracja"
                        className="block px-4 py-2 text-black hover:bg-blue-100 dark:text-neutral-200"
                        onClick={() => setAccountMenuOpen(false)}
                      >
                        Rejestracja
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>

            <a
              href="/pomoc"
              title="Pomoc"
            >
              <Headphones className="h-5 text-green-500" />
            </a>
            <a
              href="/ulubione"
              title="Ulubione"
            >
              <Heart className="h-5 text-green-500" />
            </a>
            <a
              href="/koszyk"
              title="Koszyk"
            >
              <ShoppingCart className="h-5 text-green-500" />
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Tryb ciemny"
            >
              {darkMode ? (
                <Sun className="h-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 text-yellow-500" />
              )}
            </button>
          </div>

          {/* Mobile burger */}
          <button
            className="p-2 md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "fixed inset-0 z-50 transition-all",
          mobileOpen ? "visible" : "pointer-events-none invisible"
        )}
      >
        {/* Background */}
        <div
          className={clsx(
            "absolute inset-0 bg-black/50 transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={clsx(
            "absolute top-0 right-0 h-full w-72 transform bg-white p-4 shadow-lg transition-transform dark:bg-neutral-900",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Close */}
          <div className="flex justify-end">
            <button onClick={() => setMobileOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-2 py-2 text-sm hover:text-blue-600"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Tryb jasny" : "Tryb ciemny"}
          </button>

          {/* Searchbar */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Szukaj produktów..."
                className="w-full rounded-full border border-neutral-300 bg-neutral-100 px-4 py-2 text-sm text-neutral-800 placeholder:text-neutral-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400"
              />
              <Search className="absolute top-2.5 right-3 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
            </div>
          </div>

          {/* Menu items */}
          <nav className="mt-6 flex flex-col gap-4 text-sm">
            <a
              href="/pc-parts"
              className="flex items-center gap-2 py-2 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              <Cpu size={16} />
              Części komputerowe
            </a>

            <div className="relative">
              {isLoggedIn ? (
                <>
                  <div className="mb-2 flex items-center gap-2">
                    <User size={16} />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <div className="mb-4 text-sm text-gray-500">{user?.email}</div>
                  <a
                    href="/profil"
                    className="block py-2 hover:text-blue-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    Mój profil
                  </a>
                  <a
                    href="/zamowienia"
                    className="block py-2 hover:text-blue-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    Zamówienia
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 py-2 text-red-600"
                  >
                    <LogOut size={16} />
                    Wyloguj się
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/logowanie"
                    className="block py-2 hover:text-blue-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    Logowanie
                  </a>
                  <a
                    href="/rejestracja"
                    className="block py-2 hover:text-blue-600"
                    onClick={() => setMobileOpen(false)}
                  >
                    Rejestracja
                  </a>
                </>
              )}
            </div>

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
              href="/koszyk"
              className="flex items-center gap-2 hover:text-blue-600"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingCart size={16} /> Koszyk
            </a>
          </nav>
        </div>
      </div>
    </nav>
  )
}
