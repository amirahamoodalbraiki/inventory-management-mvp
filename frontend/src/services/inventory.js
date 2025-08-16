// src/services/inventory.js
import { api } from "./api";

// Helper: decide stock status based on quantity vs threshold
export function getStockStatus(quantity = 0, lowStockThreshold = 10) {
  if (quantity <= 0) return "out";
  if (quantity <= lowStockThreshold) return "low";
  return "in";
}

export const inventoryService = {
  // GET /products?search=&category=
  async getInventoryItems({ category = "all", stockStatus = "all", search = "" } = {}) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category && category !== "all") params.set("category", category);

    const data = await api.get(`/products${params.toString() ? `?${params}` : ""}`);

    // support either array or { content: [...] }
    const list = Array.isArray(data) ? data : Array.isArray(data?.content) ? data.content : [];

    // client-side stock filter (if backend doesn’t do it)
    const filtered =
      stockStatus === "all"
        ? list
        : list.filter((p) => {
            const status = getStockStatus(p.quantity ?? 0, p.lowStockThreshold ?? 10);
            if (stockStatus === "in-stock")  return status === "in";
            if (stockStatus === "low-stock") return status === "low";
            if (stockStatus === "out-of-stock") return status === "out";
            return true;
          });

    return filtered;
  },

  // GET /categories (fallback: derive from /products)
  async getCategories() {
    try {
      return await api.get("/categories");
    } catch {
      const products = await api.get("/products");
      const list = Array.isArray(products) ? products : products?.content ?? [];
      return Array.from(new Set(list.map((p) => p.category))).filter(Boolean).sort();
    }
  },

  // POST /products  (multipart if image, else JSON)
  async createProduct(payload, imageFile) {
    // If your backend expects snake_case keys, map them here instead.
    if (imageFile) {
      const fd = new FormData();
      Object.entries(payload).forEach(([k, v]) => fd.append(k, v));
      fd.append("image", imageFile);
      return api.postFormData("/products", fd);
    }
    return api.postJson("/products", payload);
  },

  async updateProduct(id, payload) {
    return api.putJson(`/products/${id}`, payload);
  },

  async deleteProduct(id) {
    return api.del(`/products/${id}`);
  },

  getProductById(id) {
    return api.get(`/products/${id}`);
  },

  async adjustStock({ productId, delta, reason, userId }) {
    const params = new URLSearchParams();
    params.set("productId", String(productId));
    params.set("changeAmount", String(delta)); // matches backend @RequestParam
    params.set("reason", reason || "");
    if (userId) params.set("userId", String(userId)); // optional
    
    return api.postUrlEncoded("/stock-changes", params);
  },
};