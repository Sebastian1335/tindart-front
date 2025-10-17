
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

