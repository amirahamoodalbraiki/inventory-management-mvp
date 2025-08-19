// src/services/transactions.js
import { api } from "./api";

function normalize(r, i) {
  return {
    id: r.id ?? i,
    ts: r.createdAt ?? r.timestamp ?? "",
    product: r.product?.name ?? "",
    delta: typeof r.changeAmount === "number" ? r.changeAmount : Number(r.changeAmount ?? 0),
    reason: r.reason ?? "",
    user: r.changedBy?.name ?? "",
  };
}

function toDayStart(dStr) { return new Date(`${dStr}T00:00:00`); }
function toDayEnd(dStr)   { return new Date(`${dStr}T23:59:59.999`); }

export const transactionsService = {
  // All filtering is client-side; backend gets NO query params.
  async getTransactions({ search = "", from = "", to = "", productId = null } = {}) {
    const path = productId
      ? `/stock-changes/product/${productId}`
      : `/stock-changes`;

    // fetch without any ?query params
    const raw = await api.get(path);

    const list = (Array.isArray(raw) ? raw : raw?.content ?? []).map(normalize);

    // --- client-side date filter ---
    const startBound = from ? toDayStart(from) : null;
    const endBound   = to   ? toDayEnd(to)     : null;

    const byDate = list.filter(row => {
      if (!row.ts) return false;
      const d = new Date(row.ts);
      if (Number.isNaN(d.getTime())) return false;
      if (startBound && d < startBound) return false;
      if (endBound && d > endBound) return false;
      return true;
    });

    // --- client-side search filter (product/reason/user/delta) ---
    const q = search.trim().toLowerCase();
    const bySearch = q
      ? byDate.filter(r => {
          const hay = `${r.product} ${r.reason} ${r.user} ${r.delta}`.toLowerCase();
          return hay.includes(q);
        })
      : byDate;

    return bySearch;
  },
};