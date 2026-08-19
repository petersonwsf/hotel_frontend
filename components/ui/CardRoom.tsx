"use client"
import { RoomList } from "@/types/Room.types";

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
            <div className="flex items-center justify-center">
                <img src={mainImageUrl ?? `/images/hotel_model.webp`} alt="Image quarto" className="rounded-[20px] w-[200px]" />
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    <p className="mb-2 text-xl">Quarto {room.code}</p>
                    <p className="font-light">Diária: {room.customPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    <p className="font-light">Capacidade: {room.capacity} {room.capacity > 1 ? 'pessoas' : 'pessoa'}</p>
                    <p className="font-light">{room.floor}</p>
                    <p className="font-light">Categoria: {room.category}</p>
                </div>
                <div className="flex items-end justify-end w-full">
                    <button className="bg-[#002BB3] py-1 px-4 rounded-[5px] text-white cursor-pointer" onClick={buttonFunction}>Ver detalhes</button>
                </div>
            </div>
        </div>
    )
}