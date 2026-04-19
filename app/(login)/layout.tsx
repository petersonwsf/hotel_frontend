import React from "react";
import '../globals.css'
import { Metadata } from "next";

export const metadata : Metadata = {
    title: 'Login | Lúmen Hotel'
}

export default function LoginLayout({ children } : Readonly<{ children: React.ReactNode}>) {
    return (
        <main className="flex min-h-[100vh] items-center justify-center bg-blue-400">
            { children }
        </main>
    )
}