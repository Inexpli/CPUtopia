import { X } from "lucide-react"
import { UseFormSetValue } from "react-hook-form"

interface ImageUploadProps {
  previewUrl: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>
  initialImage?: string
  uploadPath?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  previewUrl,
  setValue,
  initialImage,
  uploadPath = "products"
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setValue("image", e.target.files)
    }
  }

  const handleRemoveImage = () => {
    setValue("image", null)
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        Zdjęcie produktu
      </label>

      {(initialImage || previewUrl) && (
        <div className="relative mb-4 inline-block">
          <img
            src={previewUrl || `/uploads/${uploadPath}/${initialImage}`}
            alt="Podgląd zdjęcia"
            className="h-32 w-32 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {!previewUrl && !initialImage && (
        <div className="mt-2">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
          />
        </div>
      )}
    </div>
  )
}
