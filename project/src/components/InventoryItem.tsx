import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { InventoryItem as InventoryItemType } from '../types';

interface InventoryItemProps {
  item: InventoryItemType;
  onEdit: () => void;
  onView: () => void;
  onDelete: () => void;
}

const InventoryItem: React.FC<InventoryItemProps> = ({ item, onEdit, onDelete, onView }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'text-green-400 bg-green-400/20';
      case 'Low Stock':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'Out of Stock':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <tr className="border-t border-gray-700 hover:bg-gray-750 transition-colors">
      <td className="p-4 font-medium">{item.name}</td>
      <td className="p-4 text-gray-300">{item.category}</td>
      <td className="p-4 text-gray-300">{item.quantity}</td>
      <td className="p-4 text-gray-300">${item.price.toFixed(2)}</td>
      <td className="p-4">
        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td className="p-4">
        <div className="flex space-x-2">
          <button 
            onClick={onView}
            className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
            aria-label="View item"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button 
            onClick={onEdit}
            className="p-1 text-purple-400 hover:text-purple-300 transition-colors"
            aria-label="Edit item"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button 
            onClick={onDelete}
            className="p-1 text-red-400 hover:text-red-300 transition-colors"
            aria-label="Delete item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default InventoryItem;