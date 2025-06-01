import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navbar } from "@/components/Navbar.tsx";
import { registerSchema, type RegisterFormData } from "../schemas/auth";
import { useRegister } from "../hooks/useRegister";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const registerMutation = useRegister();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerMutation.mutateAsync(data);
            alert("Rejestracja udana!");
            navigate("/logowanie");
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Wystąpił nieznany błąd");
            }
        }
    };

    return (
        <>
            <Navbar/>
            <div className="w-full max-w-sm mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-6 text-center">Rejestracja</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            className="w-full p-2 border rounded-md mt-1"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="password">Hasło</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
                            className="w-full p-2 border rounded-md mt-1"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Potwierdź Hasło</label>
                        <input
                            type="password"
                            id="confirm-password"
                            {...register("confirmPassword")}
                            className="w-full p-2 border rounded-md mt-1"
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full p-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 disabled:bg-blue-400"
                    >
                        {registerMutation.isPending ? "Rejestracja..." : "Zarejestruj się"}
                    </button>
                </form>
            </div>
        </>
    );
};
