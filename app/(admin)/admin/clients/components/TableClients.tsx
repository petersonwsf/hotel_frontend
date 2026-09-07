"use client"
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { Client, ClientList } from "@/types/Client.types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import ModalClient from "./ModalClient";
import Modal from "@/components/ui/Modal";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import useClient from "@/hooks/useClient";

interface TableClientsProps {
    clients: ClientList[];
    page: number;
    totalPages: number;
}

export default function TableClients({ clients, page, totalPages } : TableClientsProps) {

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [clientSelected, setClientSelected] = useState<Client | null>(null)
    const [openModalUpdateClient, setOpenModalUpdateClient] = useState<boolean>(false)
    const [openModalDeleteClient, setOpenModalDeleteClient] = useState<boolean>(false)
    const [loadingDelete, setLoadingDelete] = useState<boolean>(false)

    const { deleteClient } = useClient()

    const changePageSize = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('size', value)
        router.push(`${pathname}?${params.toString()}`)
    }

    const handleDelete = async () => {
        setLoadingDelete(true)
        await deleteClient(clientSelected!.id)
        setLoadingDelete(false)
        setOpenModalDeleteClient(false)
    }

    const handleOpenModalUpdateClient = (client: ClientList) => {
        const payload : Client = {
            id: client.id,
            name: client.name,
            email: client.email,
            pin: client.pin,
            dateOfBirth: client.dateOfBirth,
            imageKey: client.user.imageKey,
            contactInformation: client.contactInformation,
            userId: client.user.id,
        }
        setClientSelected(payload)
        setOpenModalUpdateClient(true)
    }

    const handleOpenModalDeleteClient = (client: ClientList) => {
        const payload : Client = {
            id: client.id,
            name: client.name,
            email: client.email,
            pin: client.pin,
            dateOfBirth: client.dateOfBirth,
            imageKey: client.user.imageKey,
            contactInformation: client.contactInformation,
            userId: client.user.id,
        }
        setClientSelected(payload)
        setOpenModalDeleteClient(true)
    }

    const handleCloseModalUpdate = () => {
        setClientSelected(null)
        setOpenModalUpdateClient(false)
    }

    const handleCloseModalDelete = () => {
        setClientSelected(null)
        setOpenModalUpdateClient(false)
    }
    
    return (
         <div className="w-full mt-[2rem] rounded-[10px] border-1 border-gray-100 shadow-2xl">
            {clients.length > 0 ? (
                <Table columns={["ID", "Nome", "Email", "Telefone", "Ações"]} data={clients.map((client : ClientList) => ({ id: client.id, name: client.name, login: client.email, phoneNumber: client.user.phoneNumber, actions: 
                <div className="flex gap-3 itesm-center">
                    <button onClick={() => handleOpenModalUpdateClient(client)} className="cursor-pointer rounded-lg p-[.5rem] bg-[#002BB3] text-white"><FaPen /></button>
                    <button onClick={() => handleOpenModalDeleteClient(client)} className="cursor-pointer rounded-lg p-[.5rem] bg-[#9A0526] text-white"><FaRegTrashAlt /></button>
                </div> }))} />
            ) : (
                <div className="min-h-[300px] w-full flex items-center justify-center">
                    <p className="font-light text-xl">Não há clientes</p>
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
            {clientSelected && <ModalClient client={clientSelected} open={openModalUpdateClient} onClose={handleCloseModalUpdate} />}
            {clientSelected && 
                <Modal isOpen={openModalDeleteClient} onClose={handleCloseModalDelete} title="Excluir cliente">
                    <p className="font-light text-lg">Tem certeza que deseja excluir o usuário {clientSelected.name}</p>
                    <div className="flex justify-end gap-3 mt-4">
                        <button onClick={handleCloseModalDelete} className="bg-[#002179] text-white py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal">Manter</button>
                        <button onClick={handleDelete} className={`text-[#fff] bg-[#9A0526] py-[.2rem] px-[2rem] cursor-pointer rounded-[7px] font-normal ${loadingDelete ? 'opacity-[.5] pointer-events-none' : ''}`}>
                            {loadingDelete ? <span className="flex items-center gap-2"><AiOutlineLoading3Quarters className="animate-spin" fontSize={15}/> Deletando</span> : 'Deletar usuário'}
                        </button>
                    </div>
                </Modal>
            }
        </div>
    )
}