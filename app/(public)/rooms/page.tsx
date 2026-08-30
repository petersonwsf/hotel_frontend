import Filter from "@/components/rooms/Filter";
import Pagination from "@/components/ui/Pagination";
import RoomsList from "@/components/rooms/RoomsList";
import { getRooms } from "@/lib/api/rooms";
import { RoomCategory, StatusRoom } from "@/types/Room.types";

interface RoomsProps {
    searchParams: Promise<{ page?: string, status?: StatusRoom, floor?: string[], category?: RoomCategory[] }>;
}

export default async function Rooms({ searchParams } : RoomsProps) {
    
    const resolvedSearchParams = await searchParams;
    const currentPage = Number(resolvedSearchParams.page) || 0;
    const categories = resolvedSearchParams.category || []
    const floors = resolvedSearchParams.floor || []
    const rooms = await getRooms({ page: currentPage, size: 10, category: categories, floor: floors });

    return (
        <section id="rooms" aria-label="Quartos disponíveis">
            <div className="flex justify-center items-start w-7xl m-auto gap-5 my-[4rem]">
                <Filter />
                <div className="w-full">
                    <h2 className="text-3xl font-semibold mb-[1rem]">Quartos</h2>
                    <RoomsList rooms={rooms.content} widthCard="w-full" action="REDIRECT" />
                    <div className="flex items-center justify-end mt-[1rem]">
                        <Pagination page={rooms.pageable.pageNumber} totalPages={rooms.totalPages}/>
                    </div>
                </div>
            </div>
        </section>
    )
}