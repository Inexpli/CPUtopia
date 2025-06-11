import { useCategories } from "@/hooks/useCategories"
import { UseFormRegister } from "react-hook-form"

interface CategorySelectProps {
  register: UseFormRegister<any>
  error?: string
}

export const CategorySelect = ({ register, error }: CategorySelectProps) => {
  const { categories } = useCategories()

  return (
    <div>
      <label
        htmlFor="category_id"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        Kategoria
      </label>
      <select
        id="category_id"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
        {...register("category_id")}
      >
        <option value="">Wybierz kategorię</option>
        {categories?.map(category => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}
