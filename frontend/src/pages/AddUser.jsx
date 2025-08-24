// src/pages/AddUser.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usersService } from "../services/users";

const ROLES = ["ADMIN", "USER"];

export default function AddUser() {
  const navigate = useNavigate();
  const { id } = useParams();          // if present => edit mode
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",     // only required in create
    phone: "", 
    role: "USER",
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [loadErr, setLoadErr] = useState("");

  // Prefill in edit mode
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const u = await usersService.getById(id);
        setForm({
          name: u.name ?? "",
          email: u.email ?? "",
          password: "",      // blank; only update if you choose to support it
          phone: u.phone ?? "", 
          role: (u.role ?? "USER").toUpperCase(),
        });
      } catch (e) {
        console.error(e);
        setLoadErr("Failed to load user.");
      }
    })();
  }, [id, isEdit]);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!isEdit && !form.password.trim()) e.password = "Password is required";
    if (!form.role) e.role = "Role is required";
    if (form.phone && !String(form.phone).replace(/\D/g, "").match(/^\d{7,}$/)) {
      e.phone = "Enter a valid phone number";
    }
    return e;
  };

  const onSave = async () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        role: form.role,
        ...(isEdit ? {} : { password: form.password }), // only send password on create
      };

      if (isEdit) {
        await usersService.update(id, payload);
        alert("User updated");
      } else {
        await usersService.create(payload);
        alert("User created");
      }
      navigate("/users");
    } catch (err) {
      console.error(err);
      alert("Save failed. Please check and try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-#ffffff">
      <main className="flex-1 max-w=[800px] w-full mx-auto px-5 py-6 pb-12">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-[28px] font-extrabold text-[#253A82]">
            {isEdit ? "Edit User" : "Add User"}
          </h1>
        </header>

        {loadErr && <div className="text-[#B42318] mb-4">{loadErr}</div>}

        <div className="grid gap-4 max-w-[520px]">
          <Field label="Name" error={errors.name}>
            <input
              value={form.name}
              onChange={update("name")}
              className="w-full px-3 py-2.5 rounded-lg border border-[#88A2FF] bg-white text-[14px] text-[#253A82] outline-none"
              placeholder="User full name"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              className="w-full px-3 py-2.5 rounded-lg border border-[#88A2FF] bg-white text-[14px] text-[#253A82] outline-none"
              placeholder="email@example.com"
            />
          </Field>
           {/* Phone Number (optional) */}
           <Field label="Phone Number" error={errors.phone}>
            <input
              type="tel"
              inputMode="tel"
              value={form.phone}
              onChange={update("phone")}
              className="w-full px-3 py-2.5 rounded-lg border border-[#88A2FF] bg-white text-[14px] text-[#253A82] outline-none"
              placeholder="e.g. +968 555 123 4567"
            />
          </Field>

          {!isEdit && (
            <Field label="Password" error={errors.password}>
              <input
                type="password"
                value={form.password}
                onChange={update("password")}
                className="w-full px-3 py-2.5 rounded-lg border border-[#88A2FF] bg-white text-[14px] text-[#253A82] outline-none"
                placeholder="Minimum 8 characters"
              />
            </Field>
          )}

          <Field label="Role" error={errors.role}>
            <select
              value={form.role}
              onChange={update("role")}
              className="w-full px-3 py-2.5 rounded-lg border border-[#88A2FF] bg-white text-[14px] text-[#253A82] outline-none"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </Field>

          {/* Actions */}
          <div className="flex gap-2.5 justify-end mt-2">
            <button
              onClick={() => navigate("/users")}
              className="px-[14px] py-[10px] rounded-lg border border-[#88A2FF] bg-white text-[#253A82] text-[13px] font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className={`px-[14px] py-[10px] rounded-lg border border-[#253A82] bg-[#253A82] text-white text-[13px] font-bold ${
                saving ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
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

function Field({ label, error, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-[14px] font-semibold text-[#253A82]">{label}</span>
      {children}
      {error ? <span className="text-red-600 text-[12px]">{error}</span> : null}
    </label>
  );
}
