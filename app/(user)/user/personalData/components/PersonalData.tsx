"use client"
import { Client, ClientUpdate } from "@/types/Client.types";
import Profile from "./Profile";
import PersonalDataform from "./PersonalDataForm";
import useClient from "@/hooks/useClient";

interface PersonalDataProps {
    client: Client;
}

export default function PersonalData({ client } : PersonalDataProps) {

    const { updateClient } = useClient()

    return (
        <div className="w-full my-3">
            <Profile client={client} />
            <PersonalDataform client={client} onSubmit={(values: ClientUpdate) => updateClient(client.id, values)} />
        </div>   
    )
}