import { useState, useEffect} from "react";
import { inventoryService, getStockStatus } from "../services/inventory.js";
import { useNavigate } from "react-router-dom";


function TopBar() {
  return (
    <div
      style={{
        height: 56,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "#fafafa", 
        borderBottom: "1px solid #d1d5db",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left: mini logo + title */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          aria-hidden
          style={{
            width: 14,
            height: 14,
            background: "#111827",
            borderRadius: 3,
            transform: "rotate(90deg)",
          }}
        />
        <span style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>
          Inventory Manager
        </span>
      </div>

      {/* Right: avatar */}
      <img
         src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIG34_9Mgmzn08YzxUu5iB-u5k-yElEiTnzEQKUcYjStBLFBG0SGsj-DGk4fWOuAe7lbX9YTdEAWY_URfDFRoMV_jqYIHR8ZTBeOIi_hPIXY7OtGw0_Y0h8AB4Uz8OniBEKKGnS4ja5m7F3dtMu5-uUS7uIgNfAehnVlp-g0ZbEDJIjeof7OTq_k-EgpiU1T_9HfcWikIBzNy03GiKhnWWb6QtSjSjcDZXG53WDMs0RoZIn6tuke561tXXz8jynIFy-a1HdSznRRSr"
        alt="User avatar"
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          display: "block",
          objectFit: "cover",
        }}
      />
    </div>
  );
}
/* ─────────────── Pagination helper + styles (NEW) ─────────────── */
function getDisplayPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];
  const windowSize = 1; // how many numbers around current to show (1 => current-1, current, current+1)

  pages.push(1);

  const left = Math.max(2, current - windowSize);
  const right = Math.min(total - 1, current + windowSize);

  if (left > 2) pages.push("...");

  for (let p = left; p <= right; p++) pages.push(p);

  if (right < total - 1) pages.push("...");

  pages.push(total);

  return pages;
}
const pagBarStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 15,
  padding: "10px",
  marginTop: "auto",
};

const arrowBtnStyle = (disabled) => ({
  border: "none",
  background: "transparent",
  fontSize: 22,
  lineHeight: 1,
  cursor: disabled ? "not-allowed" : "pointer",
  color: "#111827",
  opacity: disabled ? 0.35 : 1,
});

const pageDotStyle = { fontSize: 24, color: "#111827" };

const pageNumBtnStyle = (active) => ({
  width: 48,
  height: 48,
  borderRadius: "50%",
  border: "none",
  background: active ? "#f1f1f1" : "transparent",
  color: "#111827",
  fontSize: 15,
  fontWeight: 500,
  cursor: "pointer",
});

