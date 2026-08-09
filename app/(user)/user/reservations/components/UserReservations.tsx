"use client"
import { Filter, Reservation } from "@/types/Reservation.types"
import { useMemo, useState } from "react"
import ReservationFilter from "./ReservationFilter"
import ReservationCard from "./ReservationCard";
import Pagination from "@/components/ui/Pagination";

interface UserReservationsProps {
    reservations: Reservation[];
    pagination : {page : number, totalPages: number}
}

export default function UserReservations({ reservations, pagination } : UserReservationsProps) {

    const [filter, setFilter] = useState<Filter>('ACTIVE')

    const reservationsShow : Reservation[] = useMemo(() => {
        if (filter === 'ACTIVE') return reservations.filter(reservation => reservation.status === 'CONFIRMED' || reservation.status === 'PENDING' || reservation.status === 'CHECKED_IN')
        if (filter === 'COMPLETED') return reservations.filter(reservation => reservation.status === 'CHECKED_OUT')
        if (filter === 'CANCELED') return reservations.filter(reservation => reservation.status === 'CANCELED')
        return []
    }, [reservations, filter])

    return (
        <div>
            <ReservationFilter activeFilter={filter} setFilter={setFilter} reservations={reservations} />
            <div className="flex flex-col gap-[2rem] my-[1.5rem]">
                {reservationsShow.map(reservation => (
                    <ReservationCard reservation={reservation} key={reservation.id} />
                ))}
                <div className="flex items-center justify-end">
                    <Pagination page={pagination.page} totalPages={pagination.totalPages} />
                </div>
            </div>
        </div>
    )
}