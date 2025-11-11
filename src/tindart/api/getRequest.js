// src/api/feed.js
import { apiClient } from "../../api/apiClient";

export const fetchWithAuth = (endpoint, page = 1, limit = 10) =>
  apiClient(`/${endpoint}/?page=${page}&limit=${limit}`, { method: "GET" });

export const getPostDetais = (postId) =>
  apiClient(`/feed/post/${postId}/details`, { method: "GET" });

export const getWhiteboards = () =>
  apiClient(`/whiteboard`, { method: "GET" });

export const getSnapshot = (id) =>
  apiClient(`/whiteboard/${id}/snapshot`, { method: "GET" });

export const getProfileData = (id) =>
  apiClient(`/profile/profileData/${id}`, { method: "GET" });
