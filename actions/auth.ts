"use server";
import { cookies } from "next/headers";
import { apiServer } from "@/lib/api/api";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { UserRegister } from "@/types/UserRegister";

export async function loginAction(prevState: unknown, data: {login: string, password: string}) {
    try {
        const response = await apiServer.post("/hotel/login", data)
        
        const { token } = response.data

        const cookiesStore = await cookies()
        cookiesStore.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        })

        const secret = new TextEncoder().encode(process.env.SECRET_JWT)

        const { payload } = await jwtVerify(token, secret)

        if (payload.role === 'CLIENT') {
            redirect('/')
        } else {
            redirect('/admin')
        }
    } catch (error : any) {
        if (isRedirectError(error)) throw error
        if (error.status === 502) return { erro : "Erro de conexão com o servidor "}
        return { erro: error.response.data.message }
    }
}

export async function logoutAction(prevState: unknown) {
    const cookiesStore = await cookies()
    cookiesStore.delete('token')
}

export async function registerClientUser(prevState: unknown, data: UserRegister) {
    try {
        const response = await apiServer.post("/hotel/client", data)

        const { token } = response.data

        const cookiesStore = await cookies()
        cookiesStore.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        })

        redirect('/')

    } catch ( error : any ) {
         if (isRedirectError(error)) throw error
        if (error.status === 502) return { erro : "Erro de conexão com o servidor "}
        return { erro: error.response.data.message }
    }
}