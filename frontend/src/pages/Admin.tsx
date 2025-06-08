import { Navbar } from "@/components/Navbar";
import { Plus, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import { CategoryModal } from "@/components/admin/CategoryModal";
import { useProducts, Product, ProductCreateData, ProductUpdateData } from "@/hooks/useProducts";
import { ProductModal } from "@/components/admin/ProductModal";

export const Admin = () => {
    const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories');
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<{ id: number; name: string } | null>(null);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const {
        categories,
        isLoading: categoriesLoading,
        addCategory,
        updateCategory,
        deleteCategory,
    } = useCategories();

    const {
        products,
        isLoading: productsLoading,
        addProduct,
        updateProduct,
        deleteProduct,
    } = useProducts();

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

    const handleAddProduct = async (data: ProductCreateData) => {
        try {
            await addProduct.mutateAsync(data);
            setIsProductModalOpen(false);
        } catch (error) {
            console.error('Failed to add product:', error);
        }
        console.log(data);
    };


    const handleUpdateProduct = async (data: ProductUpdateData) => {
        if (!editingProduct) return;
        try {
            await updateProduct.mutateAsync({
                id: editingProduct.id,
                data: data,
            });
            setEditingProduct(null);
        } catch (error) {
            console.error('Failed to update product:', error);
        }
    };

    const handleDeleteProduct = async (id: number) => {
        if (window.confirm('Czy na pewno chcesz usunąć ten produkt?')) {
            try {
                await deleteProduct.mutateAsync(id);
            } catch (error) {
                console.error('Failed to delete product:', error);
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
                            <div>Ładowanie...</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {categories?.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg"
                                    >
                                        <span className="text-gray-900 dark:text-white">{category.name}</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingCategory(category)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-neutral-600 rounded-lg"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteCategory(category.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-neutral-600 rounded-lg"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Products Section */}
                {activeTab === 'products' && (
                    <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Zarządzanie Produktami</h2>
                            <button
                                onClick={() => setIsProductModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                <Plus className="w-4 h-4" />
                                Dodaj Produkt
                            </button>
                        </div>

                        {productsLoading ? (
                            <div>Ładowanie...</div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {products?.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={`/uploads/products/${product.image}`}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                                    {product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {product.price} zł | Stan: {product.stock}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-neutral-600 rounded-lg"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-neutral-600 rounded-lg"
                                            >
                                                <Trash className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Modals */}
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

                <ProductModal
                    isOpen={isProductModalOpen || editingProduct !== null}
                    onClose={() => {
                        setIsProductModalOpen(false);
                        setEditingProduct(null);
                    }}
                    onSubmit={(data) => {
                        if (editingProduct) {
                            handleUpdateProduct(data as ProductUpdateData);
                        } else {
                            handleAddProduct(data as ProductCreateData);
                        }
                    }}
                    initialData={editingProduct || undefined}
                    title={editingProduct ? "Edytuj produkt" : "Dodaj nowy produkt"}
                    isLoading={addProduct.isPending || updateProduct.isPending}
                />
            </div>
        </div>
    );
};
