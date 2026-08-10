"use client"
import { Filter, Reservation } from "@/types/Reservation.types"
import { usePathname, useSearchParams, useRouter } from "next/navigation";

interface ReservationFilter {
    activeFilter: Filter;
    setFilter: (value: Filter) => void;
    reservations: Reservation[];
}

export default function ReservationFilter({ activeFilter, setFilter, reservations } : ReservationFilter) {

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
            <div onClick={() => handleQueryParams('ACTIVE')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${activeFilter === 'ACTIVE' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Ativas 
            </div>
            <div onClick={() => handleQueryParams('COMPLETED')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${activeFilter === 'COMPLETED' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Concluídas 
            </div>
            <div onClick={() => handleQueryParams('CANCELED')} className={`pb-2 px-[1rem] font-light cursor-pointer duration-[.3s] ${activeFilter === 'CANCELED' ? 'border-b-3 text-[#002179] border-[#002179] font-semibold' : 'text-gray-700'}`}>
                Canceladas
            </div>
        </div>
    )
}