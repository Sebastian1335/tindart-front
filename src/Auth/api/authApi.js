const url = import.meta.env.VITE_API_URL;

export const register = async (body) => { 
    const request = await fetch(`${url}/auth/register`, { 
        method: "POST", 
        body: body, 
        headers: { "Content-Type": "application/json", }, 
    }) 
    const response = await request.json() 
    return response 
} 

export const login = async (body) => { 
    const request = await fetch(`${url}/auth/login`, {
        method: "POST", 
        body: body, 
        headers: { "Content-Type": "application/json", }, 
    }) 
    const response = await request.json() 
    return response
}