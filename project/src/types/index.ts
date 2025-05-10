export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  key: keyof InventoryItem;
  direction: SortDirection;
}

export interface FilterOptions {
  category: string;
  status: string;
  search: string;
}