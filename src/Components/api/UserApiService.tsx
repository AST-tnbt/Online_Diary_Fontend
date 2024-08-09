import axios from "axios";

const appClient = axios.create({
    baseURL : "http://localhost:8080"
})

export const getAllUser = () => appClient.get("/users")
export const getUserById = (id : number) => appClient.get(`/users/${id}`) 
export const getAllPost = (id: number) => appClient.get(`/users/${id}/posts`)
export const sendPost = (id: number, title: string, body: string, createAt: Date) => appClient.post(`/users/${id}/posts`, {title, body, createAt}) 