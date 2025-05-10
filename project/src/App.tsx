import React, { useState } from 'react';
import { InventoryProvider } from './context/InventoryContext';
import { useInventory } from './context/InventoryContext';
import Layout from './components/Layout';
import InventoryList from './components/InventoryList';
import ItemForm from './components/ItemForm';
import DeleteConfirmation from './components/DeleteConfirmation';
import ItemDetails from './components/ItemDetails';
import { InventoryItem } from './types';

function App() {
  return (
    <InventoryProvider>
      <InventoryApp />
    </InventoryProvider>
  );
}

function InventoryApp() {
  const { addItem, updateItem, deleteItem } = useInventory();
  const [showAddForm, setShowAddForm] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<InventoryItem | null>(null);
  const [itemToDelete, setItemToDelete] = useState<InventoryItem | null>(null);
  const [itemToView, setItemToView] = useState<InventoryItem | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleAddItem = (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    addItem(item);
    setShowAddForm(false);
  };

  const handleUpdateItem = (item: Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (itemToEdit) {
      updateItem(itemToEdit.id, item);
      setItemToEdit(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      deleteItem(itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Layout 
        onAddItem={() => setShowAddForm(true)}
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Inventory Management</h1>
          <p className="text-gray-400">
            Add, edit, and manage your inventory items
          </p>
        </div>
        
        <InventoryList 
          onEdit={setItemToEdit}
          onView={setItemToView}
          onDelete={setItemToDelete}
          showMobileFilters={showMobileFilters}
        />
      </Layout>
      
      {/* Add Item Form */}
      {showAddForm && (
        <ItemForm
          title="Add New Item"
          onSubmit={handleAddItem}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      
      {/* Edit Item Form */}
      {itemToEdit && (
        <ItemForm
          title="Edit Item"
          initialValues={itemToEdit}
          onSubmit={handleUpdateItem}
          onCancel={() => setItemToEdit(null)}
        />
      )}
      
      {/* Delete Confirmation */}
      {itemToDelete && (
        <DeleteConfirmation
          item={itemToDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setItemToDelete(null)}
        />
      )}
      
      {/* Item Details */}
      {itemToView && (
        <ItemDetails
          item={itemToView}
          onClose={() => setItemToView(null)}
          onEdit={() => {
            setItemToEdit(itemToView);
            setItemToView(null);
          }}
        />
      )}
    </div>
  );
}

export default App;