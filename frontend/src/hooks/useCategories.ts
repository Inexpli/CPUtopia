import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { API_ENDPOINTS } from "@/config/api";

interface Category {
    id: number;
    name: string;
    icon: string;
}

interface CategoryCreateData {
    name: string;
}

interface CategoryUpdateData {
    name: string;
}

export const useCategories = () => {
    const queryClient = useQueryClient();

    // Fetch categories
    const { data: categories, isLoading, error } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await axios.get(API_ENDPOINTS.category.get, {
                withCredentials: true
            });
            return response.data;
        },
    });

    // Add category
    const addCategory = useMutation({
        mutationFn: async (data: CategoryCreateData) => {
            const response = await axios.post(API_ENDPOINTS.category.add, data, {
                withCredentials: true
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    // Update category
    const updateCategory = useMutation({
        mutationFn: async ({ id, data }: { id: number; data: CategoryUpdateData }) => {
            const response = await axios.put(
                API_ENDPOINTS.category.update.replace('{id}', id.toString()),
                data,
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    // Delete category
    const deleteCategory = useMutation({
        mutationFn: async (id: number) => {
            const response = await axios.delete(
                API_ENDPOINTS.category.delete.replace('{id}', id.toString()),
                { withCredentials: true }
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
    });

    return {
        categories,
        isLoading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
    };
}; 