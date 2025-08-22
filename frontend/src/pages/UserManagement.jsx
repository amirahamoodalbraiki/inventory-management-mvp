import { useEffect, useMemo, useState } from "react";
import { useNavigate} from "react-router-dom";
import { usersService } from "../services/users";
import { getUser,getUserId } from "../services/auth";

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

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

    const myId = getUserId();


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

  const handleAdd = () => navigate("/users/new");
  const handleEdit = (u) => navigate(`/users/${u.id}/edit`);
  const handleDelete = async (u) => {
    // self-delete guard on UI
    if (myId && String(u.id) === String(myId)) {
      alert("You can’t delete your own account.");
      return;
    }
    if (!confirm(`Delete user "${u.name || u.email}"?`)) return;
    try {
      await usersService.remove(u.id);
      setUsers((cur) => cur.filter((x) => x.id !== u.id));
    } catch (e) {
      const msg =
        e?.status === 403
          ? "You can’t delete your own account."
          : "Delete failed.";
      alert(msg);
      console.error(e);
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-[1000px] mx-auto px-6 py-8 text-center text-[#253A82]">
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
            className="px-4 py-2 rounded-md bg-[#253A82] text-white"
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
          <h1 className="m-0 text-[#253A82] text-[28px] font-extrabold">Users</h1>
          <button
            onClick={handleAdd}
            className="rounded-lg bg-[#253A82] text-white border border-[#88A2FF] text-[13px] font-semibold cursor-pointer px-4 py-2"
          >
            Add User
          </button>
        </header>

        {/* controls */}
        <div className="mt-6 flex flex-col gap-3 items-start w-full">
          <div className="rounded-lg bg-white pl-3 pr-3 py-2.5 w-full flex items-center gap-2 border border-[#88A2FF]">
            <svg width="18" height="16" viewBox="0 0 24 24" className="text-[#253A82]">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search users…"
              className="flex-1 border-0 outline-none bg-white text-[14px] text-[#253A82]"
            />
          </div>

          <label className="relative inline-block">
            <select
              value={roleFilter}
              onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
              className="py-[10px] pl-[14px] pr-9 rounded-[8px] bg-white border border-[#88A2FF] text-[#253A82] text-[14px] font-semibold cursor-pointer appearance-none"
            >
              <option value="all">All roles</option>
              <option value="admin">ADMIN</option>
              <option value="user">USER</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 inline-flex items-center justify-center text-[#253A82]">▾</span>
          </label>
        </div>

        {/* table */}
        <section className="mt-4">
          <div className="border border-[#88A2FF] rounded-lg bg-white shadow-sm overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#88A2FF]/20">
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Name</th>
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Email</th>
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Role</th>
                  <th className="text-left px-4 py-3 border-b border-[#88A2FF] font-semibold text-[13px] text-[#253A82]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((u) => {
                  const isMe = myId && String(u.id) === String(myId);
                  return(
                  <tr key={u.id} className="border-b border-[#88A2FF]">
                    <td className="px-4 py-[14px] text-sm text-[#253A82]">{u.name || "—"}</td>
                    <td className="px-4 py-[14px] text-sm text-[#253A82]">{u.email}</td>
                    <td className="px-4 py-[14px] text-sm">
                      <span className="inline-flex items-center justify-center w-24 px-2 py-1 rounded-md bg-[#88A2FF]/15 border border-[#88A2FF] text-xs font-semibold text-[#253A82]">
                        {u.role}
                      </span>

                    </td>
                    <td className="px-4 py-[14px] text-sm">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(u)} className="bg-transparent border-0 p-0 cursor-pointer text-[#253A82] font-bold">
                          Edit
                        </button>
                        <span className="text-[#88A2FF]">|</span>
                        <button
                            onClick={() => handleDelete(u)}
                            className={`bg-transparent border-0 p-0 font-bold ${
                              isMe ? "text-[#253A82]/40 cursor-not-allowed" : "text-[#253A82] cursor-pointer"
                            }`}
                            title={isMe ? "You can’t delete your own account" : "Delete user"}
                            disabled={!!isMe}
                          >
                            Delete
                          </button>
                      </div>
                    </td>
                  </tr>
                  );
                })}
                {paged.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-[14px] text-center text-[#253A82]">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* pager */}
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
                    className={`w-12 h-12 rounded-full border-0 text-[15px] font-medium cursor-pointer ${p === page ? "bg-[#253A82] text-white" : "bg-transparent text-[#253A82]"}`}
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
