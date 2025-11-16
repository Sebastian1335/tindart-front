import { apiClient } from "../../api/apiClient";


export const uploadPost = (formData) =>
  apiClient(`/feed/post`, {
    method: "POST",
    body: formData,
  });

export const uploadComment = (formData, postId) =>
  apiClient(`/feed/post/${postId}/comment`, {
    method: "POST",
    body: formData,
  });

export const fetchToggleLike = (postId) =>
  apiClient(`/interaction/like/post/${postId}`, { method: "POST" });

export const fetchToggleSave = (postId) =>
  apiClient(`/interaction/save/post/${postId}`, { method: "POST" });

export const fetchToggleShare = (postId) =>
  apiClient(`/interaction/share/post/${postId}`, { method: "POST" });

export const fetchToggleLikeComment = (commentId) =>
  apiClient(`/interaction/like/comment/${commentId}`, { method: "POST" });

export const fetchToggleFollowUser = (userId) =>
  apiClient(`/interaction/follow/${userId}`, { method: "POST" });

export const createWhiteboard = (whiteboard) =>
  apiClient(`/whiteboard`, {
    method: "POST",
    body: JSON.stringify(whiteboard),
  });

export const createConversation = (userTwoId) => apiClient(`/chat/conversation/${userTwoId}`, {
    method: "POST",
  });

