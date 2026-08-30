import { RoomQueryParams } from "@/types/Room.types"
import { api } from "./api"
import { handleToast } from "@/utils/handleToast"
import { buildQueryParams } from "@/utils/buildQueryParams"

const URL = process.env.URL_API_HOTEL

export async function getRooms(params: RoomQueryParams) {

    const queryParams = buildQueryParams(params)

    try {
        const res = await api.get(`${URL}/room${queryParams}`)
        return res.data
    } catch (err : any) {
        handleToast(err.response.data.message, 'error')
    }
}

export async function getRoomById(id: number) {
    try {
        const room = await api.get(`${URL}/room/${id}`)
        return room.data
    } catch (err : any) {
        handleToast(err.response.data.message, 'error')
    }
}