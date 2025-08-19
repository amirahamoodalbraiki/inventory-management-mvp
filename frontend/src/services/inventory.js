// src/services/inventory.js
import { api } from "./api";

// Helper: decide stock status based on quantity vs threshold
export function getStockStatus(quantity = 0, lowStockThreshold = 0) {
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

  // Local category filter (works even if backend ignores ?category=)
  const byCategory =
    category === "all"
      ? list
      : list.filter(p => (p.category ?? "").toLowerCase() === String(category).toLowerCase());

  // Optional: local search fallback
  const q = search.trim().toLowerCase();
  const bySearch = q
    ? byCategory.filter(p => {
        const hay = `${p.name ?? ""} ${p.sku ?? ""} ${p.category ?? ""} ${p.description ?? ""}`.toLowerCase();
        return hay.includes(q);
      })
    : byCategory;

// Map UI values to internal status
const map = { "in-stock": "in", "low-stock": "low", "out-of-stock": "out" };
const desired = map[`${stockStatus}`.toLowerCase()] ?? `${stockStatus}`.toLowerCase();
console.log("🔎 stockStatus from UI:", stockStatus);
console.log("🔎 desired normalized value:", desired);
const filtered =
  desired === "all"
    ? bySearch
    : bySearch.filter((p) => {
        const qty = Number(p.quantity ?? 0);
        const thr = Number(p.lowStockThreshold);
        const status = getStockStatus(qty, thr); // "in" | "low" | "out"
        return status === desired;                // <-- compare to normalized value
      });
      console.log("🔎 returning", filtered.length, "of", bySearch.length, "items");
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