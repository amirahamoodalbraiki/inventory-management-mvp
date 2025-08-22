// ProfileDropdown.jsx
import { useEffect, useRef } from "react";
import { getUser } from "../services/auth";

export default function ProfileDropdown({ open, onToggle, closeAll }) {
  const user = getUser(); // { id, role, email, name }
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!rootRef.current?.contains(e.target)) closeAll();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, closeAll]);

  const initial = (user?.name || user?.email || "U").slice(0, 1).toUpperCase();

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      {/* Avatar button */}
      <button
  onClick={onToggle}
  aria-label="Open profile menu"
  style={{
    width: 38,
    height: 38,
    borderRadius: "50%",
    border: "2px solid #253A82",
    background: "#EAF2FF",
    color: "#253A82",
    fontWeight: 800,
    fontSize: "16px",
    display: "flex",          
    alignItems: "center",        
    justifyContent: "center",    
    cursor: "pointer",
  }}
>
  {initial}
</button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 12px)",
            width: 280,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "14px",
              borderBottom: "1px solid #eee",
              fontWeight: 800,
              color: "#111827",
            }}
          >
            Profile
          </div>

          {/* User Info */}
          <div style={{ padding: "14px", color: "#111827" }}>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>
              {user?.name ?? "User"}
            </div>
            <div style={{ color: "#6b7280", fontSize: "13px", marginTop: "2px" }}>
              {user?.email ?? "No email"}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            style={{
              margin: "14px",
              width: "calc(100% - 28px)",
              background: "#ef4444",
              color: "#fff",
              border: 0,
              borderRadius: 10,
              padding: "10px 12px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}