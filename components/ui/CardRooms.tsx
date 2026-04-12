import Image from "next/image"

export default function CardRoom() {
    return (
        <div className="w-[300px] h-[250px] rounded-tl-[20px] rounded-br-[20px] border overflow-hidden relative">
            <Image fill  alt="Imagem" src="/images/hotel_model_3.jpg" />
            <div className="absolute inset-0 w-full bg-[rgba(0,0,0,0.4)] flex flex-col justify-end p-5 text-white" >
                <h3 className="text-xl font-semibold">Quarto</h3>
                <p>R$ 1.500,00</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur sed, blanditiis</p>
            </div>
        </div>
    )
}
