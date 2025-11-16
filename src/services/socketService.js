import { useAuthStore } from "../Auth/store/authStore";
import { io } from "socket.io-client";

const SocketService = () => {
    let socketInstance = null;
    let callbacks = {};

    const connect = (cbs = {}) => {
        // Si ya está conectado, no volver a conectar
        console.log("conección")
        if (socketInstance && socketInstance.connected) return;

        const { user, token } = useAuthStore.getState();
        callbacks = cbs;

        socketInstance = io(import.meta.env.VITE_WS_URL, {
            auth: {token},
            autoConnect: true
        })

        socketInstance.on("connect", () => {
            console.log("🟢 Socket conectado", socketInstance.id, "User:", user.id);
        });

        socketInstance.on("new_message", (msg) => {
            callbacks.onMessage?.(msg);
        });

        socketInstance.on("messages_read", ({ conversationId, userId }) => {
            callbacks.onMessagesRead?.(conversationId, userId);
        });

        socketInstance.on("typing", ({ fromId, conversationId }) => {
            callbacks.onTyping?.(conversationId, fromId);
        });

        socketInstance.on("online_users", (users) => {
            callbacks.onOnlineUsers?.(users);
        });

        socketInstance.on("disconnect", () => {
            console.log("🔴 Socket desconectado");
        });
    };

    const disconnect = () => {
        socketInstance.disconnect();
        socketInstance = null;
    };

    // -------------------- EMITS ----------------------

    const sendMessage = (payload) => {
        if (!socketInstance || !socketInstance.connected) {
            console.warn("SOcker no conectado")
            return
        }
        socketInstance.emit("send_message", payload, (ack) => {
            if (!ack?.ok) {
                console.error("❌ Error al enviar mensaje:", ack?.error);
            }
        });
    };

    const markRead = (conversationId) => {
        socketInstance?.emit("mark_read", { conversationId });
    };

    const typing = (conversationId) => {
        socketInstance?.emit("typing", { conversationId });
    };

    const joinConversation = (conversationId) => {
        socketInstance?.emit("join_conversation", { conversationId });
    };

    const getMessages = (conversationId, callback) => {
        if (!socketInstance) return;

        socketInstance.emit(
            "get_messages",
            { conversationId, limit: 50, offset: 0 },
            (res) => {
                if (!res?.ok) {
                    console.error("❌ Error getMessages:", res.error);
                    return;
                }
                callback(res.messages);
            }
        );
    };

    return {
        connect,
        disconnect,
        sendMessage,
        markRead,
        typing,
        joinConversation,
        getMessages,
    };
};

export const socketService = SocketService();
