"use client"
import { useState, } from "react"

import { AiOutlineThunderbolt } from "react-icons/ai";

export default function PaymentPix() {

    const [checkTerm, setCheckTerm] = useState<boolean>(false)

    return (
        <div>
            <div className="bg-blue-100 rounded-lg p-4 border-[#002BB3] border-l-5">
                <div className="flex items-start">
                    <AiOutlineThunderbolt fontSize={40} className="text-blue-500"/>
                    <div className="px-[1rem] text-gray-800">
                        <h4 className="flex items-center mb-3 text-gray-900 font-light text-xl">Confirmação instantânea</h4>
                        <p className="text-gray-900 font-light">Pague com PIX para confirmação instantânea. Na próxima tela, você verá o QR Code e a chave para cópia. A reserva será garantida imediatamente após o processamento.</p>
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
                Confirmar e gerar pix
            </button>
        </div>
    )
}