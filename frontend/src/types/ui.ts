import { ReactNode } from "react"
import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button-variants"

export interface AuthFormLayoutProps {
  title: string
  children: ReactNode
}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}
