"use client"

import { FaCreditCard } from "react-icons/fa6";
import { MdQrCode2 } from "react-icons/md";
import { FaBarcode } from "react-icons/fa6";
import { TypePayment } from "@/types/Payment.types";

interface PaymentInfosProps {
    typePayment: TypePayment;
    setTypePayment: (value: TypePayment) => void;
}

export default function PayementHeader({ typePayment, setTypePayment } : PaymentInfosProps) {

    return (
        <div>
            <h2 className="text-4xl font-semibold tracking-[.05rem] text-[#002BB3]">Realizar pagamento</h2>
            <div className="flex justify-around gap-4 bg-gray-200 rounded-xl p-[.5rem] my-[1rem]">
                <div className={`flex items-center w-full py-[.5rem] rounded-xl justify-center duration-[.3s] gap-2 cursor-pointer hover:bg-white hover:text-[#002BB3] ${typePayment === 'CARD' ? 'bg-white text-[#002BB3]' : 'text-gray-700'}`} onClick={() => setTypePayment('CARD')}>
                    <FaCreditCard fontSize={15}/> <p className="font-normal">Cartão de crédito</p>
                </div>
                <div className={`flex items-center w-full py-[.5rem] rounded-xl justify-center duration-[.3s] gap-2 cursor-pointer hover:bg-white hover:text-[#002BB3] ${typePayment === 'PIX' ? 'bg-white text-[#002BB3]' : 'text-gray-700'}`} onClick={() => setTypePayment('PIX')}>
                    <MdQrCode2 fontSize={15}/> <p className="font-normal">Pix</p>
                </div>
                <div className={`flex items-center w-full py-[.5rem] rounded-xl justify-center duration-[.3s] gap-2 cursor-pointer hover:bg-white hover:text-[#002BB3] ${typePayment === 'BOLETO' ? 'bg-white text-[#002BB3]' : 'text-gray-700'}`} onClick={() => setTypePayment('BOLETO')}>
                    <FaBarcode fontSize={15}/> <p className="font-normal">Boleto</p>
                </div>
            </div>
        </div>
    )
}