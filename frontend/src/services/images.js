// src/services/images.js
import { api } from "./api";

export async function uploadImage(file) {
  if (!file) return null;

  const fd = new FormData();
  fd.append("file", file);

  // ✅ use your helper that sends FormData
  const data = await api.postFormData("/images/upload", fd);

  if (!data?.url) throw new Error("Upload failed: no URL returned");
  return data.url; // e.g. "/images/uuid.jpg"
}