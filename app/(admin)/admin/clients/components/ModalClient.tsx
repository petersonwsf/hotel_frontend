"use client"
import { FormSection } from "@/app/(login)/components/FormRegister";
import PersonalDataForm from "@/app/(user)/user/personalData/components/PersonalDataForm";
import Modal from "@/components/ui/Modal";
import useClient from "@/hooks/useClient";
import { Client, ClientUpdate, ContactInformation } from "@/types/Client.types";
import { useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { BsHouse } from "react-icons/bs";
import AddressForm from "@/app/(user)/user/address/components/AddressForm";

interface ModalClientProps {
    open: boolean;
    onClose: () => void;
    client: Client;
}

export default function ModalClient({ client, open, onClose } : ModalClientProps) {

    const [section, setSection] = useState<FormSection>('PERSONAL')

    const { updateClient, updateAddress } = useClient()

    const handleEditClient = async (values: ClientUpdate) => {
        await updateClient(client.id, values)
        onClose()
    }

    const handleUpdateAddress = async (values: Partial<ContactInformation>) => {
        await updateAddress(client.id, values)
        onClose()
    }

    return (
        <Modal
            isOpen={open}
            onClose={onClose}
            title={`Editar dados do cliente`}
            size="3xl"
        >   
            <div className="border-b-1 border-gray-300 mb-[.5rem] flex">
                <div onClick={() => setSection('PERSONAL')} className={`h-full py-[.5rem] w-full flex items-center justify-center gap-3 duration-[.3s] cursor-pointer ${section === 'PERSONAL' ? 'font-semibold text-[#002BB3] border-b-3 border-[#002BB3]' : ''}`}><IoPersonOutline /> Dados pessoais</div>
                <div onClick={() => setSection('CONTACT')} className={`h-full py-[.5rem] w-full flex items-center justify-center gap-3 duration-[.3s] cursor-pointer ${section === 'CONTACT' ? 'font-semibold text-[#002BB3] border-b-3 border-[#002BB3]' : ''}`}><BsHouse /> Endereço</div>
            </div>
            {section === 'PERSONAL' && <PersonalDataForm client={client} onSubmit={handleEditClient} />}
            {section === 'CONTACT' && <div className="p-[1rem] border-1 border-gray-300 rounded-lg mt-[1.5rem]"><AddressForm address={client.contactInformation} onSubmit={handleUpdateAddress} /></div>}
        </Modal>
    )
}