const url = import.meta.env.VITE_API_URL;


export const fetchWithAuth = async (endpoint, token, page, limit) => {
  const response = await fetch(`${url}/${endpoint}?page=${page}&limit=${limit}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  const json = await response.json();
  return json;
};


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

export const getWhiteboards = async (token) => {
    const response = await fetch(`${url}/whiteboard`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const json = await response.json()
    return json
}

export const getSnapshot = async (token, id) => {
    const response = await fetch(`${url}/whiteboard/${id}/snapshot`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const json = await response.json()
    return json
}

export const getProfileData = async (id, token) => {
    const request = await fetch(`${url}/profile/profileData/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const response = await request.json() 
    return response
}