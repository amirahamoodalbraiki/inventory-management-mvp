import { useState, useEffect } from "react";
import { inventoryService, getStockStatus } from "../services/inventory.js";
import { useNavigate } from "react-router-dom";

function TopBar() {
  return (
    <div className="h-14 flex items-center justify-between px-5 bg-[#fafafa] border-b border-gray-300 sticky top-0 z-50">
      <div className="flex items-center gap-[10px]">
        <div aria-hidden className="w-[14px] h-[14px] bg-[#111827] rounded-[3px] rotate-90" />
        <span className="text-[18px] font-bold text-[#111827]">Inventory Manager</span>
      </div>
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIG34_9Mgmzn08YzxUu5iB-u5k-yElEiTnzEQKUcYjStBLFBG0SGsj-DGk4fWOuAe7lbX9YTdEAWY_URfDFRoMV_jqYIHR8ZTBeOIi_hPIXY7OtGw0_Y0h8AB4Uz8OniBEKKGnS4ja5m7F3dtMu5-uUS7uIgNfAehnVlp-g0ZbEDJIjeof7OTq_k-EgpiU1T_9HfcWikIBzNy03GiKhnWWb6QtSjSjcDZXG53WDMs0RoZIn6tuke561tXXz8jynIFy-a1HdSznRRSr"
        alt="User avatar"
        className="w-8 h-8 rounded-full object-cover"
      />
    </div>
  );
}

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

  const handleAddProduct = () => navigate("/products/new");
  //const handleEdit = (item) => alert(`Edit product: ${item.name} (SKU: ${item.sku ?? "n/a"})`);
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
    // go to /products/:id/adjust
    navigate(`/products/${item.id}/adjust`);
  };

  function renderStatusBadge(quantity) {
    const status = getStockStatus(quantity);
    const text = status === "out" ? "Out-of-stock" : status === "low" ? "Low-stock" : "In-stock";
    return (
      <span className="flex items-center justify-center px-3 py-1.5 rounded-lg w-[100px] text-[12px] font-medium text-black bg-[#dddddd] border border-gray-200">
        {text}
      </span>
    );
  }

  if (loading && items.length === 0) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto">
        <div className="text-center py-10 text-[#667085]">Loading inventory…</div>
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
            className="px-4 py-2 rounded-md bg-[#646cff] text-white border-0 cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <TopBar />
      <div className="flex-1 px-6 py-8 max-w-[1000px] w-full mx-auto">
        <header className="flex items-center justify-between">
          <h1 className="m-0 text-[#111827] text-[28px] font-extrabold">Products</h1>
          <button
            onClick={handleAddProduct}
            className="rounded-lg bg-[#dddddd] text-[#111827] border border-gray-200 text-[13px] font-semibold cursor-pointer px-4 py-2"
          >
            Add New Product
          </button>
        </header>

        <div className="mt-6">
          <div className="flex flex-col gap-3 items-start">
            <label className="relative inline-block">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="py-[10px] pl-[14px] pr-9 rounded-[10px] bg-[#dddddd] border-0 text-[#111827] text-[14px] font-semibold cursor-pointer appearance-none"
              >
                <option value="all">Category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 inline-flex items-center justify-center text-gray-500">▾</span>
            </label>

            <label className="relative inline-block">
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="py-[10px] pl-[14px] pr-9 rounded-[8px] bg-[#dddddd] border-0 text-[#111827] text-[14px] font-semibold cursor-pointer appearance-none"
              >
                <option value="all">Stock status</option>
                <option value="in-stock">In-stock</option>
                <option value="low-stock">Low-stock</option>
                <option value="out-of-stock">Out-of-stock</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 inline-flex items-center justify-center text-gray-500">▾</span>
            </label>
          </div>
        </div>

        <section className="mt-4">
          <div className="border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Product Name</th>
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">SKU</th>
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Category</th>
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Quantity</th>
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Low Stock Status</th>
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pagedItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-300">
                    <td className="px-4 py-[14px] text-sm text-[#111827]">{item.name}</td>
                    <td className="px-4 py-[14px] text-sm text-[#111827]">{item.sku}</td>
                    <td className="px-4 py-[14px] text-sm text-[#111827]">{item.category}</td>
                    <td className="px-4 py-[14px] text-sm text-[#111827]">{item.quantity}</td>
                    <td className="px-4 py-[14px] text-sm text-[#111827]">{renderStatusBadge(item.quantity)}</td>
                    <td className="px-4 py-[14px] text-sm text-[#111827]">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAdjust(item)}
                          className="bg-transparent border-0 p-0 cursor-pointer text-gray-500 font-bold">
                          Adjust
                        </button>
                        <span className="text-gray-400">|</span>
                        <button onClick={() => handleEdit(item)} className="bg-transparent border-0 p-0 cursor-pointer text-gray-500 font-bold">Edit</button>
                        <span className="text-gray-400">|</span>
                        <button onClick={() => handleDelete(item.id)} className="bg-transparent border-0 p-0 cursor-pointer text-gray-500 font-bold">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pagedItems.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-[14px] text-center text-gray-500">No items found</td>
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
                className={`border-0 bg-transparent text-[22px] leading-none ${page === 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer text-[#111827]"}`}
              >
                &lt;
              </button>

              {getDisplayPages(page, pageCount).map((p, idx) =>
                p === "…" ? (
                  <span key={`gap-${idx}`} className="text-[24px] text-[#111827]">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-12 h-12 rounded-full border-0 text-[15px] font-medium cursor-pointer ${p === page ? "bg-[#f1f1f1] text-[#111827]" : "bg-transparent text-[#111827]"}`}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                aria-label="Next page"
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                disabled={page === pageCount}
                className={`border-0 bg-transparent text-[22px] leading-none ${page === pageCount ? "opacity-35 cursor-not-allowed" : "cursor-pointer text-[#111827]"}`}
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
