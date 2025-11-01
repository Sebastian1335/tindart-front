const url = import.meta.env.VITE_API_URL;

export const updateWhiteboard = async (token, whiteboard) => {
    const response = await fetch(`${url}/whiteboard/${whiteboard.id}`, {
        method: "PUT",
        body: JSON.stringify(whiteboard),
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json", 
        },
    })

    const json = await response.json()
    return json
}