import { ReactNode } from 'react';
import { Navbar } from "@/components/Navbar";

interface AuthFormLayoutProps {
    title: string;
    children: ReactNode;
}

export const AuthFormLayout = ({ title, children }: AuthFormLayoutProps) => {
    return (
        <>
            <Navbar />
            <div className="w-full max-w-sm mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>
                {children}
            </div>
        </>
    );
};