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