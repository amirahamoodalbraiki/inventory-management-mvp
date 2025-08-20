import { useState } from "react";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Bell button */}
      <button 
        aria-label="Notifications"
        style={{ 
          background: "none", 
          border: "none", 
          cursor: "pointer",
          color: "white" 
        }}
        onClick={() => setOpen(!open)}
      >
        {/* Original Bell Icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
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

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            marginTop: "10px",
            width: "300px",
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <div style={{ padding: "12px", fontWeight: "bold", borderBottom: "1px solid #eee" }}>
            Notifications
          </div>
          <div style={{ padding: "20px", color: "#6b7280", textAlign: "center" }}>
            No notifications
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;