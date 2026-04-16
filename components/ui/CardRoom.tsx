import Image from "next/image";

export default function CardRoom() {
    return (
        <div className="flex my-3 p-4 gap-3 bg-gray-50 rounded-[10px]">
            <div className="flex items-center justify-center">
                <Image src="/images/hotel_model_4.webp" alt="Image quarto" width={200} height={200} className="rounded-[20px]" />
            </div>
            <div className="flex w-full">
                <div className="w-full">
                    <p className="mb-2 text-xl">Quarto G4F2</p>
                    <p className="font-light">Diária: R$ 500,00</p>
                    <p className="font-light">Capacidade: 4 pessoas</p>
                    <p className="font-light">Andar: 2°</p>
                    <p className="font-light">Categoria: Deluxe</p>
                </div>
                <div className="flex items-end justify-end w-full">
                    <button className="bg-[#002BB3] py-1 px-4 rounded-[5px] text-white">Ver detalhes</button>
                </div>
            </div>
        </div>
    )
}