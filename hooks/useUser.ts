import { api } from "@/lib/api/api";
import { UserPayload } from "@/types/User.types";
import { handleToast } from "@/utils/handleToast";

export function useUser() {

    async function editUser(data: UserPayload, id: number) {
        try {
            const response = await api.patch(`/hotel/user/${id}`, data)
            return response.data
        } catch (error: any) {
            throw error;
        }
    }

    async function createUser(data: UserPayload) {
        try {
            const response = await api.post(`/hotel/user/register`, data)
            return response.data
        } catch (error: any) {
            throw error;
        }
    }

    async function deleteUser(id: number) {
        try {
            await api.delete(`/hotel/user/${id}`)
        } catch (error: any) {
            handleToast(error.response.data.message, 'error')
        }
    }

    async function updateProfilePicture(file: File, id: number) {

        const formData = new FormData()
        formData.append("image", file)

        try {
            const response = await api.patch(`/hotel/user/profilePicture/${id}`, formData)
            return response.data
        } catch (error : any) {
            throw error;
        }
    }

    return {
        editUser,
        updateProfilePicture,
        createUser,
        deleteUser,
    }
}