"use client"
import { useState } from 'react'
import { IoPersonAdd } from "react-icons/io5";
import ModalUser from './ModalUser';

export default function HeaderUsersPage() {

    const [openModalCreateUser, setOpenModalCreateUser] = useState<boolean>(false)

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-3xl">Usuários</h2>
                <button onClick={() => setOpenModalCreateUser(true)} className="flex gap-2 bg-[#002BB3] hover:bg-[#001c78] duration-[.3s] items-center text-white py-2 px-4 rounded-[10px] cursor-pointer"><IoPersonAdd className="w-5 h-5"/> Adicionar usuário</button>
            </div>
            <ModalUser open={openModalCreateUser} onClose={() => setOpenModalCreateUser(false)} editMode={false} />
        </>
    )
}