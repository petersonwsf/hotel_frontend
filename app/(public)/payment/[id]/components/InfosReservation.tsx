import { Reservation } from "@/types/Reservation.types"
import { calcularDiferencaDias } from "@/utils/calculateDays";
import { getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";

interface InfosReservationProps {
    reservation: Reservation;
}

export default function InfosReservation({ reservation } : InfosReservationProps) {
    return (
        <div className="rounded-xl border-1 border-gray-200 p-[1rem] w-full">
            <div className="border-b-1 border-gray-200 py-[1rem]">
                <h2 className="font-semibold text-2xl text-[#0022B3]">{getRoomCategoryLabel(reservation.room.category)}</h2>
            </div>
            <div className="border-b-1 border-gray-200 py-[1rem] flex flex-col gap-[1rem]">
                <h4 className="flex gap-2 items-center text-lg text-gray-600"><FaRegCalendarAlt /> Datas</h4>
                <div className="flex justify-between items-center">
                    <span className="font-normal">Data de check-in:</span>
                    <p className="font-light">{new Date(reservation.checkInDate).toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-normal">Data de check-out:</span>
                    <p className="font-light">{new Date(reservation.checkOutDate).toLocaleDateString("pt-BR")}</p>
                </div>
            </div>
            <div className="border-b-1 border-gray-200 py-[1rem] flex flex-col gap-[1rem]">
                <h4 className="flex gap-2 items-center text-lg text-gray-600"><FaMoneyBillAlt /> Valores</h4>
                <div className="flex justify-between items-center">
                    <span className="font-normal">Custo das diárias</span>
                    <p className="font-light">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.dailyRate * calcularDiferencaDias(reservation.checkInDate.toString(), reservation.checkOutDate.toString()))}</p>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-normal">Valor de serviço:</span>
                    <p className="font-light">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.serviceFee)}</p>
                </div>
                <div className="flex justify-between items-center text-xl text-red-700">
                    <span className="font-semibold">Valor total:</span>
                    <p className="font-semibold">{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.totalAmount)}</p>
                </div>
            </div>
        </div>
    )
}