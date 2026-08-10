import axios from "axios";
import { auth } from "../firebase";

// Base URL of the Express backend. Set VITE_API_URL in a .env file to
// override (e.g. for production). Falls back to localhost for dev.
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL });

// Attach the current user's Firebase ID token (if logged in) to every request.
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// ---- Convenience helpers (Add / Update / Delete / Booking, all in one place) ----

export const PackagesAPI = {
  list: () => api.get("/packages").then((r) => r.data),
  get: (idOrSlug) => api.get(`/packages/${idOrSlug}`).then((r) => r.data),
  create: (data) => api.post("/packages", data).then((r) => r.data),
  update: (id, data) => api.put(`/packages/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/packages/${id}`).then((r) => r.data),
};

export const BookingsAPI = {
  create: (data) => api.post("/bookings", data).then((r) => r.data),
  mine: () => api.get("/bookings/mine").then((r) => r.data),
  cancelMine: (id) => api.delete(`/bookings/mine/${id}`).then((r) => r.data),
  all: () => api.get("/bookings").then((r) => r.data),
  updateStatus: (id, status) => api.put(`/bookings/${id}`, { status }).then((r) => r.data),
  remove: (id) => api.delete(`/bookings/${id}`).then((r) => r.data),
};

function crud(resource) {
  return {
    list: () => api.get(`/${resource}`).then((r) => r.data),
    create: (data) => api.post(`/${resource}`, data).then((r) => r.data),
    update: (id, data) => api.put(`/${resource}/${id}`, data).then((r) => r.data),
    remove: (id) => api.delete(`/${resource}/${id}`).then((r) => r.data),
  };
}

export const BlogsAPI = crud("blogs");
export const GuidesAPI = crud("guides");
export const ServicesAPI = crud("services");
export const TestimonialsAPI = crud("testimonials");
export const TeamAPI = crud("team");

export const SettingsAPI = {
  get: () => api.get("/settings").then((r) => r.data),
  update: (data) => api.put("/settings", data).then((r) => r.data),
};

export const UploadAPI = {
  // Uploads a File object (from an <input type="file">) and returns
  // { url, displayUrl, thumbUrl, deleteUrl } from imgbb.
  upload: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api
      .post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((r) => r.data);
  },
};

export const MessagesAPI = {
  send: (data) => api.post("/messages", data).then((r) => r.data),
  list: () => api.get("/messages").then((r) => r.data),
  update: (id, data) => api.put(`/messages/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/messages/${id}`).then((r) => r.data),
};

export const AuthAPI = {
  sync: () => api.post("/auth/sync").then((r) => r.data),
  me: () => api.get("/auth/me").then((r) => r.data),
};
