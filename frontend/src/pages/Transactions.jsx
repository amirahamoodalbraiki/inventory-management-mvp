import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { transactionsService } from "../services/transactions.js";

/* ───────── Pagination chips  ───────── */
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

  

/* ───────── Tiny UI styles  ───────── */
const inputBase = {
    width: 220,               
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#111827",
    fontSize: 14,
    outline: "none",
  };

const lbl = { fontSize: 12, color: "#6b7280", fontWeight: 600 };

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

export default function Transactions() {
  // Filters 
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");  // "DD/MM/YYYY"
  const [to, setTo] = useState("");      // "DD/MM/YYYY"

  // Data + loading/error
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination (same pattern)
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  // Load data
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionsService.getTransactions({ search, from, to });
      setItems(data);
      setPage(1); // reset when filters change
    } catch (e) {
      console.error(e);
      setError("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, from, to]); // reload on filter change

  // Derived pagination slice
  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const pagedItems = useMemo(() => items.slice(start, start + rowsPerPage), [items, start, rowsPerPage]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#fafafa" }}>
      <Navbar /> 
      <main style={{ flex: 1, maxWidth: 1000, margin: "0 auto", padding: "24px 20px 48px", width: "100%" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 16 }}>Transaction History</h1>

        {/* Search + Date range box */}
        <div style={{ display: "grid", gap: 14, borderRadius: 8}}>
          <div style={{ 
            display: "flex", alignItems: "center", gap: 10, border: "1px solid #e5e7eb", background: "#dddddd", borderRadius: 8, padding: "8px 12px" 
            }}>
            <svg width="18" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#6b7280" strokeWidth="2" />
              <path d="M20 20L17 17" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, border: "none", outline: "none", background: "#dddddd", fontSize: 14, color: "#111827" }}
            />
          </div>

      {/* From / To row */}
            <div
                style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 24,        //  space between From/To
                }}
            >
                <label style={{ display: "grid", gap: 6 }}>
                <span style={lbl}>From</span>
                <input
                    type = "date"
                    placeholder="DD/MM/YYYY"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    max={to || undefined} 
                    style={inputBase}
                />
                </label>
                <label style={{ display: "grid", gap: 6 }}>
                <span style={lbl}>To</span>
                <input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    min={from || undefined}   
                    style={inputBase}
                />
            </label>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && items.length === 0 && (
          <div style={{ textAlign: "center", padding: 24, color: "#6b7280" }}>Loading transactions…</div>
        )}
        {error && (
          <div style={{ textAlign: "center", padding: 24, color: "#B42318" }}>
            {error}
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <section style={{ marginTop: 16 }}>
            <div style={{ border: "1px solid #d1d5db", borderRadius: 8, background: "#ffffff", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Product Name</th>
                    <th style={thStyle}>Change Amount</th>
                    <th style={thStyle}>Reason</th>
                    <th style={thStyle}>Changed By</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedItems.map((t) => (
                    <tr key={t.id} style={{ borderBottom: "1px solid #d1d5db" }}>
                      <td style={tdStyle}>{t.ts}</td>
                      <td style={tdStyle}>{t.product}</td>
                      <td style={tdStyle}>{t.delta > 0 ? `+${t.delta}` : t.delta}</td>
                      <td style={tdStyle}>{t.reason}</td>
                      <td style={tdStyle}>{t.user}</td>
                    </tr>
                  ))}
                  {pagedItems.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ ...tdStyle, textAlign: "center", color: "#6b7280" }}>
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination ( */}
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
                  p === "…" ? (
                    <span key={`gap-${idx}`} style={pageDotStyle}>…</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p)} style={pageNumBtnStyle(p === page)}>
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
          </section>
        )}
      </main>
    </div>
  );
}