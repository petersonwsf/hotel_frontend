import Filter from "@/components/rooms/Filter";
import RoomsList from "@/components/rooms/RoomsList";

export default function Rooms() {
    return (
        <>
            <div className="flex justify-center items-start w-7xl m-auto gap-5 my-[4rem]">
                <Filter />
                <RoomsList />
            </div>
        </>
    )
}