import { create } from "zustand";
import { useAuthStore } from "../../Auth/store/authStore";
import { socketService } from "../../services/socketService";
import { apiClient } from "../../api/apiClient";
import { createConversation } from "../api/postRequiest";

export const useChatStore = create((set, get) => ({
    messages: [],
    conversations: [],
    users: [],
    onlineUsers: [],
    selectedUser: null,
    connected: false,

    /** Obtener contactos */
    getContacts: async () => {
        try {
            const res = await apiClient(`/chat/contacts`, { method: "GET" });
            console.log(res)
            set({ users: res || [] });
        } catch (err) {
            console.error("getContacts error", err);
        }
    },

    /** Seleccionar o crear chat */
    selectChat: async (contact) => {
        const { user } = useAuthStore.getState();

        // 1. Obtener TODAS las conversaciones del usuario
        const res = await apiClient(`/chat/conversations`, {
            method: "GET",
        });
        const existing = (res || []).find(
            (c) =>
                (c.userOneId === user.id && c.userTwoId === contact.id) ||
                (c.userTwoId === user.id && c.userOneId === contact.id)
        );

        let conversationId = existing?.id || null;
        // 2. Crear si no existe
        if (!conversationId) {
            const created = await createConversation(contact.id);
            conversationId = created.id;
        }

        // 3. Guardar selección
        set({
            selectedUser: {
                id: contact.id,
                userName: contact.userName,
                conversationId,
            },
            messages: [],
        });

        // 4. Unirse al room
        socketService.joinConversation(conversationId);

        // 5. Obtener mensajes del socket
        socketService.getMessages(conversationId, (msgs) => {
            set({ messages: msgs || [] });
        });

        return conversationId;
    },

    /** Conectar socket */
    connect: () => {
        if (get().connected) return;

        socketService.connect({
            onMessage: (msg) => get().addMessage(msg),
            onMessagesRead: (conversationId, userId) => {
                set((state) => ({
                    messages: state.messages.map((m) =>
                        m.conversationId === conversationId &&
                        m.fromId !== userId
                            ? { ...m, status: "READ" }
                            : m
                    ),
                }));
            },
            onTyping: (conversationId, fromId) => {
                console.log("Typing", conversationId, fromId);
            },
            onOnlineUsers: (users) => get().setOnlineUsers(users),
        });

        set({ connected: true });
    },

    /** Desconectar socket */
    disconnect: () => {
        socketService.disconnect();
        set({ connected: false });
    },

    /** Enviar mensaje */
    sendMessage: (text, conversationId, postId) => {
        const { user } = useAuthStore.getState();
        const tempId = "temp-" + Date.now() + "-" + Math.random();

        const message = {
            id: tempId,
            text,
            fromId: user.id,
            conversationId,
            postId: postId || null,
            status: "PENDING",
            createdAt: new Date().toISOString(),
            fromMe: true,
        };
        // Asegurar que no se repitan mensajes
        set((state) => {
            return {
                messages: [...state.messages, message],
            };
        });

        socketService.sendMessage({
            text,
            conversationId,
            fromId: user.id,
            postId: postId || null,
            tempId
        });
    },

    /** Marcar como leído */
    markRead: (conversationId) => {
        socketService.markRead(conversationId);
        set((state) => ({
            messages: state.messages.map((m) =>
                m.conversationId === conversationId
                    ? { ...m, status: "READ" }
                    : m
            ),
        }));
    },

    /** Emitir typing */
    typing: (conversationId) => {
        socketService.typing(conversationId);
    },

    /** Añadir mensaje recibido */
    addMessage: (msg) => {
        const { user } = useAuthStore.getState();

        set((state) => {
            const exists = state.messages.some((m) => m.id === msg.tempId);

            if (exists) {
                // reemplazar PENDING con el real
                return {
                    messages: state.messages.map((m) =>
                        m.id === msg.tempId ? { ...msg, fromMe: msg.fromId === user.id } : m
                    ),
                };
            }

            // si viene del otro usuario, agregar normal
            return {
                messages: [...state.messages, { ...msg, fromMe: msg.fromId === user.id }],
            };
        });

    },

    /** Actualizar usuarios online */
    setOnlineUsers: (users) => {
        set({ onlineUsers: users });
    },
}));
