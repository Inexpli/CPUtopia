import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu.tsx";
import { DarkModeSwitch } from "@/components/DarkModeSwitch";

export const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3">
                    <img src="https://dcassetcdn.com/design_img/3694363/790572/21993133/f99c8f70yc0wgssmzhtk56h4dr_image.png" className="max-h-8" alt="Logo" />
                    <span className="text-2xl font-semibold dark:text-white">CPUtopia</span>
                </a>

                {/* Hamburger menu button */}
                <button
                    type="button"
                    className="md:hidden p-2 w-10 h-10 text-neutral-500 rounded-lg hover:bg-neutral-100 focus:ring-2 focus:ring-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:ring-neutral-600"
                    aria-controls="navbar-default"
                    aria-expanded="false"
                >
                    <span className="sr-only">Open menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-4" id="navbar-default">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="dark:bg-neutral-900">Części</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <NavigationMenuLink className="w-40 items-center" href="/czesci/procesory">Procesor</NavigationMenuLink>
                                    <NavigationMenuLink className="w-40 items-center" href="/czesci/karty-graficzne">Karta Graficzna</NavigationMenuLink>
                                    <NavigationMenuLink className="w-40 items-center" href="/czesci/plyty-glowne">Płyta Główna</NavigationMenuLink>
                                    <NavigationMenuLink className="w-40 items-center" href="/czesci/ram">Pamięć RAM</NavigationMenuLink>
                                    <NavigationMenuLink className="w-40 items-center" href="/czesci/dyski">Dysk SSD</NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/pomoc" className="text-sm px-4 py-2">Pomoc</NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink href="/logowanie" className="text-sm px-4 py-2">Logowanie</NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>

                    <DarkModeSwitch />
                </div>
            </div>
        </nav>
    );
};
