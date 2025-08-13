// Inventory API service - can be easily replaced with real backend calls
const MOCK_DATA = [
  { id: 1, name: "Eco-Friendly Bamboo Toothbrush", sku: "TB-001", category: "Personal Care", quantity: 150 },
  { id: 2, name: "Organic Cotton Reusable Shopping Bag", sku: "RB-002", category: "Home Goods", quantity: 25 },
  { id: 3, name: "Stainless Steel Water Bottle", sku: "WB-003", category: "Outdoor Gear", quantity: 50 },
  { id: 4, name: "Recycled Paper Notebook", sku: "NB-004", category: "Stationery", quantity: 100 },
  { id: 5, name: "Solar-Powered Garden Lights", sku: "GL-005", category: "Home & Garden", quantity: 10 },
  { id: 6, name: "Biodegradable Phone Case", sku: "PC-006", category: "Electronics", quantity: 75 },
  { id: 7, name: "Upcycled Denim Tote Bag", sku: "TB-007", category: "Fashion", quantity: 5 },
  { id: 8, name: "Natural Beeswax Food Wraps", sku: "FW-008", category: "Kitchen", quantity: 30 },
  { id: 9, name: "Bamboo Cutting Board", sku: "CB-009", category: "Kitchen", quantity: 20 },
  { id: 10, name: "Reusable Silicone Straws", sku: "SS-010", category: "Kitchen", quantity: 40 },
  { id: 11, name: "Organic Cotton Face Mask", sku: "FM-011", category: "Personal Care", quantity: 15, lowStockStatus: "Low-stock" },
  { id: 12, name: "LED Desk Lamp", sku: "DL-012", category: "Office", quantity: 60, lowStockStatus: "In-stock" },
  { id: 13, name: "Handmade Ceramic Mug", sku: "CM-013", category: "Kitchen", quantity: 12, lowStockStatus: "Low-stock" },
  { id: 14, name: "Wireless Mouse", sku: "WM-014", category: "Electronics", quantity: 80, lowStockStatus: "In-stock" },
  { id: 15, name: "Portable Power Bank", sku: "PB-015", category: "Electronics", quantity: 5, lowStockStatus: "Out-of-stock" },
  { id: 16, name: "Wooden Salad Bowl", sku: "SB-016", category: "Kitchen", quantity: 22, lowStockStatus: "Low-stock" },
  { id: 17, name: "Stainless Steel Lunch Box", sku: "LB-017", category: "Kitchen", quantity: 95, lowStockStatus: "In-stock" },
  { id: 18, name: "Cotton Bath Towel", sku: "BT-018", category: "Home Goods", quantity: 35, lowStockStatus: "In-stock" },
  { id: 19, name: "Yoga Mat", sku: "YM-019", category: "Fitness", quantity: 8, lowStockStatus: "Low-stock" },
  { id: 20, name: "Bluetooth Headphones", sku: "BH-020", category: "Electronics", quantity: 0, lowStockStatus: "Out-of-stock" }
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