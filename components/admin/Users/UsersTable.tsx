import { IoPencil } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

export default async function UsersTable() {
    return (
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
    )
}