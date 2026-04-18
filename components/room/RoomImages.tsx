"use client";
import { useState } from "react";
import Image from "next/image";

export default function RoomImages() {

    const [mainImage, setMainImage] = useState<string>('/images/hotel_model_2.webp')

    function changeMainImage(urlImage: string) {
        setMainImage(urlImage)
    }

    return (
        <div className="w-full flex gap-5">
            <div className="flex flex-col justify-center gap-[1rem]">
                {Array.from({ length: 5 }).map((_,index) => (
                    <div className="p-1 border-2 border-[#fff] rounded-[5px] duration-[0.3s] cursor-pointer hover:border-[#002BB3]" key={index} onClick={() => changeMainImage('/images/hotel_model_2.webp')}>
                        <Image src="/images/hotel_model.webp" width={100} height={100} alt="Imagem do quarto" />
                    </div>
                ))}                        
            </div>
            <div className="flex justify-center items-center">
                <Image width={500} height={0} src={mainImage} alt="Imagem principal" />
            </div>
        </div>
    )
}