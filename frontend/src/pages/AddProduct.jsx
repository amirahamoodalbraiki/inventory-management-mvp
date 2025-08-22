import React, { useRef, useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { inventoryService } from "../services/inventory.js";


export default function AddProduct() {
  const { id } = useParams();                 // <-- if present => edit mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [catErr, setCatErr] = useState("");
  const [isOther, setIsOther] = useState(false);
  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    description: "",
    unitPrice: "",
    quantity: "",
    lowStockThreshold: "",
    //imageUrl: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  // Load categories once
  useEffect(() => {
    (async () => {
      try {
        setCatErr("");
        const cats = await inventoryService.getCategories(); // expects ["Electronics", ...]
        setCategories(Array.isArray(cats) ? cats : []);
      } catch (e) {
        console.error(e);
        setCatErr("Failed to load categories");
        setCategories([]); // fallback empty list
      }
    })();
  }, []);
// Load existing product in edit mode
useEffect(() => {
  if (!isEdit) return;
  (async () => {
    try {
      const p = await inventoryService.getProductById(id);
      setForm({
        name: p.name ?? "",
        sku: p.sku ?? "",
        category: p.category ?? "",
        description: p.description ?? "",
        unitPrice: p.unitPrice ?? "",
        quantity: p.quantity ?? "",
        lowStockThreshold: p.lowStockThreshold ?? "",
        //imageUrl: p.imageUrl ?? "",
      });
      if (p.imageUrl) setImagePreview(p.imageUrl);
    } catch (e) {
      console.error(e);
      alert("Failed to load product for editing.");
      navigate("/inventory");
    }
  })();
}, [id, isEdit, navigate]);

  const validate = (f) => {
    const e = {};
    if (!f.name.trim()) e.name = "Name is required";
    if (!f.sku.trim()) e.sku = "SKU is required";
    if (!f.category) e.category = "Pick a category";
    if (f.unitPrice === "" || Number.isNaN(Number(f.unitPrice)) || Number(f.unitPrice) < 0)
      e.unitPrice = "Unit price must be a number ≥ 0";
    if (f.quantity === "" || !Number.isInteger(Number(f.quantity)) || Number(f.quantity) < 0)
      e.quantity = "Quantity must be an integer ≥ 0";
    if (f.lowStockThreshold === "" || !Number.isInteger(Number(f.lowStockThreshold)) || Number(f.lowStockThreshold) < 0)
      e.lowStockThreshold = "Low-stock threshold must be an integer ≥ 0";
    return e;
  };
  
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
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category,
        description: form.description.trim(),
        unitPrice: Number(form.unitPrice || 0),
        quantity: Number.parseInt(form.quantity || "0", 10),
        lowStockThreshold: Number.parseInt(form.lowStockThreshold || "0", 10),
      };

      if (isEdit) {
        // EDIT: update only fields (image update depends on your backend)
        await inventoryService.updateProduct(id, payload);
        alert("Product updated!");
      } else {
        // CREATE: supports optional image upload
        await inventoryService.createProduct(payload, imageFile);
        alert("Product created!");
        // reset only after create
        setForm({
          name: "",
          sku: "",
          category: "",
          description: "",
          unitPrice: "",
          quantity: "",
          lowStockThreshold: "",
        });
        clearImage();
      }
      navigate("/inventory");
    } catch (err) {
      console.error(err);
      alert("Save failed. Check fields and try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    /*setForm({
      name: "", sku: "", category: "", description: "",
      unitPrice: "", quantity: "", lowStockThreshold: "",
    });
    clearImage();*/
    navigate("/inventory");
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <main className="max-w-[900px] mx-auto py-6 px-5 pb-12">
        <h1 className="text-[28px] font-extrabold my-3 mb-5 text-[#111827]">
        {isEdit ? "Edit Product" : "Add Product"}
        </h1>

        <div className="grid gap-4">
          <Field label="Name" error={errors.name}>
            <input
              placeholder="Enter product name"
              value={form.name}
              onChange={update("name")}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[14px] text-[#111827] outline-none"
            />
          </Field>

          <Field label="SKU" error={errors.sku}>
            <input
              placeholder="SKU"
              value={form.sku}
              onChange={update("sku")}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[14px] text-[#111827] outline-none"
            />
          </Field>

        <Field label="Category" error={errors.category}>
          <select
            value={isOther ? "Other" : form.category}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "Other") {
                setIsOther(true);
                update("category")({ target: { value: "" } }); // clear form.category for input
              } else {
                setIsOther(false);
                update("category")(e);
              }
            }}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[14px] text-[#111827] outline-none"
          >
          <option value="">Select</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        {/* Only show input if Other is selected */}
        {isOther && (
          <input
            type="text"
            placeholder="Enter new category"
            className="mt-2 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-100 text-[14px] text-[#111827] outline-none"
            onChange={(e) => {
              const input = e.target.value;
              const formatted =
                input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
              update("category")({ target: { value: formatted } });
            }}
          />
        )}
        </Field>

          <Field label="Description">
            <textarea
              rows={4}
              placeholder="Write a short description…"
              value={form.description}
              onChange={update("description")}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[14px] text-[#111827] outline-none resize-y"
            />
          </Field>

          <div className="grid gap-4">
            <Field label="Unit Price" error={errors.unitPrice}>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={form.unitPrice}
                onChange={update("unitPrice")}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[14px] text-[#111827] outline-none"
              />
            </Field>

            <Field label="Quantity" error={errors.quantity}>
              <input
                type="number"
                placeholder="0"
                value={form.quantity}
                onChange={update("quantity")}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[14px] text-[#111827] outline-none"
              />
            </Field>

            <Field label="Low-stock Threshold" error={errors.lowStockThreshold}>
              <input
                type="number"
                placeholder="0"
                value={form.lowStockThreshold}
                onChange={update("lowStockThreshold")}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[14px] text-[#111827] outline-none"
              />
            </Field>
          </div>

          {/* Image uploader */}
          <div>
            <div className="text-[14px] font-semibold text-[#111827] mb-2">Image</div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
              className="border-2 border-dashed border-gray-200 bg-white rounded-[12px] p-6 text-center"
            >
              {imagePreview ? (
                <div className="grid gap-3 justify-items-center">
                  <img src={imagePreview} alt="Preview" className="max-h-[180px] rounded-lg" />
                  <div className="flex gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="px-3 py-2 rounded-lg border border-gray-200 bg-[#f9fafb] text-[#111827] text-[13px] font-semibold cursor-pointer">Replace</button>
                    <button onClick={clearImage} className="px-3 py-2 rounded-lg border border-gray-200 bg-[#f9fafb] text-[#111827] text-[13px] font-semibold cursor-pointer">Remove</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-[#111827] font-semibold">
                    Drag and drop an image here, or click to browse
                  </div>
                  <div className="text-[#6b7280] text-[12px] mt-1.5">
                    Supports JPG, PNG, GIF
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-3 px-3 py-2 rounded-lg border border-gray-200 bg-[#f9fafb] text-[#111827] text-[13px] font-semibold cursor-pointer"
                  >
                    Upload Image
                  </button>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onBrowse}
                className="hidden"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5 justify-end mt-1">
            <button
              onClick={handleCancel}
              className="px-[14px] py-[10px] rounded-lg border border-gray-300 bg-[#dddddd] text-[#111827] text-[13px] font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!canSave}
              className={`px-[14px] py-[10px] rounded-lg border border-[#1f2937] bg-[#0d2b8d] text-white text-[13px] font-bold ${
                !canSave || saving ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {saving ? "Saving…" : "Save"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <label className="grid gap-2">
      <span className="text-[14px] font-semibold text-[#111827]">{label}</span>
      {children}
      {error ? <span className="text-red-600 text-[12px]">{error}</span> : null}
    </label>
  );
}
