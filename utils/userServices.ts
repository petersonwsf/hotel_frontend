import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function getUser() {
    try {
        const cookiesStore = await cookies()
        const token = cookiesStore.get('token')?.value

        if (!token) return null

        const secret = new TextEncoder().encode(process.env.SECRET_JWT)

        const { payload } = await jwtVerify(token, secret)

        return {
            user: {
                id: payload.id,
                name: payload.name,
                role: payload.role
            },
            success: true
        }
    } catch (error : any) {
        if (error.code === 'ERR_JWT_EXPIRED') return { user: null , success : false }
        throw error;
    }
}