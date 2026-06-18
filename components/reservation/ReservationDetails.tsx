"use client"
import { Room } from "@/types/Room.types";
import ReservationDates from "./ReservationDates";
import ReservationPrice from "./ReservationPrice";
import { useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import useReservation from "@/hooks/useReservation";
import { ReservationSaveDTO } from "@/types/Reservation.types";
import { redirect } from "next/navigation";

interface ReservationDetailsProps {
    room: Room;
}

export default function ReservationDetails({ room } : ReservationDetailsProps) {

    const { user } = useAuthContext()
    const [totalDays, setTotalDays] = useState<number | undefined>(undefined)
    const [dates, setDates] = useState<{startDate: string | undefined, endDate: string | undefined}>({startDate: undefined, endDate: undefined})
    const [allowed, setAllowed] = useState<boolean | null>(null)
    const { createReservation } = useReservation()

    async function handleCreateReservation() {
        if (!user) redirect(`/login?redirect=/reservation/${room.id}`)
        const data : ReservationSaveDTO = {
            userId: user.id as number,
            roomId: room.id,
            checkInDate: dates.startDate!,
            checkOutDate: dates.endDate!,
            dailyRate: room.customPrice,
            discountAmount: 0,
            serviceFee: 50,
        }
        await createReservation(data);
    }

    return (
        <div className="w-[30%] flex flex-col gap-5">    
            <ReservationPrice allowed={allowed} totalDays={totalDays} room={room} createReservationFunction={handleCreateReservation}/>
            <ReservationDates room={room} totalDays={totalDays} setTotalDays={setTotalDays} allowed={allowed} setAllowed={setAllowed} dates={dates} setDates={setDates} />
        </div>
    )
}