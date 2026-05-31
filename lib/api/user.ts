import { UserQueryParamsFilter } from "@/types/User.types";
import { handleToast } from "@/utils/handleToast";
import { api } from "./api";

const URL = process.env.URL_API_HOTEL

export async function listUsers(params : UserQueryParamsFilter) {
    try {
        const response = await api.get(`${URL}/user`, { params })
        return response.data
    } catch (error : any) {
        handleToast('Não foi possível recuperar a lista de usuários', 'error')
    }
}