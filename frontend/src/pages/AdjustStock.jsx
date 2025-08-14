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
      await inventoryService.adjustStock({
        productId: product.id,
        delta: Number(qty),
        reason,
      });
      navigate("/");
    } catch (e) {
      console.error(e);
      setErr("Update failed. Try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* احتفظت بالـ Navbar كما هو مستورد */}
      <main className="max-w-[1180px] mx-auto py-[40px] px-[28px] pb-[64px] bg-[#fafafa]">
        <h1 className="text-[32px] font-extrabold text-[#111827] my-2 mb-7">
          {product ? product.name : "Product Name"}
        </h1>

        <div className="grid gap-6 max-w-[540px]">
          <Field label="Quantity">
            <input
              type="number"
              min="0"
              placeholder=""
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-[#111827] text-[14px] outline-none"
            />
          </Field>

          <Field label="Reason">
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-[#111827] text-[14px] outline-none"
            >
              <option value="">Select reason</option>
              <option value="purchase">Purchase</option>
              <option value="sale">Sale</option>
              <option value="return">Return</option>
              <option value="correction">Correction</option>
            </select>
          </Field>
        </div>

        {err && <div className="text-[#B42318] mt-4">{err}</div>}

        {/* Buttons right */}
        <div className="flex gap-2.5 justify-end mt-7">
          <button
            onClick={() => navigate("/")}
            className="px-[14px] py-[10px] rounded-lg border border-gray-200 bg-[#dddddd] text-[#111827] text-[13px] font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canSubmit}
            className={`px-[14px] py-[10px] rounded-lg border border-[#1f2937] bg-[#0d2b8d] text-white text-[13px] font-bold ${
              !canSubmit ? "cursor-not-allowed opacity-100" : "cursor-pointer"
            }`}
          >
            {saving ? "Saving…" : "Confirm"}
          </button>
        </div>
      </main>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-[10px]">
      <span className="text-[14px] font-semibold text-[#111827]">{label}</span>
      {children}
    </label>
  );
}
