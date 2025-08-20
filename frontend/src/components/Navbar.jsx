import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserRole } from "../services/auth";
import NotificationBell from "./NotificationBell";
import ProfileDropdown from "./ProfileDropdown";



const links = [
  { key: "dashboard",   label: "Dashboard",    path: "/dashboard" },
  { key: "inventory",   label: "Inventory",    path: "/inventory" },
  { key: "transactions",label: "Transactions", path: "/transactions" },
  { key: "users", label: "Users", path: "/users", role: "ADMIN" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();
  const role = getUserRole();

  return (
    <div style={wrap}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div aria-hidden style={logoMark} />
        <span style={{ fontWeight: 700, color: "#ffffffff" }}>StockPilot</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <nav aria-label="Primary" style={{ display: "flex", gap: 20 }}>
          {links
            .filter((l) => !l.role || l.role === role)
            .map((l) => {
              const isActive =
                l.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(l.path.toLowerCase());
              return (
                <button
                  key={l.key}
                  onClick={() => navigate(l.path)}
                  style={navLink(isActive)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {l.label}
                </button>
              );
            })}
        </nav>

        <NotificationBell />
        <ProfileDropdown />
        
      </div>
    </div>
  );
}

const wrap = {
  height: 56,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
  background: "#253A82",
  borderBottom: "1px solid #88A2FF",
  position: "sticky",
  top: 0,
  zIndex: 100,
};

const logoMark = {
  width: 14,
  height: 14,
  background: "#ffffffff",
  borderRadius: 3,
  transform: "skewX(-10deg)",
};

const navLink = (active) => ({
  appearance: "none",
  background: "transparent",
  border: "none",
  padding: "6px 10px",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: active ? 700 : 500,
  color: active ? "#253A82" : "#ffffffff",
  cursor: "pointer",
  transition: "background 120ms ease",
  ...(active
    ? { background: "#C0E0FF", border: "1px solid #88A2FF" }
    : { background: "transparent" }),
});

const iconBtn = {
  appearance: "none",
  background: "#C0E0FF",
  color: "#253A82",
  border: "1px solid #88A2FF",
  width: 35,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 8,
  cursor: "pointer",
  padding: 0,
};

