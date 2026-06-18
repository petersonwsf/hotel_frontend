import RoomDescription from "@/components/reservation/RoomDescription"
import { getRoomById } from "@/lib/api/rooms"
import { notFound } from "next/navigation"
import ReservationDetails from "@/components/reservation/ReservationDetails"

export default async function Reservation({ params } : { params: Promise<{ id : string }>}) {
    
    const { id } = await params
    
    const room = await getRoomById(Number(id))
    
    if (!room) {
        notFound()
    }

    return (
        <div id="reservation-page" className="w-7xl m-auto py-5 my-3">
            <div className="flex gap-[2rem] items-start">
                <div className="w-[70%] flex flex-col gap-5">
                    <RoomDescription room={room} />
                </div>
                <ReservationDetails room={room}/>
            </div>
        </div>
    )
}