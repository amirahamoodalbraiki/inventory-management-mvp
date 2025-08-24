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

  // click-outside 
  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (!rootRef.current?.contains(e.target)) closeAll();
    };
    const onKey = (e) => e.key === "Escape" && closeAll();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeAll]);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      <button
        aria-label="Notifications"
        onClick={onToggle}
        style={{ background: "none", border: 0, color: "white", cursor: "pointer" }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M10 20a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7Z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="nb-panel">
          <div className="nb-header">Notifications</div>

          {notifications.length ? (
            <ul className="nb-list">
              {notifications.map((n) => (
                <li key={n.id} className={`nb-item ${n.read ? "read" : "unread"}`}>
                  {n.message}
                </li>
              ))}
            </ul>
          ) : (
            <div className="nb-empty">No notifications</div>
          )}
        </div>
      )}

      {/* styles  */}
      <style>{`
        .nb-panel{
          position:absolute;
          right:0;
          top:calc(100% + 12px);
          width:320px;
          background:#fff;
          border-radius:12px;
          box-shadow:0 12px 24px rgba(0,0,0,0.12);
          overflow:hidden;
          z-index:1000;
          transform-origin:top right;
          animation:ndrop .12s ease-out;
        }
        .nb-header{
          padding:12px;
          font-weight:800;
          border-bottom:1px solid #eee;
          color:#111827;
        }
        .nb-list{ max-height:300px; overflow-y:auto; overscroll-behavior:contain; -webkit-overflow-scrolling:touch; }
        .nb-item{ padding:12px 14px; border-bottom:1px solid #f3f3f3; color:#111827; background:#fff; }
        .nb-item.unread{ background:#f9fafb; }
        .nb-empty{ padding:20px; color:#111827; text-align:center; }

        /* Phone layout: fixed + edge padding so it never clips */
        @media (max-width: 480px){
          .nb-panel{
            position:fixed;
            left:12px;
            right:12px;
            top:64px;                 /* below your 56px navbar + small gap */
            width:auto;               /* stretch between left/right */
            max-height:calc(100vh - 88px);
          }
          .nb-list{ max-height:calc(100vh - 88px - 48px); } /* panel max minus header */
        }

        @keyframes ndrop{
          from{opacity:0; transform:translateY(-6px) scale(.98);}
          to{opacity:1; transform:translateY(0) scale(1);}
        }
      `}</style>
    </div>
  );
}