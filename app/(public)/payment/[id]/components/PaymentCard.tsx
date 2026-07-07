"use client"
import { useState } from "react"

import { IoIosInformationCircleOutline } from "react-icons/io";

export default function PaymentCard() {

    const [checkTerm, setCheckTerm] = useState<boolean>(false)

    return (
        <div>
            <div className="bg-blue-100 rounded-lg p-4 border-[#002BB3] border-l-5">
                <div className="flex items-start">
                    <IoIosInformationCircleOutline className="text-blue-500 w-7 h-7 shrink-0"/>
                    <div className="px-[1rem] text-gray-900">
                        <h4 className="flex items-center mb-3 font-light text-xl">Falta pouco para confirmar sua estadia!</h4>
                        <p className="flex font-light items-center mb-3">
                            Para carregar o nosso formulário de pagamento protegido pela Stripe, precisamos que você confirme a intenção de reserva concordando com os valores e termos abaixo.
                            Assim que você clicar em Concordar e Avançar, os campos para inserir os dados do seu cartão aparecerão na tela de forma 100% segura.
                        </p>
                    </div>
                </div>
            </div>
            <label  className="flex items-center gap-3 my-[1rem] cursor-pointer hover:bg-gray-50/50 transition-colors select-none">
                <input type="checkbox" name="amenities" checked={checkTerm} onChange={(e) => setCheckTerm(!checkTerm)} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                    <span className="text-md font-light text-gray-700">
                        Declaro que concordo com os valores e termos do hotel para liberar o preenchimento do cartão.
                    </span>
            </label>
            <button className={`w-full bg-[#002BB3] rounded-lg py-[.75rem] my-[.5rem] text-white font-semibold cursor-pointer duration-[.3s] ${!checkTerm ? 'opacity-[.5] pointer-events-none' : undefined}`}>
                Confirmar e preencher dados
            </button>
        </div>
    )
}