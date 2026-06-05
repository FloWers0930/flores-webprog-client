import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const fetchUsers = () => API.get("/api/users");
export const createUser = (data) => API.post("/api/users", data);
export const updateUser = (id, data) => API.put(`/api/users/${id}`, data);
export const deleteUser = (id) => API.delete(`/api/users/${id}`);
export const loginUser = (data) => API.post("/api/users/login", data);
