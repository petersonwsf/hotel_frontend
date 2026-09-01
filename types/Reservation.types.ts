import { RoomCategory, StatusRoom } from "./Room.types";
import { Role } from "./User.types";

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELED" | "NO_SHOW"

export type Filter = 'ACTIVE' | 'COMPLETED' | 'CANCELED'

export interface ReservationFilters {
    sort?: string;
    status?: string | string[];
    page?: string | string[];
    size?: string | string[];
    user?: string | string[];
    room?: string | string[];
    checkInDate?: string | string[] | Date;
    checkOutDate?: string | string[] | Date;
    category?: string | string[];
    floor?: string | string[];
    guestName?: string;
}

export interface ReservationSaveDTO {
    checkInDate: Date | string;
    checkOutDate: Date | string;
    dailyRate: number;
    discountAmount: number;
    serviceFee: number;
    userId: number;
    roomId: number;
}

export interface ReservationUpdateDTO {
    checkInDate?: Date | string;
    checkOutDate?: Date | string;
    discountAmount?: number;
    serviceFee?: number;
    status?: ReservationStatus;
    roomId?: number;
}

export interface Reservation {
    id: number;
    checkInDate: Date | string;
    checkOutDate: Date | string;
    dailyRate: number;
    discountAmount: number;
    serviceFee: number;
    userId: number;
    status: ReservationStatus;
    totalAmount: number;
    room: {
        id: number;
        code: string;
        floor: string;
        customPrice: number;
        active: boolean;
        status: StatusRoom;
        description: string;
        amenities: string[];
        capacity: number;
        category: RoomCategory;
        image: string[]; 
    };
    user: {
        id: number;
        name: string;
        phoneNumber: string;
        login: string;
        role: Role;
    }
}

export const optionsReservationStatus: { value: ReservationStatus, label: string }[] = [
    { value: 'PENDING', label: 'Pendente' },
    { value: 'CONFIRMED', label: 'Confirmada' },
    { value: 'CHECKED_IN', label: 'Check-in Realizado' },
    { value: 'CHECKED_OUT', label: 'Check-out Realizado' },
    { value: 'CANCELED', label: 'Cancelada' },
    { value: 'NO_SHOW', label: 'Não Compareceu (No-Show)' },
]