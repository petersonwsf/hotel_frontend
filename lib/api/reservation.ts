import { api } from "./api"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const URL = process.env.URL_API_HOTEL

export async function getReservation(id: number) {

    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value

    try {
        const response = await api.get(`${URL}/reservation/${id}`, {
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