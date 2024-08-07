import React, { createContext, ReactNode, useContext, useState } from "react";
import { getAllUser } from "../api/UserApiService";


interface AuthProviderProps {
    children: ReactNode;
}
interface AuthContextType {
    isAuthenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    username: string;
}
interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    birthdate: string;
    gender: string;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined); 
export const useAuth = () => useContext(AuthContext);


export default function AuthProvider({children} : AuthProviderProps) {
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    
    async function login(username: string, password: string) {
        return getAllUser()
            .then((respone) => {
                const users: User[] = respone.data;
                const user = users.find(user => user.username === username && user.password === password);
                if (user) {
                    setAuthenticated(true);
                    setUsername(username);
                    console.log("success");
                    return true;
                  } else {
                    setAuthenticated(false);
                    return false;
                  }
            })
            .catch((error) => {
                console.error("Error: ", error);
                return false;
            });
    }
    function logout() {
        setUsername("");
        setAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated, login, logout, username}}>
            {children}
        </AuthContext.Provider>
    )
} 