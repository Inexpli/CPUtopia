import { useMutation } from '@tanstack/react-query';
import type { LoginFormData } from '../schemas/auth';

const API_URL = 'http://localhost:8080';

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginFormData) => {
            const response = await fetch(`${API_URL}/api/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Nieprawidłowe dane logowania');
            }

            return response.json();
        },
    });
}; 