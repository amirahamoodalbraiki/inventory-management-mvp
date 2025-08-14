
const BASE = import.meta.env.VITE_API_BASE ?? '';
export const api = {
  async get(path) {
    const res = await fetch(`${BASE}${path}`, { credentials: 'include' });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },
  async postJson(path, body) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },
  async putJson(path, body) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },
  async del(path) {
    const res = await fetch(`${BASE}${path}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return true;
  },
  async postFormData(path, fd) {
    const res = await fetch(`${BASE}${path}`, { method: 'POST', body: fd, credentials: 'include' });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },
};