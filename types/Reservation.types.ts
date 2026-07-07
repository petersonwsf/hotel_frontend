import { RoomCategory, StatusRoom } from "./Room.types";
import { Role } from "./User.types";

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CHECKED_IN" | "CHECKED_OUT" | "CANCELED" | "NO_SHOW"

export interface ReservationSaveDTO {
    checkInDate: Date | string;
    checkOutDate: Date | string;
    dailyRate: number;
    discountAmount: number;
    serviceFee: number;
    userId: number;
    roomId: number;
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
    };
    user: {
        id: number;
        name: string;
        phoneNumber: string;
        login: string;
        role: Role;
    }
}