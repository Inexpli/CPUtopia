import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080';

export const useUserProfile = () => {
    return useQuery({
        queryKey: ["userProfile"],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/api/user/me`, {
                withCredentials: true, 
            });
            return response.data;
        },
    });
};
