export interface User {
    id: number;
    email: string;
    name: string;
}

export interface UserProfile {
    id: number;
    email: string;
    name: string;
}

export interface LoginResponse {
    id: number;
    user: string;
}

export interface RegisterResponse {
    id: number;
    email: string;
} 