import { IoMdAdd } from "react-icons/io";
import ReservationFilterAdmin from "./components/ReservationFilterAdmin";
import { getReservations } from "@/lib/api/reservation";
import ReservationsList from "@/app/(user)/user/reservations/components/ReservationsList";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminReservationPage({ searchParams }: PageProps) {

    const params = await searchParams;

    const reservation = await getReservations({ 
        page: params.page ?? '0', 
        size: params.size ?? '10', 
        sort: 'createdAt,desc',
        status: params.status ?? [],
        checkInDate: params.checkIn ?? undefined,
        checkOutDate: params.checkOut ?? undefined,
        category: params.category ?? [],
        floor: params.floor ?? [],
        guestName: params.guestName as string ?? undefined,
    })

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Reservas</h2>
                <button className="flex gap-2 bg-[#002BB3] hover:bg-[#001c78] duration-[.3s] items-center text-white py-2 px-4 rounded-[10px] cursor-pointer"><IoMdAdd className="w-5 h-5"/> Adicionar reserva</button>
            </div>
            <ReservationFilterAdmin />
            <ReservationsList reservations={reservation.content ?? []} pagination={{page: reservation.pageable.pageNumber ?? 0, totalPages: reservation.totalPages ?? 0 }} />
        </div>
    )
}