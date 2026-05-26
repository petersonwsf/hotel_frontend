"use client"

import { useState } from "react"
import Modal from "../ui/Modal"
import RoomForm from "./RoomForm"
import { FaPlus } from "react-icons/fa"
import { BsHouses } from "react-icons/bs"
import useRooms from "@/hooks/useRooms"
import { handleToast } from "@/utils/handleToast"

export default function RoomHeader() {

    const { createRoom } = useRooms()
    const [openModal, setOpenModal] = useState<boolean>(false)

    async function createRoomSubmit(values: any) {
            const formData = new FormData()
    
            const roomDataDto = {
                code: values.code,
                floor: values.floor,
                status: values.status,
                category: values.category,
                customPrice: Number(values.customPrice),
                capacity: Number(values.capacity),
                bedconfig: values.bedconfig,
                amenities: values.amenities
            }
    
            const roomDataBlob = new Blob([JSON.stringify(roomDataDto)], {
                type: 'application/json'
            })
    
            formData.append("room_data", roomDataBlob)
            
            values.images.forEach((file: File) => {
                formData.append("images", file)
            })
    
            try {
                const room = await createRoom(formData)
                handleToast('Quarto criado com sucesso!', 'success')
                console.log(room)
                setOpenModal(false)
            } catch (err: any) {
                console.log(err.response)
                handleToast('Erro ao salvar quarto novo', 'error')
            }
        }

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-3xl">Quartos</h2>
                <button className="flex gap-2 bg-[#002BB3] hover:bg-[#001c78] duration-[.3s] items-center text-white py-2 px-4 rounded-[10px] cursor-pointer" onClick={() => setOpenModal(true)}><FaPlus className="w-3 h-3" /><BsHouses className="w-5 h-5"/> Adicionar Quarto</button>
            </div>
            <Modal size="4xl" isOpen={openModal} onClose={() => setOpenModal(false)} title="Criar quarto">
                <RoomForm submit={createRoomSubmit} />
            </Modal>
        </>
    )
}