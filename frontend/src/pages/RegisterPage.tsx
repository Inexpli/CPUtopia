import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "../schemas/auth";
import { useRegister } from "../hooks/useRegister";
import { FormInput } from "@/components/ui/form-input";
import { AuthFormLayout } from "@/components/auth/auth-form-layout";
import { toast } from "sonner";

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    });

    const { mutateAsync: registerUser, isPending } = useRegister();

    const onSubmit = async (data: RegisterFormData) => {
        try {
            await registerUser(data);
            toast.success("Rejestracja udana!");
            navigate("/logowanie");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Wystąpił nieznany błąd");
        }
    };

    return (
        <AuthFormLayout title="Rejestracja">
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
                <FormInput
                    label="Potwierdź Hasło"
                    type="password"
                    id="confirm-password"
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full p-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 disabled:bg-blue-400"
                >
                    {isPending ? "Rejestracja..." : "Zarejestruj się"}
                </button>
            </form>
        </AuthFormLayout>
    );
};
