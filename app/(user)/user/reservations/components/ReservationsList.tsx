"use client"
import { Filter, Reservation } from "@/types/Reservation.types"
import { useState } from "react"
import ReservationFilter from "./ReservationFilter"
import ReservationCard from "./ReservationCard";
import Pagination from "@/components/ui/Pagination";
import Modal from "@/components/ui/Modal";
import EditReservation from "@/components/reservation/EditReservation/UpdateRerservation";
import useReservation from "@/hooks/useReservation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface UserReservationsProps {
    reservations: Reservation[];
    pagination : {page : number, totalPages: number}
}

export default function ReservationsList({ reservations, pagination } : UserReservationsProps) {

    const [selectedReservationId, setSelectedReservationId] = useState<number | undefined>(undefined)
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)

    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    const { cancelReservation } = useReservation()

    const handleCloseEdit = () => {
        setOpenModalEdit(false)
        setSelectedReservationId(undefined)
    }

    const handleOpenEdit = (id: number) => {
        setSelectedReservationId(id)
        setOpenModalEdit(true)
    }

    const handleCloseDelete = () => {
        setOpenModalDelete(false)
        setSelectedReservationId(undefined)
    }

    const handleOpenDelete = (id: number) => {
        setSelectedReservationId(id)
        setOpenModalDelete(true)
    }

    async function deleteReservation() {
        setLoadingDelete(true)
        await cancelReservation(selectedReservationId!)
        setLoadingDelete(false)
        handleCloseDelete()
    }

    return (
        <div>
            <div className="flex flex-col gap-[2rem] my-[1.5rem]">
                {reservations.length > 0  ? reservations.map(reservation => (
                    <ReservationCard reservation={reservation} key={reservation.id} openEditModal={handleOpenEdit} openDeleteModal={handleOpenDelete} />
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
                <EditReservation onCloseModal={handleCloseEdit} reservationId={selectedReservationId} />
            </Modal>

            <Modal
                isOpen={openModalDelete}
                onClose={handleCloseDelete}
                title={`Cancelar reserva ${selectedReservationId}`}
                size="xl"
            >
                <p>Tem certeza que deseja cancelar a reserva? Essa ação não poderá ser defeita</p>
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={handleCloseDelete} className="bg-[#002179] text-white py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal">Manter</button>
                    <button onClick={deleteReservation} className={`text-[#fff] bg-[#9A0526] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal ${loadingDelete ? 'opacity-[.5] pointer-events-none' : ''}`}>
                        {loadingDelete ? <span className="flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" fontSize={15}/> Cancelando</span> : 'Cancelar Reserva'}
                    </button>
                </div>
            </Modal>
        </div>
    )
}