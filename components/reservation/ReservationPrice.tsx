"use client"
import { FaArrowRight } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { CgDanger } from "react-icons/cg";
import { Room } from "@/types/Room.types";
import { useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ReservationPriceProps {
    totalDays: number | undefined;
    allowed: boolean | null;
    room: Room;
    createReservationFunction: () => void
}

export default function ReservationPrice({ totalDays, allowed, room, createReservationFunction} : ReservationPriceProps) {

    const valorTotalDiaria = useMemo(() => {
        if (!totalDays) return room.customPrice;
        return room.customPrice * totalDays;
    }, [totalDays, room])

    const valorTotal = useMemo(() => {
        return valorTotalDiaria + 50
    }, [valorTotalDiaria])

    const [loading, setLoading] = useState<boolean>(false)

    async function handleCreateReservation() {
        setLoading(true)
        await createReservationFunction()
        setLoading(false)
    }

    return (
        <div className="w-full rounded-xl border-1 border-gray-400 rounded-b-xl">
            <div className="rounded-t-xl bg-[#002BB3] p-[1.5rem]">
                <h3 className="text-white font-semibold text-3xl">Resumo Financeiro</h3>
                <p className="font-normal text-[#96aaff]">Sua reserva está quase pronta</p>
            </div>
            <div className="flex flex-col px-[2rem] gap-3 py-3">
                <div className="flex justify-between">
                    <p className="font-light text-lg">Total de dias</p>
                    <p className="text-lg">{totalDays ? totalDays : " - "}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-light text-lg">Valor total das diárias</p>
                    <p className="text-lg">{totalDays ? valorTotalDiaria.toLocaleString("pt-BR", {style: 'currency', currency: 'brl'}) : " - "}</p>
                </div>
                <div className="flex justify-between">
                    <p className="font-light text-lg">Taxa de serviço</p>
                    <p className="text-lg">R$ 50,00</p>
                </div>
                {/*
                    <div className="flex justify-between">
                        <p className="font-light text-lg">Descontos</p>
                        <p className="text-red-800 text-lg">-</p>
                    </div>
                */}
                <hr className="text-gray-400"/>
                <div className="my-3">
                    <div className="flex justify-between items-center">
                        <p className="font- text-xl">Valor total</p>
                        <p className="text-2xl font-semibold">{totalDays ? valorTotal.toLocaleString("pt-BR", {style: 'currency', currency: 'brl'}) : " - "}</p>
                    </div>
                </div>
                <div>
                    {allowed === null && (
                        <div className="p-[1rem] flex gap-2 items-center text-red-700 border-2 mb-3 rounded-lg border-red-700 bg-red-100">
                            <CgDanger fontSize={20}/>
                            Preencha o período da reserva antes de confirmar
                        </div>
                    )}
                    <button className={`w-full py-[1rem] bg-[#002BB3] cursor-pointer text-white rounded-[10px] text-xl flex items-center justify-center gap-2 ${allowed === null || !allowed || loading ? 'opacity-[.5] pointer-events-none' : ''}`} onClick={handleCreateReservation}>
                        {loading ? (
                            <>
                                Confirmando reserva <span className="animate-spin"><AiOutlineLoading3Quarters /></span>
                            </>
                        ) : (
                            <>
                                Confirmar reserva <FaArrowRight />
                            </>
                        )}
                    </button>
                    <p className="font-light text-center text-gray-600 mt-[5px] mb-[.5rem]">Ao confirmar, você concorda com as políticas de cancelamento do Lúmen Hotel</p>
                </div>
            </div>
            <div className="bg-gray-100 p-[1.5rem] flex justify-center items-center gap-2 rounded-b-xl">
                <MdLockOutline className="w-5 h-5 text-gray-500"/>
                <p className="text-gray-600">Pagamento 100% seguro</p>
            </div>
        </div>
    )
}