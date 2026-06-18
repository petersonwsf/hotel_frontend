"use client"
import useRooms from "@/hooks/useRooms";
import { Room } from "@/types/Room.types"
import { calcularDiferencaDias } from "@/utils/calculateDays";
import { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

interface ReservationInfosProps {
    room: Room;
    totalDays: number | undefined;
    allowed: boolean | null;
    dates: {startDate: string | undefined, endDate: string | undefined};
    setDates: (value : {startDate: string | undefined, endDate: string | undefined}) => void;
    setTotalDays: (value: number | undefined) => void;
    setAllowed: (value: boolean | null) => void;
}

export default function ReservationDates({ room, setTotalDays, allowed, setAllowed, dates, setDates } : ReservationInfosProps) {
    
    const { checkAvailability } = useRooms()

    useEffect(() => {
        const verifyDisponibility = async () => {
            try {
                const availability = await checkAvailability(dates.startDate!, dates.endDate!, room.id);
                setTotalDays(calcularDiferencaDias(dates.startDate, dates.endDate))
                setAllowed(availability);
            } catch (error) {
                console.error("Erro ao verificar disponibilidade:", error);
            }
        };

        let debounceTimer: NodeJS.Timeout;

        if (dates.startDate && dates.endDate) {
            debounceTimer = setTimeout(() => {
                verifyDisponibility();
            }, 800);
        }

        return () => {
            if (debounceTimer) clearTimeout(debounceTimer);
        };
    }, [dates.startDate, dates.endDate, room.id, checkAvailability]);

    const handleDateChanges = (newDates: {startDate: string |undefined, endDate: string | undefined}) => {
        setDates(newDates)
        if (!newDates.startDate || !newDates.endDate) {
            setTotalDays(undefined)
            setAllowed(null)
        }
    }

    return (
        <div className="flex flex-col py-[1rem] px-[1.5rem] border-1 border-gray-300 rounded-lg">
            <h2 className="text-[#002BB3] font-semibold text-2xl pb-4 border-b-1 border-gray-300">Detalhes da Estadia</h2>
            <div className="flex justify-between my-4 text-xl text-[#002BB3]">
                <p className="m-0 tracking-[.04rem] font-semibold">Valor da diária:</p>
                <p className="m-0">{room.customPrice.toLocaleString("pt-BR", {style: 'currency', currency: 'brl'})}</p>
            </div>
            <div>
                <div className="flex gap-[3rem] w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="checkInDate" className="my-[.2rem] font-light">Data de chegada</label>
                        <input type="date" onChange={(e) => handleDateChanges({...dates, startDate: e.target.value})} className="border border-gray-300 font-light rounded-lg px-3 py-3 text-sm outline-none" id="checkInDate" />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="checkOutDate" className="my-[.2rem] font-light">Data de saída</label>
                        <input type="date" onChange={(e) => handleDateChanges({...dates, endDate: e.target.value})} className="border border-gray-300 rounded-lg px-3 py-3 text-sm font-light outline-none" id="checkOutDate" />
                    </div>
                </div>
            </div>
            <div className="my-[1rem] flex">
                <div>
                    {allowed != null && (
                        allowed ? (
                            <div className="p-[1rem] border-3 rounded-[10px] flex justify-center items-center border-green-500 bg-green-100 flex-col items-center gap-2">
                                <FaCheckCircle fontSize={30} style={{color: 'green'}}/>
                                <p className="text-green-500 text-xs text-center font-medium">Quarto disponível no período informado</p>
                            </div>
                        ) : (
                            <div className="p-[1rem] border-3 rounded-[10px] flex justify-center items-center border-red-500 bg-red-100 flex-col items-center gap-2">
                                <IoMdCloseCircle fontSize={30} style={{color: 'red'}}/>
                                <p className="text-red-500 text-xs text-center font-medium">Quarto indisponível no período informado</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    )
}