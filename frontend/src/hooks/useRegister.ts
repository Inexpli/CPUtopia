import { useMutation } from '@tanstack/react-query';
import type { RegisterFormData } from '../schemas/auth';

const API_URL = 'http://localhost:8080';

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterFormData) => {
            const response = await fetch(`${API_URL}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Wystąpił błąd podczas rejestracji');
            }

            return response.json();
        },
    });
}; 