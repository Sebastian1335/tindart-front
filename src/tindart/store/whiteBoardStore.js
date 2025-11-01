import { create } from "zustand";
import { getSnapshot, getWhiteboards } from "../api/getRequest";
import { useAuthStore } from "../../Auth/store/authStore";
import { createWhiteboard } from "../api/postrequiest";
import { updateWhiteboard } from "../api/putRequest";
import { persist } from "zustand/middleware";

export const useWhiteboardStore = create(
    persist((set) => ({
        whiteboardList: [],
        selectedWhiteBoard: null,
        fetchLoading: false,
        error: null,
        fetchWhiteBoardList: async () => {
            set({ fetchLoading: true, error: null });
            const { token } = useAuthStore.getState();
            try {
                const res = await getWhiteboards(token);
                if (!res.error) {
                    set({ whiteboardList: res });
                } else {
                    set({ error: res.error });
                }
            } catch {
                set({ error: error.message });
                console.log(error);
            } finally {
                set({ loading: false });
            }
        },
        saveWhiteBoard: async (whiteboard) => {
            const { token } = useAuthStore.getState();
            try {
                updateWhiteboard(token, whiteboard);
            } catch (error) {
                set({ error: error.message });
                console.log(error);
            }
        },
        createWhiteboard: async (whiteboard) => {
            const { token } = useAuthStore.getState();
            const { fetchWhiteBoardList } = useWhiteboardStore.getState(); 
            try {
                createWhiteboard(token, whiteboard);
                fetchWhiteBoardList()
            } catch (error) {
                set({ error: error.message });
                console.log(error);
            }
        },
        selectWhiteBoard: (whiteboard) => {
            set({ selectedWhiteBoard: whiteboard });
        },
        getSnapshot: async (id) => {
            const { token } = useAuthStore.getState();
            try {
                const snapshot = await getSnapshot(token, id);
                set((state) => ({
                    selectedWhiteBoard: {
                        ...state.selectedWhiteBoard,
                        snapshot: { ...snapshot.snapshot },
                    },
                }));
            } catch (error) {
                set({ error: error.message });
                console.log(error);
            }
        },
    }),
    {
        name: "whiteboard-storage",
        partialize: (state) => ({selectedWhiteBoard: state.selectedWhiteBoard})
    }
    )
);
