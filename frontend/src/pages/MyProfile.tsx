import { Navbar } from "@/components/Navbar";
import { useUserProfile } from "../hooks/useUserProfile";

export const MyProfile = () => {
    const { data: user, isLoading, error } = useUserProfile();

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="p-4 flex justify-center items-center min-h-[200px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="p-4 text-center text-red-600">
                    Nie udało się załadować profilu
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-2xl mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-6">Mój Profil</h2>
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow p-6 space-y-4">
                    <div className="space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">Email</p>
                        <p className="font-medium">{user?.email}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-gray-600 dark:text-gray-400">Nazwa</p>
                        <p className="font-medium">{user?.name}</p>
                    </div>
                </div>
            </div>
        </>
    );
}; 