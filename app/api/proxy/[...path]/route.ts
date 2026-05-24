// app/api/proxy/[...path]/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SERVICES: Record<string, string> = {
    hotel: process.env.URL_API_HOTEL!,
    pagamentos: process.env.URL_API_PAYMENT!,
}

async function handler(req: NextRequest) {
    const cookiesStore = await cookies()
    const token = cookiesStore.get('token')?.value

    const path = req.nextUrl.pathname.replace('/api/proxy', '')
    const service = path.split('/')[1]
    const servicePrefix = `/${service}`
    const servicePath = path.replace(servicePrefix, '')
    const search = req.nextUrl.search
    const baseUrl = SERVICES[service]

    console.log({path, service, baseUrl})

    if (!baseUrl) {
        return NextResponse.json({ erro: `Serviço "${service}" não encontrado` }, { status: 404 })
    }

    const isFormData = req.headers.get('content-type')?.includes('multipart/form-data')

    const body = req.method !== 'GET' && req.method !== 'HEAD'
        ? isFormData ? await req.formData() : await req.json()
        : undefined

    const response = await fetch(`${baseUrl}${servicePath}${search}`, {
        method: req.method,
        headers: {
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: isFormData ? body as FormData : body ? JSON.stringify(body) : undefined
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler