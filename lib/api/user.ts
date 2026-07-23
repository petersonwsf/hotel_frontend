import { UserQueryParamsFilter } from "@/types/User.types";
import { handleToast } from "@/utils/handleToast";
import { api } from "./api";
import { cookies } from "next/headers";

const URL = process.env.URL_API_HOTEL

export async function listUsers(params : UserQueryParamsFilter) {
    
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value

    try {
        const response = await api.get(`${URL}/user?page=${params.page}&size=${params.size}`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        return response.data
    } catch (error : any) {
        handleToast('Não foi possível recuperar a lista de usuários', 'error')
    }
}