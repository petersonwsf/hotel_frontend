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
            handleToast(error.response.data.message, 'error')
        }
    }

    return {
        createRoom,
    }
}