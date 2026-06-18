import { api } from "@/lib/api/api"
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

    async function editRoom(id: number, data: FormData) {
        try {
            const room = await api.patch(`/hotel/room/${id}`, data)
            router.refresh()
            return room.data
        } catch (error : any) {
            throw error
        }
    }

    async function getRoomById(id: number) {
        try {
            const room = await api.get(`hotel/room/${id}`)
            return room.data
        } catch (err : any) {
            handleToast(err.response.data.message, 'error')
        }
    }

    async function checkAvailability(checkIn: string, checkOut: string, roomId: number) {
        try {
            const response = await api.get(`hotel/room/disponibility/${roomId}`, {
                params: {
                    checkIn,
                    checkOut
                }
            });
            return response.data;
        } catch (err : any) {
            let errorMessage = 'Não foi possível verificar a disponibilidade do quarto';
            if (Array.isArray(err.response.data)) {
                errorMessage = err.response.data[0].error;
            }
            handleToast(errorMessage, 'error');
            return null;
        }
    }

    return {
        createRoom,
        editRoom,
        getRoomById,
        checkAvailability
    }
}