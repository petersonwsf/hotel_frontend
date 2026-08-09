import { Client } from "@/types/Client.types";
import Profile from "./Profile";
import PersonalDataform from "./PersonalDataForm";

interface PersonalDataProps {
    client: Client;
}

export default function PersonalData({ client } : PersonalDataProps) {
    return (
        <div className="w-full my-3">
            <Profile client={client}/>
            <PersonalDataform client={client}/>
        </div>   
    )
}