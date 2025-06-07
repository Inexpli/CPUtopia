import { useMutation } from '@tanstack/react-query';
import type { RegisterFormData } from '../schemas/auth';
import { API_ENDPOINTS } from '@/config/api';
import axios, { AxiosError } from 'axios';

export interface RegisterResponse {
    id: number;
    email: string;
}

export const useRegister = () => {
    return useMutation<RegisterResponse, Error, RegisterFormData>({
        mutationFn: async (data: RegisterFormData) => {
            try {
                const response = await axios.post(API_ENDPOINTS.auth.register, {
                    email: data.email,
                    password: data.password,
                });
                return response.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error.response?.data?.message || 'Wystąpił błąd podczas rejestracji');
                }
                throw new Error('Wystąpił błąd podczas rejestracji');
            }
        },
    });
}; 