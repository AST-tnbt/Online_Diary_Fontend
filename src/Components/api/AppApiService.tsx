import axios from "axios";

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

const appClient = axios.create({
    baseURL : "http://localhost:8080"
});

export const getAllUser = () => appClient.get("/users");
export const getUserById = (id : number) => appClient.get(`/users/${id}`);
export const getAllPost = (id: number) => appClient.get(`/users/${id}/posts`);
export const sendPost = (id: number, title: string, body: string, createAt: Date) => appClient.post(`/users/${id}/posts`, {title, body, createAt});
export const createNewUser = (name: string, username: string, password: string, birthdate: Date, gender: string) => appClient.post("/users", {name, username, password, birthdate, gender});
export const deletePostById = (id: number) => appClient.delete(`/posts/${id}`);
export const updateUserById = (id: number, user: User) => appClient.put(`/users/${id}`, user);
export const updatePostById = (userId: number, postId: number, post: Post) => appClient.put(`/users/${userId}/posts/${postId}`, post);
