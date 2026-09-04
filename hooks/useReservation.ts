"use client"

import { api } from "@/lib/api/api";
import { Reservation, ReservationSaveDTO, ReservationUpdateDTO } from "@/types/Reservation.types";
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

    async function updateReservation(data: ReservationUpdateDTO, id: number) {
        try {
            await api.patch(`/hotel/reservation/${id}`, data)
            handleToast("Reserva criada com sucesso!", "success")
            router.refresh()
        } catch (error : any) {
            handleToast(error.response.data.message, 'error')
        }
    }

    async function cancelReservation(id: number) {
        try {
            await api.delete(`/hotel/reservation/${id}`)
            handleToast("Reserva cancelada com sucesso!", "success")
            router.refresh()
        } catch (error: any) {
            handleToast(error.response.data.message, 'error')
        }
    }

    async function checkInReservation(id: number) {
        try {
            await api.patch(`/hotel/reservation/checkIn/${id}`)
            handleToast("Check In feito com sucesso!", "success")
            router.refresh()
        } catch (error: any) {
            handleToast(error.response.data.message, 'error')
        }
    }

    async function checkOutReservation(id: number) {
        try {
            await api.patch(`/hotel/reservation/checkOut/${id}`)
            handleToast("Check Out feito com sucesso!", "success")
            router.refresh()
        } catch (error: any) {
            handleToast(error.response.data.message, 'error')
        }
    }

    return {
        createReservation,
        updateReservation,
        cancelReservation,
        checkInReservation,
        checkOutReservation,
    }
}