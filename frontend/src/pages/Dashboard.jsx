import React from "react";

const stats = [
  { label: "Total Products", value: 124 },
  { label: "In Stock", value: 109 },
  { label: "Out of Stock", value: 15 },
];

const lowStock = [
  { id: 1, name: "USB-C Cable", sku: "CAB-001", qty: 3 },
  { id: 2, name: "Notebook A5", sku: "STA-144", qty: 5 },
  { id: 3, name: "Water Bottle", sku: "OUT-220", qty: 2 },
];

const recentTx = [
  { id: 101, ts: "2025-08-17 14:22", product: "USB-C Cable", delta: -4, reason: "Sale" },
  { id: 102, ts: "2025-08-17 10:05", product: "Desk Lamp", delta: +10, reason: "Purchase" },
  { id: 103, ts: "2025-08-16 18:31", product: "Notebook A5", delta: -2, reason: "Sale" },
];

export default function Dashboard() {
  return (
    <div className="max-w-[1000px] w-full mx-auto px-5 py-6">
      <h1 className="text-[28px] font-extrabold text-[#111827] mb-6">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border border-gray-300 rounded-lg bg-white p-5">
          <div className="text-sm text-gray-600 font-semibold mb-2">{stats[0].label}</div>
          <div className="text-3xl font-extrabold text-[#111827]">{stats[0].value}</div>
        </div>
        <div className="border border-gray-300 rounded-lg bg-white p-5">
          <div className="text-sm text-gray-600 font-semibold mb-2">{stats[1].label}</div>
          <div className="text-3xl font-extrabold text-[#111827]">{stats[1].value}</div>
        </div>
        <div className="border border-gray-300 rounded-lg bg-white p-5">
          <div className="text-sm text-gray-600 font-semibold mb-2">{stats[2].label}</div>
          <div className="text-3xl font-extrabold text-[#111827]">{stats[2].value}</div>
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
              {lowStock.map((i) => (
                <tr key={i.id} className="border-b border-gray-300">
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{i.name}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{i.sku}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{i.qty}</td>
                </tr>
              ))}
              {lowStock.length === 0 && (
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
              {recentTx.map((t) => (
                <tr key={t.id} className="border-b border-gray-300">
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{t.ts}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{t.product}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{t.delta > 0 ? `+${t.delta}` : t.delta}</td>
                  <td className="px-4 py-[14px] text-sm text-[#111827]">{t.reason}</td>
                </tr>
              ))}
              {recentTx.length === 0 && (
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