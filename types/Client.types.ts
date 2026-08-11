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
    image: {
        id: number;
        url: string;
        originalName: string;
        fileSize: number;
        contentType: string;
        createdAt?: string;
    };
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

export const UFS = [
  { label: 'AC', value: 'AC' },
  { label: 'AL', value: 'AL' },
  { label: 'AM', value: 'AM' },
  { label: 'AP', value: 'AP' },
  { label: 'BA', value: 'BA' },
  { label: 'CE', value: 'CE' },
  { label: 'DF', value: 'DF' },
  { label: 'ES', value: 'ES' },
  { label: 'GO', value: 'GO' },
  { label: 'MA', value: 'MA' },
  { label: 'MG', value: 'MG' },
  { label: 'MS', value: 'MS' },
  { label: 'MT', value: 'MT' },
  { label: 'PA', value: 'PA' },
  { label: 'PB', value: 'PB' },
  { label: 'PE', value: 'PE' },
  { label: 'PI', value: 'PI' },
  { label: 'PR', value: 'PR' },
  { label: 'RJ', value: 'RJ' },
  { label: 'RN', value: 'RN' },
  { label: 'RO', value: 'RO' },
  { label: 'RR', value: 'RR' },
  { label: 'RS', value: 'RS' },
  { label: 'SC', value: 'SC' },
  { label: 'SE', value: 'SE' },
  { label: 'SP', value: 'SP' },
  { label: 'TO', value: 'TO' },
];