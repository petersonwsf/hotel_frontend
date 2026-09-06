import Pagination from "@/components/ui/Pagination";
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
            <div className="w-full mt-[2rem] rounded-[10px] border-1 border-gray-100 shadow-2xl">
                <Suspense fallback={<LoadingUsersTable />}>
                    <TableUsers users={users?.content ?? []} />
                </Suspense>
                <div className="flex w-full justify-between py-[1rem] px-[1rem]">
                    <div className="w-full flex items-center gap-2">
                        <label htmlFor="rowsPerPage" >Usuários por página</label>
                        <select name="rowsPerPage" id="rowsPerPage"className="w-[70px] text-center border-1 border-gray-300 rounded-[5px] py-1 outline-none">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                    <div className="w-full flex justify-end">
                        <Pagination page={users.pageable.pageNumber} totalPages={users.totalPages} />
                    </div>
                </div>
            </div>
        </div>
    )
}