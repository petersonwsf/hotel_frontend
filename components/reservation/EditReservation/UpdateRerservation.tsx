"use client"
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import FormEditReservation from "./FormEditReservation"
import { Reservation } from "@/types/Reservation.types"
import { useEffect, useState } from "react"
import { getReservationAction } from "@/actions/reservation"
import { handleToast } from "@/utils/handleToast"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useReservation from "@/hooks/useReservation"

const validationSchema = Yup.object({

})

interface EditReservationProps {
    reservationId: number | undefined;
    onCloseModal: () => void;
}

export default function EditReservation({ reservationId, onCloseModal } : EditReservationProps) {

    const [loadingReservation, setLoadingReservation] = useState<boolean>(true)
    const [reservation, setReservation] = useState<Reservation | null>(null)

    const { updateReservation } = useReservation()
    
    useEffect(() => {
        let cancelled = false
        async function loadReservation() {
            setLoadingReservation(true)
            const response = await getReservationAction(reservationId!)
            if (cancelled) return
            if (!response.success) {
                handleToast(response.erro, 'error')
                onCloseModal()
                setLoadingReservation(false)
                return
            }
            console.log(response.data)
            setReservation(response.data)
            setLoadingReservation(false)
        }
        loadReservation()
        return () => {
            cancelled = true
        }
    }, [reservationId])

    if (loadingReservation) return (
        <div className="flex justify-center items-center h-[300px]">
            <div className="animate-spin"><AiOutlineLoading3Quarters fontSize={30}/></div>
        </div>
    )

    return (
        <div className="w-full">
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                    checkInDate: reservation?.checkInDate ?? '',
                    checkOutDate: reservation?.checkOutDate ?? '',
                }}
                onSubmit={async (values) => {
                    await updateReservation(values, reservation!.id)
                    onCloseModal()
                }}
            >
                <Form>
                    <FormEditReservation reservation={reservation!} />
                </Form>
            </Formik>
        </div>
    )
}