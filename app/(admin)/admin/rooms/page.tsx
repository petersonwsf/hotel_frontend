import CreateRoomForm from "@/components/rooms/CreateRoomForm";
import CardRoom from "@/components/ui/CardRoom";
import Modal from "@/components/ui/Modal";
import Pagination from "@/components/ui/Pagination";
import { BsHouses } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";


export default function Rooms() {
    return (
        <div>
            <div className="flex justify-between">
                <h2 className="text-3xl">Quartos</h2>
                <button className="flex gap-2 bg-[#002BB3] hover:bg-[#001c78] duration-[.3s] items-center text-white py-2 px-4 rounded-[10px] cursor-pointer"><FaPlus className="w-3 h-3" /><BsHouses className="w-5 h-5"/> Adicionar Quarto</button>
            </div>
            <div className="flex flex-col gap-[1rem] mt-[2.5rem]">
                <div className="flex gap-[1.5rem] items-center justify-between">
                    <CardRoom />
                    <CardRoom />
                </div>
                <div className="flex gap-[1.5rem] items-center justify-between">
                    <CardRoom />
                    <CardRoom />
                </div>
                <div className="flex gap-[1.5rem] items-center justify-between">
                    <CardRoom />
                    <CardRoom />
                </div>
            </div>
            <Modal isOpen={true} onClose={() => {}} title="Quarto" size="4xl">
                <CreateRoomForm />
            </Modal>
            <div className="flex items-center justify-end mt-[1rem]">
                <Pagination page={5} totalPages={67}/>
            </div> 
        </div>
    )
}