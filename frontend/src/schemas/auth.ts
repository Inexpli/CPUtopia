import * as z from 'zod';

export const registerSchema = z.object({
    email: z.string()
        .email('Nieprawidłowy format adresu email')
        .min(1, 'Email jest wymagany'),
    password: z.string()
        .min(8, 'Hasło musi mieć minimum 8 znaków')
        .regex(/[A-Z]/, 'Hasło musi zawierać przynajmniej jedną wielką literę')
        .regex(/[0-9]/, 'Hasło musi zawierać przynajmniej jedną cyfrę'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email: z.string()
        .email('Nieprawidłowy format adresu email')
        .min(1, 'Email jest wymagany'),
    password: z.string()
        .min(1, 'Hasło jest wymagane'),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>; 