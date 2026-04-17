import axios from "axios";

export async function getAddress( postalCode: string ) {
    return await axios.get(`https://viacep.com.br/ws/${postalCode}/json/`)
}