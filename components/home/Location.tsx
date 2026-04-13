import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";

export default function Location() {
    return (
        <section id="location" className="my-[5rem]" aria-label="Localização">
            <div className="flex h-[400px] gap-3">
                <div className="w-full overflow-hidden ">
                    <Image 
                    src="/images/hotel_model_4.webp"
                    className="object-cover rounded-br-[70%]"
                    width={600}
                    height={600}
                    alt="Imagem localização"/>
                </div>
                <div className="w-full p-5 flex flex-col justify-center">
                    <h4 className="text-4xl text-[#002BB3] font-semibold flex justify-start gap-4 items-center mb-3"> <FaLocationDot style={{color: 'red'}} /> Localização</h4>
                    <p className="text-2xl my-1 text-light"><span className="font-semibold">Endereço:</span> Av. das Marés, 1.200 Enseada do Sol, Florianópolis – SC CEP: 88066-500</p>
                    <p className="text-2xl my-1 text-light"><span className="font-semibold">Ponto de Referência:</span> Ao lado do Mirante das Rochas e a apenas 200m do Farol da Enseada.</p>
                    <p className="text-2xl my-1 text-light"><span className="font-semibold">Telefone:</span> (XX) XXXX-XXXX</p>
                    <p className="text-2xl my-1 text-light"><span className="font-semibold">E-mail:</span> reservas@ficticio.com.br</p>
                </div>
            </div>
        </section>
    )
}