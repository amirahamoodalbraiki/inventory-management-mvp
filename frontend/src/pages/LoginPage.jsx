// LoginPage.jsx
export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Login submitted (placeholder)");
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f5f5] flex items-center justify-center p-5">
      <div className="w-full max-w-sm p-8 rounded-lg bg-white shadow-md">
        <h1 className="m-0 text-2xl font-bold text-center mb-6 text-black">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Email */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-black">Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="p-3 rounded border border-gray-300 bg-white text-black outline-none text-sm w-full"
            />
          </label>

          {/* Password */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-black">Password</span>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="p-3 rounded border border-gray-300 bg-white text-black outline-none text-sm w-full"
            />
          </label>

          {/* Role */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-black">Role</span>
            <div className="relative">
              <select
                name="role"
                required
                defaultValue=""
                className="w-full p-3 rounded border border-gray-300 bg-white text-black outline-none cursor-pointer text-sm appearance-none"
              >
                <option value="" disabled>Role</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              {/*  */}
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-1.5 bg-blue-900 rounded-t shadow"></span>
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="mt-2 p-3 rounded bg-blue-500 text-white border-0 cursor-pointer text-sm font-semibold w-full"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
