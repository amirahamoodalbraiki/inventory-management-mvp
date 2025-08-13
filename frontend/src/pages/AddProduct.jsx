import React, { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { inventoryService } from "../services/inventory.js"; 

const categories = [
  "Personal Care",
  "Home Goods",
  "Outdoor Gear",
  "Stationery",
  "Home & Garden",
  "Electronics",
  "Fashion",
  "Kitchen",
];

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    unitPrice: "",
    quantity: "",
    lowStockThreshold: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };
  const onBrowse = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };
  const handleFile = (file) => {
    setImageFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const canSave =
    form.name.trim() &&
    form.sku.trim() &&
    form.category &&
    !saving;

  const handleSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      // payload
      const payload = {
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category,
        description: form.description.trim(),
        unitPrice: parseFloat(form.unitPrice || "0") || 0,
        quantity: parseInt(form.quantity || "0", 10) || 0,
        lowStockThreshold: parseInt(form.lowStockThreshold || "0", 10) || 0,
        imageName: imageFile?.name || null,
      };

      // If your service exists, use it; else just log.
      if (inventoryService?.createProduct) {
        await inventoryService.createProduct(payload, imageFile);
      } else {
        console.log("Mock createProduct()", payload, imageFile);
      }

      alert("Product created!");
      // Optional: navigate back to Products
      // navigate("/products")
      setForm({
        name: "", sku: "", category: "", description: "",
        unitPrice: "", quantity: "", lowStockThreshold: "",
      });
      clearImage();
    } catch (e) {
      console.error(e);
      alert("Save failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // If you have routing, navigate back; else just reset.
    // navigate("/products")
    setForm({
      name: "", sku: "", category: "", description: "",
      unitPrice: "", quantity: "", lowStockThreshold: "",
    });
    clearImage();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fafafa" }}>
      <Navbar active="products" />
      <main style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px 48px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: "12px 0 20px", color: "#111827" }}>
          Add Product
        </h1>

        <div style={{ display: "grid", gap: 16 }}>
          <Field label="Name">
            <Input placeholder="Enter product name" value={form.name} onChange={update("name")} />
          </Field>

          <Field label="SKU">
            <Input placeholder="SKU" value={form.sku} onChange={update("sku")} />
          </Field>

          <Field label="Category">
            <Select value={form.category} onChange={update("category")}>
              <option value="">Select</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </Select>
          </Field>

          <Field label="Description">
            <Textarea placeholder="Write a short description…" value={form.description} onChange={update("description")} />
          </Field>

          <div style={{ display: "grid", gap: 16 }}>
            <Field label="Unit Price">
              <Input type="number" step="0.01" placeholder="0.00" value={form.unitPrice} onChange={update("unitPrice")} />
            </Field>
            <Field label="Quantity">
              <Input type="number" placeholder="0" value={form.quantity} onChange={update("quantity")} />
            </Field>
            <Field label="Low-stock Threshold">
              <Input type="number" placeholder="0" value={form.lowStockThreshold} onChange={update("lowStockThreshold")} />
            </Field>
          </div>

          {/* Image uploader */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 8 }}>
              Image
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              style={{
                border: "2px dashed #e5e7eb",
                background: "#fff",
                borderRadius: 12,
                padding: 24,
                textAlign: "center",
              }}
            >
              {imagePreview ? (
                <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
                  <img src={imagePreview} alt="Preview" style={{ maxHeight: 180, borderRadius: 8 }} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => fileInputRef.current?.click()} style={btnLight}>Replace</button>
                    <button onClick={clearImage} style={btnLight}>Remove</button>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ color: "#111827", fontWeight: 600 }}>
                    Drag and drop an image here, or click to browse
                  </div>
                  <div style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>
                    Supports JPG, PNG, GIF
                  </div>
                  <button onClick={() => fileInputRef.current?.click()} style={{ ...btnLight, marginTop: 12 }}>
                    Upload Image
                  </button>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onBrowse}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button onClick={handleCancel} style={btnGhost}>Cancel</button>
            <button onClick={handleSave} disabled={!canSave} style={btnPrimary(!canSave || saving)}>
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ——— tiny UI primitives ——— */
function Field({ label, children }) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{label}</span>
      {children}
    </label>
  );
}
const inputBase = {
  width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #e5e7eb",
  background: "#fff", color: "#111827", fontSize: 14, outline: "none",
};
const Input = (props) => <input {...props} style={inputBase} />;
const Select = (props) => <select {...props} style={inputBase} />;
const Textarea = (props) => <textarea rows={4} {...props} style={{ ...inputBase, resize: "vertical" }} />;

/* ——— buttons ——— */
const btnPrimary = (disabled) => ({
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #1f2937",
  background: disabled ? "#0d2b8d" : "#0d2b8d",
  color: "#fff",
  fontSize: 13,
  fontWeight: 700,
  cursor: disabled ? "not-allowed" : "pointer",
});
const btnGhost = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #d1d5db",
  background: "#dddddd",
  color: "#111827",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};
const btnLight = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  color: "#111827",
  fontSize: 13,
  fontWeight: 600,
  cursor: "pointer",
};