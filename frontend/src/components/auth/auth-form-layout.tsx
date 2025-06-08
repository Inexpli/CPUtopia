import { AuthFormLayoutProps } from "@/types/ui"
import { Navbar } from "@/components/layout/Navbar"

export const AuthFormLayout = ({ title, children }: AuthFormLayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="mx-auto w-full max-w-sm p-4">
        <h2 className="mb-6 text-center text-2xl font-semibold">{title}</h2>
        {children}
      </div>
    </>
  )
}
