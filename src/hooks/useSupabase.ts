import { useQuery } from '@tanstack/react-query'
import { Category, MenuItem } from '@/lib/supabase'

// Hook to fetch categories - DISABLED for now
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // Return empty array for now
      return [] as Category[]
    },
    enabled: false, // Disable the query
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to fetch menu items by category - DISABLED for now
export const useMenuItems = (categoryId?: string) => {
  return useQuery({
    queryKey: ['menu_items', categoryId],
    queryFn: async () => {
      // Return empty array for now
      return [] as MenuItem[]
    },
    enabled: false, // Disable the query
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Hook to fetch all menu items with category info - DISABLED for now
export const useMenuItemsWithCategory = () => {
  return useQuery({
    queryKey: ['menu_items_with_category'],
    queryFn: async () => {
      // Return empty array for now
      return []
    },
    enabled: false, // Disable the query
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
} 