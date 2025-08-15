// src/services/transactions.js
import { api } from "./api";

// Normalize backend row to the UI shape your table expects
function normalize(r, i) {
  return {
    id: r.id ?? i,
    ts: r.createdAt ?? r.timestamp ?? "",          // ISO string
    product: r.product?.name ?? "",
    delta: typeof r.changeAmount === "number" ? r.changeAmount : Number(r.changeAmount ?? 0),
    reason: r.reason ?? "",
    user: r.changedBy?.name ?? "",
  };
}

export const transactionsService = {
  /**
   * params: { search, from, to, productId }
   * - `from` & `to` should be YYYY-MM-DD (from <input type="date">).
   * - Backend endpoints:
   *    • GET /stock-changes
   *    • GET /stock-changes/product/:productId
   */
  async getTransactions({ search = "", from = "", to = "", productId = null } = {}) {
    const qs = new URLSearchParams();
    if (search) qs.set("search", search);
    if (from) qs.set("from", from);
    if (to) qs.set("to", to);

    const path = productId
      ? `/stock-changes/product/${productId}`
      : `/stock-changes`;

    const raw = await api.get(`${path}${qs.toString() ? `?${qs}` : ""}`);
    const list = Array.isArray(raw) ? raw : Array.isArray(raw?.content) ? raw.content : [];
    return list.map(normalize);
  },
};