import { ContactInformation } from "./Client.types";

export type Role = "ADMIN" | "ATTENDANT" | "CLIENT"

export const ROLE_OPTION = [
    {label: 'Administrador', value: "ADMIN"},
    {label: 'Atendente', value: 'ATTENDANT'},
]

export interface User {
    id: number;
    name: string;
    login: string;
    role: Role;
    phoneNumber: string;
    imageKey?: string; 
}

export interface UserPayload {
    name: string;
    login: string;
    role: Role;
    phoneNumber: string;
    password?: string;
}

export interface UserQueryParamsFilter {
    page?: number;
    size?: number;
    name?: string | string[];
    login?: string | string[];
    role?: Role[];
    phoneNumber?: string | string[];
    deleted?: boolean;
}

export interface UserRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string | Date;
    pin: string;
    contactInformation: ContactInformation;
}
