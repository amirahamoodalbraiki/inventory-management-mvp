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

export default function Transactions() {
  // Filters
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Data + loading/error
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionsService.getTransactions({ search, from, to });
      setItems(data);
      setPage(1);
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
  }, []);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, from, to]);

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const pagedItems = useMemo(() => items.slice(start, start + rowsPerPage), [items, start, rowsPerPage]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Navbar />
      <main className="flex-1 max-w-[1000px] w-full mx-auto px-5 py-6 pb-12">
        <h1 className="text-[28px] font-extrabold text-[#111827] mb-4">Transaction History</h1>

        {/* Search + Date range box */}
        <div className="grid gap-[14px] rounded-lg">
          <div className="flex items-center gap-[10px] border border-gray-200 bg-[#dddddd] rounded-lg px-3 py-2">
            <svg width="18" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#6b7280" strokeWidth="2" />
              <path d="M20 20L17 17" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-0 outline-none bg-[#dddddd] text-[14px] text-[#111827]"
            />
          </div>

          {/* From / To row */}
          <div className="flex items-start gap-6">
            <label className="grid gap-1.5">
              <span className="text-[12px] text-[#6b7280] font-semibold">From</span>
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                max={to || undefined}
                className="w-[220px] px-3 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[#111827] text-[14px] outline-none"
              />
            </label>

            <label className="grid gap-1.5">
              <span className="text-[12px] text-[#6b7280] font-semibold">To</span>
              <input
                type="date"
                placeholder="DD/MM/YYYY"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                min={from || undefined}
                className="w-[220px] px-3 py-2.5 rounded-[10px] border border-gray-200 bg-white text-[#111827] text-[14px] outline-none"
              />
            </label>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && items.length === 0 && (
          <div className="text-center p-6 text-[#6b7280]">Loading transactions…</div>
        )}
        {error && (
          <div className="text-center p-6 text-[#B42318]">{error}</div>
        )}

        {/* Table */}
        {!loading && !error && (
          <section className="mt-4">
            <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb]">
                    <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Date</th>
                    <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Product Name</th>
                    <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Change Amount</th>
                    <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Reason</th>
                    <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Changed By</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedItems.map((t) => (
                    <tr key={t.id} className="border-b border-gray-300">
                      <td className="px-4 py-[14px] text-[14px] text-[#111827]">{t.ts}</td>
                      <td className="px-4 py-[14px] text-[14px] text-[#111827]">{t.product}</td>
                      <td className="px-4 py-[14px] text-[14px] text-[#111827]">{t.delta > 0 ? `+${t.delta}` : t.delta}</td>
                      <td className="px-4 py-[14px] text-[14px] text-[#111827]">{t.reason}</td>
                      <td className="px-4 py-[14px] text-[14px] text-[#111827]">{t.user}</td>
                    </tr>
                  ))}
                  {pagedItems.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-[14px] text-center text-[#6b7280]">
                        No transactions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {total > 0 && (
              <div className="flex items-center justify-center gap-4 p-2.5 mt-auto">
                <button
                  aria-label="Previous page"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`border-0 bg-transparent text-[22px] leading-none ${
                    page === 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer text-[#111827]"
                  }`}
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
                      className={`w-12 h-12 rounded-full border-0 text-[15px] font-medium cursor-pointer ${
                        p === page ? "bg-[#f1f1f1] text-[#111827]" : "bg-transparent text-[#111827]"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  aria-label="Next page"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className={`border-0 bg-transparent text-[22px] leading-none ${
                    page === pageCount ? "opacity-35 cursor-not-allowed" : "cursor-pointer text-[#111827]"
                  }`}
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
