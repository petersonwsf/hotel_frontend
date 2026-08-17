import { api } from "@/lib/api/api";
import { CreatePaymentData } from "@/types/Payment.types";
import { handleToast } from "@/utils/handleToast";

export default function usePayment() {

    async function createPayment(data : CreatePaymentData) {
        try {
            const response = await api.post("/payment/payment", data)
            return response.data
        } catch (error : any) {
            throw error;
        }
    }

    async function getReservationPayments(idReservation: number) {
        try {
            const response = await api.get(`/payment/payment/reservation/${idReservation}`)
            return response.data;
        } catch (error : any) {
            if (error.response.status === 404) return;
            handleToast(error.response.data.message, 'error')
        }
    }

    return {
        createPayment,
        getReservationPayments
    }
}