"use client"
import { User } from "@/contexts/AuthContext";
import usePayment from "@/hooks/usePayment";
import { Payment } from "@/types/Payment.types";
import { Reservation } from "@/types/Reservation.types";
import { handleToast } from "@/utils/handleToast";
import { useState } from "react"
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { IoIosInformationCircleOutline } from "react-icons/io";
import PaymentCardForm from "./PaymentCardForm";

interface PaymentCardProps {
    reservation: Reservation;
    user: User;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

export default function PaymentCard({ reservation, user } : PaymentCardProps) {

    const [checkTerm, setCheckTerm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [payment, setPayment] = useState<Payment | null>(null)

    const { createPayment } = usePayment()

    async function createPaymentCard() {
        setLoading(true)
        try {
            const paymentResponse = await createPayment({
                amount: reservation.totalAmount,
                userId: user?.id as number,
                reservationId: reservation.id,
                method: 'card',
                currency: 'brl',
                customerEmail: user.login
            })
            console.log(paymentResponse.payment)
            setPayment(paymentResponse.payment)
        } catch (error : any) {
            console.log(error)
            handleToast(error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            {!payment ? (
                <div>
                    <div className="bg-blue-100 rounded-lg p-4 border-[#002BB3] border-l-5">
                        <div className="flex items-start">
                            <IoIosInformationCircleOutline className="text-blue-500 w-7 h-7 shrink-0"/>
                            <div className="px-[1rem] text-gray-900">
                                <h4 className="flex items-center mb-3 font-light text-xl">Falta pouco para confirmar sua estadia!</h4>
                                <p className="flex font-light items-center mb-3">
                                    Para carregar o nosso formulário de pagamento protegido pela Stripe, precisamos que você confirme a intenção de reserva concordando com os valores e termos abaixo.
                                    Assim que você clicar em Concordar e Avançar, os campos para inserir os dados do seu cartão aparecerão na tela de forma 100% segura.
                                </p>
                            </div>
                        </div>
                    </div>
                    <label  className="flex items-center gap-3 my-[1rem] cursor-pointer hover:bg-gray-50/50 transition-colors select-none">
                        <input type="checkbox" name="amenities" checked={checkTerm} onChange={(e) => setCheckTerm(!checkTerm)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <span className="text-md font-light text-gray-700">
                                Declaro que concordo com os valores e termos do hotel para liberar o preenchimento do cartão.
                            </span>
                    </label>
                    <button onClick={createPaymentCard} className={`w-full bg-[#002BB3] rounded-lg py-[.75rem] my-[.5rem] text-white font-semibold flex items-center justify-center gap-[1rem] cursor-pointer duration-[.3s] ${!checkTerm || loading ? 'opacity-[.5] pointer-events-none' : undefined}`}>
                        {loading && <div className="animate-spin"><AiOutlineLoading3Quarters fontSize={15}/></div>}
                        Confirmar e preencher dados
                    </button>
                </div>
            ) : (
                <Elements stripe={stripePromise} options={{clientSecret: payment.clientSecret}}>
                    <PaymentCardForm clientSecret={payment.clientSecret} />
                </Elements>
            )}
        </div>
    )
}