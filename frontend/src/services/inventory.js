// src/services/inventory.js
import { api } from './api';

export const inventoryService = {
  async getInventoryItems({ category = 'all', stockStatus = 'all', search = '' } = {}) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category && category !== 'all') params.set('category', category);

    const data = await api.get(`/products${params.toString() ? `?${params}` : ''}`);
    const list = Array.isArray(data) ? data : Array.isArray(data?.content) ? data.content : [];

    // client-side stock filter (if backend doesn’t do it)
    const filtered = stockStatus === 'all'
      ? list
      : list.filter((p) => {
          const status = getStockStatus(p.quantity ?? 0, p.lowStockThreshold ?? 10);
          if (stockStatus === 'in-stock') return status === 'in';
          if (stockStatus === 'low-stock') return status === 'low';
          if (stockStatus === 'out-of-stock') return status === 'out';
          return true;
        });

    return filtered;
  },

  async getCategories() {
    try {
      return await api.get('/categories'); // if your backend has it
    } catch {
      const products = await api.get('/products');
      const list = Array.isArray(products) ? products : products?.content ?? [];
      return Array.from(new Set(list.map((p) => p.category))).filter(Boolean).sort();
    }
  },

  async createProduct(payload, imageFile) {
    if (imageFile) {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
      fd.append('image', imageFile);
      return api.postFormData('/products', fd);
    }
    return api.postJson('/products', payload);
  },

  async updateProduct(id, payload) {
    return api.putJson(`/products/${id}`, payload);
  },

  async deleteProduct(id) {
    return api.del(`/products/${id}`);
  },
};