import { FormInput } from "@/components/ui/form-input";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const categorySchema = z.object({
    name: z.string().min(1, "Nazwa jest wymagana"),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CategoryFormData) => void;
    initialData?: {
        name: string;
    };
    title: string;
    isLoading: boolean;
}

export const CategoryModal = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    title,
    isLoading,
}: CategoryModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData,
    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
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
                        reset();
                    })}
                    className="space-y-4"
                >
                    <FormInput
                        label="Nazwa kategorii"
                        type="text"
                        id="name"
                        error={errors.name?.message}
                        {...register("name")}
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