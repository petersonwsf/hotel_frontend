"use client"
import usePayment from "@/hooks/usePayment";
import { Payment } from "@/types/Payment.types";
import { Reservation } from "@/types/Reservation.types"
import { formatShortDate } from "@/utils/formatDate";
import { getRoomCategoryLabel } from "@/utils/formatTextsRooms"
import { useEffect, useMemo, useState } from "react";
import { CiCalendar } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import PaymentReservationCard from "./PaymentReservationCard";
import { isPastDate } from "@/utils/isPasteDate";

interface ReservationCardProps {
    reservation: Reservation;
    openEditModal: (id: number) => void;
}

export default function ReservationCard({ reservation, openEditModal } : ReservationCardProps) {

    const [viewDetails, setViewDetails] = useState<boolean>(false)
    const [reservationPayment, setReservationPayment] = useState<Payment | null>(null)
    const [loadingPayment, setLoadingPayment] = useState<boolean>(false)
    const { getReservationPayments } = usePayment()

    useEffect(() => {
        const fetchPayment = async () => {
            setLoadingPayment(true)
            const payment = await getReservationPayments(reservation.id)
            setReservationPayment(payment)
            setLoadingPayment(false)
        }
        if (viewDetails) fetchPayment()
    }, [reservation, viewDetails])

    const allowedUpdate = useMemo(() => {
        const validStatus = ['CONFIRMED', 'PENDING']
        const pasteDate = isPastDate(reservation.checkInDate)
        return validStatus.includes(reservation.status) && !pasteDate
    }, [reservation])

    return (
        <div className="w-full">
            <div className={`flex gap-5 border border-gray-300 w-full transition-all duration-300 ${viewDetails ? 'rounded-t-lg' : 'rounded-lg'}`}>
                <div className={`relative h-[250px] w-[250px] overflow-hidden transition-all duration-300 ${viewDetails ? 'rounded-tl-lg' : 'rounded-l-lg'}`}>
                    <img src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${reservation.room.image[0]}`} alt={`Foto do quarto ${reservation.room.code}`} className="h-full w-full object-cover"/>
                </div>
                <div className="p-[1rem] flex flex-col flex-1">
                    <p className="text-gray-400 text-xl tracking-[.1rem]">#{reservation.id}</p>
                    <h3 className="text-[#002179] text-3xl font-[500] tracking-[.05rem]">{getRoomCategoryLabel(reservation.room.category)} - Lúmen Hotel</h3>
                    <div className="flex gap-[2rem] border-b border-gray-300 pb-4">
                        <div className="flex gap-3 mt-5">
                            <div className="bg-blue-100 text-[#002179] p-[.5rem] rounded-[8px]">
                                <CiCalendar className="w-7 h-7"/>
                            </div>
                            <div>
                                <p className="tracking-[.05rem] text-gray-600">DATAS</p>
                                <p className="tracking-[.05rem] text-gray-800">{formatShortDate(reservation.checkInDate)} - {formatShortDate(reservation.checkOutDate)}, {new Date(reservation.checkOutDate).getFullYear()}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-5">
                            <div className="bg-blue-100 text-[#002179] p-[.5rem] rounded-[8px]">
                                <FaUsers className="w-7 h-7"/>
                            </div>
                            <div>
                                <p className="tracking-[.05rem] text-gray-600">HÓSPEDES</p>
                                <p className="tracking-[.05rem] text-gray-800">{reservation.room.capacity}</p>
                            </div>
                        </div>
                    </div>
                    <div className="h-full flex justify-end gap-5 items-end">
                        {allowedUpdate && <button className="text-[#002179] border border-[#002179] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal" onClick={() => openEditModal(reservation.id)}>Atualizar Reserva</button>}
                        <button onClick={() => setViewDetails(prev => !prev)} className="bg-[#002179] text-white py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal">
                            {viewDetails ? "Ocultar Detalhes" : "Ver Detalhes"}
                        </button>
                    </div>
                </div>
            </div>
            <div className={`grid transition-all duration-300 ease-in-out ${viewDetails ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="py-[1.5rem] bg-gray-50 border border-t-0 border-gray-300 rounded-b-lg">
                        <PaymentReservationCard loadingPayment={loadingPayment} setPayment={setReservationPayment} reservation={reservation} payment={reservationPayment} />
                    </div>
                </div>
            </div>
        </div>
    )
}