"use client"
import useClient from "@/hooks/useClient";
import { Client, ContactInformation } from "@/types/Client.types"
import AddressForm from "./AddressForm";

interface ContainerAddressFormProps {
    client: Client;
}

export default function ContainerAddressForm({ client } : ContainerAddressFormProps) {

    const { updateAddress } = useClient()

    const handleEditAddress = async (values: Partial<ContactInformation>) => {
        updateAddress(client.id, values)
    }

    return (
        <div className="py-[1rem] w-full">
            <div className="rounded-xl overflow-hidden border-1 border-gray-300">
                <div className="w-full bg-[#002179] py-[1rem] px-[3rem]">
                    <AddressForm address={client.contactInformation} onSubmit={handleEditAddress} />
                </div>
            </div>
        </div>
    )
}