"use client"
import { loginAction, logoutAction, registerClientUser } from "@/actions/auth"
import { UserRegister } from "@/types/User.types";
import { useActionState, useTransition } from "react"

export default function useAuth() {
    const [stateLogin, actionLogin, isPendingLogin] = useActionState(loginAction, null);
    const [stateRegisterClient, actionRegisterClient, isPendingRegisterClient] = useActionState(registerClientUser, null)
    const [, startTransition] = useTransition()

    function login(data: {login: string, password: string}) {
        startTransition(() => {
            actionLogin(data)
        })
    }

    function logout() {
        startTransition(async () => {
            await logoutAction(null)
            window.location.reload()
        })
    }

    function registerClient(data: UserRegister) {
        startTransition(() => {
            actionRegisterClient(data)
        })
    }
    
    return { 
        stateLogin,
        login,
        isPendingLogin,
        logout,
        registerClient,
        stateRegisterClient,
        isPendingRegisterClient
    }
}