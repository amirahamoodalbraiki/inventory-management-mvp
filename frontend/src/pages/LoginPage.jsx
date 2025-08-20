// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const { token } = await api.login({ email: email, password: password });
      if (!token) throw new Error("No token in response");
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (e2) {
      setErr("Invalid credentials");
      console.error(e2);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#C0E0FF] flex items-center justify-center p-5">
      <div className="w-full max-w-sm p-8 rounded-lg bg-white shadow-md">
        <h1 className="m-0 text-2xl font-bold text-center mb-6 text-[#253A82]">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Email */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[#253A82]">Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded border border-[#88A2FF] bg-white text-[#253A82] outline-none text-sm w-full"
            />
          </label>

          {/* Password */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[#253A82]">Password</span>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded border border-[#88A2FF] bg-white text-[#253A82] outline-none text-sm w-full"
            />
          </label>

          {/* Error */}
          {err && (
            <div className="text-[#B42318] text-sm">{err}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 p-3 rounded bg-[#253A82] text-white border-0 cursor-pointer text-sm font-semibold w-full"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
