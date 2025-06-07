import { forwardRef } from 'react';
import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
    ({ label, error, className, id, ...props }, ref) => {
        return (
            <div className="space-y-1">
                <label htmlFor={id} className="block text-sm font-medium">
                    {label}
                </label>
                <input
                    ref={ref}
                    id={id}
                    className={cn(
                        "w-full p-2 border rounded-md mt-1 bg-background",
                        "focus:outline-none focus:ring-2 focus:ring-primary",
                        error && "border-red-500",
                        className
                    )}
                    {...props}
                />
                {error && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
            </div>
        );
    }
); 