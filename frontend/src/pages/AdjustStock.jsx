import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { inventoryService } from "../services/inventory.js";

export default function AdjustStock() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState("");
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // expects getProductById(id)
        const p = await inventoryService.getProductById(id);
        setProduct(p);
      } catch (e) {
        console.error(e);
        setErr("Failed to load product.");
      }
    })();
  }, [id]);

  const canSubmit = product && qty !== "" && Number(qty) > 0 && reason && !saving;

  const onConfirm = async () => {
    if (!canSubmit) return;
    setSaving(true);
    setErr("");
    try {
      // expects adjustStock({ productId, delta, reason })
      await inventoryService.adjustStock({
        productId: product.id,
        delta: Number(qty),   // positive number (
        reason,
      });
      navigate("/"); // back to inventory
    } catch (e) {
      console.error(e);
      setErr("Update failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
    
      <main style={mainWrap}>
        <h1 style={titleStyle}>{product ? product.name : "Product Name"}</h1>

        <div style={{ display: "grid", gap: 24, maxWidth: 540 }}>
          <Field label="Quantity">
            <Input
              type="number"
              min="0"
              placeholder=""
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </Field>

          <Field label="Reason">
                <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    style={inputBase}
                >
                    <option value="">Select reason</option>
                    <option value="purchase">Purchase</option>
                    <option value="sale">Sale</option>
                    <option value="return">Return</option>
                    <option value="correction">Correction</option>
                </select>
                </Field>
        </div>

        {err && <div style={{ color: "#B42318", marginTop: 16 }}>{err}</div>}

        {/* Buttons right*/}
        <div style={actionsRow}>
          <button onClick={() => navigate("/")} style={btnGhost}>Cancel</button>
          <button
            onClick={onConfirm}
            disabled={!canSubmit}
            style={btnPrimary(!canSubmit || saving)}
          >
            {saving ? "Saving…" : "Confirm"}
          </button>
        </div>
      </main>
    </div>
  );
}

const mainWrap = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "40px 28px 64px",
  background: "#fafafa",
};

const titleStyle = {
  fontSize: 32,
  fontWeight: 800,
  color: "#111827",
  margin: "8px 0 28px",
};

function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 10 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{label}</span>
      {children}
    </label>
  );
}

const inputBase = {
  width: "100%",
  height: 40,
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#111827",
  fontSize: 14,
  outline: "none",
};
const Input = (props) => <input {...props} style={inputBase} />;

const actionsRow = {
  display: "flex",
  gap: 10,
  justifyContent: "flex-end",
  marginTop: 28,
};

const btnPrimary = (disabled) => ({
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #1f2937",
  background: disabled ? "#0d2b8d" : "#0d2b8d",   // deep slate
  color: "#fff",
  fontSize: 13,
  fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer",
});
const btnGhost = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#dddddd",  // light grey c
  color: "#111827",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};