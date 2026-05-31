"use client"
import { Room } from "@/types/Room.types";
import CardRoom from "../ui/CardRoom";
import { useState } from "react";
import Modal from "../ui/Modal";
import useRooms from "@/hooks/useRooms";
import RoomForm from "./RoomForm";
import { handleToast } from "@/utils/handleToast";
import { useRouter } from "next/navigation";

type Action = 'REDIRECT' | 'EDIT'

interface RoomsListProps {
    widthCard: string;
    rooms: Room[];
    action : Action
}

export default function RoomsList({ widthCard, rooms, action }: RoomsListProps) {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [idSelected, setIdSelected] = useState<number | null>(null)
    const router = useRouter()

    const { editRoom } = useRooms()

    function closeModal() {
        setOpenModal(false)
        setIdSelected(null)
    }

    function handleOpenModal(id: number) {
        setIdSelected(id)
        setOpenModal(true)
    }

    function redirectToPage(id: number) {
        router.push(`/room/${id}`)
    }

    async function edit(values : any) {
        const formData = new FormData()
            
        const roomDataDto = {
            code: values.code,
            floor: values.floor,
            status: values.status,
            category: values.category,
            customPrice: Number(values.customPrice),
            capacity: Number(values.capacity),
            bedconfig: values.bedconfig,
            amenities: values.amenities,
            remainingImages: values.remainingImages,
        }

        const roomDataBlob = new Blob([JSON.stringify(roomDataDto)], {
            type: 'application/json'
        })

        formData.append("room_data", roomDataBlob)
        
        values.images.forEach((file: File) => {
            formData.append("images", file)
        })

        try {
            await editRoom(idSelected!, formData)
            setOpenModal(false)
            handleToast('Quarto editado com sucesso!', 'success')
        } catch (err: any) {
            handleToast(err.response.data.message, 'error')
        }
    }

    return (
        <div className="w-full flex flex-wrap gap-4">
            {rooms.map(room => (
                <CardRoom key={room.id} width={widthCard} room={room} buttonFunction={action == 'EDIT' ? () => handleOpenModal(room.id) : () => redirectToPage(room.id)}/>
            ))}
            <Modal size="4xl" isOpen={openModal} onClose={closeModal} title={`Editar quarto ID: ${idSelected}`}>
                <RoomForm submit={edit} id={idSelected}/>
            </Modal>
        </div>
    )
}