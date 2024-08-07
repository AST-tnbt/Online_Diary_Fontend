import axios from "axios"

const apiClient = axios.create(
    {
        baseURL : "http://localhost:8080" 
    }
)

export const callHelloWorld = () =>
    apiClient.get("/hello")
