export default function LoginPage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Login submitted (placeholder)");
  };

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto 1fr auto", minHeight: "100svh", width: "100%" }}>
      <header style={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "saturate(180%) blur(6px)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 16px" }}>
          <div style={{
            height: 36,
            borderRadius: 8,
            border: "1px solid rgba(0,0,0,0.1)",
            background: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            color: "#213547",
          }}>
            Company Name
          </div>
        </div>
      </header>

      <main style={{ display: "grid", placeItems: "center", padding: 24 }}>
        <div style={{
          width: "100%",
          maxWidth: 420,
          padding: 24,
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.1)",
          background: "#ffffff",
          color: "#213547",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Log in</h1>
          <p style={{ marginTop: 8, color: "#667085" }}>Access your inventory dashboard</p>

          <form onSubmit={handleSubmit} style={{ marginTop: 24, display: "grid", gap: 14 }}>
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Email</span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  color: "#213547",
                  outline: "none",
                }}
              />
            </label>

            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Password</span>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.15)",
                  background: "#fff",
                  color: "#213547",
                  outline: "none",
                }}
              />
            </label>

            <fieldset style={{ margin: 0, padding: 0, border: 0 }}>
              <legend style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}></legend>
              <div style={{ display: "grid", gap: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="radio" name="role" value="staff" defaultChecked />
                  <span>Staff</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="radio" name="role" value="admin" />
                  <span>Admin</span>
                </label>
              </div>
            </fieldset>

            <button type="submit" style={{
              marginTop: 4,
              padding: "10px 14px",
              borderRadius: 8,
              background: "#646cff",
              color: "#fff",
              border: "none",
            }}>
              Login
            </button>
          </form>

          <p style={{ fontSize: 12, marginTop: 12, color: "#667085" }}>
          </p>
        </div>
      </main>

      <footer style={{ padding: 12 }}>
        <div style={{ maxWidth: 1200 }}>
          <div style={{
            width: 200,
            height: 28,
            borderRadius: 6,
            border: "1px dashed rgba(0,0,0,0.2)",
            background: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            color: "#213547",
            fontSize: 12,
          }}>
            software company logo
          </div>
        </div>
      </footer>
    </div>
  );
}