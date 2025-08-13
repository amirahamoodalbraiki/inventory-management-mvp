// Product API service - connects to real backend
const API_BASE_URL = '/api/products';

// Helper function to determine stock status based on backend rules
const getStockStatus = (quantity, lowStockThreshold = 10) => {
  if (quantity === 0) return 'out';
  if (quantity <= lowStockThreshold) return 'low';
  return 'in';
};

export const inventoryService = {
  // Main method: get filtered inventory items with all params
  async getInventoryItems(params = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      // Add search parameter if provided
      if (params.search?.trim()) {
        queryParams.append('search', params.search.trim());
      }
      
      // Add category filter if provided
      if (params.category && params.category !== 'all') {
        queryParams.append('category', params.category);
      }
      
      // Add stock status filter if provided
      if (params.stockStatus && params.stockStatus !== 'all') {
        queryParams.append('stock_status', params.stockStatus);
      }

      const url = `${API_BASE_URL}?${queryParams.toString()}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add JWT token when authentication is implemented
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products = await response.json();
      
      // Transform backend data to match frontend expectations
      return products.map(product => ({
        id: product.id,
        name: product.name,
        sku: product.id.slice(0, 8).toUpperCase(), // Use first 8 chars of UUID as SKU
        category: product.category_id, // Will need category name lookup
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        lowStockThreshold: product.low_stock_threshold,
        createdAt: product.created_at,
        updatedAt: product.updated_at
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get unique categories for filter dropdown
  async getCategories() {
    try {
      // For now, return hardcoded categories since category API isn't provided
      // In a real app, you'd fetch from /api/categories
      return ['Electronics', 'Clothing', 'Office', 'Stationery'];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Create new product
  async addInventoryItem(productData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: productData.name,
          description: productData.description || '',
          category_id: productData.category_id,
          price: parseFloat(productData.price),
          quantity: parseInt(productData.quantity),
          low_stock_threshold: parseInt(productData.low_stock_threshold) || 10
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product = await response.json();
      return {
        id: product.id,
        name: product.name,
        sku: product.id.slice(0, 8).toUpperCase(),
        category: product.category_id,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        lowStockThreshold: product.low_stock_threshold,
        createdAt: product.created_at,
        updatedAt: product.updated_at
      };
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update existing product
  async updateInventoryItem(id, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: updates.name,
          description: updates.description,
          category_id: updates.category_id,
          price: parseFloat(updates.price),
          quantity: parseInt(updates.quantity),
          low_stock_threshold: parseInt(updates.low_stock_threshold)
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product = await response.json();
      return {
        id: product.id,
        name: product.name,
        sku: product.id.slice(0, 8).toUpperCase(),
        category: product.category_id,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        lowStockThreshold: product.low_stock_threshold,
        createdAt: product.created_at,
        updatedAt: product.updated_at
      };
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  async deleteInventoryItem(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  // Get single product by ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const product = await response.json();
      return {
        id: product.id,
        name: product.name,
        sku: product.id.slice(0, 8).toUpperCase(),
        category: product.category_id,
        quantity: product.quantity,
        price: product.price,
        description: product.description,
        lowStockThreshold: product.low_stock_threshold,
        createdAt: product.created_at,
        updatedAt: product.updated_at
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
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