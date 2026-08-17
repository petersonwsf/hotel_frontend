import { Reservation } from "@/types/Reservation.types";

export const calculateNextReservation = (reservations : Reservation[]) : Reservation | null => {
    if (reservations.length === 0) return null;
    const now = new Date().getTime();
    const nextReservation = reservations.reduce((nextCurrent, currentReservation) => {
        const diffCurrent = Math.abs(new Date(currentReservation.checkInDate).getTime() - now)
        const diffNext = Math.abs(new Date(nextCurrent.checkInDate).getTime() - now)

        return diffCurrent < diffNext ? currentReservation : nextCurrent;
    })
    return nextReservation
}