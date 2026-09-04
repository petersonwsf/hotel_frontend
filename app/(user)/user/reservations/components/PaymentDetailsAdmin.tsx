"use client"
import PaymentStatus from "@/components/reservation/PaymentStatus";
import useReservation from "@/hooks/useReservation";
import { Payment } from "@/types/Payment.types";
import { Reservation } from "@/types/Reservation.types"
import { calcularDiferencaDias } from "@/utils/calculateDays";
import { useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { GoAlert } from "react-icons/go";
import { IoEnterOutline } from "react-icons/io5";
import { IoExitOutline } from "react-icons/io5";

interface PaymentDetailsAdminProps {
    reservation: Reservation;
    payment: Payment | null;
    loadingPayment: boolean;
}

export default function PaymentDetailsAdmin({ reservation, payment, loadingPayment } : PaymentDetailsAdminProps) {

    const daysDiff = useMemo(() => calcularDiferencaDias(reservation.checkInDate, reservation.checkOutDate), [reservation])
    const [loadingAction, setLoadingAction] = useState<boolean>(false)

    const { checkInReservation, checkOutReservation } = useReservation()

    const handleCheckIn = async () => {
        setLoadingAction(true)
        await checkInReservation(reservation.id)
        setLoadingAction(false)
    }

    const handleCheckOut = async () => {
        setLoadingAction(true)
        await checkOutReservation(reservation.id)
        setLoadingAction(false)
    }

    return (
        <div className="flex">
            <div className="flex w-full flex-col gap-2 border-r-1 border-gray-400 px-[1rem]">
                <h3 className="font-normal text-lg text-gray-600">RESUMO DO PAGAMENTO</h3>
                <div className="h-full flex flex-col justify-end gap-3">
                    <p className="flex text-lg text-gray-600 justify-between">
                        <span>{daysDiff} noites x {new Intl.NumberFormat('pt-BR', { currency: 'brl', style: 'currency'}).format(reservation.dailyRate)}</span>
                        <span>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.dailyRate * daysDiff)}</span>
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
                {loadingPayment ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="animate-spin">
                            <AiOutlineLoading3Quarters className="w-5 h-5" />
                        </div>
                    </div>
                ) : payment ? (
                    <div className="flex flex-col justify-between h-full gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="flex justify-between"><span className="text-md">Pagamento: </span> <PaymentStatus status={payment.status} /></p>
                            <p className="flex justify-between"><span className="text-md">Pagamento Realizado em: </span> ...</p>
                            <p className="flex justify-between"><span className="text-md">Check In: </span> ...</p>
                            <p className="flex justify-between"><span className="text-md">Check Out: </span> ...</p>
                        </div>
                        <div className="border-t-1 border-gray-300 pt-[.5rem] text-end">
                            {reservation.status === 'CONFIRMED' && <button onClick={handleCheckIn} className={`inline-flex items-center gap-2 px-[1.5rem] py-[.25rem] text-white bg-[#0022B3] rounded-lg cursor-pointer ${loadingAction ? 'opacity-[.5] pointer-events-none' : ''}`}>{loadingAction ? <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin"/> : <IoEnterOutline className="w-4 h-4"/>} Realizar Check In</button>}
                            {reservation.status === 'CHECKED_IN' && <button onClick={handleCheckOut} className={`inline-flex items-center gap-2 px-[1.5rem] py-[.25rem] text-white bg-[#DFA400] rounded-lg cursor-pointer ${loadingAction ? 'opacity-[.5] pointer-events-none' : ''}`}>{loadingAction ? <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin"/> : <IoExitOutline className="w-4 h-4"/>} Realizar Check Out</button>}
                            {reservation.status === 'CHECKED_OUT' && <p className="inline-flex bg-green-100 text-emerald-700 border-emerald-700 gap-2 items-center rounded-full border px-[1.5rem] py-0.5 text-md font-semibold"><FaCheck className="w-4 h-4" /> Reserva Concluída</p>}
                            {reservation.status === 'PENDING' && <p className="text-end text-yellow-700 flex justify-end gap-2 items-center px-[1.5rem] py-0.5 text-md font-semibold"><GoAlert className="w-4 h-4" /> Solicite ao cliente para realizar o pagamento!</p>}
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-full">
                        <p className="font-light text-center">Não há nenhum pagamento para esta reserva, solicite ao cliente para realizar o pagamento</p>
                    </div>
                )}
            </div>
        </div>
    )
}