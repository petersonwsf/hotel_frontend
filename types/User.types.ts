export type Role = "ADMIN" | "ATTENDANT" | "CLIENT"

export interface User {
    id: number;
    name: string;
    login: string;
    role: Role;
    phoneNumber: string;
}

export interface UserQueryParamsFilter {
    page?: number;
    size?: number;
    name?: string;
    login?: string;
    role?: Role;
    phoneNumber?: string;
    deleted?: boolean;
}