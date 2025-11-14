import { create } from "zustand";
import { socket } from "../../config/socket";
import { useAuthStore } from "../../Auth/store/authStore";


export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    connected: false,
    connect: () => {
        if (get().connected) return;
        socket.connect();
        set({connected: true});
        socket.on("connect", () => {
            console.log("Socket conectado", socket.id);
        });
        socket.on("private_message", (msg) => {
            set((state) => ({
                messages: [state.messages, msg]
            }))
        });
        socket.on("message_ack", (ack) => {
            set((state) => ({
                messages: state.messages.map((msg) => {
                    msg.id === ack.provisionalId
                        ? {
                            ...msg,
                            id: ack.realId,
                            status: "sent",
                            createdAt: ack.createdAt
                        }
                        : msg
                })
            }))
        })
        socket.on("users_update", (users) => {
            set({users})
        })
    },
    disconnect: () => {
        if (!get().connected) return;
        socket.disconnect();
        set({connected: false});
        console.log("Socket desconectado")
    },
    sendMessage: (text, toUserId, post = null) => {
        const {user} = useAuthStore.getState()
        const msg = {
            id: Date.now(),
            text,
            post: post,
            from: user.id,
            to: toUserId,
            createdAt: new Date().toISOString(),
            status: "sending"
        };
        socket.emit("message", msg);

        set((state) => ({
            messages: [...state.messages, msg]
        }))
    }
}))


