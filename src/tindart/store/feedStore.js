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
    fetchFeed: async (token, page, limit) => {
        set({ loading: true, error: null });
        try {
            const res = await getFeed(token, page, limit);
            if (!res.error) {
                set({ feed: res.data });
            } else {
                set({ error: res.error });
                console.log(res.error);
            }
        } catch (error) {
            set({ error: error.message });
            console.log(error);
        } finally {
            set({ loading: false });
        }
    },
    postDetails: async (token, postId) => {
        set({ loading: true, error: null });
        try {
            const res = await getPostDetais(token, postId);
            if (!res.error) {
                set((state) => ({
                    selectedPost: { ...state.selectedPost, ...res },
                }));
            } else {
                set({ error: res.error });
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
    pushComment: (commentObj) =>
        set((state) => ({
            selectedPost: {
            ...state.selectedPost,
            comments: [commentObj, ...(state.selectedPost?.comments ?? [])],
            },
        })),

    toggleLike: () =>
        set((state) => {
            if (!state.selectedPost) return {};
            const nextState = !state.selectedPost.postDetails.likedByUser
            const count = state.selectedPost.postDetails.count.LikePost
            const updated = {
                ...state.selectedPost,
                postDetails: {
                    ...state.selectedPost.postDetails,
                    likedByUser: nextState,
                    count: {
                        ...state.selectedPost.postDetails.count,
                        LikePost: nextState ? count + 1 : count - 1
                    }
                },
            };
            return { selectedPost: updated };
        }),
    toggleLikeComment: (index) =>
        set((state) => {
            
            if (!state.selectedPost) return {};
            const updatedComments = state.selectedPost.comments.map((comment, i) => {
                if (i === index){
                    const nextLiked = !comment.liked;
                    return {
                        ...comment,
                        liked: nextLiked,
                        countlikes: comment.countlikes + (nextLiked ? 1 : -1),
                    }
                }
                return comment;
            })

            return {
                selectedPost: {
                    ...state.selectedPost,
                    comments: updatedComments
                }
            }
        }),

    toggleSave: () =>
        set((state) => {
            if (!state.selectedPost) return {};
            const nextState = !state.selectedPost.postDetails.savedByUser
            const count = state.selectedPost.postDetails.count.SavePost
            const updated = {
                ...state.selectedPost,
                postDetails: {
                    ...state.selectedPost.postDetails,
                    savedByUser: !state.selectedPost.postDetails.savedByUser,
                    count: {
                        ...state.selectedPost.postDetails.count,
                        SavePost: nextState ? count + 1 : count - 1
                    }
                },
            };
            return { selectedPost: updated };
        }),

    toggleShare: () =>
        set((state) => {
            if (!state.selectedPost) return {};
            const nextState = !state.selectedPost.postDetails.sharedByUser
            const count = state.selectedPost.postDetails.count.SharePost
            const updated = {
                ...state.selectedPost,
                postDetails: {
                    ...state.selectedPost.postDetails,
                    sharedByUser: !state.selectedPost.postDetails.sharedByUser,
                    count: {
                        ...state.selectedPost.postDetails.count,
                        SharePost: nextState ? count + 1 : count - 1
                    }
                },
            };
            return { selectedPost: updated };
        }),
}));

export const publishArt = create((set) => ({
    publish: null,
    loading: false,
    error: null,
    setPublish: (formValue) =>
        set(() => ({
            publish: formValue,
        })),
    publishPost: async (formData, token) => {
        set({ loading: true, error: null });
        try {
            const res = await uploadPost(formData, token);
            if (!res.error) {
                set({ publish: res });
            } else {
                set({ error: res.error });
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
}));

export const postComment = create((set) => ({
    comment: null,
    loading: false,
    error: null,
    setComment: (formValue) =>
        set(() => ({
            comment: formValue,
        })),
    publishComment: async (formData, token, postId) => {
        set({ loading: true, error: null });
        try {
            const res = await uploadComment(formData, token, postId);
            if (!res.error) {
                set({ comment: res });
                return res
            } else {
                set({ error: res.error });
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: false });
        }
    },
}));
