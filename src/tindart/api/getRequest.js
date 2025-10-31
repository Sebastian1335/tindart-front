const url = import.meta.env.VITE_API_URL;


export const getFeed = async (token, page, limit) => {
    const response = await fetch(`${url}/feed/?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })

    const json = await response.json()
    return json
}

export const getPostDetais = async (token, postId) => {
    const response = await fetch(`${url}/feed/post/${postId}/details`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })

    const json = await response.json()

    return json
}
