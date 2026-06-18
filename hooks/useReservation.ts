"use client"

import { api } from "@/lib/api/api";
import { Reservation, ReservationSaveDTO } from "@/types/Reservation.types";
import { handleToast } from "@/utils/handleToast";
import { useRouter } from "next/navigation";

export default function useReservation() {

    const router = useRouter()

    async function createReservation(data: ReservationSaveDTO) {

        let success = false;
        let id : number | undefined = undefined;
        try {
            const response = await api.post(`/hotel/reservation`, data)
            const reservation : Reservation = response.data
            handleToast("Reserva criada com sucesso!", "success")
            success = true;
            id = reservation.id
        } catch (error : any) {
            handleToast(error.response.data.message, 'error')
        }
        if (success) {
            router.push(`/payment/${id}`)
        }
    }

    return {
        createReservation
    }
}