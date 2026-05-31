import { IoPersonAdd } from "react-icons/io5";
import Pagination from "@/components/ui/Pagination";
import { listUsers } from "@/lib/api/user";
import Table from "@/components/ui/Table";
import { Suspense } from "react";
import LoadingUsersTable from "./LoadingTableUsers";

export default async function Users() {

    const users = await listUsers({ page: 0, size: 10 })

    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Usuários</h2>
                <button className="flex gap-2 bg-[#002BB3] hover:bg-[#001c78] duration-[.3s] items-center text-white py-2 px-4 rounded-[10px] cursor-pointer"><IoPersonAdd className="w-5 h-5"/> Adicionar usuário</button>
            </div>
            <div className="w-full mt-[2rem] rounded-[10px] border-1 border-gray-100 shadow-2xl">
                <Suspense fallback={<LoadingUsersTable />}>
                    <Table columns={["ID", "Nome", "Login", "Telefone", "Papel", "Ações"]} data={users.content.map((user) => ({ ...user, actions: null }))} />
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
                        <Pagination page={users.pageable.pageNumber + 1} totalPages={users.totalPages} />
                    </div>
                </div>
            </div>
        </div>
    )
}