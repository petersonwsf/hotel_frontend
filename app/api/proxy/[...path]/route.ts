// app/api/proxy/[...path]/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SERVICES: Record<string, string> = {
    hotel: process.env.URL_API_HOTEL!,
    payment: process.env.URL_API_PAYMENT!,
};

async function handler(req: NextRequest) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    const path = req.nextUrl.pathname.replace('/api/proxy', '');
    const service = path.split('/')[1];
    const servicePrefix = `/${service}`;
    const servicePath = path.replace(servicePrefix, '');
    const search = req.nextUrl.search;
    const baseUrl = SERVICES[service];

    if (!baseUrl) {
        return NextResponse.json({ erro: `Serviço "${service}" não encontrado` }, { status: 404 });
    }

    const contentType = req.headers.get('content-type') || '';
    const isFormData = contentType.includes('multipart/form-data');

    let body: any = undefined;

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        if (isFormData) {
            body = req.body; // Repassa a stream nativa para manter os boundaries intactos
        } else {
            const rawBody = await req.text();
            body = rawBody ? JSON.parse(rawBody) : undefined;
        }
    }

    const response = await fetch(`${baseUrl}${servicePath}${search}`, {
        method: req.method,
        headers: {
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
        duplex: isFormData ? 'half' : undefined,
    });

    // 1. Caso o serviço externo retorne 204 (No Content)
    if (response.status === 204) {
        return new NextResponse(null, { status: 204 });
    }

    // 2. Processa a resposta normal para os demais códigos de status
    const text = await response.text();
    let data;

    try {
        data = text ? JSON.parse(text) : { success: response.ok };
    } catch (err) {
        data = { message: text || "Erro interno no serviço externo" };
    }

    return NextResponse.json(data, { status: response.status });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;