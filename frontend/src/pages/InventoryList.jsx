import { useState, useEffect } from "react";
import { inventoryService, getStockStatus, getStatusBadgeData } from "../services/inventory.js";

export default function InventoryList() {
  const navigate = useNavigate();

  const handleAddProduct = () => {

    navigate("/products/new");
  };

  // State management
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  
  // Data and loading states
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  // Load data with current filters
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get items with current filters
      const itemsData = await inventoryService.getInventoryItems({
        search,
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

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Handle search
  const handleSearch = () => {
    loadData();
  };

  // Handle filter changes
  const handleFilterChange = () => {
    loadData();
    setFiltersOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setStockFilter("all");
    // Data will be reloaded on next render due to useEffect
  };

  // Reload data when filters change
  useEffect(() => {
    loadData();
  }, [search, categoryFilter, stockFilter]);

  // Render status badge
  const renderStatusBadge = (quantity, lowStockThreshold = 10) => {
    const status = getStockStatus(quantity, lowStockThreshold);
    const badgeData = getStatusBadgeData(status);
    
    return (
      <span style={badgeStyle(badgeData.color, badgeData.background, badgeData.border)}>
        {badgeData.text}
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
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto" }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>Inventory</h1>
          <p style={{ marginTop: 6, color: "#8d8d8d" }}>Track and manage items</p>
        </div>
      </header>

      {/* Controls: full-width search, filters under it on the right */}
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ position: "relative", flex: 1 }}>
            <svg
              style={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                width: 16,
                height: 16,
                zIndex: 1,
                color: "rgba(0,0,0,0.35)",
              }}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search items..."
              style={{
                width: "100%",
                padding: "10px 12px 10px 36px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "#fff",
                color: "#213547",
                outline: "none",
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: "10px 16px",
              borderRadius: 8,
              background: loading ? "#ccc" : "#646cff",
              color: "#fff",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end", position: "relative" }}>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 12px",
              borderRadius: 8,
              background: "#f3f4f6",
              color: "#213547",
              border: "1px solid rgba(0,0,0,0.1)",
              minWidth: 110,
              justifyContent: "space-between",
            }}
          >
            Filters <span>▾</span>
          </button>

          {filtersOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                width: 320,
                padding: 12,
                borderRadius: 12,
                background: "#ffffff",
                color: "#213547",
                border: "1px solid rgba(0,0,0,0.1)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                zIndex: 10,
              }}
            >
              <div style={{ display: "grid", gap: 12 }}>
                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Category</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.15)",
                      background: "#fff",
                      color: "#213547",
                    }}
                  >
                    <option value="all">All</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label style={{ display: "grid", gap: 6 }}>
                  <span style={{ fontSize: 12, fontWeight: 600 }}>Stock Status</span>
                  <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.15)",
                      background: "#fff",
                      color: "#213547",
                    }}
                  >
                    <option value="all">All</option>
                    <option value="in">In stock</option>
                    <option value="low">Low stock</option>
                    <option value="out">Out of stock</option>
                  </select>
                </label>

                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button onClick={resetFilters}>
                    Reset
                  </button>
                  <button 
                    onClick={handleFilterChange}
                    style={{ background: "#646cff", color: "#fff" }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <section style={{ marginTop: 20 }}>
        <div style={{
          overflow: "auto",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 12,
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
            <thead>
              <tr style={{ background: "rgba(0,0,0,0.03)" }}>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>SKU</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Low-Stock Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={tdStyle}>{item.name}</td>
                  <td style={tdStyle}>{item.sku}</td>
                  <td style={tdStyle}>{item.category}</td>
                  <td style={tdStyle}>{item.quantity}</td>
                  <td style={tdStyle}>{renderStatusBadge(item.quantity, item.lowStockThreshold)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: "#667085" }}>
            No items found matching your criteria
          </div>
        )}
      </section>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px 14px",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
  fontWeight: 600,
};

const tdStyle = {
  padding: "12px 14px",
  borderBottom: "1px solid rgba(0,0,0,0.06)",
};

function badgeStyle(color, background, border) {
  return {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 8px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    color,
    background,
    border: `1px solid ${border}`,
  };
}