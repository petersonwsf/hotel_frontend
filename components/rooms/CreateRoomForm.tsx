"use client"
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import InputText from "../form/InputText"
import InputSelect from "../form/InputSelect"
import { RoomCategory } from "@/types/RoomCategory"
import InputCurrency from "../form/InputCurrency"
import Textarea from "../form/Textarea"
import InputUpload from "../form/InputUpload"
import Image from "next/image"
import { GoXCircleFill } from "react-icons/go";
import { useState } from "react"
import useRooms from "@/hooks/useRooms"
import { handleToast } from "@/utils/handleToast"

const validationSchema = Yup.object({
    code: Yup.string().required("Código é obrigatório"),
    floor: Yup.string().required("Selecione o andar do quarto"),
    status: Yup.string().required("Selecione um status"),
    category: Yup.string().required("Selecione uma categoria"),
    customPrice: Yup.number().required("Preço é obrigatório").min(100, "O preço mínimo deve ser R$ 100,00"),
    capacity: Yup.number().required("Informe a capacidade").min(1, "O quarto deve ter capacidade mínima de 1 pessoa"),
    bedconfig: Yup.string().required("Informe a configuração de cama"),
    amenities: Yup.string().required("Informe a configuração de cama"),
    images: Yup.array().min(1, "O quarto deve ter no mínimo 1 foto").required('As fotos são obrigatórias')

})

const optionsFloor = [
    {label: 'Térreo', value: 'TERREO'},
    {label: '1° Andar', value: '1_ANDAR'},
    {label: '2° Andar', value: '2_ANDAR'},
    {label: '3° Andar', value: '3_ANDAR'}
]

const optionsStatus = [
    {label : "Disponível", value: "AVAILABLE"},
    {label : "Fora de ordem", value: "OUT_OF_ORDER"}
]

const optionsCategory : { value: RoomCategory, label: string }[] = [
    {value: 'DLX', label: 'Deluxe'},
    {value: 'PRM', label: 'Premium'},
    {value: 'PST', label: 'Suíte Presidencial'},
    {value: 'STD', label: 'Padrão'},
    {value: 'STE', label: 'Suíte'},
    {value: 'STJ', label: 'Suíte Júnior'},
    {value: 'SUP', label: 'Superior'},
]

export default function CreateRoomForm() {

    const [imageSelected, setImageSelected] = useState<number>(0)

    const { createRoom } = useRooms()

    async function createRoomSubmit(values: any) {
        const formData = new FormData()

        const roomDataDto = {
            code: values.code,
            floor: values.floor,
            status: values.status,
            category: values.category,
            customPrice: Number(values.customPrice),
            capacity: Number(values.capacity),
            bedconfig: values.bedconfig,
            amenities: values.amenities
        }

        const roomDataBlob = new Blob([JSON.stringify(roomDataDto)], {
            type: 'application/json'
        })

        formData.append("room_data", roomDataBlob)
        
        values.images.forEach((file: File) => {
            formData.append("images", file)
        })

        try {
            const room = await createRoom(formData)
            handleToast('Quarto criado com sucesso!', 'success')
            console.log(room)
        } catch (err: any) {
            console.log(err.response)
            handleToast('Erro ao salvar quarto novo', 'error')
        }
    }

    return (
        <div className="my-[1rem]">
            <Formik
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    createRoomSubmit(values)
                }}
                initialValues={{
                    code: '',
                    floor: '',
                    status: '',
                    category: '',
                    customPrice: 0,
                    capacity: '',
                    bedconfig: '',
                    amenities: '',
                    images: []
                }}
            >
                {({ values, setFieldValue }) => {

                    function removeImage(indexToRemove: number) {
                        const newImages = (values.images as File[]).filter((_, index) => index !== indexToRemove);

                        if (newImages.length === 0) {
                            setImageSelected(0);
                        } else if (imageSelected === indexToRemove) {
                            const nextIndex = indexToRemove < newImages.length ? indexToRemove : indexToRemove - 1;
                            setImageSelected(nextIndex);
                        } else if (imageSelected > indexToRemove) {
                            setImageSelected(imageSelected - 1);
                        }

                        setFieldValue("images", newImages);
                    }

                    return (
                        <Form>
                            <div className="flex gap-[1rem] my-[1rem]">
                                <InputText name="code" placeholder="Código do quarto" label="Código"/>
                                <InputSelect name="floor" label="Andar" options={optionsFloor}/>
                            </div>
                            <div className="flex gap-[1rem] my-[1rem]">
                                <InputSelect name="status" label="Status" options={optionsStatus} />
                                <InputSelect name="category" label="Categoria" options={optionsCategory} />
                            </div>
                            <div className="flex gap-[1rem] my-[1rem]">
                                <InputCurrency name="customPrice" placeholder="Preço da diária" label="Preço da diária"/>
                                <InputText name="capacity" label="Capacidade" type="number" placeholder="Capacidade de pessoas"/>
                            </div>
                            <div className="my-[1rem]">
                                <InputText name="bedconfig" placeholder="Configuração de camas" label="Configuração de camas" />
                            </div>
                            <div className="my-[1rem]">
                                <Textarea name="amenities" placeholder="Insira as comodidades" label="Comodidades" />
                            </div>
                            <div className="my-[1rem]">
                                <InputUpload name="images" label="Imagens"/>
                            </div>
                            {values.images.length > 0 && (
                                <div className="flex gap-[1rem] my-[1rem]">
                                    <div className="flex w-full items-center">
                                        <Image width={300} height={0} src={URL.createObjectURL(values.images[imageSelected] as File)} alt="Imagem"/>
                                    </div>
                                    <div className="flex w-full items-start gap-[1rem] flex-wrap">
                                        {(values.images as File[]).map((image, index) => (
                                            <div key={`image_${index}`} className="relative cursor-pointer shadow-blue-300/50 hover:shadow-lg duration-[.3s]" onClick={() => setImageSelected(index)}>
                                                <GoXCircleFill  className="w-5 h-5 absolute right-[-5px] top-[-10px] rounded-[50%]" onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeImage(index)
                                                }} style={{color: 'red', background: '#fff'}}/>
                                                <Image width={75} height={0} src={URL.createObjectURL(image)} alt="Imagens"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <button type="submit">Enviar</button>
                        </Form>
                    )
                }}
                
            </Formik>
        </div>
    )
}