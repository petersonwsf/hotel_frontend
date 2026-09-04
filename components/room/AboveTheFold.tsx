import { Room } from "@/types/Room.types";
import ReservationRoomArea from "./ReservationRoomArea";
import RoomImages from "./RoomImages";
import RoomInfo from "./RoomInfo";
import { formatEnums, getAmenityIcon } from "@/utils/formatTextsRooms";

interface AboveTheFoldProps {
    room: Room;
}

export default function AboveTheFold({ room }: AboveTheFoldProps) {

    return (
        <section>
            <div className="flex w-full gap-3 items-start">
                <RoomImages images={Array.isArray(room.image) ? room.image : [room.image]} />
                <div className="w-full px-3">
                    <RoomInfo room={room} />
                    <ReservationRoomArea room={room} />
                </div>
            </div>
            <div className="mt-[2rem]">
                <h3 className="text-3xl font-light pb-4 my-3 border-b-1 border-gray-300">Descrição do quarto</h3>
                <p className="text-xl font-light">{room.description}</p>
            </div>
            <div className="mt-[2rem]">
                <h3 className="text-3xl font-light pb-4 my-3 border-b-1 border-gray-300">Comodidades</h3>
                <p className="text-xl font-light flex items-center gap-5 flex-wrap">{room.amenities.map((amenity, index) => {
                    const Icon = getAmenityIcon(amenity)
                    return (
                        <span key={index} className="flex gap-2 items-center text-gray-600">{Icon && <Icon className="w-5 h-5"/>} {formatEnums(amenity)}</span>
                    )
                })}</p>
            </div>
        </section>
    )
}
