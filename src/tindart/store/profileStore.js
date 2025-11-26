import { create } from "zustand";
import { useAuthStore } from "../../Auth/store/authStore";
import { getProfileData } from "../api/getRequest";
import { persist } from "zustand/middleware";

export const useProfileStore = create(persist((set) => ({
    userData: null,
    userProfileData: null,
    loading: false,
    fetchProfileData: async (id) => {
        const { token } = useAuthStore.getState();
        set({ loading: true });
        try {
            const data = await getProfileData(id, token);
            const { user } = useAuthStore.getState()
            if (id === user.id){
                set({ userData: data });
            }else{
                set({ userProfileData: data });
            }
        } finally {
            set({ loading: false });
        }
    },
    toggleFollow: () => {set((state) => {
        const nextState = state.userProfileData.followers.length === 0 ? [{}]: []; 
        const updated = {
            ...state.userProfileData,
            followers: nextState
        }
        return {userProfileData: updated}
    })},
    setUserProfileData: (data) => {set({userProfileData: data})}
})));