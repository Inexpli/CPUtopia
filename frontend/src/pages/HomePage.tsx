import { Navbar } from "@/components/Navbar.tsx";
import { MainCarousel } from "@/components/Carousel.tsx";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
}

interface Category {
    id: number;
    name: string;
    icon: string;
}

const featuredProducts: Product[] = [
    {
        id: 1,
        name: "Intel Core i9-13900K",
        price: "2999 zł",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "AMD Ryzen 9 7950X",
        price: "2799 zł",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "NVIDIA RTX 4080",
        price: "4999 zł",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "AMD Radeon RX 7900 XT",
        price: "4599 zł",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
    },
];

const categories: Category[] = [
    { id: 1, name: "Procesory", icon: "🔲" },
    { id: 2, name: "Karty graficzne", icon: "📺" },
    { id: 3, name: "Płyty główne", icon: "🔌" },
    { id: 4, name: "Pamięć RAM", icon: "💾" },
    { id: 5, name: "Dyski", icon: "💿" },
    { id: 6, name: "Zasilacze", icon: "⚡" },
];

export const HomePage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar/>
            <MainCarousel/>
            
            {/* Categories Section */}
            <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Kategorie produktów</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-neutral-50 dark:bg-neutral-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center"
                        >
                            <span className="text-4xl mb-3">{category.icon}</span>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">{category.name}</h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Featured Products Section */}
            <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Polecane produkty</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-neutral-50 dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{product.name}</h3>
                                <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">{product.price}</p>
                                <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors">
                                    Dodaj do koszyka
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-blue-600 dark:bg-blue-800 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Zapisz się do newslettera</h2>
                        <p className="text-lg mb-8">Bądź na bieżąco z najnowszymi promocjami i produktami</p>
                        <div className="max-w-md mx-auto flex gap-4">
                            <input
                                type="email"
                                placeholder="Twój adres email"
                                className="flex-1 px-4 py-2 rounded-lg text-gray-900 dark:text-white bg-neutral-200 dark:bg-neutral-700 dark:placeholder-gray-400"
                            />
                            <button className="px-6 py-2 bg-white dark:bg-neutral-200 text-blue-600 dark:text-blue-800 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-300 transition-colors">
                                Zapisz się
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-neutral-900 dark:bg-neutral-950 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">O nas</h3>
                            <p className="text-gray-400 dark:text-gray-300">
                                CPUtopia to Twoje źródło najlepszych komponentów komputerowych w najlepszych cenach.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
                            <p className="text-gray-400 dark:text-gray-300">Email: kontakt@cputopia.pl</p>
                            <p className="text-gray-400 dark:text-gray-300">Tel: +48 123 456 789</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-4">Śledź nas</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white">Facebook</a>
                                <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white">Instagram</a>
                                <a href="#" className="text-gray-400 dark:text-gray-300 hover:text-white">Twitter</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-neutral-800 text-center text-gray-400 dark:text-gray-300">
                        <p>&copy; 2024 CPUtopia. Wszelkie prawa zastrzeżone.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};