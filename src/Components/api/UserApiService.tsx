import axios from "axios";

const appClient = axios.create({
    baseURL : "http://localhost:8080"
})

export const getAllUser = () => appClient.get("/users")