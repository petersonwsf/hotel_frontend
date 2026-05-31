import Link from "next/link";
import { Metadata } from "next";

export const metadata : Metadata = {
  title: "404 - Página não encontrada",
  description: "A página buscada não existe",
}


export default function NotFound() {
    return (
        <div className="w-3xl m-auto flex justify-center gap-4 flex-col items-center min-h-[80vh]">
            <div className="relative my-4">
                <h3 className="text-gray-300 text-9xl font-bold opacity-[0.8] absolute top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">404</h3>
                <h2 className="relative text-[#002BB3] text-4xl text-center font-semibold" style={{zIndex: 1000000}}>Página não encontrada</h2>
            </div>
            <p className="font-light text-xl text-center text-gray-700">O recurso solicitado não está disponível. Verifique o URL ou retorne ao dashboard.</p>
            <Link href="/admin/users" className="border border-[#002BB3] text-[#002BB3] border-1 py-2 px-[1rem] rounded-[10px] cursor-pointer flex items-center gap-2">Voltar para o início</Link>
        </div>  
    )
}