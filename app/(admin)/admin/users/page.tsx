import { listUsers } from "@/lib/api/user";
import { Suspense } from "react";
import LoadingUsersTable from "./LoadingTableUsers";
import TableUsers from "./components/TableUsers";
import HeaderUsersPage from "./components/HeaderUsersPage";
import FiltersUsers from "./components/FilterUsers";
import { Role } from "@/types/User.types";

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Users({ searchParams } : PageProps) {

    const params = await searchParams

    const users = await listUsers({ 
        page: Number(params.page ?? 0), 
        size:  Number(params.size ?? 5),
        name: params.name ?? undefined,
        phoneNumber: params.phoneNumber ?? undefined,
        login: params.login ?? undefined,
        role: params.role ? [ params.role as Role ] : ['ADMIN', 'ATTENDANT'], 
        deleted: false
    })

    return (
        <div>
            <HeaderUsersPage />
            <FiltersUsers />
            <div>
                <Suspense fallback={<LoadingUsersTable />}>
                    <TableUsers users={users?.content ?? []} page={users?.pageable.pageNumber ?? 0} totalPages={users?.totalPages ?? 1} />
                </Suspense>
            </div>
        </div>
    )
}