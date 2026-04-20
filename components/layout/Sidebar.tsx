"use client";
import { FaCaretDown } from "react-icons/fa";
import Image from "next/image";
import { useAuthContext } from "@/contexts/AuthContext";
import { HiUserGroup } from "react-icons/hi2";
import { LiaWarehouseSolid } from "react-icons/lia";
import { BsHouses } from "react-icons/bs";
import { FaKey } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";


export default function Sidebar() {

    const { user } = useAuthContext()

    return (
        <aside className="flex flex-col h-screen w-[300px] bg-blue-950 px-[1rem] py-[1rem] sticky top-0">
            <div className="flex items-center gap-3 border-b-1 border-gray-400 pb-4">
                <Image src="/images/logo.png" width={75} height={75} alt="Logo" />
                <h2 className="text-4xl text-white font-light">Admin</h2>
            </div>
            <div className="flex flex-col justify-between h-full">
                <nav className="py-[2rem]">
                    <ul className=" gap-4 [&>*]:flex [&>*]:items-center [&>*]:gap-1 text-white">
                        <li className="my-4 border-b-1 border-gray-400 pb-2"><HiUserGroup className="text-white w-5 h-5"/> Usuários</li>
                        <li className="my-4 border-b-1 border-gray-400 pb-2"><BsHouses className="text-white w-5 h-5" /> Tipos de quartos</li>
                        <li className="my-4 border-b-1 border-gray-400 pb-2"><LiaWarehouseSolid className="text-white w-5 h-5" /> Quartos</li>
                        <li className="my-4 border-b-1 border-gray-400 pb-2"><FaKey className="text-white w-5 h-5" /> Reservas</li>
                        <li className="my-4"><MdAnalytics className="text-white w-5 h-5" /> Dashboard</li>
                    </ul>
                </nav>
                <div className="border-t-1 border-gray-400 pt-3">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image src="/images/person.jpg" width={40} height={40} alt="Imagem de perfil" className="rounded-[50%]" />
                        <span className="text-white">{user?.name as string}</span>
                        <FaCaretDown className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>
        </aside>
    )
}