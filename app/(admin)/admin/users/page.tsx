import { IoPersonAdd } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import Pagination from "@/components/ui/Pagination";

export default function Users() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Usuários</h2>
                <button className="flex gap-2 bg-[#002BB3] hover:bg-[#001c78] duration-[.3s] items-center text-white py-2 px-4 rounded-[10px] cursor-pointer"><IoPersonAdd className="w-5 h-5"/> Adicionar usuário</button>
            </div>
            <div className="w-full mt-[2rem] rounded-[10px] border-1 border-gray-100 shadow-2xl">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-1 border-gray-200">
                            <th className="py-3">
                                <div className="px-4 text-start w-full border-r-1 border-gray-200 font-semibold">ID</div>
                            </th>
                            <th className="py-3">
                                <div className="px-4 w-full text-start border-r-1 border-gray-200 font-semibold">Nome</div>
                            </th>
                            <th className="py-3">
                                <div className="px-4 w-full text-start border-r-1 border-gray-200 font-semibold">Email</div>
                            </th>
                            <th className="py-3">
                                <div className="px-4 w-full text-start border-r-1 border-gray-200 font-semibold">Papel</div>
                            </th>
                            <th className="py-3">
                                <div className="px-4 w-full text-start flex gap-2">Ações</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <tr key={index} className="border-b-1 border-gray-200">
                                <td className="p-3">67</td>
                                <td className="p-3">Malcolm Lockyer</td>
                                <td className="p-3">markgrayson@gmail.com</td>
                                <td className="p-3">ADMIN</td>
                                <td className="p-3 flex items-center gap-2 text-white">
                                    <button className="p-2 bg-[#002BB3] rounded-[5px] hover:bg-[#001c78] duration-[.3s] cursor-pointer"><IoPencil /></button>
                                    <button className="p-2 bg-red-600 rounded-[5px] hover:bg-red-800 duration-[.3s] cursor-pointer"><FaTrashAlt /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                        <Pagination page={1} totalPages={20} />
                    </div>
                </div>
            </div>
        </div>
    )
}