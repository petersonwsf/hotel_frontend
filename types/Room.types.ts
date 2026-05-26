export interface RoomQueryParams {
    page?: number
    size?: number
    category?: RoomCategory
    capacity?: number
    minPrice?: number
    maxPrice?: number
    checkInDate?: string
    checkOutDate?: string
    code?: string
    floor?: string
    sort?: string;
}

export interface Room { 
    active: boolean;
    amenities: string;
    bedconfig: string;
    capacity: number;
    category: RoomCategory;
    code: string;
    customPrice: number;
    floor: string;
    id: number;
    status: StatusRoom;
    images?: {
        id: number;
        url: string;
        originalName: string;
        fileSize: number;
        contentType: string;
        createdAt?: string;
    }[];
}

export const optionsFloor = [
    {label: 'Térreo', value: 'TERREO'},
    {label: '1° Andar', value: '1_ANDAR'},
    {label: '2° Andar', value: '2_ANDAR'},
    {label: '3° Andar', value: '3_ANDAR'}
]

export const optionsStatus = [
    {label : "Disponível", value: "AVAILABLE"},
    {label : "Fora de ordem", value: "OUT_OF_ORDER"}
]

export const optionsCategory : { value: RoomCategory, label: string }[] = [
    {value: 'DLX', label: 'Deluxe'},
    {value: 'PRM', label: 'Premium'},
    {value: 'PST', label: 'Suíte Presidencial'},
    {value: 'STD', label: 'Padrão'},
    {value: 'STE', label: 'Suíte'},
    {value: 'STJ', label: 'Suíte Júnior'},
    {value: 'SUP', label: 'Superior'},
]

export type StatusRoom = "AVAILABLE" | "OUT_OF_ORDER" | "OCCUPIED" | "MAINTENANCE" | "CLEANING"

export type RoomCategory = 'STD' | 'SUP' | 'DLX' | 'STE' | 'STJ' | 'PRM' | 'PST'