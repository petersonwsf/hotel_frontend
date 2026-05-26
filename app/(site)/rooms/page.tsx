import Filter from "@/components/rooms/Filter";
import Pagination from "@/components/ui/Pagination";

export default function Rooms() {
    return (
        <section id="rooms" aria-label="Quartos disponíveis">
            <div className="flex justify-center items-start w-7xl m-auto gap-5 my-[4rem]">
                <Filter />
                <div className="w-full">
                    <h2 className="text-3xl font-semibold mb-[1rem]">Quartos</h2>
                    {/*<RoomsList />*/}
                    <div className="flex items-center justify-end mt-[1rem]">
                        <Pagination page={1} totalPages={10} />
                    </div>
                </div>
            </div>
        </section>
    )
}