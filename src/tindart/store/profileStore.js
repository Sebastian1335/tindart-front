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
            console.log("userData actualizado:", useProfileStore.getState().userData);
            console.log("userProfileData actualizado:", useProfileStore.getState().userProfileData);
        } finally {
            set({ loading: false });
        }
    },
    setUserProfileData: (data) => {set({userProfileData: data})}
})));