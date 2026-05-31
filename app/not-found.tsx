import { LiaWarehouseSolid } from "react-icons/lia";
import { FaHouse } from "react-icons/fa6";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
    return (
        <>
            <Header />
            <div className="w-3xl m-auto flex justify-center gap-4 flex-col items-center min-h-[80vh]">
                <div className="relative">
                    <h3 className="text-gray-300 text-9xl font-bold opacity-[0.8] absolute top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">404</h3>
                    <h2 className="relative text-[#002BB3] text-4xl text-center font-semibold" style={{zIndex: 1000000}}>Ops! Parece que você se perdeu nos nossos corredores</h2>
                </div>
                <p className="font-light text-xl text-center text-gray-700">A página que você procura pode ter feito o check-out ou nunca existiu. Deixe-nos ajudar você a encontrar o caminho de volta para o conforto.</p>
                <Link href="/rooms" className="bg-[#002BB3] text-white py-2 px-[1rem] rounded-[10px] cursor-pointer hover:bg-[#001A80] transition-colors flex items-center gap-2">
                    <LiaWarehouseSolid className="text-white w-5 h-5" /> Ir para a lista de quartos
                </Link>
                <Link href="/" className="text-[#002BB3] border border-[#002BB3] border-1 py-2 px-[1rem] rounded-[10px] cursor-pointer flex items-center gap-2">
                    <FaHouse className="text-[#002BB3] w-5 h-5"/> Voltar para o início
                </Link>
            </div>
            <Footer />
        </>
    )
}