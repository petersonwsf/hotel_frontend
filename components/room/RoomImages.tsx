"use client";
import { useState } from "react";
import { Room } from "@/types/Room.types";

type SingleImage = {
    id: number;
    url: string;
    originalName: string;
    fileSize: number;
    contentType: string;
    createdAt?: string;
};

interface RoomImagesProps {
    images: SingleImage[];
}

export default function RoomImages({ images }: RoomImagesProps) {

    const [mainImage, setMainImage] = useState<string>(images[0].url)

    function changeMainImage(urlImage: string) {
        setMainImage(urlImage)
    }

    return (
        <div className="w-full min-h-[500px] flex gap-5">
            <div className="flex flex-col justify-center gap-[1rem]">
                {images && images.map((image, index) => (
                    <div className="p-1 border-2 border-[#fff] rounded-[5px] duration-[0.3s] cursor-pointer hover:border-[#002BB3]" key={index} onClick={() => changeMainImage(image.url)}>
                        <img src={image.url} className="w-[100px] max-h-[100px]" alt="Imagem do quarto" />
                    </div>
                ))}                        
            </div>
            <div className="flex justify-center items-center">
                <img src={mainImage} alt="Imagem principal" className="w-[500px] max-h-[500px]" />
            </div>
        </div>
    )
}