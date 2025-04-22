import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {Cpu, Menu, Settings, ShoppingCart, X} from "lucide-react";
import {DarkModeSwitch} from "@/components/DarkModeSwitch.tsx";
import {MainLogo} from "@/components/MainLogo.tsx";
import {useState} from "react";
import clsx from "clsx";

const parts = [
    {title: "Procesor", href: "/czesci/procesory"},
    {title: "Karta Graficzna", href: "/czesci/karty-graficzne"},
    {title: "Płyta Główna", href: "/czesci/plyty-glowne"},
    {title: "Pamięć RAM", href: "/czesci/ram"},
    {title: "Dysk SSD", href: "/czesci/dyski"},
];

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 z-10 relative">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Left side: Logo + Desktop Menu */}
                <div className="flex items-center gap-6">
                    <MainLogo/>
                </div>
                <div className="flex items-center gap-6">
                    {/* Desktop menu */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        <Cpu className="w-5 h-5 text-neutral-700 dark:text-neutral-200"/>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-48 gap-2 p-4">
                                            {parts.map((part) => (
                                                <li key={part.title}>
                                                    <NavigationMenuLink asChild>
                                                        <a
                                                            href={part.href}
                                                            className="block rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground"
                                                        >
                                                            {part.title}
                                                        </a>
                                                    </NavigationMenuLink>
                                                </li>
                                            ))}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    {/* Ustawienia */}
                    <div className="hidden md:block">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="p-2">
                                        <Settings className="w-5 h-5 text-neutral-700 dark:text-neutral-200"/>
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent className="right-0 left-auto">
                                        <ul className="grid w-60 gap-3 p-4">
                                            <li>
                                                <NavigationMenuLink asChild>
                                                    <a
                                                        href="/koszyk"
                                                        className="flex items-center gap-2 rounded-md p-2 text-sm hover:bg-accent hover:text-accent-foreground"
                                                    >
                                                        <ShoppingCart size={16}/>
                                                        Koszyk
                                                    </a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </div>
                {/* Right side */}
                <div className="flex items-center gap-3">
                    <DarkModeSwitch/>
                    <a
                        href="/logowanie"
                        className="hidden md:block text-sm font-medium text-neutral-800 dark:text-neutral-300 px-4 py-2 rounded-lg transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    >
                        Logowanie
                    </a>
                    <a
                        href="/rejestracja"
                        className="hidden md:block text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg shadow-sm"
                    >
                        Rejestracja
                    </a>


                    {/* Mobile burger */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileOpen(true)}
                    >
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
                {/* Background overlay */}
                <div
                    className={clsx(
                        "absolute inset-0 bg-black/50 transition-opacity",
                        mobileOpen ? "opacity-100" : "opacity-0"
                    )}
                    onClick={() => setMobileOpen(false)}
                />

                {/* Slide-in panel */}
                <div
                    className={clsx(
                        "absolute right-0 top-0 h-full w-64 bg-white dark:bg-neutral-900 p-4 shadow-lg transform transition-transform",
                        mobileOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="flex justify-end">
                        <button onClick={() => setMobileOpen(false)}>
                            <X className="w-6 h-6"/>
                        </button>
                    </div>
                    <nav className="mt-6 flex flex-col gap-4 text-sm">
                        {parts.map((part) => (
                            <a
                                key={part.title}
                                href={part.href}
                                className="hover:text-blue-600"
                                onClick={() => setMobileOpen(false)}
                            >
                                {part.title}
                            </a>
                        ))}
                        <a
                            href="/koszyk"
                            className="flex items-center gap-2 hover:text-blue-600"
                            onClick={() => setMobileOpen(false)}
                        >
                            <ShoppingCart size={16}/> Koszyk
                        </a>
                        <a
                            href="/logowanie"
                            className="hover:text-blue-600"
                            onClick={() => setMobileOpen(false)}
                        >
                            Logowanie
                        </a>
                        <a
                            href="/rejestracja"
                            className="hover:text-blue-600"
                            onClick={() => setMobileOpen(false)}
                        >
                            Rejestracja
                        </a>
                    </nav>
                </div>
            </div>
        </nav>
    );
};
