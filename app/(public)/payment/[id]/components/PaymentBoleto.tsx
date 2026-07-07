"use client"
import { useState } from "react"

import { IoIosInformationCircleOutline } from "react-icons/io";

export default function PaymentBoleto() {

    const [checkTerm, setCheckTerm] = useState<boolean>(false)

    return (
        <div>
            <div className="bg-blue-100 rounded-lg p-4 border-[#002BB3] border-l-5">
                <div className="flex items-start">
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
            </div>
            <label  className="flex items-center gap-3 my-[1rem] cursor-pointer hover:bg-gray-50/50 transition-colors select-none">
                <input type="checkbox" name="amenities" checked={checkTerm} onChange={(e) => setCheckTerm(!checkTerm)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                    <span className="text-md font-light text-gray-700">
                        Concordo com as Políticas de Cancelamento e Termos de Uso do Lúmen Hotel.
                    </span>
            </label>
            <button className={`w-full bg-[#002BB3] rounded-lg py-[.75rem] my-[.5rem] text-white font-semibold cursor-pointer duration-[.3s] ${!checkTerm ? 'opacity-[.5] pointer-events-none' : undefined}`}>
                Confirmar e gerar boleto
            </button>
        </div>
    )
}