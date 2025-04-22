import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {Cpu, Settings, ShoppingCart} from "lucide-react";
import {DarkModeSwitch} from "@/components/DarkModeSwitch.tsx";
import {MainLogo} from "@/components/MainLogo.tsx";

const parts = [
    {title: "Procesor", href: "/czesci/procesory"},
    {title: "Karta Graficzna", href: "/czesci/karty-graficzne"},
    {title: "Płyta Główna", href: "/czesci/plyty-glowne"},
    {title: "Pamięć RAM", href: "/czesci/ram"},
    {title: "Dysk SSD", href: "/czesci/dyski"},
];

export const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 z-10 relative">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">

                <MainLogo/>

                {/* Menu */}
                <NavigationMenu>
                    <NavigationMenuList>
                        {/* Części */}
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

                        {/* Ustawienia */}
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                <Settings className="w-5 h-5 text-neutral-700 dark:text-neutral-200"/>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-60 gap-3 p-4">
                                    <li>
                                        <NavigationMenuLink>
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

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    <DarkModeSwitch/>
                    <a
                        href="/logowanie"
                        className="text-sm font-medium text-neutral-800 dark:text-neutral-300 px-4 py-2 rounded-lg transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-800"
                    >
                        Logowanie
                    </a>
                    <a
                        href="/rejestracja"
                        className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-lg shadow-sm"
                    >
                        Rejestracja
                    </a>
                </div>
            </div>
        </nav>
    );
};