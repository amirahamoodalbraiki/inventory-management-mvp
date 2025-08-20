// src/service/auth.js
import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}

export function getUserId() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    return decoded.userId || null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
export function getUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token);
      return {
        id: decoded.userId || null,
        role: decoded.role || null,
        email: decoded.sub || decoded.email || null, // your backend sets email in sub
        name: decoded.name || decoded.sub?.split("@")[0] || "User", // fallback if name not in token
      };
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
}
