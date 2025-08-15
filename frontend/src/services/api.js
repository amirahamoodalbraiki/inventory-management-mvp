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
// api.js
async login({ username, password }) {
  const res = await fetch(`/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
    credentials: 'include'  // <-- remove for login
  });
  const text = await res.text();
  if (!res.ok) {
    console.error('Login failed body:', text);  // helps debug
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return JSON.parse(text); // expect { token: '...' }
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
