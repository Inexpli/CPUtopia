export interface Category {
  id: number
  name: string
  icon: string
}

export interface CategoryCreateData {
  name: string
}

export interface CategoryUpdateData {
  name: string
}

export interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CategoryFormData) => void
  initialData?: {
    name: string
  }
  title: string
  isLoading: boolean
}

export type CategoryFormData = CategoryCreateData | CategoryUpdateData
