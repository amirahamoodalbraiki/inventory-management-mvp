import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUserRole } from "../services/auth";

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

        <button aria-label="Notifications" style={iconBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ display: "block" }}>
            <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIG34_9Mgmzn08YzxUu5iB-u5k-yElEiTnzEQKUcYjStBLFBG0SGsj-DGk4fWOuAe7lbX9YTdEAWY_URfDFRoMV_jqYIHR8ZTBeOIi_hPIXY7OtGw0_Y0h8AB4Uz8OniBEKKGnS4ja5m7F3dtMu5-uUS7uIgNfAehnVlp-g0ZbEDJIjeof7OTq_k-EgpiU1T_9HfcWikIBzNy03GiKhnWWb6QtSjSjcDZXG53WDMs0RoZIn6tuke561tXXz8jynIFy-a1HdSznRRSr"
          alt="User avatar"
          style={avatar}
        />
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

const avatar = {
  width: 32,
  height: 32,
  borderRadius: "50%",
  display: "block",
  objectFit: "cover",
  border: "1px solid #88A2FF",
};
