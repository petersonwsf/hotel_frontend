import CardInfo from "./components/CardsInfo";
import { FaBed } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { getReservationsByUser } from "@/lib/api/reservation";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { User } from "@/contexts/AuthContext";
import { calculateNextReservation } from "@/utils/calculateNextReservation";
import { formatShortDate } from "@/utils/formatDate";
import NextReservationComponent from "./components/NextReservationComponent";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UserPage({ searchParams }: PageProps) {

    const { page } = await searchParams;
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    let user : User | null = null;

    try {
        const { payload } = await jwtVerify(token!, new TextEncoder().encode(process.env.SECRET_JWT));
        user = {id : payload.id as number, name: payload.name as string, login: payload.sub as string, role: payload.role as string};
    } catch (error : any) {
        console.log(error.response)
    }

    const reservations = await getReservationsByUser(user?.id, { page: page ?? '0', checkInDate: new Date().toISOString().slice(0, 10), status: ['CONFIRMED', 'CHECKED_IN', 'PENDING'] })
    const nextReservation = calculateNextReservation(reservations?.content ?? [])

    return (
        <div>
            <h2 className="font-[650] text-[#002179] text-4xl">Minha conta</h2>
            <p className="font-light text-gray-500 text-lg my-2">Tudo pronto por aqui! O que vamos explorar hoje?</p>
            <div className="flex gap-[1rem] items-center">
                <CardInfo icon={<FaBed className="w-7 h-7"/>} label="RESERVAS ATIVAS" value={reservations?.content?.length.toString() ?? '0'} />
                <CardInfo icon={<CiCalendar className="w-7 h-7" />} label="PRÓXIMO CHECK-IN" value={nextReservation ? formatShortDate(nextReservation.checkInDate) : '-'} />
            </div>
            <div className="flex w-full my-[1rem]">
                {nextReservation ? 
                    <NextReservationComponent nextReservation={nextReservation}/> 
                : (
                    <div className="h-[300px] max-w-[600px] flex justify-center items-center">
                        <p className="text-gray-600 text-xl font-light text-center m-auto">Não há uma próxima reserva esperando você, faça já sua reserva e venha aproveitar</p>
                    </div>
                )}
            </div>
        </div>
    )
}