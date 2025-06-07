import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';
import { useUser } from '@/contexts/UserContext';
import { useCallback } from 'react';

export const useLogout = () => {
    const { setUser } = useUser();

    return useCallback(async () => {
        try {
            await axios.post(API_ENDPOINTS.auth.logout, {}, {
                withCredentials: true,
            });
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }, [setUser]);
}; 