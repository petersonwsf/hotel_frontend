"use server";
import { cookies } from "next/headers";
import { JWTPayload, jwtVerify } from "jose";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { UserRegister } from "@/types/User.types";
import { revalidatePath } from "next/cache";

const URL_API_HOTEL = process.env.URL_API_HOTEL

export async function loginAction(prevState: unknown, data: {login: string, password: string}) : Promise<{ message: string, data: JWTPayload | null}> {

    try {
        const response = await fetch(`${URL_API_HOTEL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const err = await response.json()
            return { erro: err.message }
        }

        const { token } = await response.json()

        const cookiesStore = await cookies()
        cookiesStore.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        })

        const secret = new TextEncoder().encode(process.env.SECRET_JWT)

        const { payload } = await jwtVerify(token, secret)

        return { message: 'Login feito com sucesso', data: payload }
    } catch (error : any) {
        if (isRedirectError(error)) throw error
        if (error.status === 502) return { message : "Erro de conexão com o servidor ", data: null}
        return { message: error.response.data.message, data: null}
    }
}

export async function logoutAction(prevState: unknown) {
    const cookiesStore = await cookies()
    cookiesStore.delete('token')
    revalidatePath('/', 'layout')
}

export async function registerClientUser(prevState: unknown, data: UserRegister) : Promise<{ message: string, data: JwtPayload | null}> {

    try {
        const response = await fetch(`${URL_API_HOTEL}/client`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const err = await response.json()
            return { message: err.message, data: null }
        }

        const { token } = await response.json()

        const cookiesStore = await cookies()
        cookiesStore.set('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24
        })

        const secret = new TextEncoder().encode(process.env.SECRET_JWT)

        const { payload } = await jwtVerify(token, secret)

        return { message: 'Cliente registrado com sucesso', data: payload }
    } catch ( error : any ) {
        if (isRedirectError(error)) throw error
        if (error.status === 502) return { message: "Erro de conexão com o servidor ", data: null}
        return { message: error.response.data.message, data: null }
    }
}