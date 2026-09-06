"use client";
import { createContext, useContext, useState } from "react";

export interface User {
    id: number;
    name: string;
    role: string;
    login: string;
    imageKey?: string;
}

interface AuthContextType  {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    updateUser: (newData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
    updateUser: () => {},
});

export function AuthProvider({user: initialUser, children} : {user: User | null, children: React.ReactNode}) {

    const [user, setUser] = useState<User | null>(initialUser)

    const updateUser = (newData: Partial<User>) => {
        setUser((prevUser) => (prevUser ? { ...prevUser, ...newData } : null));
    };

    return (
        <AuthContext.Provider value={{ user, setUser, updateUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)