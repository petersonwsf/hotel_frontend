import Image from "next/image";

export default function HeroSection() {
    return (
        <section id="hero-section" aria-label="Sessão inicial">
            <div className="w-full relative">
                <div className="w-full h-[400px]">
                    <Image fill src="/images/hotel_model.webp" alt="Hero image"/>
                </div>
                <div className="w-full absolute inset-0 bg-[rgba(0,0,0,0.2)] flex items-end">
                    <div className="bg-gradient-to-b from-transparent to-black w-full py-[3rem] px-[2rem]">
                        <Image src="/images/logo.png" width={150} height={150} alt="Imagem logo hero" />
                        <p className="text-white text-1xl w-[50%]">No Lúmen Hotel, acreditamos que a verdadeira hospitalidade é aquela que ilumina os sentidos. Localizado onde a luz do horizonte encontra o conforto absoluto, cada detalhe do nosso espaço foi desenhado para ser um refúgio de clareza e bem-estar.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}