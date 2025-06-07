import { Headphones, Heart, Menu, Moon, Search, ShoppingCart, Sun, User, X, LogOut } from "lucide-react";
import { useState } from "react";
import { MainLogo } from "@/components/MainLogo";
import clsx from "clsx";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useUser } from "@/contexts/UserContext";

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const {enabled: darkMode, setEnabled: setDarkMode} = useDarkMode();
    const { user, isLoggedIn, setUser } = useUser();

    const handleLogout = () => {
        setUser(null);
        setAccountMenuOpen(false);
    };

    console.log(user);
    return (
        <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 z-10 relative">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                {/* Left: Logo */}
                <div className="flex items-center">
                    <a href="/">
                        <MainLogo/>
                    </a>
                </div>

                {/* Center: Searchbar (desktop only) */}
                <div className="hidden md:flex flex-1 px-4">
                    <div className="relative w-full max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Szukaj produktów..."
                            className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500 dark:text-neutral-400"/>
                    </div>
                </div>

                {/* Right: Icons (desktop) or burger */}
                <div className="flex items-center gap-4 text-neutral-800 dark:text-neutral-200">
                    <div
                        className="hidden md:flex items-center *:hover:bg-neutral-200 dark:*:hover:bg-neutral-700 *:rounded *:p-2">
                        {/* Moje konto z rozwijanym menu */}
                        <div className="relative">
                            <button
                                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                                className="flex items-center gap-2"
                            >
                                <User className="h-5 text-green-500"/>
                                {isLoggedIn ? user?.name : "Moje konto"}
                            </button>

                            {accountMenuOpen && (
                                <div
                                    className="absolute left-0 mt-2 bg-white dark:bg-neutral-900 shadow-md rounded-lg w-48">
                                    {isLoggedIn ? (
                                        <>
                                            <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200 dark:border-gray-700">
                                                {user?.email}
                                            </div>
                                            <a
                                                href="/profil"
                                                className="block px-4 py-2 text-black dark:text-neutral-200 hover:bg-blue-100"
                                                onClick={() => setAccountMenuOpen(false)}
                                            >
                                                Mój profil
                                            </a>
                                            <a
                                                href="/zamowienia"
                                                className="block px-4 py-2 text-black dark:text-neutral-200 hover:bg-blue-100"
                                                onClick={() => setAccountMenuOpen(false)}
                                            >
                                                Zamówienia
                                            </a>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                Wyloguj się
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <a
                                                href="/logowanie"
                                                className="block px-4 py-2 text-black dark:text-neutral-200 hover:bg-blue-100"
                                                onClick={() => setAccountMenuOpen(false)}
                                            >
                                                Logowanie
                                            </a>
                                            <a
                                                href="/rejestracja"
                                                className="block px-4 py-2 text-black dark:text-neutral-200 hover:bg-blue-100"
                                                onClick={() => setAccountMenuOpen(false)}
                                            >
                                                Rejestracja
                                            </a>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <a href="/pomoc" title="Pomoc">
                            <Headphones className="h-5 text-green-500"/>
                        </a>
                        <a href="/ulubione" title="Ulubione">
                            <Heart className="h-5 text-green-500"/>
                        </a>
                        <a href="/koszyk" title="Koszyk">
                            <ShoppingCart className="h-5 text-green-500"/>
                        </a>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            title="Tryb ciemny"
                        >
                            {darkMode ? <Sun className="h-5 text-yellow-500"/> :
                                <Moon className="h-5 text-yellow-500"/>}
                        </button>
                    </div>

                    {/* Mobile burger */}
                    <button className="md:hidden p-2" onClick={() => setMobileOpen(true)}>
                        <Menu className="w-6 h-6"/>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={clsx(
                    "fixed inset-0 z-50 transition-all",
                    mobileOpen ? "visible" : "invisible pointer-events-none"
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
                        "absolute right-0 top-0 h-full w-72 bg-white dark:bg-neutral-900 p-4 shadow-lg transform transition-transform",
                        mobileOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    {/* Close */}
                    <div className="flex justify-end">
                        <button onClick={() => setMobileOpen(false)}>
                            <X className="w-6 h-6"/>
                        </button>
                    </div>

                    {/* Dark mode toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center gap-2 text-sm py-2 hover:text-blue-600"
                    >
                        {darkMode ? <Sun size={16}/> : <Moon size={16}/>}
                        {darkMode ? "Tryb jasny" : "Tryb ciemny"}
                    </button>

                    {/* Searchbar */}
                    <div className="mt-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Szukaj produktów..."
                                className="w-full rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search
                                className="absolute right-3 top-2.5 w-4 h-4 text-neutral-500 dark:text-neutral-400"/>
                        </div>
                    </div>

                    {/* Menu items */}
                    <nav className="mt-6 flex flex-col gap-4 text-sm">
                        <div className="relative">
                            {isLoggedIn ? (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        <User size={16}/>
                                        <span className="font-medium">{user?.name}</span>
                                    </div>
                                    <div className="text-sm text-gray-500 mb-4">{user?.email}</div>
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
                                        onClick={() => {
                                            handleLogout();
                                            setMobileOpen(false);
                                        }}
                                        className="flex items-center gap-2 text-red-600 py-2"
                                    >
                                        <LogOut size={16}/>
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

                        <a href="/pomoc" className="flex items-center gap-2 hover:text-blue-600"
                           onClick={() => setMobileOpen(false)}>
                            <Headphones size={16}/> Pomoc
                        </a>
                        <a href="/ulubione" className="flex items-center gap-2 hover:text-blue-600"
                           onClick={() => setMobileOpen(false)}>
                            <Heart size={16}/> Ulubione
                        </a>
                        <a href="/koszyk" className="flex items-center gap-2 hover:text-blue-600"
                           onClick={() => setMobileOpen(false)}>
                            <ShoppingCart size={16}/> Koszyk
                        </a>
                    </nav>
                </div>
            </div>
        </nav>
    );
};