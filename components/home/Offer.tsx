import Image from "next/image"

export default function Offer() {
    return (
        <section id="offer" className="my-[4rem]" aria-label="Oferecimento Hotel">
            <h3 className="text-3xl font-semibold font-sans">Lúmen Hotel oferece</h3>
            <div className="flex flex-col my-5">
                <div className="flex justify-around my-2">
                    <div className="w-[300px] h-[200px] relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/hotel_model_2.webp" />
                        <div className="bg-[#FFC222] z-100 absolute py-[.3em] px-[2em] right-0 top-2 rounded-bl-[20px]">
                            <p className="text-white font-semibold">Piscina</p>
                        </div>
                    </div>
                    <div className="w-[300px] h-[200px] relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/hotel_model_2.webp" />
                        <div className="bg-[#FFC222] z-100 absolute py-[.3em] px-[2em] right-0 top-2 rounded-bl-[20px]">
                            <p className="text-white font-semibold">Piscina</p>
                        </div>
                    </div>
                    <div className="w-[300px] h-[200px] relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/hotel_model_2.webp" />
                        <div className="bg-[#FFC222] z-100 absolute py-[.3em] px-[2em] right-0 top-2 rounded-bl-[20px]">
                            <p className="text-white font-semibold">Piscina</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-around my-2">
                    <div className="w-[300px] h-[200px] relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/hotel_model_2.webp" />
                        <div className="bg-[#FFC222] z-100 absolute py-[.3em] px-[2em] right-0 top-2 rounded-bl-[20px]">
                            <p className="text-white font-semibold">Piscina</p>
                        </div>
                    </div>
                    <div className="w-[300px] h-[200px] relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/hotel_model_2.webp" />
                        <div className="bg-[#FFC222] z-100 absolute py-[.3em] px-[2em] right-0 top-2 rounded-bl-[20px]">
                            <p className="text-white font-semibold">Piscina</p>
                        </div>
                    </div>
                    <div className="w-[300px] h-[200px] relative hover:scale-[0.95] duration-[.3s]">
                        <Image fill alt="Imagem" src="/images/hotel_model_2.webp" />
                        <div className="bg-[#FFC222] z-100 absolute py-[.3em] px-[2em] right-0 top-2 rounded-bl-[20px]">
                            <p className="text-white font-semibold">Piscina</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}