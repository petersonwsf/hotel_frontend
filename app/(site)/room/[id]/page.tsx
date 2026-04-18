import AboveTheFold from "@/components/room/AboveTheFold"
import RoomReviews from "@/components/room/RoomReviews"

export default async function RoomPage({ params } : { params: Promise<{ id : string }>}) {
    
    const { id } = await params
    
    return (
        <div id="room-details" aria-label={`Detalhes do quarto ${id}`} className="w-7xl m-auto py-5 my-3">
            <AboveTheFold />
            <RoomReviews />
        </div>
    )
}