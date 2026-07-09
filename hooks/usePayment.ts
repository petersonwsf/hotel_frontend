import { api } from "@/lib/api/api";
import { CreatePaymentData } from "@/types/Payment.types";

export default function usePayment() {

    async function createPayment(data : CreatePaymentData) {
        try {
            const response = await api.post("/payment/payment", data)
            return response.data
        } catch (error : any) {
            throw error;
        }
    }

    return {
        createPayment
    }
}