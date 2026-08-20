"use client"
import { Filter, Reservation } from "@/types/Reservation.types"
import { useState } from "react"
import ReservationFilter from "./ReservationFilter"
import ReservationCard from "./ReservationCard";
import Pagination from "@/components/ui/Pagination";
import Modal from "@/components/ui/Modal";
import EditReservation from "@/components/reservation/EditReservation/UpdateRerservation";

interface UserReservationsProps {
    reservations: Reservation[];
    pagination : {page : number, totalPages: number}
}

export default function UserReservations({ reservations, pagination } : UserReservationsProps) {

    const [filter, setFilter] = useState<Filter>('ACTIVE')
    const [selectedReservationId, setSelectedReservationId] = useState<number | undefined>(undefined)
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)

    const handleClose = () => {
        setOpenModalEdit(false)
        setSelectedReservationId(undefined)
    }

    const handleOpen = (id: number) => {
        setSelectedReservationId(id)
        setOpenModalEdit(true)
    }

    return (
        <div>
            <ReservationFilter activeFilter={filter} setFilter={setFilter} reservations={reservations} />
            <div className="flex flex-col gap-[2rem] my-[1.5rem]">
                {reservations.length > 0  ? reservations.map(reservation => (
                    <ReservationCard reservation={reservation} key={reservation.id} openEditModal={handleOpen} />
                )) : (
                    <div className="w-full flex justify-center items-center h-[150px]">
                        <p className="font-light text-gray-500 text-xl">Não há reservas</p>
                    </div>
                )}
                <div className="flex items-center justify-end">
                    <Pagination page={pagination.page} totalPages={pagination.totalPages} />
                </div>
            </div>
            <Modal
                isOpen={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                title={`Editar reserva ${selectedReservationId}`}
                size="3xl"
            >
                <EditReservation onCloseModal={handleClose} reservationId={selectedReservationId} />
            </Modal>
        </div>
    )
}