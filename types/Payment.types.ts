export type TypePayment = "card" | "pix" | "boleto"

export type CaptureMethod = "AUTOMATIC" | "MANUAL"

export interface CreatePaymentData {
    reservationId: number;
    amount: number;
    userId: number;
    method: TypePayment;
    currency: string;
    customerEmail: string;
}

export interface Payment {
    id: number;
    amount: number;
    amountAuthorized: number;
    amountCaptured: number;
    captureMethod: CaptureMethod;
    clientSecret: string;
    createdAt: string | Date;
    currency: string;
    reservationId: number;
    status: string;
    stripePaymentIntentId: string;
    updateAt: string | Date;
    userId: number;
    codeBar?: string;
    boletoUrl?: string;
}