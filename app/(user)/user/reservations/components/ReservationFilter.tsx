"use client"
import { Filter } from "@/types/Reservation.types"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ReservationFilter() {

    const [filter, setFilter] = useState<Filter>('ACTIVE')

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    function handleQueryParams(value: Filter) {
        setFilter(value)
        const params = new URLSearchParams(searchParams.toString())
        if (value === 'ACTIVE') {
            params.delete('status')
            params.set('page', '0')
            params.append('status', 'CONFIRMED')
            params.append('status', 'PENDING')
            params.append('status', 'CHECKED_IN')
        } else if (value == 'COMPLETED') {
            params.delete('status')
            params.set('page', '0')
            params.append('status', 'CHECKED_OUT')
        } else if (value == 'CANCELED') {
            params.delete('status')
            params.set('page', '0')
            params.append('status', 'CANCELED')
        }
        router.push(`${pathname}?${params.toString()}`)
    }
    
    return (
        <div className="flex w-full border-b-1 border-gray-300 my-5 gap-[2rem]">
            <div onClick={() => handleQueryParams('ACTIVE')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${filter === 'ACTIVE' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Ativas 
            </div>
            <div onClick={() => handleQueryParams('COMPLETED')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${filter === 'COMPLETED' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Concluídas 
            </div>
            <div onClick={() => handleQueryParams('CANCELED')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${filter === 'CANCELED' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Canceladas
            </div>
        </div>
    )
}