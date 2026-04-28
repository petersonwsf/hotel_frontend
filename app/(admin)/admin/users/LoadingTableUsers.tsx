import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingUsersTable() {
    return (
        <div className="w-full min-h-[70vh] flex justify-center items-center">
            <div className="flex items-center gap-2">
                <p className="text-2xl font-light">Carregando</p>
                <div className="animate-spin"><AiOutlineLoading3Quarters fontSize={30}/></div>
            </div>
        </div>
    )
}