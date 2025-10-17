import { create } from "zustand";
import { uploadComment, uploadPost } from "../api/postrequiest";
import { getFeed, getPostDetais } from "../api/getRequest";

export const useFeed = create((set) => ({
    feed: [],
    selectedPost: null,
    image: false,
    selectPost: (post) =>
        set({
            selectedPost: post,
        }),
    diselectPost: () =>
        set(() => ({
            selectedPost: null,
        })),
    seeImage: () => set((state) => ({ image: !state.image })),
    loading: false, 
    error: null,
    fetchFeed: async (token ,page, limit) => {
        set({loading: true, error: null});
        try {
            const res = await getFeed(token, page, limit)
            if (!res.error) {
                set({feed: res.data})
            } else {
                set({error: res.error})   
                console.log(res.error)
            }
        } catch (error) {
            set({ error: error.message });
            console.log(error)
        } finally {
            set({loading: false})
        }
    },
    postDetails: async (token, postId) => {
        set({loading: true, error: null});
        try {
            const res = await getPostDetais(token, postId)
            if (!res.error) {
                set((state) => ({selectedPost: {...state.selectedPost, ...res}}))
            } else {
                set({error: res.error})
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({loading: false})
        }
    },
    pushComment: (com) => set((state) => {
        const updated = {
            ...state.selectedPost,
            comments: [{content: com},...(state.selectedPost?.comments ?? [])]
        }
        return {selectedPost: updated}
        // Esto obliga a Zustand a actualizar también si depende de selectedPost directamente
        // selectedPostVersion: Date.now()
    })

}));

export const publishArt = create((set) => ({
    publish: null,
    loading: false,
    error: null,
    setPublish: (formValue) => set(() => ({
        publish: formValue,
    })),
    publishPost: async (formData, token) => {
        set({loading: true, error: null});
        try {
            const res = await uploadPost(formData, token)
            if (!res.error){
                set({publish: res})
            } else {
                set({error: res.error})
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({loading: false})
        }
    },
}));

export const postComment = create((set) => ({
    comment: null,
    loading: false,
    error: null,
    setComment: (formValue) => set(() => ({
        comment: formValue,
    })),
    publishComment: async (formData, token, postId) => {
        set({loading: true, error: null});
        try {
            const res = await uploadComment(formData, token, postId)
            if (!res.error){
                set({comment: res})
            } else {
                set({error: res.error})
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({loading: false})
        }
    },
}));
