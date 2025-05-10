import React, { useState, useEffect } from 'react';
import { InventoryItem } from '../types';
import { X } from 'lucide-react';

interface ItemFormProps {
  onSubmit: (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialValues?: Partial<InventoryItem>;
  title: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialValues = {}, 
  title 
}) => {
  const [name, setName] = useState(initialValues.name || '');
  const [category, setCategory] = useState(initialValues.category || '');
  const [quantity, setQuantity] = useState(initialValues.quantity || 0);
  const [price, setPrice] = useState(initialValues.price || 0);
  const [status, setStatus] = useState<'In Stock' | 'Low Stock' | 'Out of Stock'>(
    initialValues.status || 'In Stock'
  );
  const [description, setDescription] = useState(initialValues.description || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ['Electronics', 'Furniture', 'Clothing', 'Office Supplies', 'Kitchen'];
  const statuses: Array<'In Stock' | 'Low Stock' | 'Out of Stock'> = ['In Stock', 'Low Stock', 'Out of Stock'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!category) newErrors.category = 'Category is required';
    if (quantity < 0) newErrors.quantity = 'Quantity cannot be negative';
    if (price < 0) newErrors.price = 'Price cannot be negative';
    if (!description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        name,
        category,
        quantity,
        price,
        status,
        description,
      });
    }
  };

  // Automatically update status based on quantity
  useEffect(() => {
    if (quantity === 0) {
      setStatus('Out of Stock');
    } else if (quantity <= 5) {
      setStatus('Low Stock');
    } else {
      setStatus('In Stock');
    }
  }, [quantity]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full bg-gray-700 border ${errors.category ? 'border-red-500' : 'border-gray-600'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  min={0}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  className={`w-full bg-gray-700 border ${errors.quantity ? 'border-red-500' : 'border-gray-600'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.quantity && <p className="mt-1 text-sm text-red-500">{errors.quantity}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={price}
                  min={0}
                  step={0.01}
                  onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                  className={`w-full bg-gray-700 border ${errors.price ? 'border-red-500' : 'border-gray-600'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'In Stock' | 'Low Stock' | 'Out of Stock')}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {statuses.map(stat => (
                    <option key={stat} value={stat}>{stat}</option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-400">
                  Status is automatically set based on quantity but can be overridden
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={6}
                  className={`w-full bg-gray-700 border ${errors.description ? 'border-red-500' : 'border-gray-600'} rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              {initialValues.id ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;