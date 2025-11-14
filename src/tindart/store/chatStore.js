import { create } from "zustand";
import { socket } from "../../config/socket";
import { useAuthStore } from "../../Auth/store/authStore";
import { socketService } from "../../services/socketService";


export const useChatStore = create((set, get) => ({
    messages: [],
    conversations: [],
    users: [],
    connected: false,
    connect: () => {
        if (get().connected) return;

        socketService.connect({
            onMessage: (msg) => get().addMessages(msg),
            onMessagesRead: (conversationId, userId) => {
                set((state) => ({
                    messages: state.messages.map((m) =>
                        m.conversationId === conversationId && m.fromId !== userId
                            ? { ...m, status: "READ" }
                            : m
                    ),
                }));
            },
            onTyping: (conversationId, fromId) => {
                console.log("Typing", conversationId, fromId);
            },
            onOnlineUsers: (users) => get().setOnlineUsers(users),
        })
        set({connected: true})
    },

    disconnect: () => {
        socketService.disconnect();
        set({ connected: false });
    },

    sendMessage: (text, conversationId, postId) => {
        const { user } = useAuthStore.getState();
        const message = {
            id: Date.now(),
            text,
            fromId: user.id,
            conversationId,
            postId: postId || null,
            status: "PENDING",
            createdAt: new Date().toISOString(),
        };
        get().addMessage(message);
        socketService.sendMessage({ text, conversationId, postId });
    },
    markRead: (conversationId) => {
        socketService.markRead(conversationId);
        set((state) => ({
            messages: state.messages.map((m) =>
                m.conversationId === conversationId ? { ...m, status: "READ" } : m
            ),
        }));
    },

    typing: (conversationId) => {
        socketService.typing(conversationId);
    },

    addMessage: (msg) => {
        set((state) => ({ messages: [...state.messages, msg] }));
    },

    setOnlineUsers: (users) => {
        set({ onlineUsers: users });
    },

}))


