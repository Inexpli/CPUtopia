import { FormInput } from "@/components/ui/form-input"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect } from "react"
import { CategoryModalProps } from "@/types/category"

const categorySchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana")
})

type CategoryFormData = z.infer<typeof categorySchema>

export const CategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  isLoading
}: CategoryModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  if (!isOpen) return null

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 dark:bg-neutral-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{title}</h2>

        <form
          onSubmit={handleSubmit(data => {
            onSubmit(data)
            reset()
          })}
          className="space-y-4"
        >
          <FormInput
            label="Nazwa kategorii"
            type="text"
            id="name"
            error={errors.name?.message}
            {...register("name")}
          />

          <div className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-neutral-700"
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-blue-400"
            >
              {isLoading ? "Zapisywanie..." : "Zapisz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
