import { api } from "./api"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const URL = process.env.URL_API_PAYMENT

export async function getPaymentByReservationId(reservationId : number) {
    
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value

    try {
        const response = await api.get(`${URL}/payment/reservation/${reservationId}`, {
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
        return null
    }
}