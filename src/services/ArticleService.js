import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const fetchArticles = () => API.get("/api/articles");
export const fetchArticleBySlug = (slug) =>
  API.get(`/api/articles/slug/${slug}`);
export const createArticle = (data) => API.post("/api/articles", data);
export const updateArticle = (id, data) => API.put(`/api/articles/${id}`, data);
export const toggleArticleStatus = (id) =>
  API.patch(`/api/articles/${id}/toggle`);
export const deleteArticle = (id) => API.delete(`/api/articles/${id}`);
