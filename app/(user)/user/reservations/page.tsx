import { User } from "@/contexts/AuthContext";
import { getReservationsByUser } from "@/lib/api/reservation";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import ReservationsList from "./components/ReservationsList";
import ReservationFilter from "./components/ReservationFilter";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function UserReservationsPage({ searchParams }: PageProps) {
    
    const { page, status } = await searchParams;
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    let user : User | null = null;

    try {
        const { payload } = await jwtVerify(token!, new TextEncoder().encode(process.env.SECRET_JWT));
        user = {id : payload.id as number, name: payload.name as string, login: payload.sub as string, role: payload.role as string};
    } catch (error : any) {
        console.log(error.response)
    }

    const reservations = await getReservationsByUser(user?.id, { page: page ?? '0', size: '10', sort: 'createdAt,desc', status: status ? status : ['PENDING', 'CONFIRMED'] })

    return (
        <div className="w-full">
            <h2 className="font-[650] text-[#002179] text-4xl">Minhas Reservas</h2>
            <p className="font-light text-gray-500 text-lg my-2">fique por dentro das suas reservas no Lúmen Hotel</p>
            <ReservationFilter />
            <ReservationsList reservations={reservations?.content ?? []} pagination={{page: reservations ? (reservations.pageable.pageNumber) : 0, totalPages: reservations ? reservations.totalPages : 0 }}/>
        </div>
    )
}