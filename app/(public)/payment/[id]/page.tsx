import { getReservation } from "@/lib/api/reservation"
import { notFound } from "next/navigation"
import PaymentContainer from "./components/PaymentContainer"

export default async function Page({ params } : { params: Promise<{ id : string }>}) {

    const { id } = await params

    const reservation = await getReservation(Number(id))

    if (!reservation) notFound()

    return (
        <div className="w-7xl m-auto py-5 my-3">
            <PaymentContainer reservation={reservation} />
        </div>
    )
}