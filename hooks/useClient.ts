import { api } from "@/lib/api/api";
import { ClientUpdate } from "@/types/Client.types";
import { handleToast } from "@/utils/handleToast";
import { useRouter } from "next/navigation";

export default function useClient() {

    const router = useRouter()

    async function updateClient(id: number, data : ClientUpdate) {
        const { phoneNumber, ...restOdFata } = data;

        const payload = {
            ...restOdFata,
            contactInformation: {
                phoneNumber: phoneNumber
            }
        }
        try {
            const response = await api.patch(`/hotel/client/${id}`, payload)
            router.refresh()
            handleToast("Dados atualizados com sucesso", "success")
            return response.data
        } catch (error : any) {
            handleToast(error.response.data.message, "error")
        }
    }

    return {
        updateClient
    }
}