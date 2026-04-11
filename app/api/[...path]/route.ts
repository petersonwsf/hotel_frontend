import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

async function handleRequest(req: NextRequest, pathSegments: string[]) {
    const service = pathSegments[0]
    const remainingPath = pathSegments.slice(1).join('/')

    console.log(service, remainingPath)

    const baseUrl = service === 'hotel' ? 
        process.env.URL_API_HOTEL : service === 'payment' ?
        process.env.URL_API_PAYMENT : null;
    
    if (!baseUrl) return NextResponse.json({ error : 'Service not found'}, { status: 404 });

    try {
        const body = req.method !== 'GET' ? await req.json() : undefined;

        const response = await axios({
            url: `${baseUrl}/${remainingPath}`,
            method: req.method,
            data: body,
            headers: {
                "Content-Type": "application/json",
                ...(req.headers.get('Authorization') ? { "Authorization" : req.headers.get('Authorization') } : {})
            },
            validateStatus: () => true,
        })

        return NextResponse.json(response.data, { status: response.status })
    } catch (err) {
        const error = err as AxiosError;
        return NextResponse.json(
            {error: 'Gateway error', details: error.message},
            {status: 502} 
        );
    }
}

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(req: NextRequest, { params }: RouteParams) {
    const { path } = await params;
    return handleRequest(req, path);
}

export async function POST(req: NextRequest, { params }: RouteParams) {
    const { path } = await params;
    return handleRequest(req, path);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
    const { path } = await params;
    return handleRequest(req, path);
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
    const { path } = await params;
    return handleRequest(req, path);
}