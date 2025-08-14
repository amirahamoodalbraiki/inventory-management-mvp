export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Login submitted (placeholder)");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Login</h1>

        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Email */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-black">Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              className="p-3 rounded border border-gray-300 bg-white text-black text-sm outline-none w-full"
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
              className="p-3 rounded border border-gray-300 bg-white text-black text-sm outline-none w-full"
            />
          </label>

          {/* Role */}
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-black">Role</span>
            <select
              name="role"
              required
              defaultValue=""
              className="p-3 rounded border border-gray-300 bg-white text-black text-sm outline-none w-full cursor-pointer"
            >
              <option value="" disabled>Role</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 p-3 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors w-full"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
