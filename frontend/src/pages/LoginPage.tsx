import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/auth";
import { useLogin } from "../hooks/useLogin";
import { useUser } from "@/contexts/UserContext";
import { FormInput } from "@/components/ui/form-input";
import { AuthFormLayout } from "@/components/auth/auth-form-layout";
import { toast } from "sonner";

export const LoginPage = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const { mutateAsync: login, isPending } = useLogin();

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await login(data);
            setUser({
                id: response.id,
                email: response.user,
                name: response.user.split('@')[0]
            });
            toast.success("Zalogowano pomyślnie!");
            navigate("/");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Wystąpił nieznany błąd");
        }
    };

    return (
        <AuthFormLayout title="Logowanie">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormInput
                    label="Email"
                    type="email"
                    id="email"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <FormInput
                    label="Hasło"
                    type="password"
                    id="password"
                    error={errors.password?.message}
                    {...register("password")}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full p-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {isPending ? "Logowanie..." : "Zaloguj się"}
                </button>
            </form>
        </AuthFormLayout>
    );
};