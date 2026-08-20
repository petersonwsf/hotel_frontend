"use client"

import { Room } from "@/types/Room.types"
import { useRouter } from "next/navigation"

interface CardRoomSlideProps {
    room: Room
}

export default function CardRoomSlide({ room } : CardRoomSlideProps) {

    const router = useRouter()

    function handleRedirect() {
        router.push(`/room/${room.id}`)
    }

    return (
        <div className="w-[300px] h-[250px] rounded-tl-[20px] rounded-br-[20px] border overflow-hidden relative cursor-pointer" onClick={handleRedirect}>
            <img  alt="Imagem do Quarto" src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${room.image}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 w-full bg-[rgba(0,0,0,0.5)] flex flex-col justify-end p-5 text-white" >
                <h3 className="text-xl font-semibold">{`Quarto: ${room.code}`}</h3>
                <p>{room.customPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p className="font-light line-clamp-3">{room.amenities}</p>
            </div>
        </div>
    )
}
