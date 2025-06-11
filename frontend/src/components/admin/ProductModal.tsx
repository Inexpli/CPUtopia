import { FormInput } from "@/components/ui/form-input"
import { X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useState } from "react"
import { ProductModalProps } from "@/types/product"
import { ImageUpload } from "@/components/ui/image-upload"
import { CategorySelect } from "@/components/ui/category-select"
import { Button } from "@/components/ui/button"

const productSchema = z.object({
  name: z.string().min(1, "Nazwa jest wymagana"),
  description: z.string().min(1, "Opis jest wymagany"),
  price: z.coerce.number().min(1, "Cena jest wymagana"),
  stock: z.coerce.number().min(0, "Stan magazynowy nie może być ujemny"),
  category_id: z
    .string()
    .transform(val => (val === "" ? 0 : Number(val)))
    .pipe(z.number().min(1, "Kategoria jest wymagana")),
  image: z.any().nullable()
})

type ProductFormData = z.infer<typeof productSchema>

export const ProductModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  isLoading
}: ProductModalProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category_id: undefined,
      image: null
    }
  })

  const imageFile = watch("image")

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        stock: initialData.stock,
        category_id: initialData.category_id,
        image: null
      })

      if (initialData.image) {
        setPreviewUrl(`/uploads/products/${initialData.image}`)
      }
    }
  }, [initialData, reset])

  useEffect(() => {
    if (imageFile?.[0]) {
      const file = imageFile[0]
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else if (imageFile === null) {
      setPreviewUrl(null)
    }
  }, [imageFile])

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSubmit={handleSubmit(data => onSubmit(data as any))}
          className="space-y-4"
        >
          <FormInput
            label="Nazwa produktu"
            type="text"
            id="name"
            error={errors.name?.message}
            {...register("name")}
          />

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Opis produktu
            </label>
            <textarea
              id="description"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
              rows={3}
              {...register("description")}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <FormInput
            label="Cena (zł)"
            type="number"
            id="price"
            error={errors.price?.message}
            {...register("price")}
          />

          <FormInput
            label="Stan magazynowy"
            type="number"
            id="stock"
            error={errors.stock?.message}
            {...register("stock")}
          />

          <CategorySelect
            register={register}
            error={errors.category_id?.message}
          />

          <ImageUpload
            previewUrl={previewUrl}
            setValue={setValue}
            initialImage={initialData?.image}
          />

          <div className="mt-6 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Zapisywanie..." : "Zapisz"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
