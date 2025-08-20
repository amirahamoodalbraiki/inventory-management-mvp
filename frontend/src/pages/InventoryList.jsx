import { useState, useEffect } from "react";
import { inventoryService, getStockStatus } from "../services/inventory.js";
import { useNavigate } from "react-router-dom";

function getDisplayPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = [1];
  const L = Math.max(2, current - 1);
  const R = Math.min(total - 1, current + 1);
  if (L > 2) out.push("…");
  for (let p = L; p <= R; p++) out.push(p);
  if (R < total - 1) out.push("…");
  out.push(total);
  return out;
}

export default function InventoryList() {
  const navigate = useNavigate();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    loadCategories();
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPage(1);
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter, stockFilter]);

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pagedItems = items.slice(start, end);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const data = await inventoryService.getInventoryItems({
        category: categoryFilter,
        stockStatus: stockFilter,
      });
      setItems(data);
    } catch (e) {
      setError("Failed to load inventory data");
    } finally {
      setLoading(false);
    }
  }

  async function loadCategories() {
    try {
      const data = await inventoryService.getCategories();
      setCategories(data);
    } catch {}
  }

  function exportCsv() {
    const rows = items.map(p => ({
      Name: p.name ?? "",
      SKU: p.sku ?? "",
      Category: p.category ?? "",
      Quantity: p.quantity ?? 0,
      "Low Stock Threshold": p.lowStockThreshold ?? "",
      "Unit Price": p.unitPrice ?? "",
    }));
    const headers = Object.keys(rows[0] || {Name:"",SKU:"",Category:"",Quantity:"","Low Stock Threshold":"", "Unit Price":""});
    const escape = (v) => {
      const s = String(v ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv =
      headers.join(",") + "\n" +
      rows.map(r => headers.map(h => escape(r[h])).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventory-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleAddProduct = () => navigate("/products/new");
  function handleEdit(item) {
    navigate(`/products/${item.id}/edit`);
  }
  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;
    try {
      await inventoryService.deleteProduct(id);
      await loadData();
    } catch {
      alert("Failed to delete. Try again.");
    }
  };
  const handleAdjust = (item) => {
    navigate(`/products/${item.id}/adjust`);
  };

  function renderStatusBadge(quantity, lowStockThreshold = 10) {
    const status = getStockStatus(Number(quantity ?? 0), Number(lowStockThreshold ?? 10));
    const text = status === "out" ? "Out-of-stock"
               : status === "low" ? "Low-stock"
               : "In-stock";
    return (
      <span className="flex items-center justify-center px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#253A82] bg-[#88A2FF]/20 border border-[#88A2FF] whitespace-nowrap">
        {text}
      </span>
    );
  }

  if (loading && items.length === 0) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="text-center py-10 text-[#253A82]">Loading inventory…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="text-center py-10">
          <div className="text-[#B42318] mb-3">{error}</div>
          <button
            onClick={loadData}
            className="px-4 py-2 rounded-md bg-[#253A82] text-white border-0 cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#C0E0FF]">
      <div className="flex-1 px-6 py-8 max-w-[1000px] w-full mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="m-0 text-[#253A82] text-[28px] font-extrabold">Products</h1>
          <div className="flex gap-2">
            <button
              onClick={exportCsv}
              className="rounded-lg bg-[#88A2FF] text-white border border-[#88A2FF] text-[13px] font-semibold cursor-pointer px-4 py-2"
            >
              Export CSV
            </button>
            <button
              onClick={handleAddProduct}
              className="rounded-lg bg-[#88A2FF] text-white border border-[#88A2FF] text-[13px] font-semibold cursor-pointer px-4 py-2"
            >
              Add New Product
            </button>
          </div>
        </header>

        <div className="mt-6">
          <div className="flex flex-col gap-3 items-start">
            <label className="relative inline-block">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py[10px] pl-[14px] pr-9 rounded-[10px] bg-white border border-[#88A2FF] text-[#253A82] text-[14px] font-semibold cursor-pointer appearance-none"
              >
                <option value="all">Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 inline-flex items-center justify-center text-[#253A82]">▾</span>
            </label>

            <label className="relative inline-block">
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="py-[10px] pl-[14px] pr-9 rounded-[8px] bg-white border border-[#88A2FF] text-[#253A82] text-[14px] font-semibold cursor-pointer appearance-none"
              >
                <option value="all">Stock status</option>
                <option value="in">In-stock</option>
                <option value="low">Low-stock</option>
                <option value="out">Out-of-stock</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 inline-flex items-center justify-center text-[#253A82]">▾</span>
            </label>
          </div>
        </div>

        <section className="mt-4">
          <div className="border border-[#88A2FF] rounded-lg bg-white shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#88A2FF]/20">
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Product Name</th>
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">SKU</th>
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Category</th>
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Quantity</th>
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Low Stock Status</th>
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedItems.map((item) => (
                  <tr key={item.id} className="border-b border-[#88A2FF]">
                    <td className="px-4 py-[14px] text-sm text-[#253A82]">{item.name}</td>
                    <td className="px-4 py-[14px] text-sm text-[#253A82]">{item.sku}</td>
                    <td className="px-4 py-[14px] text-sm text-[#253A82]">{item.category}</td>
                    <td className="px-4 py-[14px] text-sm text-[#253A82]">{item.quantity}</td>
                    <td className="px-4 py-[14px] text-sm text-[#253A82]">{renderStatusBadge(item.quantity, item.lowStockThreshold)}</td>
                    <td className="px-4 py-[14px] text-sm text-[#253A82]">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAdjust(item)}
                          className="bg-transparent border-0 p-0 cursor-pointer text-[#253A82] font-bold">
                          Adjust
                        </button>
                        <span className="text-[#88A2FF]">|</span>
                        <button onClick={() => handleEdit(item)} className="bg-transparent border-0 p-0 cursor-pointer text-[#253A82] font-bold">Edit</button>
                        <span className="text-[#88A2FF]">|</span>
                        <button onClick={() => handleDelete(item.id)} className="bg-transparent border-0 p-0 cursor-pointer text-[#253A2E] font-bold">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pagedItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-[14px] text-center text-[#253A82]">No items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {total > 0 && (
            <div className="flex items-center justify-center gap-4 p-2.5 mt-auto">
              <button
                aria-label="Previous page"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className={`border-0 bg-transparent text-[22px] leading-none ${page === 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer text-[#253A82]"}`}
              >
                &lt;
              </button>

              {getDisplayPages(page, pageCount).map((p, idx) =>
                p === "…" ? (
                  <span key={`gap-${idx}`} className="text-[24px] text-[#253A82]">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-12 h-12 rounded-full border-0 text-[15px] font-medium cursor-pointer ${p === page ? "bg-[#88A2FF] text-white" : "bg-transparent text-[#253A82]"}`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                aria-label="Next page"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className={`border-0 bg-transparent text-[22px] leading-none ${page === pageCount ? "opacity-35 cursor-not-allowed" : "cursor-pointer text-[#253A82]"}`}
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
