"use client"
import { Filter, Reservation } from "@/types/Reservation.types"
import { useState } from "react"
import ReservationFilter from "./ReservationFilter"
import ReservationCard from "./ReservationCard";
import Pagination from "@/components/ui/Pagination";

interface UserReservationsProps {
    reservations: Reservation[];
    pagination : {page : number, totalPages: number}
}

export default function UserReservations({ reservations, pagination } : UserReservationsProps) {

    const [filter, setFilter] = useState<Filter>('ACTIVE')

    return (
        <div>
            <ReservationFilter activeFilter={filter} setFilter={setFilter} reservations={reservations} />
            <div className="flex flex-col gap-[2rem] my-[1.5rem]">
                {reservations.length > 0  ? reservations.map(reservation => (
                    <ReservationCard reservation={reservation} key={reservation.id} />
                )) : (
                    <div className="w-full flex justify-center items-center h-[150px]">
                        <p className="font-light text-gray-500 text-xl">Não há reservas</p>
                    </div>
                )}
                <div className="flex items-center justify-end">
                    <Pagination page={pagination.page} totalPages={pagination.totalPages} />
                </div>
            </div>
        </div>
    )
}