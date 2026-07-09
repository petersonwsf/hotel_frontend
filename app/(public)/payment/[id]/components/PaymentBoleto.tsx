"use client"
import { useAuthContext } from "@/contexts/AuthContext";
import usePayment from "@/hooks/usePayment";
import { Payment } from "@/types/Payment.types";
import { Reservation } from "@/types/Reservation.types";
import { handleToast } from "@/utils/handleToast";
import { useState } from "react"
import { IoIosInformationCircleOutline } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { GrDocument } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface PaymentBoletoProps {
    reservation: Reservation;
}

export default function PaymentBoleto({ reservation } : PaymentBoletoProps) {

    const [loading, setLoading] = useState<boolean>(false)
    const [checkTerm, setCheckTerm] = useState<boolean>(false)
    const [payment, setPayment] = useState<Payment | null>(null)

    const { user } = useAuthContext()

    const { createPayment } = usePayment()

    async function createBoletoPayment() {
        setLoading(true)
        try {
            const payment = await createPayment({
                amount : reservation.totalAmount,
                userId: user?.id as number,
                reservationId: reservation.id,
                method: 'boleto',
                currency: 'brl',
                customerEmail: user?.login ?? '',
            })
            setPayment(payment.payment)
        } catch (error : any) {
            handleToast(error.response.data.message, 'error')
        } finally {
            setLoading(false)
        }
    }

    async function copyCodeBar() {
        const success = await copyToClipboard(payment!.codeBar!)
        if (success) {
            handleToast("Copiado com sucesso!", "success")
        }
    }

    return (
        <div>
            <div className="bg-blue-100 rounded-lg p-4 border-[#002BB3] border-l-5">
                {payment ? (
                    <div className="flex flex-col justify-start text-[#002BB3] items-center my-[1rem]">
                        <GrDocument fontSize={70} />
                        <p className="flex items-center gap-3 mt-5 text-2xl font-light text-center"><FaCheck fontSize={30}/> Boleto gerado com sucesso! Copie o código de barras abaixo, ou acesse o boleto pelo link</p>
                        <p onClick={copyCodeBar} className="p-[.5rem] bg-gray-200 mt-5 text-gray-500 tracking-[.12rem] cursor-pointer">{payment.codeBar}</p>
                    </div>
                ) : (
                    <div className={`flex items-start`}>
                        <IoIosInformationCircleOutline className="text-blue-500 w-7 h-7 shrink-0"/>
                        <div className="px-[1rem] text-gray-900 font-light">
                            <h4 className="flex items-center mb-3 text-gray-900 text-xl">O boleto será gerado após a confirmação. Lembre-se que a compensação bancária pode levar até 72h úteis. </h4>
                            <ul className="list-disc flex flex-col gap-2">
                                <li>Pagável em qualquer banco ou via internet banking.</li>
                                <li>A reserva será confirmada apenas após a compensação.</li>
                                <li>Verifique a data de vencimento do documento gerado.</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
            {payment ? (
                <div className="flex justify-center mt-[1.5rem]">
                    <a href={payment.boletoUrl!} target="_blank" rel="noopener noreferrer" className="flex items-center px-[2rem] bg-[#002BB3] rounded-lg py-[.75rem] my-[.5rem] text-white font-semibold cursor-pointer duration-[.3s] flex items-center justify-center gap-2">
                        <GrDocument />
                        Baixar boleto
                    </a>
                </div>
            ) : (
                <div>
                    <label className="flex items-center gap-3 my-[1rem] cursor-pointer hover:bg-gray-50/50 transition-colors select-none">
                        <input type="checkbox" name="amenities" checked={checkTerm} onChange={(e) => setCheckTerm(!checkTerm)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                            <span className="text-md font-light text-gray-700">
                                Concordo com as Políticas de Cancelamento e Termos de Uso do Lúmen Hotel.
                            </span>
                    </label>
                    <button onClick={createBoletoPayment} className={`w-full bg-[#002BB3] rounded-lg py-[.75rem] my-[.5rem] text-white font-semibold cursor-pointer duration-[.3s] flex items-center justify-center gap-2 ${!checkTerm || loading ? 'opacity-[.5] pointer-events-none' : undefined}`}>
                        {loading && <div className="animate-spin"><AiOutlineLoading3Quarters fontSize={15}/></div>}
                        Confirmar e gerar boleto
                    </button>
                </div>
            )}
        </div>
    )
}