export default function InventoryList() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/products/new");
  };

  // State management
  //const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  
  // Data and loading states
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Pagination state ---
const [page, setPage] = useState(1);          // 1-based page index
const [rowsPerPage, setRowsPerPage] = useState(10); // change if you want 5/20/etc.

  // Load initial data
  useEffect(() => {
    loadCategories();
    loadData();
  }, []);

  useEffect(() => {
    setPage(1);
    loadData();
  }, [categoryFilter, stockFilter]);

  // ★ Pagination: derived values
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pagedItems = items.slice(start, end); // use this in the table


  // Load data with current filters
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get items with current filters
      const itemsData = await inventoryService.getInventoryItems({
        //search,
        category: categoryFilter,
        stockStatus: stockFilter
      });
      
      setItems(itemsData);
    } catch (err) {
      setError('Failed to load inventory data');
      console.error('Error loading inventory:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load categories for filter dropdown
  const loadCategories = async () => {
    try {
      const categoriesData = await inventoryService.getCategories();
      setCategories(categoriesData);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  
  const handleEdit = (item) => {
    alert(`Edit product: ${item.name} (SKU: ${item.sku ?? "n/a"})`);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;
    try {
      // expects DELETE /api/products/:id in your service
      await inventoryService.deleteProduct(id);
      await loadData();
    } catch (e) {
      console.error("Delete failed", e);
      alert("Failed to delete. Try again.");
    }
  };
  // Render status badge
  const renderStatusBadge = (quantity) => {
    const status = getStockStatus(quantity);
    let statusText = "In-stock";
    
    if (status === 'low') {
      statusText = "Low-stock";
    } else if (status === 'out') {
      statusText = "Out-of-stock";
    }
    
    return (
      <span style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px 12px",
        borderRadius: "8px",
        width: "100px",
        fontSize: "12px",
        fontWeight: "500",
        color: "#000000",
        background: "#dddddd",
        border: "1px solid #e5e7eb",
      }}>
        {statusText}
      </span>
    );
  };

  // Loading state
  if (loading && items.length === 0) {
    return (
      <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 16, color: "#667085" }}>Loading inventory...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 16, color: "#B42318", marginBottom: 12 }}>{error}</div>
          <button 
            onClick={loadData}
            style={{
              padding: "8px 16px",
              borderRadius: 6,
              background: "#646cff",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
       minHeight: "100vh", 
       display:"flex",
       flexDirection:"column",
       background: "#ffffff" }}>
      <TopBar />
    <div style={{ 
      flex:1,
      padding: "32px 24px",
       maxWidth: 1000, 
       width: "100%",
       margin: "0 auto" 
      }}>
      {/* Header row: title left, button right */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
      
        }}
      >
        <h1 style={{ margin: 0, color: "#111827", fontSize: 28, fontWeight: 800 }}>
          Products
        </h1>
  
        {/* Add New Product button */}
        <button
          onClick={handleAddProduct}
          style={{
            borderRadius: 8,
            background: "#dddddd",
            color: "#111827",
            border: "1px solid #e5e7eb",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Add New Product
        </button>
      </header>

    {/* Controls: two separate inline filters */}
<div style={{ marginTop: 24 }}>
  <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
    {/* Category */}
    <label>
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          background: "#dddddd",
          border: "none",
          color: "#111827",
          fontSize: 14,
          fontWeight: 600,
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg fill='none' stroke='%236b7280' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "16px",
          paddingRight: 34,
          cursor: "pointer",
        }}
      >
        <option value="all">Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </label>

    {/* Stock status */}
    <label>
      <select
        value={stockFilter}
        onChange={(e) => setStockFilter(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: 8,
          background: "#dddddd",
          border: "none",
          color: "#111827",
          fontSize: 14,
          fontWeight: 600,
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg fill='none' stroke='%236b7280' stroke-width='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "16px",
          paddingRight: 34,
          cursor: "pointer",
        }}
      >
        <option value="all">Stock status</option>
        <option value="in-stock">In-stock</option>
        <option value="low-stock">Low-stock</option>
        <option value="out-of-stock">Out-of-stock</option>
      </select>
    </label>
  </div>


          
        </div>

        <section style={{ marginTop: 16 }}>
                    <div  style={{
                border: "1px solid #d1d5db",
                borderRadius: 8,
                background: "#ffffff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                overflow: "hidden",
              }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th style={thStyle}>Product Name</th>
                  <th style={thStyle}>SKU</th>
                  <th style={thStyle}>Category</th>
                  <th style={thStyle}>Quantity</th>
                  <th style={thStyle}>Low Stock Status</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                  {/* ★ Pagination: map over pagedItems */}
                  {pagedItems.map((item) =>  (
                  <tr key={item.id} style={{ borderBottom: "1px solid #d1d5db" }}>
                    <td style={tdStyle}>{item.name}</td>
                    <td style={tdStyle}>{item.sku}</td>
                    <td style={tdStyle}>{item.category}</td>
                    <td style={tdStyle}>{item.quantity}</td>
                    <td style={tdStyle}>{renderStatusBadge(item.quantity)}</td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => handleEdit(item)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            color: "#6b7280",
                            fontWeight: 700,
                          }}
                        >
                          Edit
                        </button>
                        <span style={{ color: "#9ca3af" }}>|</span>
                        <button
                          onClick={() => handleDelete(item.id)}
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                            cursor: "pointer",
                            color: "#6b7280",
                            fontWeight: 700,
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {items.length === 0 && !loading && (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "#6b7280" }}>
              No items found matching your criteria
            </div>
          )}
        </section>
      </div>
       {/* Pretty pagination (NEW) */}
       {total > 0 && (
              <div style={pagBarStyle}>
                <button
                  aria-label="Previous page"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={arrowBtnStyle(page === 1)}
                >
                  &lt;
                </button>

                {getDisplayPages(page, pageCount).map((p, idx) =>
                  p === "..." ? (
                    <span key={`gap-${idx}`} style={pageDotStyle}>
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      style={pageNumBtnStyle(p === page)}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  aria-label="Next page"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  style={arrowBtnStyle(page === pageCount)}
                >
                  &gt;
                </button>
              </div> 
          )}
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px 16px",
  borderBottom: "1px solid #d1d5db",
  fontWeight: 600,
  fontSize: 13,
  color: "#111827",
};

const tdStyle = {
  padding: "14px 16px",
  borderBottom: "1px solid #d1d5db",
  color: "#111827",
  fontSize: 14,
};

const actionBtn = {
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  color: "#6b7280",
  fontWeight: 700,
  fontSize: 13,
};
