import React, { useEffect, useState } from "react";
import { inventoryService, getStockStatus } from "../services/inventory.js";
import { api } from "../services/api.js";

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, inStock: 0, out: 0 });
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

        const products = await inventoryService.getInventoryItems({});
        let inCount = 0, outCount = 0;
        const lowList = [];

        for (const p of products) {
          const qty = Number(p.quantity ?? 0);
          const thr = Number(p.lowStockThreshold ?? 0);
          const s = getStockStatus(qty, thr);
          if (s === "in") inCount++;
          else if (s === "out") outCount++;
          else lowList.push({ id: p.id, name: p.name, sku: p.sku, qty });
        }

        lowList.sort((a, b) => a.qty - b.qty);
        const lowTop = lowList.slice(0, 5);

        let tx = [];
        try {
          const raw = await api.get("/stock-changes"); // backend returns plain list
          const sorted = [...raw].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          tx = sorted.slice(0, 3).map((t, idx) => ({
            id: t.id ?? idx,
            ts: new Date(t.createdAt).toLocaleString(), // format nicely
            product: t.product?.name ?? `#${t.productId}`, // fallback if product not populated
            delta: t.changeAmount ?? 0,
            reason: t.reason ?? "",
            }));
        } catch {
          tx = [];
        }



        if (!alive) return;
        setStats({ total: products.length, inStock: inCount, out: outCount });
        setLowStock(lowTop);
        setRecentTx(tx);
      } catch {
        if (!alive) return;
        setErr("Failed to load dashboard");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const statsArray = [
    { label: "Total Products", value: loading ? "—" : stats.total },
    { label: "In Stock", value: loading ? "—" : stats.inStock },
    { label: "Out of Stock", value: loading ? "—" : stats.out },
  ];

  return (
    <div className="max-w-[1000px] w-full mx-auto px-5 py-6">
      <h1 className="text-[28px] font-extrabold text-[#253A82] mb-6">Dashboard</h1>

      {err && (
        <div className="mb-4 px-4 py-3 rounded border border-red-200 text-red-700 bg-red-50">
          {err}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statsArray.map((s, i) => (
          <div key={i} className="border border-[#88A2FF] rounded-lg bg-white p-5">
            <div className="text-sm text-[#253A82] font-semibold mb-2 opacity-80">{s.label}</div>
            <div className="text-3xl font-extrabold text-[#253A82]">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 mt-6 lg:grid-cols-3">
        <section className="border border-[#88A2FF] rounded-lg bg-white overflow-hidden lg:col-span-1">
          <header className="px-4 py-3 border-b border-[#88A2FF] bg-[#88A2FF]/20">
            <h2 className="text-[16px] font-bold text-[#253A82] m-0">Low Stock</h2>
          </header>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#88A2FF]/20">
                <th className="text-left px-4 py-3 border-b border-[#88A2FF] text-[13px] font-semibold text-[#253A82]">Product</th>
                <th className="text-left px-4 py-3 border-b border-[#88A2FF] text-[13px] font-semibold text-[#253A82]">SKU</th>
                <th className="text-left px-4 py-3 border-b border-[#88A2FF] text-[13px] font-semibold text-[#253A82]">Qty</th>
              </tr>
            </thead>
            <tbody>
              {(loading ? Array.from({ length: 3 }) : lowStock).map((i, idx) => (
                <tr key={i?.id ?? idx} className="border-b border-[#88A2FF]">
                  <td className="px-4 py-[14px] text-sm text-[#253A82]">{loading ? "…" : i.name}</td>
                  <td className="px-4 py-[14px] text-sm text-[#253A82]">{loading ? "…" : i.sku}</td>
                  <td className="px-4 py-[14px] text-sm text-[#253A82]">{loading ? "…" : i.qty}</td>
                </tr>
              ))}
              {!loading && lowStock.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-4 py-[14px] text-center text-[#253A82]">No low-stock items</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="border border-[#88A2FF] rounded-lg bg-white overflow-hidden lg:col-span-2">
          <header className="px-4 py-3 border-b border-[#88A2FF] bg-[#88A2FF]/20">
            <h2 className="text-[16px] font-bold text-[#253A82] m-0">Recent Transactions</h2>
          </header>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#88A2FF]/20">
                <th className="text-left px-4 py-3 border-b border-[#88A2FF] text-[13px] font-semibold text-[#253A82]">Date</th>
                <th className="text-left px-4 py-3 border-b border-[#88A2FF] text-[13px] font-semibold text-[#253A82]">Product</th>
                <th className="text-left px-4 py-3 border-b border-[#88A2FF] text-[13px] font-semibold text-[#253A82]">Change</th>
                <th className="text-left px-4 py-3 border-b border-[#88A2FF] text-[13px] font-semibold text-[#253A82]">Reason</th>
              </tr>
            </thead>
            <tbody>
              {(loading ? Array.from({ length: 3 }) : recentTx).map((t, idx) => (
                <tr key={t?.id ?? idx} className="border-b border-[#88A2FF]">
                  <td className="px-4 py-[14px] text-sm text-[#253A82]">{loading ? "…" : t.ts}</td>
                  <td className="px-4 py-[14px] text-sm text-[#253A82]">{loading ? "…" : t.product}</td>
                  <td className="px-4 py-[14px] text-sm text-[#253A82]">
                    {loading ? "…" : (t.delta > 0 ? `+${t.delta}` : t.delta)}
                  </td>
                  <td className="px-4 py-[14px] text-sm text-[#253A82]">{loading ? "…" : t.reason}</td>
                </tr>
              ))}
              {!loading && recentTx.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-[14px] text-center text-[#253A82]">No transactions</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
