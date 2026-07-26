import { User } from "@/contexts/AuthContext";
import { getReservationsByUser } from "@/lib/api/reservation";
import { Reservation } from "@/types/Reservation.types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import UserReservations from "./components/UserReservations";

export default async function UserReservationsPage() {
    
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    let user : User | null = null;

    try {
        const { payload } = await jwtVerify(token!, new TextEncoder().encode(process.env.SECRET_JWT));
        user = {id : payload.id as number, name: payload.name as string, login: payload.sub as string, role: payload.role as string};
    } catch (error : any) {
        console.log(error.response)
    }

    const reservations : Reservation[] = await getReservationsByUser(user?.id)

    return (
        <div className="w-full">
            <h2 className="font-[650] text-[#002179] text-4xl">Minhas Reservas</h2>
            <p className="font-light text-gray-500 text-lg my-2">fique por dentro das suas reservas no Lúmen Hotel</p>
            <UserReservations reservations={reservations} />
        </div>
    )
}