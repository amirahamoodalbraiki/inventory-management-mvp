export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Login submitted (placeholder)");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      width: "100%", 
      background: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 400,
        padding: "32px",
        borderRadius: "8px",
        background: "#ffffff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: "24px", 
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "24px",
          color: "#000000"
        }}>
          Login
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
          <label style={{ display: "grid", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#000000" }}>Email</span>
            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              style={{
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                background: "#ffffff",
                color: "#000000",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#000000" }}>Password</span>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              style={{
                padding: "12px",
                borderRadius: "4px",
                border: "1px solid #d1d5db",
                background: "#ffffff",
                color: "#000000",
                outline: "none",
                fontSize: "14px",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#000000" }}>Role</span>
            <div style={{ position: "relative" }}>
              <select
                name="role"
                required
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "4px",
                  border: "1px solid #d1d5db",
                  background: "#ffffff",
                  color: "#000000",
                  outline: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              >
                <option value="" disabled selected style={{ color: "#6b7280" }}>Role</option>
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
              </select>
              <div style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "12px",
                height: "6px",
                background: "#1e40af",
                borderRadius: "3px 3px 0 0",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                pointerEvents: "none",
              }}></div>
            </div>
          </label>

          <button type="submit" style={{
            marginTop: "8px",
            padding: "12px",
            borderRadius: "4px",
            background: "#3b82f6",
            color: "#ffffff",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
          }}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}