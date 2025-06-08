import { Navbar } from "@/components/Navbar";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { CategoryModal } from "@/components/admin/CategoryModal";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    categoryId: number;
}

// Temporary mock data for products until we implement their functionality
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Intel Core i9-13900K",
        price: "2999 zł",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
        categoryId: 1,
    },
    {
        id: 2,
        name: "NVIDIA RTX 4080",
        price: "4999 zł",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
        categoryId: 2,
    },
];

export const Admin = () => {
    const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<{ id: number; name: string } | null>(null);

    const {
        categories,
        isLoading: categoriesLoading,
        addCategory,
        updateCategory,
        deleteCategory,
    } = useCategories();

    const handleAddCategory = async (data: { name: string }) => {
        try {
            await addCategory.mutateAsync(data);
            setIsCategoryModalOpen(false);
        } catch (error) {
            console.error('Failed to add category:', error);
        }
    };

    const handleUpdateCategory = async (data: { name: string }) => {
        if (!editingCategory) return;
        try {
            await updateCategory.mutateAsync({
                id: editingCategory.id,
                data: data,
            });
            setEditingCategory(null);
        } catch (error) {
            console.error('Failed to update category:', error);
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (window.confirm('Czy na pewno chcesz usunąć tę kategorię?')) {
            try {
                await deleteCategory.mutateAsync(id);
            } catch (error) {
                console.error('Failed to delete category:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <Navbar />
            
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Panel Administracyjny</h1>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab('categories')}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'categories'
                                ? 'bg-blue-600 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-gray-900 dark:text-white'
                        }`}
                    >
                        Kategorie
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'products'
                                ? 'bg-blue-600 text-white'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-gray-900 dark:text-white'
                        }`}
                    >
                        Produkty
                    </button>
                </div>

                {/* Categories Section */}
                {activeTab === 'categories' && (
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Zarządzanie Kategoriami</h2>
                            <button
                                onClick={() => setIsCategoryModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                <Plus className="w-4 h-4" />
                                Dodaj Kategorię
                            </button>
                        </div>
                        
                        {categoriesLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                            <th className="text-left py-3 px-4">ID</th>
                                            <th className="text-left py-3 px-4">Nazwa</th>
                                            <th className="text-right py-3 px-4">Akcje</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.map((category) => (
                                            <tr key={category.id} className="border-b border-neutral-200 dark:border-neutral-700">
                                                <td className="py-3 px-4">{category.id}</td>
                                                <td className="py-3 px-4">{category.name}</td>
                                                <td className="py-3 px-4 text-right">
                                                    <button
                                                        onClick={() => setEditingCategory(category)}
                                                        className="text-blue-600 hover:text-blue-700 p-2"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCategory(category.id)}
                                                        className="text-red-600 hover:text-red-700 p-2"
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Products Section */}
                {activeTab === 'products' && (
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Zarządzanie Produktami</h2>
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                <Plus className="w-4 h-4" />
                                Dodaj Produkt
                            </button>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-neutral-200 dark:border-neutral-700">
                                        <th className="text-left py-3 px-4">ID</th>
                                        <th className="text-left py-3 px-4">Zdjęcie</th>
                                        <th className="text-left py-3 px-4">Nazwa</th>
                                        <th className="text-left py-3 px-4">Cena</th>
                                        <th className="text-left py-3 px-4">Kategoria</th>
                                        <th className="text-right py-3 px-4">Akcje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockProducts.map((product) => (
                                        <tr key={product.id} className="border-b border-neutral-200 dark:border-neutral-700">
                                            <td className="py-3 px-4">{product.id}</td>
                                            <td className="py-3 px-4">
                                                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                            </td>
                                            <td className="py-3 px-4">{product.name}</td>
                                            <td className="py-3 px-4">{product.price}</td>
                                            <td className="py-3 px-4">
                                                {categories?.find(c => c.id === product.categoryId)?.name}
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <button className="text-blue-600 hover:text-blue-700 p-2">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button className="text-red-600 hover:text-red-700 p-2">
                                                    <Trash className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {/* Category Modal */}
            <CategoryModal
                isOpen={isCategoryModalOpen || editingCategory !== null}
                onClose={() => {
                    setIsCategoryModalOpen(false);
                    setEditingCategory(null);
                }}
                onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
                initialData={editingCategory || undefined}
                title={editingCategory ? "Edytuj kategorię" : "Dodaj nową kategorię"}
                isLoading={addCategory.isPending || updateCategory.isPending}
            />
        </div>
    );
};
