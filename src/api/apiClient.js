// src/api/apiClient.js
import { useAuthStore } from "../Auth/store/authStore";
import { refresh } from "../Auth/api/authApi";

const API_URL = import.meta.env.VITE_API_URL;

export const apiClient = async (endpoint, options = {}) => {
  const { token, refreshToken, setTokens, logout } = useAuthStore.getState();

  // Detecta si el body es FormData (no agregar Content-Type en ese caso)
  const isFormData = options.body instanceof FormData;

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });

  if (res.status === 401 && refreshToken) {
    try {
      const data = await refresh(refreshToken);
      setTokens(data.accessToken, data.refreshToken || refreshToken);

      res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
          ...options.headers,
          Authorization: `Bearer ${data.accessToken}`,
        },
      });
    } catch (err) {
      console.error("Refresh token inválido:", err);
      logout();
      throw err;
    }
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Error ${res.status}`);
  }

  return res.json();
};
