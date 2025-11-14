import { socket } from "../config/socket";
import { useAuthStore } from "../Auth/store/authStore";



const SocketService = () => {
    let socketInstance = null;
    let callbacks = {}

    const connect = (cbs = {}) => {
        if (socketInstance) return;
        const {user, token} = useAuthStore.getState();
        callbacks = cbs

        socketInstance = socket;
        socketInstance.auth = {token: token};
        socketInstance.connect();

        socketInstance.on("connect", () => {
            console.log("socket connected", user.id);
        })

        socketInstance.on("new_message", (msg) => {
            callbacks.onMessage && callbacks.onMessage(msg)
        })

        socketInstance.on("messages_read", ({ conversationId, userId }) => {
            callbacks.onMessagesRead && callbacks.onMessagesRead(conversationId, userId);
        });

        socketInstance.on("typing", ({ fromId, conversationId }) => {
            callbacks.onTyping && callbacks.onTyping(conversationId, fromId);
        });

        socketInstance.on("online_users", (users) => {
            callbacks.onOnlineUsers && callbacks.onOnlineUsers(users);
        });
    }

    const disconnect = () => {
        if (!socketInstance) return;
        socketInstance.disconnect();
        socketInstance = null
    }

    const sendMessage = (payload) => {
        socketInstance && socketInstance.emit("send_message", payload)
    }

    const markRead = (conversationId) => {
        socketInstance && socketInstance.emit("mark_read", { conversationId });
    };

    const typing = (conversationId) => {
        socketInstance && socketInstance.emit("typing", { conversationId });
    };

    const joinConversation = (conversationId) => {
        socketInstance && socketInstance.emit("join_conversation", { conversationId });
    };

    return {
        connect,
        disconnect,
        sendMessage,
        markRead,
        typing,
        joinConversation,
    };
}

export const socketService = SocketService();