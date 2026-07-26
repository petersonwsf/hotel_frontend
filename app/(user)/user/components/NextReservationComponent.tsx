import StatusReservation from "@/components/reservation/StatusReservation";
import { Reservation } from "@/types/Reservation.types"
import { calcularDiferencaDias } from "@/utils/calculateDays";
import { formatShortDate } from "@/utils/formatDate";
import { getRoomCategoryLabel } from "@/utils/formatTextsRooms";

import { CiLocationOn } from "react-icons/ci";

interface NextReservationCompoennetProps {
    nextReservation: Reservation;
}

export default function NextReservationComponent({ nextReservation } : NextReservationCompoennetProps) {
    return (
        <div className="flex rounded-xl overflow-hidden gap-5 border-1 border-gray-200 w-full max-w-[800px]">
            <div className="relative h-[300px] w-[300px] overflow-hidden">
                <img src={nextReservation.room.images[0].url} alt={`Foto do quarto ${nextReservation.room.code}`} className="h-full w-full object-cover"/>
                <span className="absolute left-2 top-3 py-[.2rem] px-[1rem]  font-semibold text-white text-[12px] bg-[#002179] rounded-xl">Próxima Estadia</span>
            </div>
            <div className="flex flex-col p-[1rem] w-full">
                <div className="flex justify-between items-center w-full text-[#002179]">
                    <h4 className="text-2xl font-[600] tracking-[.1rem]">{getRoomCategoryLabel(nextReservation.room.category)}</h4>
                    <div className="text-end">
                        <h4 className="text-lg text-black">Check-in</h4>
                        <h4 className="font-semibold text-3xl">{formatShortDate(nextReservation.checkInDate)}</h4>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mt-5 mb-[2rem] text-sm">
                    <CiLocationOn className="w-5 h-5" />
                    Av. das Marés, 1.200 Enseada do Sol, Florianópolis – SC CEP: 88066-500
                </div>
                <div>
                    <p className="tracking-[.05rem]"><span className="text-gray-600">Duração: </span> {calcularDiferencaDias(nextReservation.checkInDate, nextReservation.checkOutDate)} Dias ({`${formatShortDate(nextReservation.checkInDate)} - ${formatShortDate(nextReservation.checkOutDate)}`})</p>
                    <p className="tracking-[.05rem]"><span className="text-gray-600">Capacidade: </span> {nextReservation.room.capacity}</p>
                </div>
                <div className="flex h-full items-end">
                    <div className="flex w-full items-center justify-end gap-5">
                        <button className="bg-[#002179] text-white py-[.5rem] px-[1rem] cursor-pointer rounded-[7px] font-normal">Ver Detalhes</button>
                        <StatusReservation status={nextReservation.status} />
                    </div>
                </div>
            </div>
        </div>
    )
}