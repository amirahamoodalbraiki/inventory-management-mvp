const BASE = import.meta.env.VITE_API_BASE ?? '';

function authHeaders(extraHeaders = {}) {
  const token = localStorage.getItem('token');
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

export const api = {
  async login({ email, password }) {
    const res = await fetch(`${BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Login failed body:', errorText);
      throw new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    return data;
  },

  async get(path) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'GET',
      headers: authHeaders(),
      credentials: 'include'
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

  // Add PUT FormData method for updates
  async putFormData(path, fd) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'PUT',
      body: fd,
      credentials: 'include',
      headers: authHeaders()
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },

  async postUrlEncoded(path, urlSearchParams) {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: authHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      body: urlSearchParams.toString(),
      credentials: 'include',
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return res.json();
  },
};