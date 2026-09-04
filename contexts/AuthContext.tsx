"use client";
import { createContext, useContext } from "react";

export interface User {
    id: number;
    name: string;
    role: string;
    login: string;
    imageKey?: string;
}

interface AuthContextType  {
    user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null })

export function AuthProvider({user, children} : {user: User | null, children: React.ReactNode}) {
    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)