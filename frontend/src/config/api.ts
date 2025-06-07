export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
    auth: {
        login: `${API_URL}/api/user/login`,
        register: `${API_URL}/api/user/register`,
        profile: `${API_URL}/api/user/me`,
        logout: `${API_URL}/api/user/logout`,
    }
} as const; 