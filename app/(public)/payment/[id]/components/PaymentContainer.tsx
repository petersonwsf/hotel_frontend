"use client"

import { useAuthContext } from "@/contexts/AuthContext"
import { Reservation } from "@/types/Reservation.types"
import { handleToast } from "@/utils/handleToast";
import { redirect } from "next/navigation";
import PaymentHeader from "./PaymentHeader";
import { useState } from "react";
import { TypePayment } from "@/types/Payment.types";
import PaymentBoleto from "./PaymentBoleto";
import PaymentPix from "./PaymentPix";
import PaymentCard from "./PaymentCard";
import InfosReservation from "./InfosReservation";

interface PaymentContainerProps {
    reservation: Reservation;
}

export default function PaymentContainer({ reservation } : PaymentContainerProps) {

    const { user } = useAuthContext()

    const [typePayment, setTypePayment] = useState<TypePayment>("card")

    if (!user) {
        handleToast("Faça login para ter acesso", "error")
        redirect(`/login?redirect=/payment/${reservation.id}`)
    }
    
    return (
        <div className="flex gap-3 items-start w-full">
            <div className="w-[70%]">
                <PaymentHeader typePayment={typePayment} setTypePayment={setTypePayment} />
                <div className="w-full bg-gray-100 px-[2rem] py-[1rem]">
                    {typePayment === 'boleto' && <PaymentBoleto reservation={reservation} user={user}/>}
                    {typePayment === 'pix' && <PaymentPix />}
                    {typePayment === 'card' && <PaymentCard reservation={reservation} user={user} />}
                </div>
            </div>
            <div className="w-[30%]">
                <InfosReservation reservation={reservation} />
            </div>
        </div>
    )
}