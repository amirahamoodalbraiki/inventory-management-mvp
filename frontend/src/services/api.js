//instead of login, for now you do this 
//localStorage.setItem("token", ##replace this with token##);
//this this api can run

const BASE = import.meta.env.VITE_API_BASE ?? '';

function authHeaders(extraHeaders = {}) {
  const token = localStorage.getItem('token');
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  async login({ username, password }) {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // no bearer here
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json(); // expect { token: '...' } (or adjust to your payload)
  },
  async get(path) {
    const res = await fetch(`${BASE}${path}`, {
      credentials: 'include',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },

  async postJson(path, body) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
      credentials: 'include'
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },

  async putJson(path, body) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'PUT',
      headers: authHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(body),
      credentials: 'include'
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },

  async del(path) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return true;
  },

  async postFormData(path, fd) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      body: fd,
      credentials: 'include',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },
};