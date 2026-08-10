import { ContactInformation } from "./ContactInformation.types";

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

export interface UserRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string | Date;
    pin: string;
    contactInformation: ContactInformation;
}
