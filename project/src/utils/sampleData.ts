import { InventoryItem } from '../types';

export const generateSampleItems = (): InventoryItem[] => {
  const categories = ['Electronics', 'Furniture', 'Clothing', 'Office Supplies', 'Kitchen'];
  const statuses = ['In Stock', 'Low Stock', 'Out of Stock'] as const;
  
  const items: InventoryItem[] = [];
  
  const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };
  
  const getRandomPrice = () => {
    return Math.floor(Math.random() * 1000) + 10;
  };
  
  const getRandomQuantity = (status: typeof statuses[number]) => {
    if (status === 'Out of Stock') return 0;
    if (status === 'Low Stock') return Math.floor(Math.random() * 5) + 1;
    return Math.floor(Math.random() * 100) + 10;
  };
  
  const generateSampleNames = (category: string): string[] => {
    switch (category) {
      case 'Electronics':
        return ['Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Monitor', 'Keyboard', 'Mouse'];
      case 'Furniture':
        return ['Chair', 'Desk', 'Bookshelf', 'Sofa', 'Table', 'Bed', 'Cabinet'];
      case 'Clothing':
        return ['T-Shirt', 'Jeans', 'Dress', 'Jacket', 'Shoes', 'Hat', 'Socks'];
      case 'Office Supplies':
        return ['Notebook', 'Pen', 'Stapler', 'Scissors', 'Tape', 'Paper', 'Folders'];
      case 'Kitchen':
        return ['Blender', 'Toaster', 'Knife Set', 'Plates', 'Cups', 'Pots', 'Pans'];
      default:
        return ['Item'];
    }
  };
  
  // Generate 20 sample items
  for (let i = 0; i < 20; i++) {
    const category = getRandomElement(categories);
    const status = getRandomElement(statuses);
    const name = getRandomElement(generateSampleNames(category));
    const quantity = getRandomQuantity(status);
    const price = getRandomPrice();
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30)); // Random date in the past month
    
    items.push({
      id: crypto.randomUUID(),
      name: `${name} ${Math.floor(Math.random() * 1000)}`,
      category,
      quantity,
      price,
      status,
      description: `A high-quality ${name.toLowerCase()} that would be a great addition to your inventory.`,
      createdAt: new Date(date),
      updatedAt: new Date(date),
    });
  }
  
  return items;
};