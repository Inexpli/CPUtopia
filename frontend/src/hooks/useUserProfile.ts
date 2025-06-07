import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_ENDPOINTS } from "@/config/api";

export interface UserProfile {
    id: number;
    email: string;
    name: string;
}

export const useUserProfile = () => {
    return useQuery<UserProfile, Error>({
        queryKey: ["userProfile"],
        queryFn: async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.auth.profile, {
                    withCredentials: true,
                });
                return response.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error.response?.data?.message || 'Błąd podczas pobierania profilu');
                }
                throw new Error('Wystąpił błąd podczas pobierania profilu');
            }
        },
    });
};
