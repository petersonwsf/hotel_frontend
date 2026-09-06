"use client"
import Modal from "@/components/ui/Modal";
import { Client } from "@/types/Client.types";
import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import FormUploadImage from "./FormUploadImage";
import { handleToast } from "@/utils/handleToast";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

interface ProfileProps {
    client: Client;
}

export default function Profile({ client } : ProfileProps) {

    const { updateProfilePicture } = useUser()

    const router = useRouter()

    const [openModalUpdatePicture, setOpenModalUpdatePicture] = useState<boolean>(false)

    const handleUploadProfilePicture = async (file : File, id: number) => {
        try {
            await updateProfilePicture(file, id)
            handleToast("Foto de perfil atualizada com sucesso", "success")
            setOpenModalUpdatePicture(false)
            router.refresh()
        } catch (error : any) {
            handleToast(error.response.data.message, "error")
        }
    }

    return (
        <div className="w-full h-[200px] border-1 relative border-gray-300 rounded-lg overflow-hidden">
            <div className="bg-[#002179] h-[100px]"></div>
            <div className="h-[100px]"></div>
            <div className="absolute top-1/2 -translate-y-1/2 flex gap-3 h-full w-full justify-between">
                <div className="flex h-full items-center gap-4 px-[1rem]">
                    <div className="w-[100px] h-[100px] flex justify-center items-center rounded-lg border-4 border-white shadow-xl relative">
                        {client.imageKey ? (
                            <img className="w-full h-full object-cover" src={`${process.env.NEXT_PUBLIC_URL_MINIO}/${client.imageKey}`} alt="Imagem de perfil" />
                        ) : (
                            <img className="w-full h-full" src={`/images/icon_person.webp`} alt="Imagem de perfil" />
                        )}
                        <div onClick={() => setOpenModalUpdatePicture(true)} className="p-[.5rem] bg-[#002179] rounded-md text-white absolute bottom-[-10px] right-[-10px] z-[1000] cursor-pointer">
                            <FaCamera className="w-4 h-4"/>
                        </div>
                    </div>
                    <div className="pt-[2.5rem]">
                        <h2 className="text-3xl font-light">{client.name}</h2>
                    </div>
                </div>
                <div className="flex h-full items-end">
                    <button className="text-[#002179] m-[1rem] border border-[#002179] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal" onClick={() => setOpenModalUpdatePicture(true)} >Atualizar Avatar</button>
                </div>
            </div>
            <Modal
                isOpen={openModalUpdatePicture}
                onClose={() => setOpenModalUpdatePicture(false)}
                title="Alterar foto de perfil"
                size="xl"
            >
                <FormUploadImage onSubmit={handleUploadProfilePicture} id={client.userId} />
            </Modal>
        </div>
    )
}