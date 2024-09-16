import { apiClient } from "./AppClient";

interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    birthdate: string;
    gender: string;
}
interface Post {
    id: number;
    title: string;
    body: string;
    createAt: Date;
}

export const getAllUser = () => apiClient.get("/users", {headers: {Authorization: "Basic YXN0OjEyMw=="}});
export const getUserById = (id : number) => apiClient.get(`/users/${id}`);
export const getAllPost = (id: number) => apiClient.get(`/users/${id}/posts`);
export const sendPost = (id: number, title: string, body: string, createAt: Date) => apiClient.post(`/users/${id}/posts`, {title, body, createAt});
export const createNewUser = (name: string, username: string, password: string, birthdate: Date, gender: string) => apiClient.post("/users", {name, username, password, birthdate, gender});
export const deletePostById = (id: number) => apiClient.delete(`/posts/${id}`);
export const updateUserById = (id: number, user: User) => apiClient.put(`/users/${id}`, user);
export const updatePostById = (userId: number, postId: number, post: Post) => apiClient.put(`/users/${userId}/posts/${postId}`, post);
export const executeBasicAuth = (token: string) => apiClient.get("/basicauth", {headers: {Authorization: token}});

