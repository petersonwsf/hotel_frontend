import { UserQueryParamsFilter } from "@/types/User.types";
import { handleToast } from "@/utils/handleToast";
import { api } from "./api";
import { cookies } from "next/headers";
import { buildQueryParams } from "@/utils/buildQueryParams";

const URL = process.env.URL_API_HOTEL

export async function listUsers(params : UserQueryParamsFilter) {
    
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value
    const queryParams = buildQueryParams(params)

    try {
        const response = await api.get(`${URL}/user${queryParams}`, {
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        return response.data
    } catch (error : any) {
        handleToast('Não foi possível recuperar a lista de usuários', 'error')
    }
}