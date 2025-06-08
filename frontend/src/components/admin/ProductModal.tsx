import { FormInput } from "@/components/ui/form-input";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import { useCategories } from "@/hooks/useCategories";
import { ProductCreateData, ProductUpdateData } from "@/hooks/useProducts";

const productSchema = z.object({
    name: z.string().min(1, "Nazwa jest wymagana"),
    description: z.string().min(1, "Opis jest wymagany"),
    price: z.string().min(1, "Cena jest wymagana").regex(/^\d+(\.\d{1,2})?$/, "Nieprawidłowy format ceny"),
    stock: z.coerce.number().min(0, "Stan magazynowy nie może być ujemny"),
    category_id: z.coerce.number().min(1, "Kategoria jest wymagana"),
    image: z.any()
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProductCreateData | ProductUpdateData) => void;
    initialData?: {
        name: string;
        description: string;
        price: string;
        stock: number;
        category_id: number;
    };
    title: string;
    isLoading: boolean;
}

export const ProductModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title,
    isLoading,
}: ProductModalProps) => {
    const { categories } = useCategories();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ? {
            ...initialData,
            category_id: initialData.category_id,
            stock: initialData.stock,
        } : undefined,
    });

    useEffect(() => {
        if (initialData) {
            reset({
                ...initialData,
                category_id: initialData.category_id,
                stock: initialData.stock,
            });
        }
    }, [initialData, reset]);

    if (!isOpen) return null;



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>

                <form
                    onSubmit={handleSubmit((data) => {
                      onSubmit(data);
                    })}
                    className="space-y-4"
                >
                    <FormInput
                        label="Nazwa produktu"
                        type="text"
                        id="name"
                        error={errors.name?.message}
                        {...register("name")}
                    />

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Opis produktu
                        </label>
                        <textarea
                            id="description"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                            rows={3}
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                    </div>

                    <FormInput
                        label="Cena"
                        type="text"
                        id="price"
                        error={errors.price?.message}
                        {...register("price")}
                    />

                    <FormInput
                        label="Stan magazynowy"
                        type="number"
                        id="stock"
                        error={errors.stock?.message}
                        {...register("stock")}
                    />

                    <div>
                        <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Kategoria
                        </label>
                        <select
                            id="category_id"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-700 dark:border-neutral-600 dark:text-white"
                            {...register("category_id")}
                        >
                            <option value="">Wybierz kategorię</option>
                            {categories?.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>
                        )}
                    </div>

                    <FormInput
                        label="Zdjęcie produktu"
                        type="file"
                        id="image"
                        accept="image/*"
                        error={errors.image?.message?.toString()}
                        {...register("image")}
                    />

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg"
                        >
                            Anuluj
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
                        >
                            {isLoading ? "Zapisywanie..." : "Zapisz"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}; 