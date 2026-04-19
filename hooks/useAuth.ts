"use client"
import { loginAction, logoutAction } from "@/actions/auth"
import { useActionState, useTransition } from "react"

export default function useAuth() {
    const [stateLogin, actionLogin, isPendingLogin] = useActionState(loginAction, null);
    const [, actionLogout, ] = useActionState(logoutAction, null)
    const [, startTransition] = useTransition()

    function login(data: {login: string, password: string}) {
        startTransition(() => {
            actionLogin(data)
        })
    }

    function logout() {
        startTransition(() => {
            actionLogout()
        })
    }
    
    return { 
        stateLogin,
        login,
        isPendingLogin,
        logout
    }
}