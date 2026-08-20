import { Room } from "@/types/Room.types"
import { formatEnums, getAmenityIcon } from "@/utils/formatTextsRooms";

interface RoomInfoProps {
    room: Room;
}

export default function RoomInfo({ room }: RoomInfoProps) {

    return (
        <div className="font-light text-xl [&>p]:my-2">
            <h2 className="text-3xl font-semibold my-3">Quarto: {room.code}</h2>
            <p><span className="font-normal">Andar:</span> {room.floor}</p>
            <p><span className="font-normal">Capacidade:</span> {room.capacity} {room.capacity > 1 ? "pessoas" : "pessoa"}</p>
            <p><span className="font-normal">Configuração de cama:</span> {room.bedconfig}</p>
            <p className="flex gap-[1rem] flex-wrap"><span className="font-normal">Comodidades:</span> {room.amenities.map((amenity, index) => {
                const Icon = getAmenityIcon(amenity)
                return (
                    <span key={index} className="flex gap-2 items-center text-gray-600">{Icon && <Icon className="w-5 h-5"/>} {formatEnums(amenity)}</span>
                )
            })}</p>
            <p><span className="font-normal">Categoria:</span> {room.category}</p>
        </div>
    )
}