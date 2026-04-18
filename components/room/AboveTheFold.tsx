import ReservationRoomArea from "./ReservationRoomArea";
import RoomImages from "./RoomImages";
import RoomInfo from "./RoomInfo";

export default function AboveTheFold() {

    return (
        <section className="flex w-full gap-3 items-start">
            <RoomImages />
            <div className="w-full px-3">
                <RoomInfo />
                <ReservationRoomArea />
            </div>
        </section>
    )
}
