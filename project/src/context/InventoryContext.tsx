import React, { createContext, useContext, useEffect, useState } from 'react';
import { FilterOptions, InventoryItem, SortConfig } from '../types';

const API_BASE = "https://localhost:7212/api/Inventory";

interface InventoryContextType {
  items: InventoryItem[];
  filteredItems: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, item: Partial<InventoryItem>) => void;
  deleteItem: (id: string) => void;
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  sortConfig: SortConfig;
  setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
  categories: string[];
  statuses: string[];
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_BASE);
        const data = await response.json();
        const parsedItems = data.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt)
        }));
        setItems(parsedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    fetchItems();
  }, []);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: '',
    status: '',
    search: '',
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'name',
    direction: 'asc',
  });

  const categories = Array.from(new Set(items.map(item => item.category)));
  const statuses = Array.from(new Set(items.map(item => item.status)));

  const filteredItems = items
    .filter(item => {
      const matchesCategory = !filterOptions.category || item.category === filterOptions.category;
      const matchesStatus = !filterOptions.status || item.status === filterOptions.status;
      const matchesSearch = !filterOptions.search ||
        item.name.toLowerCase().includes(filterOptions.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filterOptions.search.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      return sortConfig.direction === 'asc'
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    });

  const addItem = async (newItem: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem)
      });

      if (response.ok) {
        const createdItem = await response.json();
        createdItem.createdAt = new Date(createdItem.createdAt);
        createdItem.updatedAt = new Date(createdItem.updatedAt);
        setItems(prev => [...prev, createdItem]);
      } else {
        console.error("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (id: string, updatedFields: Partial<InventoryItem>) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      });

      if (response.ok) {
        const updatedItem = await response.json();
        updatedItem.updatedAt = new Date(updatedItem.updatedAt);
        updatedItem.createdAt = new Date(updatedItem.createdAt);

        setItems(prev =>
          prev.map(item =>
            item.id === id ? { ...item, ...updatedItem } : item
          )
        );
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setItems(prev => prev.filter(item => item.id !== id));
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const value = {
    items,
    filteredItems,
    addItem,
    updateItem,
    deleteItem,
    filterOptions,
    setFilterOptions,
    sortConfig,
    setSortConfig,
    categories,
    statuses,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
