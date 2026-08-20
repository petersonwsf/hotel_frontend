import { Room } from "@/types/Room.types";
import ReservationRoomArea from "./ReservationRoomArea";
import RoomImages from "./RoomImages";
import RoomInfo from "./RoomInfo";

interface AboveTheFoldProps {
    room: Room;
}

export default function AboveTheFold({ room }: AboveTheFoldProps) {

    return (
        <section className="flex w-full gap-3 items-start">
            <RoomImages images={Array.isArray(room.image) ? room.image : [room.image]} />
            <div className="w-full px-3">
                <RoomInfo room={room} />
                <ReservationRoomArea room={room} />
            </div>
        </section>
    )
}
