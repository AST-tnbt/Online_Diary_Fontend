import { apiClient } from "./AppClient";

export const callHelloWorld = () =>
    apiClient.get("/hello")
