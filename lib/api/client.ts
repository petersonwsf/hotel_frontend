import { buildQueryParams } from "@/utils/buildQueryParams";
import { api } from "./api"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ClientQueryParams } from "@/types/Client.types";

const URL = process.env.URL_API_HOTEL

export async function getClientByUserId(id?: number) {

    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value

    try {
        const response = await api.get(`${URL}/client/user/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error : any) {
        let err : string = ''
        if (error.response.status == 403) {
            err = 'forbidden'
            redirect(`/?error=${err}`)
        }
    }

}

export async function getClientList(params: ClientQueryParams) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value

    const queryParams = buildQueryParams(params)

    try {
        const response = await api.get(`${URL}/client${queryParams}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error : any) {
        let err : string = ''
        if (error.response.status == 403) {
            err = 'forbidden'
            redirect(`/?error=${err}`)
        }
    }
}