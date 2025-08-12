// Inventory API service - can be easily replaced with real backend calls
const MOCK_DATA = [
  { id: 1, name: "USB-C Cable", sku: "EL-001", category: "Electronics", quantity: 12 },
  { id: 2, name: "HDMI Cable", sku: "EL-002", category: "Electronics", quantity: 3 },
  { id: 3, name: "Plain T-Shirt", sku: "CL-001", category: "Clothing", quantity: 0 },
  { id: 4, name: "Office Chair", sku: "OF-010", category: "Office", quantity: 7 },
  { id: 5, name: "Notebook", sku: "ST-101", category: "Stationery", quantity: 25 },
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to determine stock status
const getStockStatus = (quantity) => {
  if (quantity === 0) return 'out';
  if (quantity < 10) return 'low';
  return 'in';
};

export const inventoryService = {
  // Main method: get filtered inventory items with all params
  async getInventoryItems(params = {}) {
    await delay(300); // Simulate network delay
    
    const { search = '', category = 'all', stockStatus = 'all' } = params;
    let filtered = MOCK_DATA;

    // Apply search filter
    if (search.trim()) {
      const searchTerm = search.trim().toLowerCase();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        item.sku.toLowerCase().includes(searchTerm)
      );
    }

    // Apply category filter
    if (category !== 'all') {
      filtered = filtered.filter(item => item.category === category);
    }

    // Apply stock status filter
    if (stockStatus !== 'all') {
      filtered = filtered.filter(item => {
        const status = getStockStatus(item.quantity);
        return status === stockStatus;
      });
    }

    return filtered;
  },

  // Get unique categories for filter dropdown
  async getCategories() {
    await delay(100);
    const categories = [...new Set(MOCK_DATA.map(item => item.category))];
    return categories;
  },

  // Add new inventory item (for future use)
  async addInventoryItem(item) {
    await delay(500);
    const newItem = {
      id: Date.now(),
      ...item,
      quantity: parseInt(item.quantity) || 0
    };
    MOCK_DATA.push(newItem);
    return newItem;
  },

  // Update inventory item (for future use)
  async updateInventoryItem(id, updates) {
    await delay(400);
    const index = MOCK_DATA.findIndex(item => item.id === id);
    if (index !== -1) {
      MOCK_DATA[index] = { ...MOCK_DATA[index], ...updates };
      return MOCK_DATA[index];
    }
    throw new Error('Item not found');
  },

  // Delete inventory item (for future use)
  async deleteInventoryItem(id) {
    await delay(300);
    const index = MOCK_DATA.findIndex(item => item.id === id);
    if (index !== -1) {
      MOCK_DATA.splice(index, 1);
      return true;
    }
    throw new Error('Item not found');
  }
};

// Helper function to get status badge data
export const getStatusBadgeData = (status) => {
  switch (status) {
    case 'low':
      return {
        text: 'Low',
        color: '#7a2e0e',
        background: '#FEF0C7',
        border: '#FEDF89'
      };
    case 'out':
      return {
        text: 'Out',
        color: '#B42318',
        background: '#FEE4E2',
        border: '#FDA29B'
      };
    default:
      return {
        text: 'In stock',
        color: '#667085',
        background: '#F2F4F7',
        border: '#E4E7EC'
      };
  }
};

// Helper function to determine stock status (exported for component use)
export { getStockStatus }; 