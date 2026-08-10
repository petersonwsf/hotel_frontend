import { User } from "@/contexts/AuthContext";
import { getClientByUserId } from "@/lib/api/client";
import { Client } from "@/types/Client.types";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import AddressForm from "./components/AddressForm";

export default async function AddressPage() {

    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    let user : User | null = null;

    try {
        const { payload } = await jwtVerify(token!, new TextEncoder().encode(process.env.SECRET_JWT));
        user = {id : payload.id as number, name: payload.name as string, login: payload.sub as string, role: payload.role as string};
    } catch (error : any) {
        console.log(error.response)
    }
    
    const client : Client = await getClientByUserId(user?.id)
    
    return (
        <div className="w-full">
            <h2 className="font-[650] text-[#002179] text-4xl">Meu endereço</h2>
            <p className="font-light text-gray-500 text-lg my-2">Atualize suas informações de endereço</p>
            <AddressForm id={client.id} address={client.contactInformation} />
        </div>
    )
}