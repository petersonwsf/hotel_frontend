"use client";
import { createContext, useContext } from "react";

export interface User {
    id: unknown;
    name: unknown;
    role: unknown;
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