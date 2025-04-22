import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.tsx";
import {DarkModeSwitch} from "@/components/DarkModeSwitch";

export const Navbar = () => {
    const baseLinkClasses =
        "text-sm font-medium text-neutral-700 dark:text-neutral-300 transition-colors";

    return (
        <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 relative z-10">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
                {/* Left - Logo */}
                <a href="/" className="flex items-center space-x-3 z-10">
                    <img
                        src="https://dcassetcdn.com/design_img/3694363/790572/21993133/f99c8f70yc0wgssmzhtk56h4dr_image.png"
                        className="max-h-8"
                        alt="Logo"
                    />
                    <span className="text-2xl font-semibold dark:text-white">
            CPUtopia
          </span>
                </a>

                {/* Center - Części */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="dark:bg-neutral-900 text-sm font-medium">
                                    Części
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    {[
                                        {name: "Procesor", path: "/czesci/procesory"},
                                        {name: "Karta Graficzna", path: "/czesci/karty-graficzne"},
                                        {name: "Płyta Główna", path: "/czesci/plyty-glowne"},
                                        {name: "Pamięć RAM", path: "/czesci/ram"},
                                        {name: "Dysk SSD", path: "/czesci/dyski"},
                                    ].map((item) => (
                                        <NavigationMenuLink
                                            key={item.path}
                                            className={baseLinkClasses + " w-40 px-4 py-2 block"}
                                            href={item.path}
                                        >
                                            {item.name}
                                        </NavigationMenuLink>
                                    ))}
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right - Auth + Ustawienia */}
                <div className="flex items-center space-x-4 z-10">
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

                    {/* Ustawienia */}
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="dark:bg-neutral-900 text-sm font-medium">
                                    Ustawienia
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="px-4 py-2 space-y-2 w-40">
                                        <DarkModeSwitch/>
                                        <a
                                            href="/koszyk"
                                            className={baseLinkClasses + " block hover:underline"}
                                        >
                                            Koszyk
                                        </a>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
        </nav>
    );
};
