import { ContactInformation } from "./ContactInformation";

export interface UserRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    dateOfBirth: string | Date;
    pin: string;
    contactInformation: ContactInformation;
}
