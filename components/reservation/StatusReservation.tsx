import { useMemo } from "react";
import { ReservationStatus } from "@/types/Reservation.types"
import { formatEnums } from "@/utils/formatTextsRooms";

interface StatusreservationProps {
    status: ReservationStatus;
}

export default function StatusReservation({ status } : StatusreservationProps) {

    const colors : { background: string, color: string } = useMemo(() => {
        if (status === 'PENDING') return {color: '#F59E0B', background: '#f4d9ab'}
        if (status === 'CHECKED_IN') return {color: '#3B82F6', background: '#b3cffc'}
        if (status === 'CONFIRMED') return {color: '#10b953', background: '#baffe8'}
        if (status === 'CANCELED') return {color: '#EF4444', background: '#fdbbbb'}
        if (status === 'NO_SHOW') return {color: '#8B5CF6', background: '#dbccfe'}
        return {color: '#6B7280', background: '#eaeaea'}
    }, [status])

    return (
        <span style={{
            backgroundColor: colors.background,
            color: colors.color,
            borderColor: colors.color
        }}
            className={`border-2 rounded-md py-[.5rem] px-[1.5rem] font-semibold tracking-[.1rem]`}>
            {formatEnums(status)}
        </span>
    )
}