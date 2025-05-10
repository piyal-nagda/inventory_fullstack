import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { InventoryItem } from '../types';

interface DeleteConfirmationProps {
  item: InventoryItem;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ 
  item, 
  onConfirm, 
  onCancel 
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-xl font-semibold flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
            Confirm Deletion
          </h2>
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete <span className="font-semibold text-white">{item.name}</span>?
            This action cannot be undone.
          </p>
          
          <div className="bg-gray-700/50 p-4 rounded-md mb-6">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-400">Category:</div>
              <div className="text-white">{item.category}</div>
              
              <div className="text-gray-400">Quantity:</div>
              <div className="text-white">{item.quantity}</div>
              
              <div className="text-gray-400">Price:</div>
              <div className="text-white">${item.price.toFixed(2)}</div>
              
              <div className="text-gray-400">Status:</div>
              <div className="text-white">{item.status}</div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
            >
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;