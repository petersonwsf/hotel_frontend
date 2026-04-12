import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function Review({count}) {
    return (
        <div className="bg-gray-200 h-[300px] rounded-[15px] p-5 font-light">
            <div className="flex gap-5">
                <div className="h-[60px] w-[60px] flex justify-center items-center">
                    <Image width={60} height={60} alt="Person image" className="rounded-full" src="/images/person.jpg" />
                </div>
                <div>
                    <p>Maria Conceição</p>
                    <div className="flex gap-2">
                        {Array.from({length: 5}).map((_, index) => (
                            <FaStar key={index} style={{color: '#FFC222'}}/>
                        ))}
                    </div>
                </div>
                <div className="text-end w-full">
                    <p>20/09/2024</p>
                </div>
            </div>
            <div className="overflow-hidden">
                <p className="line-clamp-8">
                    {(count % 2 == 0) ? (
                        <>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quidem. Libero officia blanditiis nam quisquam delectus assumenda tempora, nostrum distinctio minima cum incidunt labore est magni, dolorem dolores pariatur sapiente.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, sed libero est iure vero a ipsa doloribus, dolores accusamus ad laudantium, eum dolor officia eius voluptatibus earum! Error, cum nam.
                        </>
                    ) : (
                        <>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsa tenetur facere delectus impedit id reiciendis soluta magnam, odio dolorem perferendis veritatis quia eos nulla aliquam iusto. Illum, animi debitis.
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}