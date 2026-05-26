import { RoomQueryParams } from "@/types/Room.types"
import { api } from "./api"
import { handleToast } from "@/utils/handleToast"

const URL = process.env.URL_API_HOTEL

export async function getRooms(params: RoomQueryParams) {
    try {
        const res = await api.get(`${URL}/room`, { params })
        return res.data
    } catch (err : any) {
        console.log(err)
        console.log(err.response)
        handleToast('Erro ao recuperar quartos', 'error')
    }
}