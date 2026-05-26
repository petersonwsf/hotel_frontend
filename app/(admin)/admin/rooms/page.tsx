import RoomHeader from "@/components/rooms/RoomHeader";
import RoomsList from "@/components/rooms/RoomsList";
import Pagination from "@/components/ui/Pagination";
import { getRooms } from "@/lib/api/rooms";

export default async function Rooms() {

    const rooms = await getRooms({page: 0, size: 10, sort: 'id,desc'})

    return (
        <div>
            <RoomHeader />
            <div className="flex flex-col gap-[1rem] mt-[2.5rem]">
                <RoomsList widthCard="w-[45%]" rooms={rooms.content} action="EDIT"/>
            </div>
            <div className="flex items-center justify-end mt-[1rem]">
                <Pagination page={rooms.pageable.pageNumber + 1} totalPages={rooms.totalPages} />
            </div> 
        </div>
    )
}