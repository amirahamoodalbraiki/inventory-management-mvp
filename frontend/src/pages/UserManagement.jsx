import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersService } from "../services/users"; 

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

export default function UserManagement() {
  const navigate = useNavigate();

  // data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // filters + paging 
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr("");
        const data = await usersService.list();
        setUsers(data);
      } catch (e) {
        setErr("Failed to load users");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      const matchesQ =
        !q ||
        (u.name ?? "").toLowerCase().includes(q) ||
        (u.email ?? "").toLowerCase().includes(q) ||
        (u.role ?? "").toLowerCase().includes(q);
      const matchesRole = roleFilter === "all" || (u.role ?? "").toLowerCase() === roleFilter;
      return matchesQ && matchesRole;
    });
  }, [users, query, roleFilter]);

  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / rowsPerPage));
  const start = (page - 1) * rowsPerPage;
  const paged = filtered.slice(start, start + rowsPerPage);

  const handleAdd = () => navigate("/users/new");          // (placeholder route)
  const handleEdit = (u) => navigate(`/users/${u.id}/edit`);
  const handleDelete = async (u) => {
    if (!confirm(`Delete user "${u.name || u.email}"?`)) return;
    try {
      await usersService.remove(u.id);
      setUsers((cur) => cur.filter((x) => x.id !== u.id));
    } catch (e) {
      alert("Delete failed.");
      console.error(e);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1000px] mx-auto px-6 py-8 text-center text-[#667085]">
          Loading users…
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1000px] mx-auto px-6 py-8 text-center">
          <div className="text-[#B42318] mb-3">{err}</div>
          <button
            onClick={() => location.reload()}
            className="px-4 py-2 rounded-md bg-[#646cff] text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 px-6 py-8 max-w-[1000px] w-full mx-auto">
        {/* header */}
        <header className="flex items-center justify-between">
          <h1 className="m-0 text-[#111827] text-[28px] font-extrabold">Users</h1>
          <button
            onClick={handleAdd}
            className="rounded-lg bg-[#dddddd] text-[#111827] border border-gray-200 text-[13px] font-semibold cursor-pointer px-4 py-2"
          >
            Add User
          </button>
        </header>

        {/* controls: search + role filter */}
        <div className="mt-6 flex flex-col gap-3 items-start">
          <div className="rounded-lg bg-[#eeeeef] pl-3 pr-3 py-2.5 w-full max-w-[520px] flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" className="text-gray-500">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search users…"
              className="flex-1 bg-transparent outline-none text-sm text-[#111827]"
            />
          </div>

          <label className="relative inline-block">
            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
              className="py-[10px] pl-[14px] pr-9 rounded-[8px] bg-[#dddddd] border-0 text-[#111827] text-[14px] font-semibold cursor-pointer appearance-none"
            >
              <option value="all">All roles</option>
              <option value="admin">ADMIN</option>
              <option value="staff">STAFF</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 inline-flex items-center justify-center text-gray-500">▾</span>
          </label>
        </div>

        {/* table */}
        <section className="mt-4">
          <div className="border border-gray-300 rounded-lg bg-white shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb]">
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Name</th>
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Email</th>
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Role</th>
                  <th className="text-left px-4 py-3 border-b border-gray-300 font-semibold text-[13px] text-[#111827]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((u) => (
                  <tr key={u.id} className="border-b border-gray-300">
                    <td className="px-4 py-[14px] text-sm text-[#111827]">{u.name || "—"}</td>
                    <td className="px-4 py-[14px] text-sm text-[#111827]">{u.email}</td>
                    <td className="px-4 py-[14px] text-sm">
                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#eeeeef] border border-gray-200 text-xs font-semibold text-black">
                        {u.role}
                        </span>
                    </td>
                    <td className="px-4 py-[14px] text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(u)} className="bg-transparent border-0 p-0 cursor-pointer text-gray-500 font-bold">
                          Edit
                        </button>
                        <span className="text-gray-400">|</span>
                        <button onClick={() => handleDelete(u)} className="bg-transparent border-0 p-0 cursor-pointer text-gray-500 font-bold">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-[14px] text-center text-gray-500">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* pager (same as Inventory) */}
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