"use client";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Review() {

    const [viewMore, setViewMore] = useState<boolean>(true)

    return (
        <div className="my-[1.5rem] w-full border-b-1 border-gray-300 py-[1rem]">
            <div className="flex gap-4">
                <div className="text-center">
                    <Image src="/images/person.jpg" width={50} height={50} className="rounded-[50%]" alt="Imagem do usuário" />
                </div>
                <div className="flex justify-between w-full">
                    <div>
                        <h3>Maria Cruz</h3>
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <FaStar key={index} className="w-5 h-5 text-yellow-400"/>
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-700">20/09/2024</p>
                </div>
            </div>
            <p className="font-light my-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum explicabo quis, consequatur incidunt officiis inventore tempora eius accusantium dicta dolorum molestiae tempore praesentium quibusdam reprehenderit suscipit cupiditate qui id dolor. {viewMore ? <span onClick={() => setViewMore(false)} className="font-semibold cursor-pointer">Ver mais...</span> : ''}
            </p>
        </div>
    )
}