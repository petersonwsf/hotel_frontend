import React from "react";
import './globals.css'
import Toast from "@/components/ui/Toast";
import { AuthProvider } from "@/contexts/AuthContext";
import { getUser } from "@/utils/userServices";

export default async function LoginLayout({ children } : Readonly<{ children: React.ReactNode}>) {

    const user = await getUser()

    return (
        <html lang="pt-br">
            <body className="bg-gray-300">
                <Toast />
                <AuthProvider user={user?.success ? user.user : null}>
                    { children }
                </AuthProvider>
            </body>
        </html>
    )
}