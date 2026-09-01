import { Reservation, ReservationFilters } from "@/types/Reservation.types";
import { api } from "./api"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildQueryParams } from "@/utils/buildQueryParams";

const URL = process.env.URL_API_HOTEL

export async function getReservation(id: number) : Promise<Reservation> {

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
        throw error
    }
}

export async function getReservations(params?: ReservationFilters) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value
    const queryParams = buildQueryParams(params)

    console.log(queryParams)

    try {
        const response = await api.get(`${URL}/reservation${queryParams}`, {
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
        return []
    }
}

export async function getReservationsByUser(userId?: number, params?: ReservationFilters) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get("token")?.value

    const queryParams = buildQueryParams(params)

    try {
        const response = await api.get(`${URL}/reservation/user/${userId}${queryParams}`, {
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
        return []
    }
}