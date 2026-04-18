"use client";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import Review from "./Review";
import { FaChevronDown } from "react-icons/fa6";

export default function RoomReviews() {

    const [page, setPage] = useState<number>(1)

    return (
        <section className="mt-[2rem]">
            <h3 className="text-3xl">Avaliações do quarto</h3>
            <div className="flex gap-2 mt-2 items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar key={index} className="w-10 h-10 text-yellow-400" />
                ))}
                <p className="font-light text-xl">(5.500)</p>
            </div>
            <div className="w-[50%]">
                {Array.from({ length: (3 * page)}).map((_, index) => (
                    <Review key={index} />
                ))}
                <div className="w-full flex justify-center">
                    <button onClick={() => setPage(page + 1)} className="flex items-center gap-1 cursor-pointer transition-transform duration-300 hover:translate-y-1"><FaChevronDown className="w-4 h-4" /> Ver mais</button>
                </div>
            </div>
        </section>
    )
}