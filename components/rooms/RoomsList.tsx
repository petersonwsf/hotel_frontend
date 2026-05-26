"use client"
import { Room } from "@/types/Room.types";
import CardRoom from "../ui/CardRoom";
import { useState } from "react";

interface RoomsListProps {
    widthCard: string;
    rooms: Room[];
}

export default function RoomsList({ widthCard, rooms }: RoomsListProps) {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [idSelected, setIdSelected] = useState<number | null>(null)

    function closeModal() {
        setOpenModal(false)
        setIdSelected(null)
    }

    function handleOpenModal() {
        setOpenModal(true)
    }

    return (
        <div className="w-full flex flex-wrap gap-4">
            {rooms.map(room => (
                <CardRoom key={room.id} width={widthCard} room={room} buttonFunction={handleOpenModal}/>
            ))}
        </div>
    )
}