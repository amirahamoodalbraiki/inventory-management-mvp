// NotificationBell.jsx
import { useEffect, useRef, useState } from "react";
import { notificationsService } from "../services/notifications";

export default function NotificationBell({ open, onToggle, closeAll }) {
  const [notifications, setNotifications] = useState([]);
  const rootRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await notificationsService.list();
        const data = res?.data ?? res;
        setNotifications(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
    const id = setInterval(load, 10000);
    return () => clearInterval(id);
  }, []);

  // click-outside to close
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!rootRef.current?.contains(e.target)) closeAll();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, closeAll]);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <button
        aria-label="Notifications"
        onClick={onToggle}
        style={{ background: "none", border: 0, color: "white", cursor: "pointer" }}
      >
        {/* bell icon svg */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 12px)",
            width: 320,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
            overflow: "hidden",
            zIndex: 1000,
            transformOrigin: "top right",
            animation: "ndrop .12s ease-out",
          }}
        >
          <div style={{ padding: 12, fontWeight: 800, borderBottom: "1px solid #eee", color: "#111827" }}>
            Notifications
          </div>

          {notifications.length ? (
            <ul style={{ maxHeight: 300, overflowY: "auto" }}>
              {notifications.map((n) => (
                <li
                  key={n.id}
                  style={{
                    padding: "12px 14px",
                    borderBottom: "1px solid #f3f3f3",
                    background: n.read ? "#fff" : "#f9fafb",
                    color: "#111827",
                  }}
                >
                  {n.message}
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ padding: 20, color: "#111827", textAlign: "center" }}>No notifications</div>
          )}
        </div>
      )}

      <style>{`
        @keyframes ndrop {
          from { opacity: 0; transform: translateY(-6px) scale(.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
      `}</style>
    </div>
  );
}