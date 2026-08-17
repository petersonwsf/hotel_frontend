"use client"
import PaymentCardForm from "@/app/(public)/payment/[id]/components/PaymentCardForm";
import usePayment from "@/hooks/usePayment";
import { Payment, TypePayment } from "@/types/Payment.types";
import { Reservation } from "@/types/Reservation.types"
import { calcularDiferencaDias } from "@/utils/calculateDays";
import { handleToast } from "@/utils/handleToast";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { GrDocument } from "react-icons/gr";
import { copyToClipboard } from "@/utils/copyToClipboard";

interface PaymentReservationCardProps {
    reservation: Reservation;
    payment: Payment | null;
    setPayment: (payment: Payment | null) => void;
    loadingPayment: boolean;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || '')

export default function PaymentReservationCard({ reservation, payment, setPayment, loadingPayment } : PaymentReservationCardProps) {

    const diferencaDias = useMemo(() => calcularDiferencaDias(reservation.checkInDate, reservation.checkOutDate), [reservation])

    const [paymentMethod, setPaymentMethod] = useState<TypePayment>('card')
    const [checkTerm, setCheckTerm] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [paymentCompleted, setPaymentCompleted] = useState<boolean>(false)

    useEffect(() => {
        if (payment?.status === 'succeeded' || payment?.status === 'requires_capture') {
            setPaymentCompleted(true)
        }
    }, [payment])

    const { createPayment } = usePayment()

    function changePaymentMethod(type: TypePayment) {
        setPaymentMethod(type)
        setCheckTerm(false)
    }

    const afterPayment = () => {
        setPaymentCompleted(true)
    }

    async function handleCreatePayment() {
        setLoading(true)
        try {
            const paymentResponse = await createPayment({
                amount: reservation.totalAmount,
                userId: reservation.user.id,
                reservationId: reservation.id,
                method: paymentMethod,
                currency: 'brl',
                customerEmail: reservation.user.login,
            })
            setPayment(paymentResponse.payment)
            handleToast("Pagamento gerado com sucesso", "success")
        } catch (error : any) {
            handleToast(error.response.data.message, "error")
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
        <div className="flex">
            <div className="flex w-full flex-col gap-2 border-r-1 border-gray-400 px-[1rem]">
                <h3 className="font-normal text-lg text-gray-600">RESUMO DO PAGAMENTO</h3>
                <div className="h-full flex flex-col justify-end gap-3">
                    <p className="flex text-lg text-gray-600 justify-between">
                        <span>{diferencaDias} noites x {new Intl.NumberFormat('pt-BR', { currency: 'brl', style: 'currency'}).format(reservation.dailyRate)}</span>
                        <span>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.dailyRate * diferencaDias)}</span>
                    </p>
                    <p className="flex text-lg text-gray-600 justify-between">
                        <span>Taxa de serviço</span>
                        <span>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.serviceFee)}</span>
                    </p>
                    <p className="flex text-lg text-gray-600 justify-between">
                        <span>Desconto</span>
                        <span> - {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.discountAmount)}</span>
                    </p>
                    <hr className="text-gray-500"/>
                    <p className="flex text-3xl font-semibold text-gray-800 justify-between">
                        <span>Total</span>
                        <span className="text-[#002179] tracking-[.1rem]">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.totalAmount)}</span>
                    </p>
                </div>
            </div>
            <div className="w-full px-[1rem]">
                <div className="w-full">
                    {loadingPayment ? (
                        <div className="h-[300px] flex items-center justify-center">
                            <div className="animate-spin">
                                <AiOutlineLoading3Quarters fontSize={30} className="text-[#002179]"/>
                            </div>
                        </div>
                    ) : payment ? <>
                        {paymentCompleted ? (
                            <div className="bg-blue-100 rounded-lg p-4 my-2 border-[#002BB3] flex gap-3 border-l-5 text-[#002179]">
                                <FaCheck className="w-8 h-8"/>
                                <div>
                                    <p>Pagamento realizado com sucesso, você receberá uma mensagem quando a data estiver se aproximando</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {payment.captureMethod === 'AUTOMATIC' ? (
                                    <div className="flex flex-col justify-start text-[#002BB3] items-center my-[1rem]">
                                        <GrDocument fontSize={40} />
                                        <p className="flex items-center gap-1 mt-5 text-md font-light text-center"><FaCheck fontSize={20}/> Boleto gerado com sucesso! Copie o código de barras abaixo, ou acesse o boleto pelo link</p>
                                        <p onClick={copyCodeBar} className="p-[.5rem] bg-gray-200 mt-5 text-gray-500 tracking-[.1rem] cursor-pointer">{payment.codeBar}</p>
                                        <div className="flex justify-center mt-[1.5rem]">
                                            <a href={payment.boletoUrl!} target="_blank" rel="noopener noreferrer" className="flex items-center px-[2rem] bg-[#002BB3] rounded-lg py-[.5rem] my-[.5rem] text-white font-semibold cursor-pointer duration-[.3s] flex items-center justify-center gap-2">
                                                <GrDocument />
                                                Baixar boleto
                                            </a>
                                        </div>
                                    </div>
                                ) : (
                                    <Elements stripe={stripePromise} options={{ clientSecret: payment.clientSecret }}>
                                        <PaymentCardForm afterPayment={afterPayment} clientSecret={payment.clientSecret} stripeWrapperClass="w-full rounded-lg border outline-none border-gray-300 bg-white p-[.5rem] text-[12px] transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"/>
                                    </Elements>
                                )}
                            </div>
                        )}
                    </>
                     : (
                        <div className="w-full flex flex-col">
                            <h3 className="font-normal text-lg text-gray-600">ESCOLHA UMA FORMA DE PAGAMENTO</h3>
                            <div className="flex justify-around my-2">
                                <div onClick={() => changePaymentMethod('card')} className={`${paymentMethod === 'card' ? 'bg-[#fff] text-[#002179] border-1 border-[#002179]' : 'bg-[#002179] text-white'} duration-[.3s] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal`}>Cartão</div>
                                <div onClick={() => changePaymentMethod('boleto')} className={`${paymentMethod === 'boleto' ? 'bg-[#fff] text-[#002179] border-1 border-[#002179]' : 'bg-[#002179] text-white'} duration-[.3s] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal`}>Boleto</div>
                                <div onClick={() => changePaymentMethod('pix')} className={`${paymentMethod === 'pix' ? 'bg-[#fff] text-[#002179] border-1 border-[#002179]' : 'bg-[#002179] text-white'} duration-[.3s] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal`}>Pix</div>
                            </div>
                            <div className="bg-blue-100 rounded-lg p-4 my-2 border-[#002BB3] flex gap-3 border-l-5">
                                <IoIosInformationCircleOutline className="text-blue-500 w-5 h-5 shrink-0"/>
                                <p className="flex text-sm font-light items-center mb-3">
                                    {paymentMethod === 'card' && 'Para carregar o nosso formulário de pagamento protegido pela Stripe, precisamos que você confirme a intenção de reserva concordando com os valores e termos abaixo. Assim que você clicar em Concordar e Avançar, os campos para inserir os dados do seu cartão aparecerão na tela de forma 100% segura.'}
                                    {paymentMethod === 'boleto' && 'O boleto será gerado após a confirmação. Lembre-se que a compensação bancária pode levar até 72h úteis.'}
                                    {paymentMethod === 'pix' && 'Pague com PIX para confirmação instantânea. Na próxima tela, você verá o QR Code e a chave para cópia. A reserva será garantida imediatamente após o processamento.'}
                                </p>
                            </div>
                            <label className="flex items-center gap-3 my-[.2rem] cursor-pointer hover:bg-gray-50/50 transition-colors select-none">
                                <input type="checkbox" name="amenities" checked={checkTerm} onChange={(e) => setCheckTerm(!checkTerm)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                                    <span className="text-xm font-light text-gray-700">
                                        Concordo com as Políticas de Cancelamento e Termos de Uso do Lúmen Hotel.
                                    </span>
                            </label>
                            <button onClick={handleCreatePayment} className={`w-full bg-[#002BB3] rounded-lg py-[.75rem] my-[.5rem] text-white font-semibold cursor-pointer duration-[.3s] flex items-center justify-center gap-2 ${!checkTerm || loading ? 'opacity-[.5] pointer-events-none' : undefined}`}>
                                {loading && <div className="animate-spin"><AiOutlineLoading3Quarters fontSize={15}/></div>}
                                Confirmar e gerar boleto
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}