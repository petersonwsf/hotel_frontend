"use client"
import Table from "@/components/ui/Table";
import { User } from "@/types/User.types"
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import ModalUser from "./ModalUser";
import { useUser } from "@/hooks/useUser";
import Modal from "@/components/ui/Modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Pagination from "@/components/ui/Pagination";

interface TableUsersProps {
    users: User[];
    page: number;
    totalPages: number;
}

export default function TableUsers({ users, page, totalPages } : TableUsersProps) {

    const [userSelected, setUserSelected] = useState<User | null>(null)
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    const { deleteUser } = useUser()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const changePageSize = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('size', value)
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleDeleteUser = async () => {
        setLoadingDelete(true)
        await deleteUser(userSelected!.id)
        setLoadingDelete(false)
        handleCloseModalDelete()
        router.refresh()
    }


    const handleOpenModalEdit = (user : User) => {
        setUserSelected(user)
        setOpenModalEdit(true)
    }

    const handleCloseModalEdit = () => {
        setUserSelected(null)
        setOpenModalEdit(false)
    }

    const handleOpenModalDelete = (user : User) => {
        setUserSelected(user)
        setOpenModalDelete(true)
    }

    const handleCloseModalDelete = () => {
        setUserSelected(null)
        setOpenModalDelete(false)
    }

    return (
        <div className="w-full mt-[2rem] rounded-[10px] border-1 border-gray-100 shadow-2xl">
            {users.length > 0 ? (
                <Table columns={["ID", "Nome", "Login", "Telefone", "Papel", "Ações"]} data={users.map((user : User) => ({ id: user.id, name: user.name, login: user.login, phoneNumber: user.phoneNumber, role: user.role, actions: <div className="flex gap-3 itesm-center">
                    <button onClick={() => handleOpenModalEdit(user)} className="cursor-pointer rounded-lg p-[.5rem] bg-[#002BB3] text-white"><FaPen /></button>
                    <button onClick={() => handleOpenModalDelete(user)} className="cursor-pointer rounded-lg p-[.5rem] bg-[#9A0526] text-white"><FaRegTrashAlt /></button>
                </div> }))} />
            ) : (
                <div className="min-h-[300px] w-full flex items-center justify-center">
                    <p className="font-light text-xl">Não há usuários</p>
                </div>
            )}
            <div className="flex w-full justify-between py-[1rem] px-[1rem]">
                <div className="w-full flex items-center gap-2">
                    <label htmlFor="rowsPerPage" >Usuários por página</label>
                    <select onChange={(e) => changePageSize(e.target.value)} name="rowsPerPage" id="rowsPerPage"className="w-[70px] text-center border-1 border-gray-300 rounded-[5px] py-1 outline-none">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                    </select>
                </div>
                <div className="w-full flex justify-end">
                    <Pagination page={page} totalPages={totalPages} />
                </div>
            </div>
            {userSelected && <ModalUser editMode={true} open={openModalEdit} user={userSelected} onClose={handleCloseModalEdit} />}
            {userSelected && 
                <Modal 
                    isOpen={openModalDelete} 
                    onClose={handleCloseModalDelete}
                    title={`Excluir usuário`} 
                >
                    <p className="font-light text-lg">Tem certeza que deseja excluir o usuário {userSelected.name}</p>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={handleCloseModalDelete} className="bg-[#002179] text-white py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal">Manter</button>
                        <button onClick={handleDeleteUser} className={`text-[#fff] bg-[#9A0526] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal ${loadingDelete ? 'opacity-[.5] pointer-events-none' : ''}`}>
                            {loadingDelete ? <span className="flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" fontSize={15}/> Deletando</span> : 'Deletar usuário'}
                        </button>
                    </div>
                </Modal>
            }
        </div>
    )
}