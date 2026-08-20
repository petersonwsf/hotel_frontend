"use server"

import { getReservation } from "@/lib/api/reservation"
import { Reservation } from "@/types/Reservation.types";

type Resultado = { success : true , data: Reservation } | { success : false, erro: string }

export async function getReservationAction(id: number) : Promise<Resultado> {
    try {
        const reservation = await getReservation(id)
        return { success: true, data: reservation }
    } catch (error : any) {
        console.log(error)
        return { success: false, erro: error.response.data.message }
    }
}