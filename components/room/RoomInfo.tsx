import { Room } from "@/types/Room.types"

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
            <p><span className="font-normal">Comodidades:</span> {room.amenities}</p>
            <p><span className="font-normal">Categoria:</span> {room.category}</p>
        </div>
    )
}