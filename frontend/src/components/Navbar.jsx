import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserRole } from "../services/auth";
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./ProfileDropdown";

const links = [
  { key: "dashboard",   label: "Dashboard",    path: "/dashboard" },
  { key: "inventory",   label: "Inventory",    path: "/inventory" },
  { key: "transactions",label: "Transactions", path: "/transactions" },
  { key: "users",       label: "Users",         path: "/users", role: "ADMIN" },
];

class ErrorBoundary extends React.Component {
  constructor(props){ super(props); this.state={ hasError:false, error:null }; }
  static getDerivedStateFromError(error){ return { hasError:true, error }; }
  componentDidCatch(error, info){ console.error("ErrorBoundary caught:", error, info); }
  render(){
    if (this.state.hasError) {
      return <div style={{ color:"red", fontSize:13 }}>⚠️ Failed to load {this.props.name || "component"}.</div>;
    }
    return this.props.children;
  }
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const role = getUserRole();
  const [openMenu, setOpenMenu] = useState(null); // "nav" | "bell" | "profile" | null

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (p) => (p === "/" ? pathname === "/" : pathname.startsWith(p.toLowerCase()));

  return (
    <div className="h-14 flex items-center justify-between px-4 sm:px-6 bg-[#253A82] border-b border-[#88A2FF] sticky top-0 z-50">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 bg-white rounded-sm -skew-x-6" aria-hidden />
        <span className="font-bold text-white whitespace-nowrap">StockPilot</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-4" aria-label="Primary">
          {links
            .filter((l) => !l.role || l.role === role)
            .map((l) => {
              const active = isActive(l.path);
              return (
                <button
                  key={l.key}
                  onClick={() => navigate(l.path)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition
                    focus:outline-none focus:ring-2 focus:ring-[#88A2FF] focus:ring-offset-2 focus:ring-offset-[#253A82]
                    ${active
                      ? "bg-[#C0E0FF] border border-[#88A2FF] text-[#253A82]"
                      : "bg-transparent border border-transparent text-white hover:bg-[#88A2FF]/20"}`}
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </button>
              );
            })}
        </nav>

        {/* Notifications */}
        <ErrorBoundary name="notifications">
          <NotificationBell
            open={openMenu === "bell"}
            onToggle={() => setOpenMenu((m) => (m === "bell" ? null : "bell"))}
            closeAll={() => setOpenMenu(null)}
          />
        </ErrorBoundary>

        {/* Profile */}
        <ProfileDropdown
          open={openMenu === "profile"}
          onToggle={() => setOpenMenu((m) => (m === "profile" ? null : "profile"))}
          closeAll={() => setOpenMenu(null)}
        />

        {/* Mobile nav toggle */}
        <div className="sm:hidden">
            <button
              onClick={() => setOpenMenu(openMenu === "nav" ? null : "nav")}
              className="text-white text-xl bg-transparent border border-[#88A2FF]/60 rounded-md px-2 py-1 hover:bg-[#88A2FF]/20 focus:outline-none focus:ring-2 focus:ring-[#88A2FF]"
              aria-label="Toggle navigation"
              aria-expanded={openMenu === "nav"}
            >
              ☰
            </button>
          </div>
      </div>

      {/* Mobile menu */}
      {openMenu === "nav" && (
        <div className="absolute top-14 left-0 right-0 bg-[#253A82] border-b border-[#88A2FF] sm:hidden z-50">
          <nav className="flex flex-col p-4 gap-2" aria-label="Mobile navigation">
            {links
              .filter((l) => !l.role || l.role === role)
              .map((l) => {
                const active = isActive(l.path);
                return (
                  <button
                    key={l.key}
                    onClick={() => { navigate(l.path); setOpenMenu(null); }}
                    className={`px-3 py-2 rounded-md text-left transition
                      focus:outline-none focus:ring-2 focus:ring-[#253A82]
                      ${active
                        ? "bg-[#88A2FF]/10 ring-2 ring-[#88A2FF] text-white"
                        : "bg-transparent text-white hover:bg-[#88A2FF]/20"}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {l.label}
                  </button>
                );
              })}
          </nav>
        </div>
      )}
    </div>
  );
}