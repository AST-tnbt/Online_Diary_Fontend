import React, { createContext, ReactNode, useContext, useState } from "react";
import { getAllUser } from "../api/AppApiService";


interface AuthProviderProps {
    children: ReactNode;
}
interface AuthContextType {
    isAuthenticated: boolean;
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    login: (username: string, password: string) => Promise<number | null>;
    logout: () => void;
    userId: number | undefined;
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
    const [userId, setUserId] = useState<number | undefined>(undefined);
    
    async function login(username: string, password: string) {
        return getAllUser()
            .then((respone) => {
                const users: User[] = respone.data;
                const user = users.find(user => user.username === username && user.password === password);
                if (user) {
                    setAuthenticated(true);
                    setUserId(user.id);
                    return user.id;
                  } else {
                    setAuthenticated(false);
                    return null;
                  }
            })
            .catch((error) => {
                console.error("Error: ", error);
                return null;
            });
    }
    function logout() {
        setUserId(undefined);
        setAuthenticated(false);
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, setAuthenticated, login, logout, userId}}>
            {children}
        </AuthContext.Provider>
    )
} 