import { Room } from "@/types/Room.types";
import { formatEnums, formatFloor, getAmenityIcon, getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { FaDoorOpen } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

interface RoomDescriptnProps {
    room: Room;
}

export default function RoomDescription({ room } : RoomDescriptnProps) {
    return (
        <div>
            <div className="w-full h-[400px] relative">
                <img src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${room.image[0]}`} alt="" className="w-full h-full object-cover rounded-t-xl" />
                <div className="py-[.2rem] px-[1.5rem] bg-[#002BB3] absolute top-[20px] left-[20px] z-[10000] rounded-[10px]">
                    <p className="m-[0] text-white font-semibold">{getRoomCategoryLabel(room.category)}</p>
                </div>
            </div>
            <div className="flex flex-col py-[1rem] px-[1.5rem] border-1 border-gray-300 rounded-b-lg">
                <h2 className="text-[#002BB3] font-semibold text-2xl">Quarto {room.code}</h2>
                <div className="flex justify-between [&>div]:flex [&>div]:items-center ">
                    <div>
                        <p className="flex items-center m-[0px] text-[#002BB3] gap-2 text-lg my-[.5rem]"><FaDoorOpen /> {formatFloor(room.floor)}</p>
                    </div>
                    <div className="gap-[.5rem]">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar className="w-5 h-5 text-[#002BB3]" key={index} />
                        ))}
                    </div>
                </div>
                <div className="border-b-1 pb-5 border-gray-300">
                    <p className="text-gray-500 font-light">
                        {room.description}
                    </p>
                </div>
                <div className="my-[1rem] flex flex-wrap gap-3">
                    {room.amenities.map((amenity, index) => {
                        const Icon = getAmenityIcon(amenity)
                        return (
                            <div className="flex gap-2 items-center p-[.5rem] border-1 border-gray-300 rounded-[5px]" key={`amenitie-${index}`}>
                                {Icon && <Icon fontSize={20} className="text-gray-500" />}
                                <p className="font-light text-gray-500 m-[0px]">{formatEnums(amenity)}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}