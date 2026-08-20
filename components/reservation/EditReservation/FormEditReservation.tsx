"use client"
import { Reservation } from "@/types/Reservation.types"
import { formatFloor, getRoomCategoryLabel } from "@/utils/formatTextsRooms";
import { useEffect, useMemo, useState } from "react";
import InputText from "../../form/InputText";
import { CiCalendar } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { useFormikContext } from "formik";
import useRooms from "@/hooks/useRooms";
import { Room } from "@/types/Room.types";
import StatusReservation from "../StatusReservation";
import { calcularDiferencaDias } from "@/utils/calculateDays";
import { AiOutlineLoading3Quarters } from "react-icons/ai";


interface FormEditReservationProps {
    reservation: Reservation;
}

export default function FormEditReservation({ reservation } : FormEditReservationProps) {

    const [disponibility, setDisponibility] = useState<boolean>(true)
    const [room, setRoom] = useState<Partial<Room>>(reservation.room)

    const { setFieldError, values, setFieldTouched, isSubmitting } = useFormikContext<Reservation>()
    const { checkAvailability } = useRooms()

    useEffect(() => {
        const verifyDisponibility = async () => {
            try {
                const availability = await checkAvailability(values.checkInDate!.toString(), values.checkOutDate!.toString(), reservation.room.id, reservation.id);
                setDisponibility(availability);
                if (!availability) {
                    setFieldError('checkInDate', ' ')
                    setFieldError('checkOutDate', ' ')
                    setFieldTouched('checkInDate', true, false);
                    setFieldTouched('checkOutDate', true, false);
                } else {
                    setFieldError('checkInDate', undefined)
                    setFieldError('checkOutDate', undefined)
                    setFieldTouched('checkInDate', false, true);
                    setFieldTouched('checkOutDate', false, true);
                }
            } catch (error) {
                console.error("Erro ao verificar disponibilidade:", error);
            }
        };
        let debounceTimer: NodeJS.Timeout;
        if (values.checkInDate && values.checkOutDate) {
            debounceTimer = setTimeout(() => {
                verifyDisponibility();
            }, 800);
        }
        return () => {
            if (debounceTimer) clearTimeout(debounceTimer);
        };
    }, [values.checkInDate, values.checkOutDate, room.id ]);

    const diferencaDias = useMemo(() => calcularDiferencaDias(values.checkInDate, values.checkOutDate), [values.checkInDate, values.checkOutDate])

    const totalValue = useMemo(() => {
        return (reservation.dailyRate * diferencaDias) - reservation.discountAmount + reservation.serviceFee
    }, [diferencaDias, room.id ])

    return (
        <div className="w-full">
            <div className="flex gap-3 mb-4 items-center">
                <div className="rounded-lg overflow-hidden relative w-full h-[250px]">
                    <img src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${reservation.room.image[0]}`} alt="" className="h-full w-full object-cover" />
                    <span className="py-[.05rem] px-[1rem] rounded-xl bg-[#002179] absolute top-[20px] left-[10px] text-white">{getRoomCategoryLabel(reservation.room.category)}</span>
                </div>
                <div className="flex flex-1 flex-col gap-1 text-black">
                    <div className="w-full flex justify-between items-center">
                        <h5 className="text-xl font-semibold">Reserva n° {reservation.id}</h5>
                        <StatusReservation status={reservation.status} />
                    </div>
                    <h5 className="text-md"><span className="font-semibold">Cliente:</span> {reservation.user.name}</h5>
                    <p className="text-md"><span className="font-semibold">Quarto:</span> {reservation.room.code}</p>
                    <p className="text-md"><span className="font-semibold">Capacidade:</span> {reservation.room.capacity}</p>
                    <p className="text-md"><span className="font-semibold">Andar:</span> {formatFloor(reservation.room.floor)}</p>
                    <p className="text-md"><span className="font-semibold">Valor da diária:</span> {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.dailyRate)}</p>
                    <div>
                        <div className="flex gap-2 my-3">
                            <InputText onBlur={() => {}} type="date" name="checkInDate" icon={CiCalendar} label="Data de chegada"/>
                            <InputText onBlur={() => {}} type="date" name="checkOutDate" icon={CiCalendar} label="Data de saída"/>
                        </div>
                        {!disponibility && <p className="text-sm text-red-500 m-0 flex items-center gap-2"><MdErrorOutline fontSize={15}/> Quarto indisponível nesse intervalo de datas</p> }
                    </div>
                </div>
            </div>
            <hr className="text-gray-300"/>
            <div className="my-3 flex flex-col">
                <h5 className="text-xl font-semibold text-black mb-4">Detalhes do pagamento</h5>
                <p className="text-md text-black flex justify-between"><span className="font-semibold">{diferencaDias} Dias:</span> {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.dailyRate * diferencaDias)}</p>
                <p className="text-md text-black flex justify-between"><span className="font-semibold">Taxa de serviço:</span> {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.serviceFee)}</p>
                <p className="text-md text-black flex justify-between"><span className="font-semibold">Descontos:</span> - {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(reservation.discountAmount)}</p>
                <hr className="text-gray-400 my-3" />
                <p className="text-2xl text-[#002179] flex justify-between font-semibold"><span>Valor total:</span> {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'brl'}).format(totalValue)}</p>
            </div>

            <div className="w-full text-center mt-4">
                <button type="submit" className={`bg-[#002179] text-white py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal ${!disponibility || isSubmitting ? 'opacity-[.5] pointer-events-none' : ''}`}>{isSubmitting ? <span className="flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" fontSize={15}/> Atualizando</span> : 'Atualizar'}</button>
            </div>
        </div>
    )
}