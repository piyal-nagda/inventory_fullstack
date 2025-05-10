import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import InventoryItem from './InventoryItem';
import { SortConfig, InventoryItem as InventoryItemType } from '../types';
import { ChevronUp, ChevronDown, Filter } from 'lucide-react';

interface InventoryListProps {
  onEdit: (item: InventoryItemType) => void;
  onView: (item: InventoryItemType) => void;
  onDelete: (item: InventoryItemType) => void;
  showMobileFilters: boolean;
}

const InventoryList: React.FC<InventoryListProps> = ({ 
  onEdit, 
  onView, 
  onDelete,
  showMobileFilters
}) => {
  const { 
    filteredItems, 
    filterOptions, 
    setFilterOptions,
    sortConfig,
    setSortConfig,
    categories,
    statuses
  } = useInventory();

  const handleSort = (key: keyof InventoryItemType) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key: keyof InventoryItemType) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="inline h-4 w-4" /> : 
      <ChevronDown className="inline h-4 w-4" />;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Filters Panel (desktop always visible, mobile conditional) */}
      <div className={`
        ${showMobileFilters ? 'block' : 'hidden'} md:block
        bg-gray-800 p-4 rounded-lg shadow-md w-full md:w-64 h-fit
      `}>
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-purple-400 mr-2" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Category</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={filterOptions.category}
            onChange={(e) => setFilterOptions({...filterOptions, category: e.target.value})}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Status</label>
          <select
            className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={filterOptions.status}
            onChange={(e) => setFilterOptions({...filterOptions, status: e.target.value})}
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        
        <button
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition-colors"
          onClick={() => setFilterOptions({ category: '', status: '', search: '' })}
        >
          Clear Filters
        </button>
      </div>
      
      {/* Inventory Items */}
      <div className="flex-1 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="bg-gray-800 p-8 rounded-lg text-center">
            <p className="text-lg text-gray-400">No items match your filters.</p>
            <button
              onClick={() => setFilterOptions({ category: '', status: '', search: '' })}
              className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left bg-gray-700">
                  <th className="p-4 cursor-pointer hover:bg-gray-600 transition-colors" onClick={() => handleSort('name')}>
                    Name {getSortIcon('name')}
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-gray-600 transition-colors" onClick={() => handleSort('category')}>
                    Category {getSortIcon('category')}
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-gray-600 transition-colors" onClick={() => handleSort('quantity')}>
                    Quantity {getSortIcon('quantity')}
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-gray-600 transition-colors" onClick={() => handleSort('price')}>
                    Price {getSortIcon('price')}
                  </th>
                  <th className="p-4 cursor-pointer hover:bg-gray-600 transition-colors" onClick={() => handleSort('status')}>
                    Status {getSortIcon('status')}
                  </th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map(item => (
                  <InventoryItem 
                    key={item.id} 
                    item={item} 
                    onEdit={() => onEdit(item)} 
                    onView={() => onView(item)}
                    onDelete={() => onDelete(item)} 
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-4 text-sm text-gray-400">
          Showing {filteredItems.length} of {filteredItems.length} items
        </div>
      </div>
    </div>
  );
};

export default InventoryList;