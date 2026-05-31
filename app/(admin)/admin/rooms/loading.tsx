import RoomHeader from "@/components/rooms/RoomHeader";
import Pagination from "@/components/ui/Pagination";

export default function LoadingRooms() {
    return (
        <div>
            <RoomHeader />
            <div className="flex flex-col gap-[1rem] mt-[2.5rem]">
                <div className="w-full flex flex-wrap gap-4">
                    {Array.from({ length: 10}).map((_, index) => (
                        <div key={index} className="bg-gray-200 animate-pulse w-[45%] h-[200px] rounded-[10px]"></div>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-end mt-[1rem]">
                <Pagination page={1} totalPages={1} />
            </div>
        </div>
    )
}