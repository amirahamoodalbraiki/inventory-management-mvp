import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import { transactionsService } from "../services/transactions.js";

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
  const [search, setSearch] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => { loadData(); }, []);
  useEffect(() => { loadData(); }, [search, from, to]);

  const total = items.length;
  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const pagedItems = useMemo(() => items.slice(start, start + rowsPerPage), [items, start, rowsPerPage]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
       <main className="flex-1 w-full mx-auto px-4 sm:px-5 py-6 pb-12 max-w-full md:max-w-[1000px]">
        <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#253A82] mb-4">
          Transaction History
        </h1>

        {/* Search + Date range box */}
        <div className="grid gap-3 sm:gap-[14px] rounded-lg">
          {/* Search */}
          <div className="flex items-center gap-2 sm:gap-[10px] border border-[#88A2FF] bg-white rounded-lg px-3 py-2">
            <svg width="18" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <circle cx="11" cy="11" r="7" stroke="#253A82" strokeWidth="2" />
              <path d="M20 20L17 17" stroke="#253A82" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border-0 outline-none bg-white text-sm sm:text-[14px] text-[#253A82] min-w-0"
            />
          </div>

          {/* From / To row (stack on mobile, row on larger) */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
            <label className="grid gap-1.5 w-full sm:w-auto">
              <span className="text-[12px] text-[#253A82] font-semibold">From</span>
              <input
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                max={to || undefined}
                className="w-full sm:w-[220px] px-3 py-2.5 rounded-[10px] border border-[#88A2FF] bg-white text-[#253A82] text-sm sm:text-[14px] outline-none"
              />
            </label>

            <label className="grid gap-1.5 w-full sm:w-auto">
              <span className="text-[12px] text-[#253A82] font-semibold">To</span>
              <input
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                min={from || undefined}
                className="w-full sm:w-[220px] px-3 py-2.5 rounded-[10px] border border-[#88A2FF] bg-white text-[#253A82] text-sm sm:text-[14px] outline-none"
              />
            </label>
          </div>
        </div>

        {/* Loading / Error */}
        {loading && items.length === 0 && (
          <div className="text-center p-6 text-[#253A82]">Loading transactions…</div>
        )}
        {error && (
          <div className="text-center p-6 text-[#B42318]">{error}</div>
        )}

        {/* Table (responsive) */}
        {!loading && !error && (
          <section className="mt-4">
            {/* Horizontal scroll on small screens */}
            <div className="border border-[#88A2FF] rounded-lg bg-white overflow-hidden">
              <div className="overflow-x-auto">
                {/* Prevent columns from squeezing too much on phones */}
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr className="bg-[#88A2FF]/20">
                      <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-xs sm:text-[13px] text-[#253A82]">Date</th>
                      <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-xs sm:text-[13px] text-[#253A82]">Product Name</th>
                      <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-xs sm:text-[13px] text-[#253A82]">Change Amount</th>
                      <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-xs sm:text-[13px] text-[#253A82]">Reason</th>
                      <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-xs sm:text-[13px] text-[#253A82]">Changed By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagedItems.map((t) => (
                      <tr key={t.id} className="border-b border-[#88A2FF]">
                        <td className="px-4 py-[12px] sm:py-[14px] text-sm sm:text-[14px] text-[#253A82]">{t.ts}</td>
                        <td className="px-4 py-[12px] sm:py-[14px] text-sm sm:text-[14px] text-[#253A82]">
                          <span className="block max-w-[220px] sm:max-w-none truncate">{t.product}</span>
                        </td>
                        <td className="px-4 py-[12px] sm:py-[14px] text-sm sm:text-[14px] text-[#253A82]">
                          {t.delta > 0 ? `+${t.delta}` : t.delta}
                        </td>
                        <td className="px-4 py-[12px] sm:py-[14px] text-sm sm:text-[14px] text-[#253A82]">
                          <span className="block max-w-[260px] sm:max-w-none truncate">{t.reason}</span>
                        </td>
                        <td className="px-4 py-[12px] sm:py-[14px] text-sm sm:text-[14px] text-[#253A82]">{t.user}</td>
                      </tr>
                    ))}
                    {pagedItems.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-[14px] text-center text-[#253A82]">
                          No transactions found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {total > 0 && (
              <div className="flex items-center justify-center gap-3 sm:gap-4 p-2.5 mt-3">
                <button
                  aria-label="Previous page"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`border-0 bg-transparent text-xl sm:text-[22px] leading-none ${
                    page === 1 ? "opacity-35 cursor-not-allowed" : "cursor-pointer text-[#253A82]"
                  }`}
                >
                  &lt;
                </button>

                {getDisplayPages(page, pageCount).map((p, idx) =>
                  p === "…" ? (
                    <span key={`gap-${idx}`} className="text-xl sm:text-[24px] text-[#253A82]">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`rounded-full border-0 text-sm sm:text-[15px] font-medium cursor-pointer
                        w-9 h-9 sm:w-12 sm:h-12
                        ${p === page ? "bg-[#253A82] text-white" : "bg-transparent text-[#253A82]"}`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  aria-label="Next page"
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className={`border-0 bg-transparent text-xl sm:text-[22px] leading-none ${
                    page === pageCount ? "opacity-35 cursor-not-allowed" : "cursor-pointer text-[#253A82]"
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
