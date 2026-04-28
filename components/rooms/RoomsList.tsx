import CardRoom from "../ui/CardRoom";
import Pagination from "../ui/Pagination";

export default function RoomsList() {
    return (
        <div className="w-[70%]">
            <h2 className="font-semibold text-3xl">Quartos</h2>
            {Array.from({ length: 10 }).map((_, index) => (
                <CardRoom key={index} />
            ))}
            <div className="flex justify-center my-2">
                <Pagination page={10} totalPages={20}/>
            </div>
        </div>
    )
}