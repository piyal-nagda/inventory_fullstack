import React from 'react';
import { InventoryItem } from '../types';
import { X, Edit, CalendarDays, Clock } from 'lucide-react';

interface ItemDetailsProps {
  item: InventoryItem;
  onClose: () => void;
  onEdit: () => void;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item, onClose, onEdit }) => {
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold">Item Details</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold text-white">{item.name}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Item Information</h3>
              <div className="bg-gray-700/50 p-4 rounded-md">
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Category</dt>
                    <dd className="text-white font-medium">{item.category}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Price</dt>
                    <dd className="text-white font-medium">${item.price.toFixed(2)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Quantity</dt>
                    <dd className="text-white font-medium">{item.quantity}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Value</dt>
                    <dd className="text-white font-medium">${(item.price * item.quantity).toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Timestamps</h3>
              <div className="bg-gray-700/50 p-4 rounded-md space-y-4">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-purple-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-400">Created</div>
                    <div className="text-white">{formatDate(item.createdAt)}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-400 mr-2" />
                  <div>
                    <div className="text-sm text-gray-400">Last Updated</div>
                    <div className="text-white">{formatDate(item.updatedAt)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <div className="bg-gray-700/50 p-4 rounded-md">
              <p className="text-gray-300 whitespace-pre-wrap">{item.description}</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center transition-colors"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;