import { create } from "zustand";
import { persist } from "zustand/middleware";
import { login, register } from "../api/authApi";

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            loading: false,
            error: null,
            registerUser: async (body) => {
                set({ loading: true, error: null });
                try {
                    const res = await register(JSON.stringify(body));
                    if (!res.error) {
                        set({ user: res.user, token: res.token});
                    } else {
                        set({ error: res.error || "Error al registrarse" });
                    }
                } catch (err) {
                    set({ error: err.message });
                } finally {
                    set({ loading: false });
                }
            },
            loginUser: async (body) => {
                set({ loading: true, error: null });
                try {
                    const res = await login(JSON.stringify(body));
                    if (!res.error) {
                        set({ user: res.user, token: res.token });
                    } else {
                        set({ error: res.error || "Credenciales inválidas" });
                    }
                } catch (err) {
                    set({ error: err.message });
                } finally {
                    set({ loading: false });
                }
            },
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: "auth-storage", // nombre de la clave en localStorage
            partialize: (state) => ({ user: state.user, token: state.token }), // solo guardamos lo necesario
        }
    )
);
