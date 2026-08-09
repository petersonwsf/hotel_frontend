export interface ClientUpdate {
    id?: number,
    name?: string;
    pin?: string;
    userId?: number;
    email?: string;
    dateOfBirth?: string | Date;
    phoneNumber?: string;
}

export interface ContactInformationUpdate {
    city?: string;
    complement?: string;
    neighborhood?: string;
    number?: string;
    postalCode?: string;
    state?: string;
    street?: string;
}

export interface Client {
    id: number,
    name: string;
    pin: string;
    userId: number;
    email: string;
    dateOfBirth: string | Date;
    contactInformation : ContactInformation;
}

export interface ContactInformation {
    city: string;
    complement?: string;
    neighborhood: string;
    number?: string;
    phoneNumber: string;
    postalCode: string;
    state: string;
    street: string;
}