"use client"
import Image from "next/image";
import { IoHome } from "react-icons/io5";
import { GrOverview } from "react-icons/gr";
import { IoPersonOutline } from "react-icons/io5";
import { FaBed } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarUser() {

    const currentPath = usePathname()
    const router = useRouter()

    const pathname = currentPath ? currentPath.replace('/user', '') : '';

    const redirectToPage = (url: string) => {
        router.push(url)
    }

    return (
        <div className="h-full border-r-1 border-gray-300 min-w-[300px] px-[1rem]">
            <div className="flex justify-center border-b-1 border-gray-300">
                <Image width={100} height={100} src={`/images/logo_escura.png`} alt="Logo escura" />
            </div>
            <div className="flex flex-col text-gray-600">
                <div onClick={() => redirectToPage('/user')} className={`flex items-center gap-2 px-[1rem] py-[1rem] text-xl font-light border-b-1 border-gray-300 cursor-pointer duration-[.3s] ${pathname === '' ? 'font-normal border-b-3 rounded-lg border-b-[#002179] text-[#002179]' : ''} hover:border-b-3 hover:rounded-lg hover:font-normal hover:border-b-[#002179] hover:text-[#002179]`}>
                    <GrOverview /> Início
                </div>
                <div onClick={() => redirectToPage('/user/reservations')} className={`flex items-center gap-2 px-[1rem] py-[1rem] text-xl font-light border-b-1 border-gray-300 cursor-pointer duration-[.3s] ${pathname === '/reservations' ? 'font-normal border-b-3 rounded-lg border-b-[#002179] text-[#002179]' : ''} hover:border-b-3 hover:rounded-lg hover:font-[400] hover:border-b-[#002179] hover:text-[#002179]`}>
                    <FaBed /> Minhas reservas
                </div>
                <div onClick={() => redirectToPage('/user/personalData')} className={`flex items-center gap-2 px-[1rem] py-[1rem] text-xl font-light border-b-1 border-gray-300 cursor-pointer duration-[.3s] ${pathname === '/dados' ? 'font-normal border-b-3 rounded-lg border-b-[#002179] text-[#002179]' : ''} hover:border-b-3 hover:rounded-lg hover:font-[400] hover:border-b-[#002179] hover:text-[#002179]`}>
                    <IoPersonOutline /> Dados pessoais
                </div>
                <div onClick={() => redirectToPage('/user/address')} className={`flex items-center gap-2 px-[1rem] py-[1rem] text-xl font-light border-b-1 border-gray-300 cursor-pointer duration-[.3s] ${pathname === '/enderecos' ? 'font-normal border-b-3 rounded-lg border-b-[#002179] text-[#002179]' : ''} hover:border-b-3 hover:rounded-lg hover:font-[400] hover:border-b-[#002179] hover:text-[#002179]`}>
                    <IoHome /> Meu endereço
                </div>
            </div>
        </div>
    )
}