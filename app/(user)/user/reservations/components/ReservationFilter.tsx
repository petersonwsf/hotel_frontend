"use client"
import { Filter, Reservation } from "@/types/Reservation.types"
import { useMemo } from "react";

interface ReservationFilter {
    activeFilter: Filter;
    setFilter: (value: Filter) => void;
    reservations: Reservation[];
}

export default function ReservationFilter({ activeFilter, setFilter, reservations } : ReservationFilter) {
    
    const quantity = useMemo(() => {
        return {
            actives: reservations.filter(reservation => reservation.status === 'CONFIRMED' || reservation.status === 'PENDING' || reservation.status === 'CHECKED_IN').length,
            completed: reservations.filter(reservation => reservation.status === 'CHECKED_OUT').length,
            canceled: reservations.filter(reservation => reservation.status === 'CANCELED').length,
        }
    }, [reservations])
    
    return (
        <div className="flex w-full border-b-1 border-gray-300 my-5 gap-[2rem]">
            <div onClick={() => setFilter('ACTIVE')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${activeFilter === 'ACTIVE' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Ativas ({quantity.actives})
            </div>
            <div onClick={() => setFilter('COMPLETED')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${activeFilter === 'COMPLETED' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Concluídas ({quantity.completed})
            </div>
            <div onClick={() => setFilter('CANCELED')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${activeFilter === 'CANCELED' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Canceladas ({quantity.canceled})
            </div>
        </div>
    )
}