import { useMutation } from '@tanstack/react-query';
import type { LoginFormData } from '../schemas/auth';
import { API_ENDPOINTS } from '@/config/api';
import axios, { AxiosError } from 'axios';

export interface LoginResponse {
    id: number;
    user: string;
}

export const useLogin = () => {
    return useMutation<LoginResponse, Error, LoginFormData>({
        mutationFn: async (data: LoginFormData) => {
            try {
                const response = await axios.post(API_ENDPOINTS.auth.login, data, {
                    withCredentials: true,
                });
                return response.data;
            } catch (error) {
                if (error instanceof AxiosError) {
                    throw new Error(error.response?.data?.message || 'Nieprawidłowe dane logowania');
                }
                throw new Error('Wystąpił błąd podczas logowania');
            }
        },
    });
}; 