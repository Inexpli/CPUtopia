export interface Product {
  id: number
  name: string
  description: string
  price: number
  stock: number
  category: {
    id: number
  }
  image: string
}

export interface ProductCreateData {
  name: string
  description: string
  price: number
  stock: number
  category_id: number
  image?: File | null
}

export interface ProductUpdateData {
  name?: string
  description?: string
  price?: number
  stock?: number
  category_id?: number
  image?: File | null
}

export interface ProductFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: number | null
  onCategoryChange: (categoryId: number | null) => void
  sortField: string
  sortOrder: "asc" | "desc"
  onSortChange: (field: string) => void
  onSortOrderChange: () => void
}

export interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProductCreateData | ProductUpdateData) => void
  initialData?: {
    name: string
    description: string
    price: number
    stock: number
    category_id: number
    image?: string
  }
  title: string
  isLoading: boolean
}
