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

export const getContacts = () => 
  apiClient(`/chat/contacts`, {method: "GET"})

export const getConversationId = async (contactId) => {
  const { user } = useAuthStore.getState();
    const res = await apiClient("/chat/conversations", {
        method: "GET",
    });
    if (!Array.isArray(res)) return null;

    // El ID del usuario logueado viene del JWT → useAuthStore.user.id
    const myId = user.id;

    // Busca si ya existe una conversación entre ambos
    const conv = res.find(c =>
        (c.userOneId === myId && c.userTwoId === contactId) ||
        (c.userTwoId === myId && c.userOneId === contactId)
    );

    return conv?.id || null;

}