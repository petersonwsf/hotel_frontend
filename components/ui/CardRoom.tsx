"use client"
import { RoomList } from "@/types/Room.types";
import { formatEnums, getRoomCategoryLabel } from "@/utils/formatTextsRooms";

interface CardRoom {
    width: string;
    room: RoomList,
    buttonFunction: () => void;
}

const minio_url = process.env.NEXT_PUBLIC_URL_MINIO 

export default function CardRoom({ width, room, buttonFunction }: CardRoom) {

    let mainImageUrl = ''

    if (room.image) {
        if (Array.isArray(room.image)) {
            if (room.image.length > 0) {
                mainImageUrl = `${minio_url}/${room.image[0]}`
            }
        } else {
            mainImageUrl = `${minio_url}/${room.image}`
        }
    }

    return (
        <div className={`flex ${width} my-3 p-4 gap-3 bg-gray-50 rounded-[10px]`}>
            <div className="flex items-center justify-center shrink-0">
                <img src={mainImageUrl} alt="Image quarto" className="rounded-[20px] w-[250px] h-[250px] object-cover" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <div className="w-full flex flex-col gap-2">
                    <p className="mb-2 text-xl">Quarto: {room.code}</p>
                    <p className="font-light"><span className="font-semibold">Diária: </span> {room.customPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <p className="font-light"><span className="font-semibold">Capacidade: </span> {room.capacity} {room.capacity > 1 ? 'pessoas' : 'pessoa'}</p>
                    <p className="font-light"><span className="font-semibold">Andar: </span>{formatEnums(room.floor)}</p>
                    <p className="font-light"><span className="font-semibold">Categoria: </span> {getRoomCategoryLabel(room.category)}</p>
                    <p className="flex gap-2 items-center w-full min-w-0">
                        <span className="font-semibold shrink-0">Comodidades:</span> 
                        <span className="truncate font-light">
                            {room.amenities.map((amenity, index) => (
                                <span key={index}>
                                    {formatEnums(amenity)}
                                    {index < room.amenities.length - 1 ? ', ' : ''}
                                </span>
                            ))}
                        </span>
                    </p>
                </div>
                <div className="flex items-end justify-end mt-3 w-full">
                    <button className="bg-[#002BB3] py-1 px-4 rounded-[5px] text-white cursor-pointer" onClick={buttonFunction}>Ver detalhes</button>
                </div>
            </div>
        </div>
    )
}