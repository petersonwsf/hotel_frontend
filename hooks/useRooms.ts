import { api } from "@/lib/api/api"
import { Room } from "@/types/Room.types"
import { handleToast } from "@/utils/handleToast"
import { useRouter } from "next/navigation"

export default function useRooms() {

    const router = useRouter()

    async function createRoom(data: FormData) {
        try {
            const response = await api.post(`/hotel/room`, data)
            router.refresh()
            return response.data
        } catch (error : any) {
            throw error
        }
    }

    async function getRoomById(id: number) {
        try {
            const room = await api.get(`/hotel/room/${id}`)
            return room.data
        } catch (error : any) {
            handleToast(error.response.data.message, 'error')
        }
    }

    async function editRoom(id: number, data: FormData) {
        try {
            const room = await api.patch(`/hotel/room/${id}`, data)
            router.refresh()
            return room.data
        } catch (error : any) {
            throw error
        }
    }

    return {
        createRoom,
        editRoom,
        getRoomById
    }
}