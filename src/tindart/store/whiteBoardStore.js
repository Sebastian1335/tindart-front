import { create } from "zustand";
import { getSnapshot, getWhiteboards } from "../api/getRequest";
import { createWhiteboard } from "../api/postRequiest";
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
            try {
                const res = await getWhiteboards();
                if (!res.error) {
                    set({ whiteboardList: res });
                } else {
                    set({ error: res.error });
                }
            } catch {
                set({ error: error.message });
            } finally {
                set({ loading: false });
            }
        },
        saveWhiteBoard: async (whiteboard) => {
            try {
                updateWhiteboard(whiteboard);
            } catch (error) {
                set({ error: error.message });
            }
        },
        createWhiteboard: async (whiteboard) => {
            const { fetchWhiteBoardList } = useWhiteboardStore.getState(); 
            try {
                createWhiteboard(whiteboard);
                fetchWhiteBoardList()
            } catch (error) {
                set({ error: error.message });
            }
        },
        selectWhiteBoard: (whiteboard) => {
            set({ selectedWhiteBoard: whiteboard });
        },
        getSnapshot: async (id) => {
            try {
                const snapshot = await getSnapshot(id);
                set((state) => ({
                    selectedWhiteBoard: {
                        ...state.selectedWhiteBoard,
                        snapshot: { ...snapshot.snapshot },
                    },
                }));
            } catch (error) {
                set({ error: error.message });
            }
        },
    }),
    {
        name: "whiteboard-storage",
        partialize: (state) => ({selectedWhiteBoard: state.selectedWhiteBoard})
    }
    )
);
