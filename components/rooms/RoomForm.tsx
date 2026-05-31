"use client"
import { Formik, Form } from "formik"
import * as Yup from 'yup'
import InputText from "../form/InputText"
import InputSelect from "../form/InputSelect"
import InputCurrency from "../form/InputCurrency"
import Textarea from "../form/Textarea"
import InputUpload from "../form/InputUpload"
import Image from "next/image"
import { GoXCircleFill } from "react-icons/go";
import { useEffect, useState } from "react"
import { optionsFloor, optionsCategory, optionsStatus, Room } from "@/types/Room.types"
import useRooms from "@/hooks/useRooms"
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const validationSchema = Yup.object({
    code: Yup.string().required("Código é obrigatório"),
    floor: Yup.string().required("Selecione o andar do quarto"),
    status: Yup.string().required("Selecione um status"),
    category: Yup.string().required("Selecione uma categoria"),
    customPrice: Yup.number().required("Preço é obrigatório").min(100, "O preço mínimo deve ser R$ 100,00"),
    capacity: Yup.number().required("Informe a capacidade").min(1, "O quarto deve ter capacidade mínima de 1 pessoa"),
    bedconfig: Yup.string().required("Informe a configuração de cama"),
    amenities: Yup.string().required("Informe a configuração de cama"),
    images: Yup.array()

})

interface RoomFormProps {
    submit: (values: any) => void;
    id?: number | null;
}

export default function RoomForm({ submit, id } : RoomFormProps) {

    const [imageSelected, setImageSelected] = useState<number>(0)
    const [room, setRoom] = useState<Room | null>(null)
    const [existingImages, setExistingImages] = useState<Room['images']>([])
    const [loading, setLoading] = useState<boolean>(false)

    const { getRoomById } = useRooms()

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const roomResponse = await getRoomById(id!);
            setRoom(roomResponse)
            setExistingImages(roomResponse.images)
            setLoading(false)
        }
        if (id) {
            fetch()
        }
    }, [id])

    return (
        <div className="my-[1rem]">
            {loading ? (
                <div className="w-full min-h-[60vh] flex items-center justify-center">
                    <div className="animate-spin text-blue-600"><AiOutlineLoading3Quarters fontSize={50}/></div>
                </div>
            ) : (
                <Formik
                    enableReinitialize={true}
                    validationSchema={validationSchema}
                    onSubmit={(values) => {
                        submit({ ...values, remainingImages: existingImages })
                    }}
                    initialValues={{
                        code: room ? room.code : '',
                        floor: room ? room.floor : '',
                        status: room ? room.status : '',
                        category: room ? room.category : '',
                        customPrice: room ? room.customPrice : 0,
                        capacity: room ? room.capacity : '',
                        bedconfig: room ? room.bedconfig : '',
                        amenities: room ? room.amenities : '',
                        images: []
                    }}
                >
                    {({ values, setFieldValue, isSubmitting }) => {

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

                        function removeExistingImage(urlToRemove: string) {
                            setExistingImages(prev => prev.filter(image => image.url !== urlToRemove))
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
                                <div className="flex gap-[1rem] my-[1rem]">
                                    <div className="flex w-full items-start gap-[1rem] flex-wrap">
                                        {existingImages?.map((existingImage, index) => (
                                            <div key={`existing_image_${index}`} className="relative cursor-pointer shadow-blue-300/50 hover:shadow-lg duration-[.3s]" onClick={() => setImageSelected(index)}>
                                                <GoXCircleFill  className="w-5 h-5 absolute right-[-5px] z-10 top-[-10px] rounded-[50%]" onClick={() => removeExistingImage(existingImage.url)} style={{color: 'red', background: '#fff'}}/>
                                                <img src={existingImage.url} alt="Imagens" style={{width: '75px'}} />
                                            </div>
                                        ))}
                                        {(values.images as File[]).map((image, index) => (
                                            <div key={`image_${index}`} className="relative cursor-pointer shadow-blue-300/50 hover:shadow-lg duration-[.3s]" onClick={() => setImageSelected(index)}>
                                                <GoXCircleFill  className="w-5 h-5 absolute right-[-5px] top-[-10px] rounded-[50%]" onClick={() => removeImage(index)} style={{color: 'red', background: '#fff'}}/>
                                                <Image width={75} height={0} src={URL.createObjectURL(image)} alt="Imagens"/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-[2rem] text-center">
                                    <button type="submit" className={`bg-[#002BB3] py-1 px-4 rounded-[5px] text-white cursor-pointer ${isSubmitting && 'opacity-[.5]'}`}>{isSubmitting ? 'Aguarde' : id ? 'Editar' : 'Criar'}</button>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            )}
        </div>
    )
}