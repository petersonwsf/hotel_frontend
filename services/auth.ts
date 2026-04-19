import { api } from "@/lib/api/api";

export async function login(data: {login: string, password: string}) {
    return api.post('/api/hotel/login', data)
}