import { Search, SortAsc, SortDesc } from "lucide-react"
import { useCategories } from "@/hooks/categories/useCategories"
import { ProductFiltersProps } from "@/types/product"

export const ProductFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sortField,
  sortOrder,
  onSortChange,
  onSortOrderChange
}: ProductFiltersProps) => {
  const { categories } = useCategories()

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Szukaj produktów..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-gray-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
        />
        <Search className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
      </div>

      {/* Category Filter */}
      <select
        value={selectedCategory || ""}
        onChange={e => onCategoryChange(e.target.value ? Number(e.target.value) : null)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
      >
        <option value="">Wszystkie kategorie</option>
        {categories?.map(category => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>

      {/* Sort Options */}
      <div className="flex gap-2">
        <select
          value={sortField}
          onChange={e => onSortChange(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
        >
          <option value="name">Nazwa</option>
          <option value="price">Cena</option>
          <option value="stock">Stan magazynowy</option>
        </select>
        <button
          onClick={onSortOrderChange}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
        >
          {sortOrder === "asc" ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}
