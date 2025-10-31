
// const url = process.env.VITE_ENV_API_URL
const url = import.meta.env.VITE_API_URL;


export const uploadPost = async (formData, token) => {
    const response = await fetch(`${url}/feed/post`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    })

    const json = await response.json()

    return json
}


export const uploadComment = async (formData, token, postId) => {
    const response = await fetch(`${url}/feed/post/${postId}/comment`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData,
    })

    const json = await response.json()

    return json
}

export const fetchToggleLike = async (token, postId) => {
    const response = await fetch(`${url}/interaction/like/post/${postId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const json = await response.json()
    return json
}
export const fetchToggleSave = async (token, postId) => {
    const response = await fetch(`${url}/interaction/save/post/${postId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const json = await response.json()
    return json
}
export const fetchToggleShare = async (token, postId) => {
    const response = await fetch(`${url}/interaction/share/post/${postId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const json = await response.json()
    return json
}
export const fetchToggleLikeComment = async (token, commentId) => {
    const response = await fetch(`${url}/interaction/like/comment/${commentId}`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const json = await response.json()
    return json
}