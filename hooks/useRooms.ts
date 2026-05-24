import { api } from "@/lib/api/api"

export default function useRooms() {

    async function createRoom(data: FormData) {
        try {
            const response = await api.post(`/hotel/room`, data)
            return response.data
        } catch (error : any) {
            throw error
        }
    }

    return {
        createRoom
    }
}