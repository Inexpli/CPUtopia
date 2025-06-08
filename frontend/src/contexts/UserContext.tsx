import { createContext, useContext, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/config/api';

interface User {
    id: number;
    email: string;
    name: string;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoggedIn: boolean;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const { isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const response = await fetch(API_ENDPOINTS.auth.profile, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    setUser(null);
                    return null;
                }
                const data = await response.json();
                const userData = {
                    id: data.id,
                    email: data.email,
                    name: data.email.split('@')[0]
                };
                setUser(userData);
                return userData;
            } catch {
                setUser(null);
                return null;
            }
        },
    });

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            isLoggedIn: user !== null,
            isLoading
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 