import React, { useEffect, useState } from "react";
import { inventoryService, getStockStatus } from "../services/inventory.js";
import { getTransactionSummary as fetchTxSummary } from "../services/transactions.js"; // if you added it

export default function Dashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, inStock: 0, outOfStock: 0 });
  const [lowStock, setLowStock] = useState([]);
  const [recentTx, setRecentTx] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");

        // fetch all products once
        const products = await inventoryService.getInventoryItems({}); // uses /products under the hood

        // compute stats locally
        const total = products.length;
        let inCount = 0, outCount = 0, lowCount = 0;
        const lowList = [];
        for (const p of products) {
          const qty = Number(p.quantity ?? 0);
          const thr = Number(p.lowStockThreshold ?? 0);
          const s = getStockStatus(qty, thr); // "in" | "low" | "out"
          if (s === "in") inCount += 1;
          else if (s === "low") {
            lowCount += 1;
            lowList.push({ id: p.id, name: p.name, sku: p.sku, qty });
          } else outCount += 1;
        }

        lowList.sort((a, b) => a.qty - b.qty);
        const lowTop = lowList.slice(0, 5);

        // recent transactions summary (keep existing service if you added it)
        let txRecent = [];
        try {
          const tx = await fetchTxSummary({ limit: 5 });
          txRecent = Array.isArray(tx?.recent) ? tx.recent.slice(0, 5) : Array.isArray(tx) ? tx.slice(0, 5) : [];
        } catch {
          txRecent = [];
        }

        if (!alive) return;
        setStats({ totalProducts: total, inStock: inCount, outOfStock: outCount, lowCount });
        setLowStock(lowTop);
        setRecentTx(txRecent);
      } catch (e) {
        if (!alive) return;
        setErr("Failed to load dashboard");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <div className="max-w-[1000px] w-full mx-auto px-5 py-6">
      <h1 className="text-[28px] font-extrabold text-[#111827] mb-6">Dashboard</h1>

      {err && (
        <div className="mb-4 px-4 py-3 rounded border border-red-200 text-red-700 bg-red-50">
          {err}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border border-gray-300 rounded-lg bg-white p-5">
          <div className="text-sm text-gray-600 font-semibold mb-2">Total Products</div>
          <div className="text-3xl font-extrabold text-[#111827]">
            {loading ? "—" : stats.totalProducts}
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg bg-white p-5">
          <div className="text-sm text-gray-600 font-semibold mb-2">In Stock</div>
          <div className="text-3xl font-extrabold text-[#111827]">
            {loading ? "—" : stats.inStock}
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg bg-white p-5">
          <div className="text-sm text-gray-600 font-semibold mb-2">Out of Stock</div>
          <div className="text-3xl font-extrabold text-[#111827]">
            {loading ? "—" : stats.outOfStock}
          </div>
        </div>
      </div>

      <div className="grid gap-4 mt-6 lg:grid-cols-3">
        <section className="border border-gray-300 rounded-lg bg-white overflow-hidden lg:col-span-1">
          <header className="px-4 py-3 border-b border-gray-300 bg-[#f9fafb]">
            <h2 className="text-[16px] font-bold text-[#111827] m-0">Low Stock</h2>
          </header>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f9fafb]">
                <th className="text-left px-4 py-3 border-b border-gray-300 text-[13px] font-semibold text-[#111827]">Product</th>
                <th className="text-left px-4 py-3 border-b border-gray-300 text-[13px] font-semibold text-[#111827]">SKU</th>
                <th className="text-left px-4 py-3 border-b border-gray-300 text-[13px] font-semibold text-[#111827]">Qty</th>
              </tr>
            </thead>
            <tbody>
              {(loading ? Array.from({ length: 3 }) : lowStock).map((i, idx) => (
                <tr key={i?.id ?? idx} className="border-b border-gray-300">
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{loading ? "…" : i.name}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{loading ? "…" : i.sku}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{loading ? "…" : i.qty}</td>
                </tr>
              ))}
              {!loading && lowStock.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-[14px] text-center text-gray-500">No low-stock items</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="border border-gray-300 rounded-lg bg-white overflow-hidden lg:col-span-2">
          <header className="px-4 py-3 border-b border-gray-300 bg-[#f9fafb]">
            <h2 className="text-[16px] font-bold text-[#111827] m-0">Recent Transactions</h2>
          </header>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f9fafb]">
                <th className="text-left px-4 py-3 border-b border-gray-300 text-[13px] font-semibold text-[#111827]">Date</th>
                <th className="text-left px-4 py-3 border-b border-gray-300 text-[13px] font-semibold text-[#111827]">Product</th>
                <th className="text-left px-4 py-3 border-b border-gray-300 text-[13px] font-semibold text-[#111827]">Change</th>
                <th className="text-left px-4 py-3 border-b border-gray-300 text-[13px] font-semibold text-[#111827]">Reason</th>
              </tr>
            </thead>
            <tbody>
              {(loading ? Array.from({ length: 3 }) : recentTx).map((t, idx) => (
                <tr key={t?.id ?? idx} className="border-b border-gray-300">
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{loading ? "…" : t.ts}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{loading ? "…" : t.product}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">
                    {loading ? "…" : (t.delta > 0 ? `+${t.delta}` : t.delta)}
                  </td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{loading ? "…" : t.reason}</td>
                </tr>
              ))}
              {!loading && recentTx.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-[14px] text-center text-gray-500">No transactions</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
