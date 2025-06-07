import { Navbar } from "@/components/Navbar";
import { useUserProfile } from "../hooks/useUserProfile";

export const MyProfile = () => {
    const { data: user, isLoading, error } = useUserProfile();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading profile</div>;

    return (
        <>
            <Navbar />
            <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4">Mój Profil</h2>
                <div className="space-y-2">
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Nazwa:</strong> {user?.name}</p>
                </div>
            </div>
        </>
    );
}; 