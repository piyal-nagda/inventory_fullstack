import React from 'react';
import { Menu, Plus, Search, Moon, Package } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

interface LayoutProps {
  children: React.ReactNode;
  onAddItem: () => void;
  showMobileFilters: boolean;
  setShowMobileFilters: (show: boolean) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  onAddItem,
  showMobileFilters,
  setShowMobileFilters
}) => {
  const { filterOptions, setFilterOptions } = useInventory();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Package className="h-6 w-6 text-purple-400" />
            <h1 className="text-xl font-bold text-white">InventoryPro</h1>
          </div>
          
          <div className="hidden md:flex flex-1 mx-4 relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              className="bg-gray-700 text-white px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              value={filterOptions.search}
              onChange={(e) => setFilterOptions({...filterOptions, search: e.target.value})}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={onAddItem}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-1 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span className="hidden md:inline">Add Item</span>
            </button>
            
            <button 
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors md:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Search (only visible on mobile) */}
      <div className="md:hidden p-4 bg-gray-800 border-b border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            className="bg-gray-700 text-white px-10 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            value={filterOptions.search}
            onChange={(e) => setFilterOptions({...filterOptions, search: e.target.value})}
          />
        </div>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
        <div className="container mx-auto">
          &copy; {new Date().getFullYear()} InventoryPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;