import { useMutation } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/api';
import { useUser } from '@/contexts/UserContext';

export const useLogout = () => {
    const { setUser } = useUser();

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await fetch(API_ENDPOINTS.auth.logout, {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error('Logout failed');
            }
            return response.json();
        },
        onSuccess: () => {
            setUser(null);
        },
        onError: (error) => {
            console.error('Logout failed:', error);
        }
    });

    return mutation;
}; 