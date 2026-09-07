import { getClientList } from "@/lib/api/client";
import TableClients from "./components/TableClients";
import ClientFilters from "./components/ClientFilters";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ClientsPage({ searchParams } : PageProps) {

    const params = await searchParams

    const clients = await getClientList({
        page: params.page ?? '0',
        size: params.size ?? '10',
        email: params.email ?? undefined,
        name: params.name ?? undefined,
        pin: params.pin ?? undefined,
        phoneNumber: params.phoneNumber ?? undefined,
    })

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Clientes</h2>
            </div>
            <ClientFilters />
            <TableClients clients={clients?.content ?? []} page={clients?.pageable.pageNumber ?? 0} totalPages={clients?.totalPages ?? 1} />
        </div>
    )
}