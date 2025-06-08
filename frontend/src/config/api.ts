export const API_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    auth: {
        login: `${API_URL}/api/user/login`,
        register: `${API_URL}/api/user/register`,
        profile: `${API_URL}/api/user/me`,
        logout: `${API_URL}/api/user/logout`,
    },
    category:{
        get: `${API_URL}/api/category`,
        add: `${API_URL}/api/category/add`,
        update: `${API_URL}/api/category/{id}`,
        delete: `${API_URL}/api/category/{id}`,
    },
    product:{
    }
} as const; 