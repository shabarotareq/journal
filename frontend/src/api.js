const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function login(email, password) {
  const form = new URLSearchParams();
  form.append("username", email);
  form.append("password", password);
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function register(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
}

export async function listSites() {
  const res = await fetch(`${API_BASE}/sites/`);
  return res.json();
}

export async function createSite(token, payload) {
  const res = await fetch(`${API_BASE}/sites/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Create site failed");
  return res.json();
}

export async function uploadMedia(token, siteId, type, file, title = "") {
  const fd = new FormData();
  fd.append("site_id", siteId);
  fd.append("type", type);
  fd.append("title", title);
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/media/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}

export async function fetchData() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (err) {
    console.error("Fetch failed:", err);
    throw err;
  }
}
